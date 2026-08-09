import { apiRequest } from '@/api/apiClient';
import type { Member } from '@/types/member';

const DEFAULT_GENERATION = 6;

type MembersResponse = {
  id: number;
  name: string;
  role: string;
  profileImageUrl: string | null;
  tags: string[];
}[];

export async function getMembers(signal?: AbortSignal) {
  const membersData = await apiRequest<MembersResponse>(
    `/api/members?generation=${DEFAULT_GENERATION}`,
    { signal },
  );

  if (!membersData) {
    return [];
  }

  return membersData.map<Member>((member) => ({
    id: String(member.id),
    name: member.name,
    profileImageUrl: member.profileImageUrl,
    role: member.role,
    tags: member.tags,
  }));
}
