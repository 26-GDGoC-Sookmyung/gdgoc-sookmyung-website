import { apiRequest } from '@/api/apiClient';
import type {
  ApplicationApiStatus,
  ApplicationRouteSlug,
  ApplicationSummary,
  ApplicationType,
  RecruitmentStatus,
} from '@/types/application';

type ApplicationStatusResponse = {
  id: number;
  applicationType: 'MEMBER' | 'TEAM_MEMBER';
  applicationStatus: ApplicationApiStatus;
  recruitmentStartAt: string;
  recruitmentEndAt: string;
  lastModifiedAt: string;
  dDay: string;
};

export async function getApplicationSummaries(signal?: AbortSignal) {
  const applicationsData = await apiRequest<ApplicationStatusResponse[]>(
    '/api/applications',
    { signal },
  );

  if (!applicationsData) {
    return [];
  }

  return applicationsData.map(mapApplicationSummary);
}

function mapApplicationSummary(application: ApplicationStatusResponse): ApplicationSummary {
  const routeSlug = getRouteSlug(application.applicationType);
  const applicationStatus = application.applicationStatus;
  const progressStatus =
    applicationStatus === 'SUBMITTED' ? 'submitted' : 'draft';
  const recruitmentStatus = getRecruitmentStatus(application.dDay);
  const type = getApplicationType(routeSlug);

  return {
    dDayText: application.dDay,
    id: String(application.id),
    progressStatus,
    recruitmentPeriod: formatRecruitmentPeriod(
      application.recruitmentStartAt,
      application.recruitmentEndAt,
    ),
    recruitmentStatus,
    routeSlug,
    statusLabel: `최종 상태 : ${
      applicationStatus === 'SUBMITTED' ? '제출 완료' : '임시저장'
    }`,
    type,
    updatedAtLabel: formatUpdatedAtLabel(
      applicationStatus,
      application.lastModifiedAt,
    ),
  };
}

function getRouteSlug(applicationType: ApplicationStatusResponse['applicationType']) {
  return applicationType === 'TEAM_MEMBER' ? 'team-member' : 'member';
}

function getApplicationType(routeSlug: ApplicationRouteSlug): ApplicationType {
  return routeSlug === 'team-member' ? 'Team Member' : 'Member';
}

function getRecruitmentStatus(dDay: string): RecruitmentStatus {
  return dDay === '마감' ? 'closed' : 'open';
}

function formatUpdatedAtLabel(
  applicationStatus: ApplicationApiStatus,
  updatedAt: string,
) {
  const label = applicationStatus === 'SUBMITTED' ? '최종 제출일' : '최종 저장일';

  return `${label} : ${updatedAt}`;
}

function formatRecruitmentPeriod(startAt: string, endAt: string) {
  return `${startAt} ~ ${endAt}`;
}
