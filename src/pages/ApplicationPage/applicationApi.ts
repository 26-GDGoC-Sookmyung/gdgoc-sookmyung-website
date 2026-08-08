import { apiRequest } from '@/api/apiClient';
import type {
  ApplicationApiStatus,
  ApplicationQuestionOption,
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
type ApiObject = Record<string, unknown>;

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

export async function getTeamMemberInterviewOptions(signal?: AbortSignal) {
  const interviewTimeData = await apiRequest<unknown>(
    '/api/applications/team-member/interview-time',
    { signal },
  );

  return extractInterviewTimeItems(interviewTimeData)
    .map(mapInterviewTimeOption)
    .filter((option): option is ApplicationQuestionOption => option !== null);
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

function extractInterviewTimeItems(data: unknown): ApiObject[] {
  if (Array.isArray(data)) {
    return data.filter(isApiObject);
  }

  if (!isApiObject(data)) {
    return [];
  }

  const arrayValue = Object.values(data).find((value) => Array.isArray(value));

  return Array.isArray(arrayValue) ? arrayValue.filter(isApiObject) : [];
}

function mapInterviewTimeOption(item: ApiObject): ApplicationQuestionOption | null {
  const id = getStringValue(item, [
    'id',
    'interviewTimeSlotId',
    'timeSlotId',
    'slotId',
  ]);

  if (!id) {
    return null;
  }

  return {
    id,
    label: getInterviewTimeLabel(item),
  };
}

function getInterviewTimeLabel(item: ApiObject) {
  const label = getStringValue(item, ['label', 'time', 'timeRange', 'name']);

  if (label) {
    return label;
  }

  const date = getStringValue(item, ['date', 'interviewDate', 'day']);
  const startAt = getStringValue(item, ['startAt', 'startTime']);
  const endAt = getStringValue(item, ['endAt', 'endTime']);

  return [date, startAt, endAt ? `~ ${endAt}` : ''].filter(Boolean).join(' ');
}

function isApiObject(value: unknown): value is ApiObject {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function getStringValue(object: ApiObject, keys: string[]) {
  for (const key of keys) {
    const value = object[key];

    if (typeof value === 'string' || typeof value === 'number') {
      return String(value);
    }
  }

  return null;
}
