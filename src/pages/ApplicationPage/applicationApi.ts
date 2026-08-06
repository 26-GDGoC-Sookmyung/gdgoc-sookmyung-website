import type { ApplicationApiStatus, ApplicationRouteSlug } from '@/types/application';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://gdgoc-sookmyung-server.onrender.com';

type ApplicationResponse = {
  data?: unknown;
};

export async function getApplicationStatus(
  applicationType: ApplicationRouteSlug,
  signal?: AbortSignal,
) {
  const response = await fetch(`${API_BASE_URL}/api/applications/${applicationType}`, {
    signal,
  });

  if (!response.ok) {
    return null;
  }

  const applicationResponse = (await response.json()) as ApplicationResponse;
  return findApplicationStatus(applicationResponse.data);
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
