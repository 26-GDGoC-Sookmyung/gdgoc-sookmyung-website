import type { ApplicationRouteSlug } from '@/types/application';

export type ApplicationDraft = {
  currentStepIndex: number;
  values: Record<string, string | string[]>;
  savedAt: string;
};

const DRAFT_STORAGE_PREFIX = 'gdgoc-application-draft';

function getDraftStorageKey(applicationType: ApplicationRouteSlug) {
  return `${DRAFT_STORAGE_PREFIX}:${applicationType}`;
}

export function getApplicationDraft(applicationType: ApplicationRouteSlug) {
  const rawDraft = localStorage.getItem(getDraftStorageKey(applicationType));

  if (!rawDraft) {
    return null;
  }

  try {
    return JSON.parse(rawDraft) as ApplicationDraft;
  } catch {
    localStorage.removeItem(getDraftStorageKey(applicationType));
    return null;
  }
}

export function hasApplicationDraft(applicationType: ApplicationRouteSlug) {
  return getApplicationDraft(applicationType) !== null;
}

export function saveApplicationDraft(
  applicationType: ApplicationRouteSlug,
  draft: ApplicationDraft,
) {
  localStorage.setItem(getDraftStorageKey(applicationType), JSON.stringify(draft));
}

export function removeApplicationDraft(applicationType: ApplicationRouteSlug) {
  localStorage.removeItem(getDraftStorageKey(applicationType));
}
