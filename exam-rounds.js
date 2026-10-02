export const examRounds = {
  "topik1-quick-replies": [
    {
      level: 1,
      skill: "SHORT DIALOGUE · REPLY",
      prompt: "Choose the most natural reply.",
      passage: "직원: 커피를 따뜻하게 드릴까요?\n손님: ______",
      translation: "Clerk: Would you like your coffee warm?",
      choices: [
        { id: "a", text: "아니요, 차가운 것으로 주세요.", translation: "No, please make it cold." },
        { id: "b", text: "네, 따뜻하게 해 주세요.", translation: "Yes, please make it warm." },
        { id: "c", text: "조금 있다가 주문할게요.", translation: "I’ll order in a little while." },
        { id: "d", text: "네, 설탕을 빼 주세요.", translation: "Yes, please leave out the sugar." }
      ],
      correctChoiceId: "b",
      explanation: "The clerk asks about the coffee temperature, so the customer answers about how they want it.",
      focusWordId: "keopi"
    },
    {
      level: 1,
      skill: "EVERYDAY DETAIL",
      prompt: "Where are they having this conversation?",
      passage: "편의점 직원: 봉투가 필요하세요?\n손님: 아니요, 괜찮아요.",
      translation: "Convenience-store clerk: Do you need a bag? Customer: No, I’m okay.",
      choices: [
        { id: "a", text: "미술관", translation: "An art museum" },
        { id: "b", text: "편의점", translation: "A convenience store" },
        { id: "c", text: "학교", translation: "A school" },
        { id: "d", text: "지하철역", translation: "A subway station" }
      ],
      correctChoiceId: "b",
      explanation: "The clerk is asking whether the customer needs a shopping bag at a convenience store.",
      focusWordId: "pyeonuijeom"
    },
    {
      level: 1,
      skill: "EVERYDAY DETAIL",
      prompt: "Where is the passenger going?",
      passage: "택시 기사: 어디까지 가세요?\n손님: 서울역까지 가 주세요.",
      translation: "Taxi driver: Where are you going? Passenger: Please take me to Seoul Station.",
      choices: [
        { id: "a", text: "서울역까지 가요.", translation: "They are going to Seoul Station." },
        { id: "b", text: "공항까지 가요.", translation: "They are going to the airport." },
        { id: "c", text: "학교까지 가요.", translation: "They are going to school." },
        { id: "d", text: "편의점까지 가요.", translation: "They are going to the convenience store." }
      ],
      correctChoiceId: "a",
      explanation: "The passenger says they are going to Seoul Station.",
      focusWordId: "taeksi"
    },
    {
      level: 1,
      skill: "SIMPLE READING · REASON",
      prompt: "Why is the coworker busy this week?",
      passage: "동료: 이번 주에 왜 바빠요?\n나: 금요일에 시험이 있어서 매일 공부해요.",
      translation: "Coworker: Why are you busy this week? Me: I have an exam on Friday, so I study every day.",
      choices: [
        { id: "a", text: "금요일에 시험이 있어요.", translation: "There is an exam on Friday." },
        { id: "b", text: "동료와 점심 약속이 있어요.", translation: "I have lunch plans with a coworker." },
        { id: "c", text: "다음 주에 이사할 거예요.", translation: "I’m moving next week." },
        { id: "d", text: "가족이 서울에 와요.", translation: "My family is coming to Seoul." }
      ],
      correctChoiceId: "a",
      explanation: "The speaker says they are studying every day because an exam is coming up on Friday.",
      focusWordId: "siheom"
    },
    {
      level: 1,
      skill: "SIMPLE READING · PLAN",
      prompt: "What does the speaker plan to do this weekend?",
      passage: "가족: 이번 주말에 뭐 하고 싶어요?\n나: 가족과 점심을 먹고 한강을 걸으려고 해요.",
      translation: "Family member: What would you like to do this weekend? Me: I’m planning to have lunch with my family and walk along the Han River.",
      choices: [
        { id: "a", text: "혼자 카페에서 공부해요.", translation: "Study alone at a café." },
        { id: "b", text: "가족과 점심을 먹어요.", translation: "Have lunch with family." },
        { id: "c", text: "친구와 전시회를 봐요.", translation: "See an exhibition with a friend." },
        { id: "d", text: "동료와 카페에서 만나요.", translation: "Meet a coworker at a café." }
      ],
      correctChoiceId: "b",
      explanation: "The speaker plans a family lunch and a walk by the river.",
      focusWordId: "gajok"
    }
  ],
  "topik2-seoul-reading": [
    {
      level: 2,
      skill: "READING · CHART DETAIL",
      prompt: "Which statement matches the survey?",
      translation: "Survey: Most-used routes for commuting in Seoul.",
      chartTitle: "서울 출근 노선 조사",
      chartRows: [
        { label: "2호선", value: 44 },
        { label: "9호선", value: 28 },
        { label: "버스", value: 18 },
        { label: "택시", value: 10 }
      ],
      choices: [
        { id: "a", text: "택시를 이용하는 사람이 가장 많다.", translation: "The largest group travels by taxi." },
        { id: "b", text: "9호선 이용자가 버스 이용자보다 많다.", translation: "More people use Line 9 than the bus." },
        { id: "c", text: "2호선보다 버스를 이용하는 사람이 많다.", translation: "More people use the bus than Line 2." },
        { id: "d", text: "모든 응답자가 지하철을 이용한다.", translation: "Every respondent uses the subway." }
      ],
      correctChoiceId: "b",
      explanation: "The chart shows 28% for Line 9 and 18% for the bus, so the Line 9 share is higher.",
      focusWordId: "noseon"
    },
    {
      level: 2,
      skill: "READING · BEST HEADLINE",
      prompt: "Choose the best headline for this passage.",
      passage: "요즘 아침 일찍 문을 여는 카페가 늘고 있다. 출근 전에 조용히 공부하거나 책을 읽는 사람들이 많아졌기 때문이다. 카페들은 아침 메뉴를 더하고 좌석마다 콘센트를 설치하고 있다.",
      translation: "More cafés are opening early in the morning. Many people now study or read quietly before work, so cafés are adding breakfast items and installing power outlets by the seats.",
      choices: [
        { id: "a", text: "출근 전 공부 공간으로 주목받는 카페", translation: "Cafés gaining attention as places to study before work" },
        { id: "b", text: "아침 손님이 줄어든 동네 카페", translation: "Neighborhood cafés with fewer morning customers" },
        { id: "c", text: "직장인들이 공부를 그만둔 까닭", translation: "Why workers have stopped studying" },
        { id: "d", text: "저녁 메뉴를 늘리는 카페의 변화", translation: "Cafés changing by expanding their dinner menus" }
      ],
      correctChoiceId: "a",
      explanation: "The passage explains why early-opening cafés are becoming useful study spaces before work.",
      focusWordId: "gongbuhada"
    },
    {
      level: 2,
      skill: "READING · SENTENCE ORDER",
      prompt: "Put the sentences in the order that makes the story flow.",
      passage: "(가) 그래서 프런트에 조용한 방으로 바꿔 달라고 요청했다.\n(나) 직원은 안쪽에 있는 다른 방을 안내해 주었다.\n(다) 서울에 도착한 날, 숙소에 체크인했다.\n(라) 밤이 되자 큰길에서 자동차 소리가 계속 들렸다.",
      translation: "(A) So I asked the front desk to move me to a quieter room. (B) The staff showed me another room farther inside. (C) On the day I arrived in Seoul, I checked into my accommodation. (D) At night, I could keep hearing cars on the main road.",
      choices: [
        { id: "a", text: "다 → 라 → 가 → 나", translation: "C → D → A → B" },
        { id: "b", text: "가 → 나 → 다 → 라", translation: "A → B → C → D" },
        { id: "c", text: "라 → 다 → 나 → 가", translation: "D → C → B → A" },
        { id: "d", text: "나 → 가 → 라 → 다", translation: "B → A → D → C" }
      ],
      correctChoiceId: "a",
      explanation: "First the traveler checks in, then notices the noise, makes a request, and receives another room.",
      focusWordId: "yocheonghada"
    },
    {
      level: 2,
      skill: "READING · NOTICE DETAIL",
      prompt: "Which statement is correct according to the notice?",
      passage: "2호선 야간 운행 안내\n이번 주 금요일에는 시설 점검으로 막차가 평소보다 20분 일찍 출발합니다. 시청역에서 을지로입구역까지 이동하실 분은 11시 전에 탑승해 주십시오.",
      translation: "Line 2 night service notice: This Friday, the last train will leave 20 minutes earlier than usual for maintenance. Passengers traveling between City Hall and Euljiro 1-ga should board before 11 p.m.",
      choices: [
        { id: "a", text: "이번 주 금요일에는 2호선이 하루 종일 운행하지 않는다.", translation: "Line 2 will not run all day this Friday." },
        { id: "b", text: "막차가 평소보다 20분 늦게 출발한다.", translation: "The last train leaves 20 minutes later than usual." },
        { id: "c", text: "시청역과 을지로입구역 사이를 가려면 11시 전에 타야 한다.", translation: "To travel between City Hall and Euljiro 1-ga, board before 11." },
        { id: "d", text: "시설 점검은 다음 주 금요일에 시작된다.", translation: "Maintenance starts next Friday." }
      ],
      correctChoiceId: "c",
      explanation: "The notice asks passengers traveling on that section to board before 11 because the last train leaves earlier.",
      focusWordId: "makcha"
    },
    {
      level: 2,
      skill: "READING · MAIN IDEA",
      prompt: "What is the main point of this passage?",
      passage: "도심 미술관의 새 전시회는 작품 설명을 짧은 글뿐 아니라 음성 안내와 큰 글씨로도 제공한다. 관람객이 원하는 방식으로 내용을 확인할 수 있어 전시를 천천히 즐기는 사람이 늘었다. 미술관은 관람 후 의견을 모아 다음 전시에도 반영할 계획이다.",
      translation: "A new exhibition at a city art museum offers artwork notes as short text, audio guidance, and large print. More visitors are taking their time because they can choose how to access the information. The museum plans to use visitor feedback in future exhibitions.",
      choices: [
        { id: "a", text: "새로운 안내 방식이 관람을 더 편하게 하고 있다.", translation: "New ways of presenting information are making visits more comfortable." },
        { id: "b", text: "미술관이 앞으로 전시회를 열지 않으려고 한다.", translation: "The museum plans to stop holding exhibitions." },
        { id: "c", text: "관람객들이 작품 설명을 읽지 않게 되었다.", translation: "Visitors have stopped reading artwork notes." },
        { id: "d", text: "음성 안내를 이용하려면 입장료를 더 내야 한다.", translation: "Visitors must pay extra to use audio guidance." }
      ],
      correctChoiceId: "a",
      explanation: "The passage focuses on offering information in several formats so visitors can enjoy the exhibition in a way that suits them.",
      focusWordId: "jeonsihoe"
    }
  ]
};
