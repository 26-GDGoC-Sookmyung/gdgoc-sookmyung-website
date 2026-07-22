export const activityQuarters = [
  {
    quarter: '1분기',
    period: '2026. 09 ~ 2026. 12',
    activities: ['팀멤버 스피커 세션', '기술 스터디', '1분기 종료 & 회고'],
  },
  {
    quarter: '2분기',
    period: '2026. 01 ~ 2026. 02',
    activities: ['Mini-Project', '타 학교 GDGoC\n연합 네트워킹 활동'],
  },
  {
    quarter: '3분기',
    period: '2026. 03 ~ 2026. 06',
    activities: ['멤버 주도 스터디', '멤버 스피커 세션', '수료 및 졸업식'],
  },
];

export const memberTeams = [
  {
    id: 'devrel',
    name: 'DEVREL',
    descriptions: [
      '커뮤니티를 운영하고,\n성장할 수 있는 환경을 구축합니다.',
      '오거나이저와 함께\n세미나, 이벤트, 네트워킹을\n기획, 운영하는 역할을 합니다.',
    ],
  },
  {
    id: 'app-web',
    name: 'APP/WEB',
    descriptions: [
      '웹과 모바일 환경에서\n동작하는 서비스를 개발합니다.',
      'React, Flutter, Android 등\n기술 스터디를 기획하고 운영하며,\n멤버들의 성장을 돕는 역할을 합니다.',
    ],
  },
  {
    id: 'be',
    name: 'BE',
    descriptions: [
      '서비스의 핵심 로직과 서버를 개발합니다.',
      'Spring 등 백엔드 기술 스터디를 기획하고 운영하며,\n안정적이고 확장 가능한 시스템을 구축하고\n멤버들의 성장을 돕는 역할을 합니다.',
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI/ML',
    descriptions: [
      '인공지능 기술을 활용해 문제를 해결합니다.',
      'AI·ML 기술 스터디를 기획하고 운영하며, 데이터 분석과 모델 개발을 통해 실제 서비스에 AI를 적용하고 멤버들의 성장을 돕는 역할을 합니다.',
    ],
  },
];

export type MemberTeam = (typeof memberTeams)[number];
