export interface TeamFormData {
  name: string;
  tagline: string;
}

export interface Team extends TeamFormData {
  id: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: string;
  joinedAt: Date;
}