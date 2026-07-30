export type MemberRole = 'Organizer' | 'Team Member' | 'Member';

export type MemberTrack =
  | 'AI/ML'
  | 'App/Web'
  | 'Backend'
  | 'Cloud'
  | 'DevRel'
  | 'Frontend'
  | 'Spring';

export type Member = {
  id: string;
  name: string;
  role: MemberRole;
  tags: MemberTrack[];
  imageKey?: string;
};
