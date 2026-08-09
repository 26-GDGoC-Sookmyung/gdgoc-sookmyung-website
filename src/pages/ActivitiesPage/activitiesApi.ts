import { apiRequest } from '@/api/apiClient';
import type { Activity, ActivityQuarter } from '@/types/activity';

import { activities as fallbackActivities } from './activitiesData';

type ActivitiesResponse = {
  quarter: string;
  activities: {
    name: string;
    description: string;
    period: string;
    imageUrl: string;
  }[];
}[];

export async function getActivities(signal?: AbortSignal) {
  const activitiesData = await apiRequest<ActivitiesResponse>('/api/activities', {
    signal,
  });

  if (!activitiesData) {
    return [];
  }

  return activitiesData.flatMap(({ activities, quarter }) => {
    const activityQuarter = mapActivityQuarter(quarter);

    if (!activityQuarter) {
      return [];
    }

    const quarterFallbackActivities = fallbackActivities.filter(
      (activity) => activity.quarter === activityQuarter,
    );

    return activities.map<Activity>((activity, activityIndex) => ({
      description: splitDescription(activity.description),
      id: `${activityQuarter}-${activityIndex}-${activity.name}`,
      imageFileName:
        quarterFallbackActivities[activityIndex]?.imageFileName ?? '',
      imageUrl: activity.imageUrl || undefined,
      period: activity.period,
      quarter: activityQuarter,
      title: activity.name,
    }));
  });
}

function mapActivityQuarter(quarter: string): ActivityQuarter | null {
  const quarterMap: Record<string, ActivityQuarter> = {
    '1분기': 'Q1',
    '2분기': 'Q2',
    '3분기': 'Q3',
    Q1: 'Q1',
    Q2: 'Q2',
    Q3: 'Q3',
  };

  return quarterMap[quarter.trim()] ?? null;
}

function splitDescription(description: string) {
  return description
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}
