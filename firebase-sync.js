import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js?v=32";

const sdkVersion = "12.19.0";
const sdkBase = `https://www.gstatic.com/firebasejs/${sdkVersion}`;
let sdkPromise;

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (!value || typeof value !== "object") return JSON.stringify(value);
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
}

function loadFirebaseSdk() {
  if (!sdkPromise) {
    sdkPromise = Promise.all([
      import(`${sdkBase}/firebase-app.js`),
      import(`${sdkBase}/firebase-auth.js`),
      import(`${sdkBase}/firebase-firestore.js`)
    ]).then(([app, auth, firestore]) => ({ app, auth, firestore }));
  }
  return sdkPromise;
}

export function createFirebaseSync() {
  let services;
  let currentUser = null;
  let stopAuthListener = null;
  let stopProgressListener = null;

  async function getServices() {
    if (!isFirebaseConfigured) throw new Error("Firebase setup is not complete yet.");
    if (services) return services;
    const { app: appSdk, auth: authSdk, firestore: firestoreSdk } = await loadFirebaseSdk();
    const app = appSdk.getApps().length ? appSdk.getApp() : appSdk.initializeApp(firebaseConfig);
    services = {
      auth: authSdk.getAuth(app),
      authSdk,
      db: firestoreSdk.getFirestore(app),
      firestoreSdk
    };
    return services;
  }

  function progressDocument(db, firestoreSdk, uid) {
    return firestoreSdk.doc(db, "users", uid, "progress", "main");
  }

  async function start({ onUser, onProgress, onError }) {
    const { auth, authSdk, db, firestoreSdk } = await getServices();
    await authSdk.getRedirectResult(auth).catch((error) => onError?.(error));
    stopAuthListener?.();
    stopAuthListener = authSdk.onAuthStateChanged(auth, (user) => {
      currentUser = user;
      stopProgressListener?.();
      stopProgressListener = null;
      onUser?.(user ? { uid: user.uid, email: user.email, displayName: user.displayName } : null);
      if (!user) return;
      const ref = progressDocument(db, firestoreSdk, user.uid);
      stopProgressListener = firestoreSdk.onSnapshot(ref, (snapshot) => {
        onProgress?.(snapshot.exists() ? snapshot.data().progress || null : null);
      }, (error) => onError?.(error));
    }, (error) => onError?.(error));
    return () => {
      stopAuthListener?.();
      stopProgressListener?.();
      stopAuthListener = null;
      stopProgressListener = null;
      currentUser = null;
    };
  }

  async function signIn() {
    const { auth, authSdk } = await getServices();
    await authSdk.signInWithRedirect(auth, new authSdk.GoogleAuthProvider());
  }

  async function signOut() {
    const { auth, authSdk } = await getServices();
    await authSdk.signOut(auth);
  }

  async function saveProgress(localProgress, mergeProgress) {
    const { db, firestoreSdk } = await getServices();
    if (!currentUser) throw new Error("Sign in before syncing progress.");
    const ref = progressDocument(db, firestoreSdk, currentUser.uid);
    return firestoreSdk.runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(ref);
      const remoteProgress = snapshot.exists() ? snapshot.data().progress || null : null;
      const merged = mergeProgress(remoteProgress, localProgress);
      if (canonicalJson(merged) !== canonicalJson(remoteProgress)) {
        transaction.set(ref, {
          schemaVersion: 1,
          progress: merged,
          updatedAt: firestoreSdk.serverTimestamp()
        });
      }
      return merged;
    });
  }

  return {
    configured: isFirebaseConfigured,
    start,
    signIn,
    signOut,
    saveProgress,
    getCurrentUser: () => currentUser ? {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName
    } : null
  };
}
