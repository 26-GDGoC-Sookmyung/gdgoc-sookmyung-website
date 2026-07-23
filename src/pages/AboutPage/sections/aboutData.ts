import {
  goalConnectionsBurst,
  goalGrowBurst,
  goalLearnBurst,
  goalShareBurst,
} from '@/assets/icons/about';

export const communityStats = [
  { label: '누적 활동 인원', value: '100명+' },
  { label: '운영 기간', value: '6년' },
  { label: '함께 하고 있는 학교 수', value: '37개' },
];

export const goalCards = [
  {
    id: 'grow',
    title: 'Grow Together',
    description: ["‘함께 성장하는 것'의", '중요성을 알고', '실천하는 커뮤니티'],
    icon: goalGrowBurst,
    artworkPosition: 'left',
  },
  {
    id: 'learn',
    title: 'Learn by Building',
    description: [
      '스터디와 프로젝트를 통해',
      '개발 경험과',
      '프로그래밍 실력을',
      '기를 수 있는 커뮤니티',
    ],
    icon: goalLearnBurst,
    artworkPosition: 'left',
  },
  {
    id: 'connections',
    title: 'Meaningful Connections',
    description: [
      '다양한 사람들과',
      '커뮤니케이션하며',
      '서로에게 도움이 될 수 있는',
      '커뮤니티',
    ],
    icon: goalConnectionsBurst,
    artworkPosition: 'right',
  },
  {
    id: 'share',
    title: 'Share and Grow',
    description: ['지식을 공유하며', '성장할 수 있는 커뮤니티'],
    icon: goalShareBurst,
    artworkPosition: 'right',
  },
] as const;

export const conductRules = [
  {
    title: '사람을 존중해주세요.',
    details: [
      '모든 일 뒤에는 사람이 있습니다.',
      '어떤 일에서도 사람을 우선적으로 생각해주세요.',
      '모두가 커뮤니티에 참여할 수 있어야합니다.',
      '다른 사람의 가치관, 문화, 일을 존중해주세요.',
    ],
  },
  {
    title: '사람에게 친절하게 대해주세요.',
    details: [
      '사람을 정중하게 대해주세요.',
      '새로운 사람에게 친절하게 대해주세요.',
      '어떤 질문에도 친절하게 대해주세요.',
    ],
  },
  {
    title: '다른 사람의 이야기를 잘 들어주세요.',
    details: [
      '모든 사람들의 의견을 잘 들어주세요.',
      '모든 사람에게는 발언권이 있고, 모두가 말할 권리가 있습니다.',
    ],
  },
  {
    title: '적극적으로 참여해주세요.',
    details: [
      '적극적인 참여는 서로의 거리를 줄이고 보다 큰 가치를 만들어 냅니다. 적극적으로 참여하며 조화롭게 어울려주세요.',
    ],
  },
];
