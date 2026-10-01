export const grammar = [
  {
    id: "eun-neun", form: "은 / 는", meaning: "As for… · topic marker", level: 1, category: "PARTICLES",
    connection: "Attach 는 after a vowel and 은 after a consonant. It introduces the topic or sets up a contrast.",
    examples: [
      { korean: "저는 커피를 좋아해요.", translation: "As for me, I like coffee." },
      { korean: "저는 오늘 지하철로 갈 거예요.", translation: "As for me, I’m taking the subway today." },
      { korean: "이 카페는 조용해서 공부하기 좋아요.", translation: "This café is quiet, so it’s good for studying." },
    ],
    note: "은/는 points to what you’re talking about. Compare 이/가, which often puts focus on who or what does something.",
    searchTerms: "eun neun topic marker subject contrast"
  },
  {
    id: "i-ga", form: "이 / 가", meaning: "Subject marker · who or what", level: 1, category: "PARTICLES",
    connection: "Attach 가 after a vowel and 이 after a consonant. It marks the subject, often when introducing or emphasizing it.",
    examples: [
      { korean: "비가 와요.", translation: "It’s raining. (Rain is falling.)" },
      { korean: "누가 문을 열었어요? 민수가 열었어요.", translation: "Who opened the door? Minsu did." },
      { korean: "방 안에 고양이가 있어요.", translation: "There’s a cat in the room." },
    ],
    note: "A useful first distinction: 은/는 sets the topic; 이/가 highlights the subject or new information.",
    searchTerms: "i ga subject particle who what"
  },
  {
    id: "eul-reul", form: "을 / 를", meaning: "Object marker", level: 1, category: "PARTICLES",
    connection: "Attach 를 after a vowel and 을 after a consonant. It marks what receives the action.",
    examples: [
      { korean: "책을 읽어요.", translation: "I read a book." },
      { korean: "물 한 잔을 주세요.", translation: "Please give me a glass of water." },
      { korean: "주말에 친구를 만났어요.", translation: "I met a friend on the weekend." },
    ],
    note: "The object marker is often dropped in casual conversation when the meaning is already clear.",
    searchTerms: "eul reul object particle"
  },
  {
    id: "e-location", form: "에", meaning: "To · at · in · time marker", level: 1, category: "PARTICLES",
    connection: "Attach 에 to a place for a destination or location of existence, and to a time expression for when something happens.",
    examples: [
      { korean: "아침 8시에 학교에 가요.", translation: "I go to school at 8 in the morning." },
      { korean: "책상 위에 휴대폰이 있어요.", translation: "There’s a phone on the desk." },
      { korean: "다음 주에 한국에 가요.", translation: "I’m going to Korea next week." },
    ],
    note: "For an action happening at a place, use 에서. 에 often marks destination, existence, or time.",
    searchTerms: "e destination location time at to in"
  },
  {
    id: "eseo", form: "에서", meaning: "At · in · from a place", level: 1, category: "PARTICLES",
    connection: "Attach 에서 to a place where an action happens, or to the place an action starts from.",
    examples: [
      { korean: "도서관에서 공부해요.", translation: "I study at the library." },
      { korean: "역에서 친구를 만났어요.", translation: "I met a friend at the station." },
      { korean: "서울에서 부산까지 기차를 탔어요.", translation: "I took a train from Seoul to Busan." },
    ],
    note: "Use 에서 for doing an action somewhere; use 에 for a destination or for where something exists.",
    searchTerms: "eseo location action from place at in"
  },
  {
    id: "wa-gwa", form: "와 / 과 · 하고", meaning: "And · with", level: 1, category: "PARTICLES",
    connection: "와/과 is a little more formal: attach 와 after a vowel and 과 after a consonant. 하고 works after either.",
    examples: [
      { korean: "친구하고 영화를 봤어요.", translation: "I watched a movie with a friend." },
      { korean: "저는 동생과 시장에 갔어요.", translation: "I went to the market with my younger sibling." },
      { korean: "커피하고 빵을 샀어요.", translation: "I bought coffee and bread." },
    ],
    note: "와/과 and 하고 can mean “and” between nouns or “with” when describing who you do something with.",
    searchTerms: "wa gwa hago and with together"
  },
  {
    id: "go-connection", form: "-고", meaning: "And · and then", level: 1, category: "CONNECTORS",
    connection: "Add -고 to a verb or adjective stem. It connects actions or descriptions; the subject usually stays the same.",
    examples: [
      { korean: "아침을 먹고 학교에 가요.", translation: "I eat breakfast and go to school." },
      { korean: "날씨가 맑고 따뜻해요.", translation: "The weather is clear and warm." },
      { korean: "운동하고 샤워했어요.", translation: "I exercised and took a shower." },
    ],
    note: "-고 simply links ideas. For a reason or a close sequence, -아서/어서 may fit better.",
    searchTerms: "go and then connect verbs sequence"
  },
  {
    id: "aseo-eoseo", form: "-아/어서", meaning: "Because · so · and then", level: 1, category: "CONNECTORS",
    connection: "Attach -아서 after ㅏ/ㅗ stems and -어서 after most others. 하다 becomes 해서.",
    examples: [
      { korean: "배가 아파서 집에 있었어요.", translation: "I stayed home because my stomach hurt." },
      { korean: "시간이 없어서 택시를 탔어요.", translation: "I took a taxi because I didn’t have time." },
      { korean: "집에 와서 손을 씻었어요.", translation: "I came home and washed my hands." },
    ],
    note: "It can give a reason or connect closely sequenced actions. It usually doesn’t pair with an imperative or proposal in the second clause.",
    searchTerms: "aseo eoseo because so reason sequence"
  },
  {
    id: "jiman", form: "-지만", meaning: "But · although", level: 1, category: "CONNECTORS",
    connection: "Add -지만 to a verb or adjective stem. It also attaches to nouns as 이지만 after a consonant and 지만 after a vowel.",
    examples: [
      { korean: "작지만 깨끗해요.", translation: "It’s small, but clean." },
      { korean: "조금 비싸지만 정말 맛있어요.", translation: "It’s a little expensive, but really delicious." },
      { korean: "바빴지만 친구에게 전화했어요.", translation: "I was busy, but I called my friend." },
    ],
    note: "The second clause gives a contrast or an unexpected result.",
    searchTerms: "jiman but although contrast"
  },
  {
    id: "seyo", form: "-(으)세요", meaning: "Please… · polite request", level: 1, category: "ENDINGS",
    connection: "Add -세요 after a vowel or ㄹ stem; add -으세요 after most consonants. It can also be a respectful statement.",
    examples: [
      { korean: "여기에 앉으세요.", translation: "Please sit here." },
      { korean: "잠시 기다리세요.", translation: "Please wait a moment." },
      { korean: "여기에 이름을 적으세요.", translation: "Please write your name here." },
    ],
    note: "A friendly, polite way to give a request or instruction. The subject is often understood rather than said.",
    searchTerms: "seyo euseyo please request command polite"
  },
  {
    id: "go-sipda", form: "-고 싶다", meaning: "Want to…", level: 1, category: "ENDINGS",
    connection: "Add -고 싶어요 to a verb stem. The speaker is usually the person who wants to do the action.",
    examples: [
      { korean: "한국 음식을 먹고 싶어요.", translation: "I want to eat Korean food." },
      { korean: "제주도에 가고 싶어요.", translation: "I want to go to Jeju Island." },
      { korean: "오늘은 일찍 자고 싶어요.", translation: "I want to go to bed early today." },
    ],
    note: "For someone else’s wants, Korean often uses -고 싶어 하다 in a statement.",
    searchTerms: "go sipda want wish desire"
  },
  {
    id: "eul-su-isseuda", form: "-(으)ㄹ 수 있다/없다", meaning: "Can · cannot", level: 1, category: "ENDINGS",
    connection: "Add -ㄹ 수 있다 after a vowel or ㄹ stem, and -을 수 있다 after most consonants. Replace 있다 with 없다 for “cannot.”",
    examples: [
      { korean: "한국어를 읽을 수 있어요.", translation: "I can read Korean." },
      { korean: "이 앱은 인터넷 없이 사용할 수 있어요.", translation: "You can use this app without internet." },
      { korean: "이 음식은 집에서도 만들 수 있어요.", translation: "You can make this food at home, too." },
    ],
    note: "This pattern describes ability or whether something is possible. It is not the same as permission.",
    searchTerms: "eul su itda eopda can cannot able ability possible"
  },
  {
    id: "myeon", form: "-(으)면", meaning: "If · when", level: 1, category: "CONNECTORS",
    connection: "Add -면 after a vowel or ㄹ stem, and -으면 after most consonants.",
    examples: [
      { korean: "시간이 있으면 같이 가요.", translation: "If you have time, let’s go together." },
      { korean: "비가 오면 우산을 가져가세요.", translation: "If it rains, take an umbrella." },
      { korean: "시간이 나면 연락해 주세요.", translation: "If you have time, please get in touch." },
    ],
    note: "It makes a condition or a general “when” statement.",
    searchTerms: "myeon eumyeon if when condition"
  },
  {
    id: "eul-geoyeyo", form: "-(으)ㄹ 거예요", meaning: "Will · going to · probably", level: 1, category: "ENDINGS",
    connection: "Add -ㄹ 거예요 after a vowel or ㄹ stem, and -을 거예요 after most consonants.",
    examples: [
      { korean: "내일 부산에 갈 거예요.", translation: "I’m going to Busan tomorrow." },
      { korean: "주말에는 집에서 쉴 거예요.", translation: "I’m going to rest at home this weekend." },
      { korean: "아마 오후에 비가 올 거예요.", translation: "It will probably rain in the afternoon." },
    ],
    note: "It commonly describes a plan or prediction. Context tells you which meaning is intended.",
    searchTerms: "eul geoyeyo future will going plan prediction"
  },
  {
    id: "aya-haeda", form: "-아/어야 하다", meaning: "Have to · must", level: 1, category: "ENDINGS",
    connection: "Connect the verb with -아야 or -어야, then add 하다. 하다 becomes 해야 하다.",
    examples: [
      { korean: "표를 미리 사야 해요.", translation: "I have to buy the ticket in advance." },
      { korean: "건강을 위해 매일 걸어야 해요.", translation: "I have to walk every day for my health." },
      { korean: "내일까지 이 서류를 보내야 해요.", translation: "I have to send this document by tomorrow." },
    ],
    note: "This is a common way to express necessity. In conversation, 하다 often becomes 해요.",
    searchTerms: "aya eoya hada must have to need necessity"
  },
  {
    id: "go-isseoyo", form: "-고 있다", meaning: "Be doing · currently in progress", level: 1, category: "ENDINGS",
    connection: "Add -고 있다 to a verb stem; conjugate 있다 for the tense and politeness you need.",
    examples: [
      { korean: "지금 버스를 기다리고 있어요.", translation: "I’m waiting for the bus now." },
      { korean: "아이들이 공원에서 놀고 있어요.", translation: "The children are playing in the park." },
      { korean: "저는 지금 저녁을 준비하고 있어요.", translation: "I’m preparing dinner now." },
    ],
    note: "This marks an action in progress. Some verbs about wearing or holding can describe a continuing state.",
    searchTerms: "go itda progressive currently doing ing"
  },
  {
    id: "eojuseyo", form: "-아/어 주세요", meaning: "Please do… for me", level: 1, category: "ENDINGS",
    connection: "Add -아 주세요 or -어 주세요 to a verb stem; 하다 becomes 해 주세요.",
    examples: [
      { korean: "천천히 말해 주세요.", translation: "Please speak slowly." },
      { korean: "메뉴를 보여 주세요.", translation: "Please show me the menu." },
      { korean: "여기에서 사진을 찍어 주세요.", translation: "Please take a photo here." },
    ],
    note: "A polite request. Adding 좀 can soften it further: 천천히 말해 주세요 → 천천히 좀 말해 주세요.",
    searchTerms: "juseyo please do for me request"
  },
  {
    id: "eul-kka-yo", form: "-(으)ㄹ까요?", meaning: "Shall we? · I wonder…", level: 1, category: "ENDINGS",
    connection: "Add -ㄹ까요 after a vowel or ㄹ stem, and -을까요 after most consonants.",
    examples: [
      { korean: "창가에 앉을까요?", translation: "Shall we sit by the window?" },
      { korean: "점심으로 비빔밥을 먹을까요?", translation: "Shall we have bibimbap for lunch?" },
      { korean: "주말에 같이 영화 볼까요?", translation: "Shall we watch a movie together this weekend?" },
    ],
    note: "With a question intonation, it often makes a gentle suggestion or asks for someone’s opinion.",
    searchTerms: "eulkkayo shall we suggestion wonder"
  },

  {
    id: "neunde", form: "-는데 / -(으)ㄴ데", meaning: "And · but · setting the scene", level: 2, category: "CONNECTORS",
    connection: "Use -는데 with action verbs, -(으)ㄴ데 with descriptive verbs, and -인데 with nouns. It leads into related or contrasting information.",
    examples: [
      { korean: "날씨가 좋은데 산책할까요?", translation: "The weather is nice—shall we take a walk?" },
      { korean: "저는 한국어를 공부하는데 발음이 어려워요.", translation: "I’m studying Korean, and pronunciation is difficult." },
      { korean: "이 옷은 예쁜데 조금 비싸요.", translation: "These clothes are pretty, but a little expensive." },
    ],
    note: "Often it gives background before a suggestion, question, or contrast. Its translation depends on context.",
    searchTerms: "neunde eunde background but and context"
  },
  {
    id: "neun-geot-gatda", form: "-(으)ㄴ/는 것 같다", meaning: "It seems · I think", level: 2, category: "ENDINGS",
    connection: "Use -는 것 같다 for present actions, -(으)ㄴ 것 같다 for present descriptions or past actions, and -(으)ㄹ 것 같다 for future guesses.",
    examples: [
      { korean: "밖에 비가 오는 것 같아요.", translation: "It seems to be raining outside." },
      { korean: "그분은 벌써 출발한 것 같아요.", translation: "It seems that person has already left." },
      { korean: "오늘은 길이 많이 막힐 것 같아요.", translation: "I think traffic will be heavy today." },
    ],
    note: "This softens a statement by presenting it as an impression or inference.",
    searchTerms: "neun geot gatda seems think guess impression"
  },
  {
    id: "gi-ttaemune", form: "-기 때문에", meaning: "Because · due to", level: 2, category: "CONNECTORS",
    connection: "Add -기 때문에 to a verb or adjective stem. With a noun, use noun + 때문에.",
    examples: [
      { korean: "길이 막히기 때문에 지하철을 타요.", translation: "I take the subway because the roads are congested." },
      { korean: "내일 시험이 있기 때문에 일찍 잘 거예요.", translation: "I’ll go to bed early because I have an exam tomorrow." },
      { korean: "아이가 아프기 때문에 집에서 쉬어요.", translation: "I’m resting at home because my child is sick." },
    ],
    note: "A clear, direct way to give a reason. It can sound more formal or explanatory than -아/어서.",
    searchTerms: "gi ttaemune because due to reason"
  },
  {
    id: "neun-dongan", form: "-는 동안", meaning: "While · during", level: 2, category: "CONNECTORS",
    connection: "Add -는 동안 to an action verb for “while doing.” Attach 동안 directly to a time period for “for.”",
    examples: [
      { korean: "한국에 있는 동안 많이 걸었어요.", translation: "I walked a lot while I was in Korea." },
      { korean: "제가 요리하는 동안 음악을 들었어요.", translation: "I listened to music while I was cooking." },
      { korean: "여행하는 동안 새 친구를 많이 만났어요.", translation: "I met a lot of new friends while traveling." },
    ],
    note: "The two actions or states overlap in time.",
    searchTerms: "neun dongan while during for time period"
  },
  {
    id: "eul-ttae", form: "-(으)ㄹ 때", meaning: "When · while", level: 2, category: "CONNECTORS",
    connection: "Use -ㄹ 때 after a vowel or ㄹ stem, and -을 때 after most consonants. Past: -았/었을 때.",
    examples: [
      { korean: "길을 모를 때는 지도를 봐요.", translation: "When I don’t know the way, I look at a map." },
      { korean: "한국에 처음 왔을 때 길을 자주 잃었어요.", translation: "When I first came to Korea, I often got lost." },
      { korean: "시간이 있을 때 책을 읽어요.", translation: "I read when I have time." },
    ],
    note: "Use this to say when something happens. For an event that interrupts another, -는 동안 can be more suitable.",
    searchTerms: "eul ttae when while time"
  },
  {
    id: "eulsurok", form: "-(으)ㄹ수록", meaning: "The more…, the more…", level: 2, category: "CONNECTORS",
    connection: "Add -ㄹ수록 after a vowel or ㄹ stem, and -을수록 after most consonants. Repeat the pattern when both sides change.",
    examples: [
      { korean: "한국어는 배울수록 재미있어요.", translation: "The more I learn Korean, the more fun it gets." },
      { korean: "자주 만날수록 더 친해져요.", translation: "The more often we meet, the closer we become." },
      { korean: "생각할수록 좋은 생각이에요.", translation: "The more I think about it, the better the idea seems." },
    ],
    note: "The result changes in proportion to the first action or condition.",
    searchTerms: "eulsurok the more the more proportion"
  },
  {
    id: "ppunman-anida", form: "-(으)ㄹ 뿐만 아니라", meaning: "Not only… but also", level: 2, category: "CONNECTORS",
    connection: "Attach -ㄹ 뿐만 아니라 after a vowel or ㄹ stem, and -을 뿐만 아니라 after most consonants. With nouns, use 일 뿐만 아니라.",
    examples: [
      { korean: "이 식당은 맛있을 뿐만 아니라 저렴해요.", translation: "This restaurant is not only delicious but also affordable." },
      { korean: "그 배우는 연기를 잘할 뿐만 아니라 노래도 잘해요.", translation: "That actor is not only good at acting, but also sings well." },
      { korean: "이 지역은 교통이 편리할 뿐만 아니라 조용해요.", translation: "This area is not only convenient for transit, but also quiet." },
    ],
    note: "Use it to add another fact that strengthens or expands the first one.",
    searchTerms: "ppunman anira not only but also addition"
  },
  {
    id: "banmyeon", form: "-(으)ㄴ/는 반면(에)", meaning: "Whereas · on the other hand", level: 2, category: "CONNECTORS",
    connection: "Use -는 반면(에) with action verbs, -(으)ㄴ 반면(에) with descriptive verbs, and 인 반면(에) with nouns.",
    examples: [
      { korean: "여름은 덥지만 겨울은 추운 반면에 눈을 볼 수 있어요.", translation: "Summer is hot, whereas winter is cold; on the other hand, you can see snow." },
      { korean: "형은 활동적인 반면에 동생은 조용한 편이에요.", translation: "My older brother is active, whereas my younger sibling is quiet." },
      { korean: "이 가방은 가벼운 반면에 튼튼해요.", translation: "This bag is light, whereas it’s sturdy." },
    ],
    note: "It compares two sides, often highlighting a clear difference.",
    searchTerms: "banmyeon whereas on the other hand contrast"
  },
  {
    id: "neun-dedaga", form: "-(으)ㄴ/는 데다가", meaning: "On top of that · furthermore", level: 2, category: "CONNECTORS",
    connection: "Use -는 데다가 with action verbs and -(으)ㄴ 데다가 with descriptive verbs. It adds a second supporting fact.",
    examples: [
      { korean: "숙소가 깨끗한 데다가 역에서도 가까워요.", translation: "On top of being clean, the place is close to the station." },
      { korean: "이 식당은 음식이 맛있는 데다가 직원도 친절해요.", translation: "This restaurant has delicious food, and on top of that, the staff are kind." },
      { korean: "오늘은 추운 데다가 바람까지 불어요.", translation: "It’s cold today, and on top of that, it’s windy." },
    ],
    note: "The added detail usually points in the same direction as the first one—another plus or another difficulty.",
    searchTerms: "neun dedaga furthermore on top of that add"
  },
  {
    id: "ryeomyeon", form: "-(으)려면", meaning: "If you want to · in order to", level: 2, category: "CONNECTORS",
    connection: "Add -려면 after a vowel or ㄹ stem, and -으려면 after most consonants. It combines intention with a condition.",
    examples: [
      { korean: "사진을 잘 찍으려면 빛이 중요해요.", translation: "If you want to take good photos, light is important." },
      { korean: "한국어를 잘하려면 매일 연습해야 해요.", translation: "If you want to get good at Korean, you have to practice every day." },
      { korean: "지하철을 타려면 교통카드가 필요해요.", translation: "If you want to take the subway, you need a transit card." },
    ],
    note: "The next clause often explains what is needed to achieve the intended action.",
    searchTerms: "ryeomyeon eumyeon if want to in order to intention"
  },
  {
    id: "eul-tende", form: "-(으)ㄹ 텐데", meaning: "Probably… · I would…, but…", level: 2, category: "ENDINGS",
    connection: "Add -ㄹ 텐데 after a vowel or ㄹ stem, and -을 텐데 after most consonants. The ending often gives a guess or expectation as background.",
    examples: [
      { korean: "지금쯤 도착했을 텐데 연락이 없네요.", translation: "They’ve probably arrived by now, but I haven’t heard from them." },
      { korean: "제가 도와드릴 텐데 괜찮으세요?", translation: "I’d be happy to help; would that be okay?" },
      { korean: "주말에는 사람이 많을 텐데 평일에 가는 게 어때요?", translation: "It’ll probably be crowded on the weekend; how about going on a weekday?" },
    ],
    note: "The second part may show a contrast, concern, or what the speaker would do in that situation.",
    searchTerms: "eul tende probably expected but background"
  },
  {
    id: "da-boni", form: "-다 보니(까)", meaning: "As I kept doing… · it turned out…", level: 2, category: "CONNECTORS",
    connection: "Add -다 보니(까) to an action verb. It describes a result or discovery that came from continuing the action.",
    examples: [
      { korean: "매일 연습하다 보니 발음이 좋아졌어요.", translation: "As I kept practicing every day, my pronunciation improved." },
      { korean: "책을 읽다 보니 시간이 금방 갔어요.", translation: "As I read, time passed quickly." },
      { korean: "매일 걸어 다니다 보니 동네를 잘 알게 됐어요.", translation: "As I kept walking every day, I got to know the neighborhood well." },
    ],
    note: "The outcome is often gradual or something the speaker noticed along the way.",
    searchTerms: "da boni as kept doing result discovery"
  },
  {
    id: "gineun-hajiman", form: "-기는 하지만", meaning: "It is true that…, but…", level: 2, category: "CONNECTORS",
    connection: "Repeat the verb or adjective as -기는, then add 하지만. For 하다 verbs, use 하기는 하지만.",
    examples: [
      { korean: "비싸기는 하지만 품질이 좋아요.", translation: "It is expensive, but the quality is good." },
      { korean: "사용하기는 하지만 자주 쓰지는 않아요.", translation: "I do use it, but not very often." },
      { korean: "맛있기는 하지만 양이 조금 적어요.", translation: "It is tasty, but the portion is a little small." },
    ],
    note: "It acknowledges one side before introducing a contrast or qualification.",
    searchTerms: "gineun hajiman although admittedly it is true but"
  },
  {
    id: "eul-bbeonhaeda", form: "-(으)ㄹ 뻔하다", meaning: "Almost did · came close to", level: 2, category: "ENDINGS",
    connection: "Add -ㄹ 뻔하다 after a vowel or ㄹ stem, and -을 뻔하다 after most consonants. It usually describes something that nearly happened but did not.",
    examples: [
      { korean: "길을 잘못 들어서 늦을 뻔했어요.", translation: "I took a wrong turn and almost arrived late." },
      { korean: "계단에서 넘어질 뻔했어요.", translation: "I almost fell on the stairs." },
      { korean: "지갑을 집에 두고 올 뻔했어요.", translation: "I almost left my wallet at home." },
    ],
    note: "It often describes a close call, so the near-event usually did not actually happen.",
    searchTerms: "eul bbeonhaeda almost nearly close call"
  },
  {
    id: "neun-cheokhada", form: "-(으)ㄴ/는 척하다", meaning: "Pretend to · act as if", level: 2, category: "ENDINGS",
    connection: "Use -는 척하다 with present action verbs, -(으)ㄴ 척하다 for completed actions or descriptions, and 인 척하다 with nouns.",
    examples: [
      { korean: "모르는 척했어요.", translation: "I pretended not to know." },
      { korean: "그는 바쁜 척했지만 사실은 시간이 있었어요.", translation: "He pretended to be busy, but actually had time." },
      { korean: "못 들은 척하지 마세요.", translation: "Please don’t pretend you didn’t hear." },
    ],
    note: "The person’s outward behavior doesn’t match what is actually true.",
    searchTerms: "neun cheokhada pretend act as if"
  },
  {
    id: "gi-wihaeseo", form: "-기 위해(서)", meaning: "In order to · for the purpose of", level: 2, category: "CONNECTORS",
    connection: "Add -기 위해(서) to a verb stem. With a noun, use 을/를 위해(서).",
    examples: [
      { korean: "한국어를 배우기 위해 한국에 왔어요.", translation: "I came to Korea in order to learn Korean." },
      { korean: "시험에 합격하기 위해 매일 공부했어요.", translation: "I studied every day in order to pass the exam." },
      { korean: "건강을 위해 일찍 자요.", translation: "I go to bed early for my health." },
    ],
    note: "The first action is done for the purpose of the second. The subject is often shared across both clauses.",
    searchTerms: "gi wihaeseo in order to purpose for"
  },
  {
    id: "neun-pyeonida", form: "-(으)ㄴ/는 편이다", meaning: "Tend to · be rather", level: 2, category: "ENDINGS",
    connection: "Use -는 편이다 with action verbs and -(으)ㄴ 편이다 with descriptive verbs. It describes a general tendency, not an absolute.",
    examples: [
      { korean: "저는 아침에 일찍 일어나는 편이에요.", translation: "I tend to get up early in the morning." },
      { korean: "이 동네는 밤에 조용한 편이에요.", translation: "This neighborhood tends to be quiet at night." },
      { korean: "저는 매운 음식을 잘 먹는 편이에요.", translation: "I tend to handle spicy food well." },
    ],
    note: "A useful way to make a description less absolute: “rather,” “fairly,” or “tend to.”",
    searchTerms: "neun pyeonida tend to rather generally"
  },
  {
    id: "jamaja", form: "-자마자", meaning: "As soon as · right after", level: 2, category: "CONNECTORS",
    connection: "Add -자마자 to an action verb stem. The action in the next clause follows immediately.",
    examples: [
      { korean: "숙소에 도착하자마자 쉬었어요.", translation: "I rested as soon as I arrived at the accommodation." },
      { korean: "수업이 끝나자마자 도서관에 갔어요.", translation: "I went to the library as soon as class ended." },
      { korean: "문을 열자마자 강아지가 뛰어나왔어요.", translation: "As soon as I opened the door, the puppy ran out." },
    ],
    note: "The two events happen one right after the other; the first verb doesn’t need a separate tense marker.",
    searchTerms: "jamaja as soon as right after immediately"
  },
  {
    id: "dorok", form: "-도록", meaning: "So that · to the point that", level: 2, category: "CONNECTORS",
    connection: "Add -도록 to a verb stem to show a goal, degree, or extent. The meaning is shaped by the surrounding sentence.",
    examples: [
      { korean: "잘 들리도록 천천히 말씀해 주세요.", translation: "Please speak slowly so I can hear well." },
      { korean: "잊지 않도록 메모해 두세요.", translation: "Please make a note so you don’t forget." },
      { korean: "아이가 잘 볼 수 있도록 앞자리에 앉혔어요.", translation: "I seated the child at the front so they could see well." },
    ],
    note: "It can express a purpose (“so that”) or the degree an action reaches (“to the point that”).",
    searchTerms: "dorok so that in order to extent degree"
  },
  {
    id: "eul-jeongdoro", form: "-(으)ㄹ 정도로", meaning: "To the extent that · so…that", level: 2, category: "CONNECTORS",
    connection: "Add -ㄹ 정도로 after a vowel or ㄹ stem, and -을 정도로 after most consonants. It describes the degree of something.",
    examples: [
      { korean: "다리가 아플 정도로 많이 걸었어요.", translation: "I walked so much that my legs hurt." },
      { korean: "목이 아플 정도로 크게 소리쳤어요.", translation: "I shouted so loudly that my throat hurt." },
      { korean: "눈물이 날 정도로 웃었어요.", translation: "I laughed so hard that I teared up." },
    ],
    note: "It emphasizes how strongly or how much something happens.",
    searchTerms: "eul jeongdoro to the extent so that degree"
  },
  {
    id: "neun-baram-e", form: "-는 바람에", meaning: "Because of · as a result of (usually unwanted)", level: 2, category: "CONNECTORS",
    connection: "Add -는 바람에 to an action verb. It introduces an unexpected cause, usually followed by an inconvenient result.",
    examples: [
      { korean: "버스를 놓치는 바람에 약속에 늦었어요.", translation: "I missed the bus, so I was late for the appointment." },
      { korean: "눈이 많이 오는 바람에 비행기가 취소됐어요.", translation: "The flight was canceled because of heavy snow." },
      { korean: "휴대폰을 집에 두고 오는 바람에 사진을 못 찍었어요.", translation: "I couldn’t take photos because I accidentally left my phone at home." },
    ],
    note: "It commonly signals that the cause led to a negative or unwanted outcome.",
    searchTerms: "neun barame because of unexpected result negative"
  }
];
