import type { ApplicationSummary } from '@/types/application';

// TODO: Replace these summaries with the user's application status API response.
export const applicationSummaries: ApplicationSummary[] = [
  {
    id: 'team-member-submitted',
    routeSlug: 'team-member',
    type: 'Team Member',
    recruitmentPeriod: '08/10 (월) 00:00 ~ 08/18 (화) 23:59',
    recruitmentStatus: 'open',
    dDayText: 'D-1',
    progressStatus: 'submitted',
    statusLabel: '최종 상태 : 제출 완료',
    updatedAtLabel: '최종 제출일 : 2026/08/19 (화) 21:32',
  },
  {
    id: 'member-draft',
    routeSlug: 'member',
    type: 'Member',
    recruitmentPeriod: '08/10 (월) 00:00 ~ 08/24 (월) 23:59',
    recruitmentStatus: 'open',
    dDayText: 'D-4',
    progressStatus: 'draft',
    statusLabel: '최종 상태 : 임시저장',
    updatedAtLabel: '최종 저장일 : 2026/08/19 (화) 21:32',
  },
];
