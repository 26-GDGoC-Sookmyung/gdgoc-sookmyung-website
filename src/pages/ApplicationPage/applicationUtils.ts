import type {
  ApplicationTypeOption,
  RecruitmentWindowStatus,
} from '@/types/application';

export function getRecruitmentWindowStatus(
  option: ApplicationTypeOption,
  now = new Date(),
): RecruitmentWindowStatus {
  const startsAt = new Date(option.startsAt);
  const endsAt = new Date(option.endsAt);

  if (now < startsAt) {
    return 'before';
  }

  if (now > endsAt) {
    return 'closed';
  }

  return 'open';
}
