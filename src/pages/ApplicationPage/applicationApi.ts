import { apiRequest } from '@/api/apiClient';
import type {
  ApplicationApiStatus,
  ApplicationRouteSlug,
} from '@/types/application';

export async function getApplicationStatus(
  applicationType: ApplicationRouteSlug,
  signal?: AbortSignal,
) {
  const applicationData = await apiRequest<unknown>(
    `/api/applications/${applicationType}`,
    { signal },
  );

  return findApplicationStatus(applicationData);
}

function findApplicationStatus(data: unknown): ApplicationApiStatus | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  if ('applicationStatus' in data) {
    const status = data.applicationStatus;

    if (status === 'SUBMITTED' || status === 'DRAFT') {
      return status;
    }
  }

  for (const value of Object.values(data)) {
    const status = findApplicationStatus(value);

    if (status) {
      return status;
    }
  }

  return null;
}
