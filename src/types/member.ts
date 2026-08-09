export type MemberRole = string;

export type MemberTrack = string;

export type Member = {
  id: string;
  name: string;
  role: MemberRole;
  tags: MemberTrack[];
  imageKey?: string;
  profileImageUrl?: string | null;
};
