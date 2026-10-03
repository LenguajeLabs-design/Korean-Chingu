// Public browser configuration for the Korean Chingu Firebase project.
// Fill this from Firebase Console → Project settings → Your apps after setup.
// This file must contain client configuration only—never a service-account key.
export const firebaseConfig = {
  apiKey: "AIzaSyCDG2tLqkumvO4oVygNnyBcETEaBrwm2uo",
  authDomain: "korean-chingu.firebaseapp.com",
  projectId: "korean-chingu",
  appId: "1:322047607834:web:1e55a54db0b7f0c60e3da3"
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);
