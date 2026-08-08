import { apiRequest } from '@/api/apiClient';
import type {
  ApplicationApiStatus,
  ApplicationRouteSlug,
} from '@/types/application';

type ApplicationDetailResponse = {
  applicationId: number;
  applicationStatus: ApplicationApiStatus;
  studentNumber?: string;
  phoneNumber?: string;
  major?: string;
  completedSemester?: number;
  onLeave?: boolean;
  introduction?: string;
  motivation?: string;
  communityPerspective?: string;
  goal?: string;
  portfolioUrl?: string;
  experience?: string;
  project?: string;
  leadershipExperience?: string;
  techStack?: string;
  studyField?: string;
  studyInterest?: string;
  projectIdea?: string;
  roles?: TeamMemberRole[];
  eventIdea?: string;
  interviewTimeSlotIds?: number[];
};

type TeamMemberRole = 'STUDY_LEAD' | 'MANAGEMENT' | 'PROJECT_MENTOR';

export type ApplicationDetail = {
  applicationStatus: ApplicationApiStatus;
  values: Record<string, string | string[]>;
};

export async function getApplicationDetail(
  applicationType: ApplicationRouteSlug,
  signal?: AbortSignal,
) {
  const applicationData = await apiRequest<ApplicationDetailResponse>(
    `/api/applications/${applicationType}`,
    { signal },
  );

  if (!applicationData) {
    return null;
  }

  return {
    applicationStatus: applicationData.applicationStatus,
    values: mapApplicationValues(applicationData),
  };
}

function mapApplicationValues(applicationData: ApplicationDetailResponse) {
  const values: Record<string, string | string[]> = {};

  setStringValue(values, 'studentId', applicationData.studentNumber);
  setStringValue(values, 'phone', applicationData.phoneNumber);
  setStringValue(values, 'major', applicationData.major);
  setStringValue(
    values,
    'semester',
    applicationData.completedSemester === undefined
      ? undefined
      : String(applicationData.completedSemester),
  );
  setStringArrayValue(
    values,
    'leaveOfAbsence',
    applicationData.onLeave === undefined
      ? undefined
      : [applicationData.onLeave ? 'planned' : 'not-planned'],
  );

  setStringValue(values, 'introduction', applicationData.introduction);
  setStringValue(values, 'motivation', applicationData.motivation);
  setStringValue(
    values,
    'expectation',
    applicationData.communityPerspective ?? applicationData.goal,
  );
  setStringValue(values, 'portfolio', applicationData.portfolioUrl);
  setStringValue(
    values,
    'activities',
    applicationData.leadershipExperience ?? applicationData.experience,
  );
  setStringValue(values, 'projectRole', applicationData.project);
  setStringValue(
    values,
    'studyField',
    applicationData.studyField ?? applicationData.studyInterest,
  );
  setStringValue(values, 'projectIdea', applicationData.projectIdea);
  setStringValue(values, 'techStack', applicationData.techStack);

  setStringValue(values, 'teamMemberStudyField', applicationData.studyField);
  setStringArrayValue(
    values,
    'teamMemberRoles',
    applicationData.roles?.map(mapTeamMemberRole),
  );
  setStringValue(values, 'teamMemberEventIdea', applicationData.eventIdea);
  setStringArrayValue(
    values,
    'interviewTimes',
    applicationData.interviewTimeSlotIds?.map(String),
  );

  return values;
}

function setStringValue(
  values: Record<string, string | string[]>,
  key: string,
  value?: string,
) {
  if (value !== undefined) {
    values[key] = value;
  }
}

function setStringArrayValue(
  values: Record<string, string | string[]>,
  key: string,
  value?: string[],
) {
  if (value !== undefined) {
    values[key] = value;
  }
}

function mapTeamMemberRole(role: TeamMemberRole) {
  const roleIdMap: Record<TeamMemberRole, string> = {
    MANAGEMENT: 'event-operation',
    PROJECT_MENTOR: 'project-mentor',
    STUDY_LEAD: 'study-lead',
  };

  return roleIdMap[role];
}
