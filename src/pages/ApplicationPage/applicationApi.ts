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
type ApplicationFormValues = Record<string, string | string[]>;

export type TeamMemberApplicationRequest = {
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
  project?: string;
  leadershipExperience?: string;
  techStack?: string;
  studyField?: string;
  roles?: TeamMemberRole[];
  eventIdea?: string;
  interviewTimeSlotIds?: number[];
};

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

export function saveTeamMemberDraft(request: TeamMemberApplicationRequest) {
  return apiRequest('/api/applications/team-member/draft', {
    method: 'PUT',
    body: request,
  });
}

export function submitTeamMemberApplication(
  request: TeamMemberApplicationRequest,
) {
  return apiRequest('/api/applications/team-member/submit', {
    method: 'POST',
    body: request,
  });
}

export function createTeamMemberApplicationRequest(
  values: ApplicationFormValues,
) {
  return removeEmptyValues({
    studentNumber: getTextValue(values.studentId),
    phoneNumber: getTextValue(values.phone),
    major: getTextValue(values.major),
    completedSemester: getNumberValue(values.semester),
    onLeave: getOnLeaveValue(values.leaveOfAbsence),
    introduction: getTextValue(values.introduction),
    motivation: getTextValue(values.motivation),
    communityPerspective: getTextValue(values.expectation),
    goal: getTextValue(values.expectation),
    portfolioUrl: getTextValue(values.portfolio),
    project: getTextValue(values.projectRole),
    leadershipExperience: getTextValue(values.activities),
    techStack: getTextValue(values.techStack),
    studyField:
      getTextValue(values.teamMemberStudyField) ?? getTextValue(values.studyField),
    roles: getArrayValue(values.teamMemberRoles)
      .map(mapTeamMemberRoleId)
      .filter((role): role is TeamMemberRole => role !== undefined),
    eventIdea: getTextValue(values.teamMemberEventIdea),
    interviewTimeSlotIds: getNumericIds(values.interviewTimes),
  });
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

function mapTeamMemberRoleId(roleId: string) {
  const roleMap: Record<string, TeamMemberRole> = {
    'event-operation': 'MANAGEMENT',
    'project-mentor': 'PROJECT_MENTOR',
    'study-lead': 'STUDY_LEAD',
  };

  return roleMap[roleId];
}

function getOnLeaveValue(value: string | string[] | undefined) {
  const leaveOfAbsence = getArrayValue(value);

  if (leaveOfAbsence.length === 0) {
    return undefined;
  }

  return leaveOfAbsence.includes('planned');
}

function getTextValue(value: string | string[] | undefined) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

function getArrayValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value : [];
}

function getNumberValue(value: string | string[] | undefined) {
  const textValue = getTextValue(value);
  const numberText = textValue?.match(/\d+/)?.[0];

  if (!numberText) {
    return undefined;
  }

  const numberValue = Number.parseInt(numberText, 10);
  return Number.isNaN(numberValue) ? undefined : numberValue;
}

function getNumericIds(value: string | string[] | undefined) {
  const ids = getArrayValue(value);
  const numericIds = ids
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id));

  return ids.length === numericIds.length ? numericIds : undefined;
}

function removeEmptyValues(request: TeamMemberApplicationRequest) {
  return Object.fromEntries(
    Object.entries(request).filter(([, value]) => {
      if (value === undefined) {
        return false;
      }

      return !Array.isArray(value) || value.length > 0;
    }),
  ) as TeamMemberApplicationRequest;
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
