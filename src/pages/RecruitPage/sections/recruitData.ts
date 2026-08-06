export const joinCards = [
  {
    title: '모집 대상',
    items: [
      '숙명여자대학교 재학, 휴학, 수료생',
      '전공, 학번 무관',
      '활동 기간\n(2026년 9월 ~ 2027년 6월) 동안\n수요일 오후 7시 정기 세션에\n참여할 수 있는 분',
    ],
  },
  {
    title: '활동 내용',
    items: [
      '매주 수요일 오후 7시 정기 세미나',
      '프로젝트 진행을 위한 기술 스터디\nex) AI/ML, Flutter, Spring, React',
      '개발자를 위한, 오픈 세미나 개최',
      'GDGoC 소속 타대학 학생들과 교류\n(해커톤, 공동 세션 등)',
    ],
  },
  {
    title: '혜택',
    items: [
      'GDG on Campus Korea 혜택',
      '여러 국가의 GDG on Campus 및\nGDG on Campus Korea와의\n커뮤니케이션',
      'GDG 개발자와의 컨택 기회',
      'Google에서 지원하는 기념품',
    ],
  },
];

export const roles = [
  {
    title: 'Team Member (운영진)',
    descriptions: [
      '오거나이저와 함께 GDGoC Sookmyung의 행사를 기획하고, 주도합니다.',
      '1분기에 진행될 기술 스터디를 이끕니다.',
      '본인이 가진 지식을 바탕으로 Member가 스터디를 원활하게 진행할 수 있도록 돕습니다.',
    ],
  },
  {
    title: 'Member (부원)',
    descriptions: [
      '스터디와 해커톤에 참여하며,\n언제든 Team Member의 도움을 받을 수 있습니다.',
      '모르는 것은 질문하고, 유용한 정보는 공유하며\n활발한 커뮤니티 분위기를 형성합니다.',
      '(선택) 다음 기수의 Team Member가 되어\nMember들에게 지식을 전달하고 도움을 줍니다.',
    ],
  },
];

export const schedules = [
  {
    activeTab: 'Team Member',
    stages: [
      { title: '서류 접수', date: '2026. 08. 10 (월)\n~ 2026. 08. 18 (화)' },
      { title: '서류 발표', date: '2026. 08. 19 (수)' },
      { title: '온라인 면접', date: '2026. 08. 21 (금)\n~ 2026. 08. 23 (일)' },
      { title: '최종 결과 발표', date: '2026. 08. 26 (수)' },
    ],
    noticeTitle: 'Team Member 지원 전 필독 사항',
    noticeItems: [
      '서류 합격자에 대하여 8월 19일에 면접 안내 메일을 보내드릴 예정입니다.',
      '가입하신 이메일 주소로 면접 일정, 합격 여부 등을 알려드릴 예정입니다.',
      '일정은 변동 가능성이 있으며, 일정이 변경될 시 사이트를 통해 안내해 드리겠습니다.',
    ],
  },
  {
    activeTab: 'Member',
    stages: [
      { title: '서류 접수', date: '2026. 08. 10 (월)\n~ 2026. 08. 24 (월)' },
      { title: '서류 발표', date: '2026. 08. 26 (수)' },
      { title: '온라인 면접', date: '2026. 08. 28 (금)\n~ 2026. 09. 02 (수)' },
      { title: '최종 결과 발표', date: '2026. 09. 06 (일)' },
    ],
    noticeTitle: 'Member 지원 전 필독 사항',
    noticeItems: [
      '서류 합격자에 대하여 8월 26일에 면접 안내 메일을 보내드릴 예정입니다.',
      '가입하신 이메일 주소로 면접 일정, 합격 여부 등을 알려드릴 예정입니다.',
      '일정은 변동 가능성이 있으며, 일정이 변경될 시 사이트를 통해 안내해 드리겠습니다.',
    ],
  },
] as const;

export type RecruitSchedule = (typeof schedules)[number];
