export type ApplicationType = 'Team Member' | 'Member';

export type ApplicationProgressStatus = 'submitted' | 'draft';

export type RecruitmentStatus = 'open' | 'closed';

export type RecruitmentWindowStatus = 'before' | 'open' | 'closed';

export type ApplicationRouteSlug = 'team-member' | 'member';

export type ApplicationFormStepId =
  | 'personal'
  | 'motivation'
  | 'experience'
  | 'gdgocActivity'
  | 'interview';

export type ApplicationQuestionType = 'text' | 'textarea' | 'checkbox';

export type ApplicationQuestionOption = {
  id: string;
  label: string;
};

export type ApplicationQuestion = {
  id: string;
  label: string;
  type: ApplicationQuestionType;
  required: boolean;
  placeholder?: string;
  rows?: number;
  options?: ApplicationQuestionOption[];
};

export type ApplicationFormStep = {
  id: ApplicationFormStepId;
  label: string;
  title: string;
  description: string;
  questions: ApplicationQuestion[];
};

export type ApplicationTypeOption = {
  id: ApplicationRouteSlug;
  type: ApplicationType;
  titleLines: string[];
  recruitmentPeriod: string;
  imageSrc: string;
  startsAt: string;
  endsAt: string;
  hasDraft: boolean;
};

export type ApplicationSummary = {
  id: string;
  routeSlug: ApplicationRouteSlug;
  type: ApplicationType;
  recruitmentPeriod: string;
  recruitmentStatus: RecruitmentStatus;
  dDayText: string;
  progressStatus: ApplicationProgressStatus;
  statusLabel: string;
  updatedAtLabel: string;
};
