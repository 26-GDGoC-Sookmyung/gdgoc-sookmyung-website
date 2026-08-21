import memberImage from '@/assets/images/application/Member.png';
import teamMemberImage from '@/assets/images/application/Team Member.png';
import type { ApplicationTypeOption } from '@/types/application';

export const applicationTypeOptions: ApplicationTypeOption[] = [
  {
    id: 'team-member',
    type: 'Team Member',
    titleLines: ['Team Member', '지원하기'],
    recruitmentPeriod: '08/10 (월) 00:00 ~ 08/18 (화) 23:59',
    imageSrc: teamMemberImage,
    startsAt: '2026-08-10T00:00:00+09:00',
    endsAt: '2026-08-21T23:59:59+09:00',
    hasDraft: false,
  },
  {
    id: 'member',
    type: 'Member',
    titleLines: ['Member', '지원하기'],
    recruitmentPeriod: '08/10 (월) 00:00 ~ 08/24 (월) 23:59',
    imageSrc: memberImage,
    startsAt: '2026-08-10T00:00:00+09:00',
    endsAt: '2026-08-24T23:59:59+09:00',
    hasDraft: true,
  },
];

export const applicationNoticeItems = [
  '서류 합격자에 대하여 서류 합격 결과 발표 당일, 면접 안내 메일을 보내드릴 예정입니다.',
  '가입하신 이메일 주소로 면접 일정, 합격 여부 등을 알려드릴 예정입니다.',
  '지원서는 공고 마감 및 서류 검토 전까지 홈페이지에서 수정 및 삭제가 가능합니다. (그 외에는 1:1 오픈채팅 문의를 부탁드립니다.)',
  '일정은 변동 가능성이 있으며, 일정이 변경될 시 사이트를 통해 안내해 드리겠습니다.',
];
