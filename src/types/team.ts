export interface TeamFormData {
  name: string;
  tagline: string;
}

// export interface Team extends TeamFormData {
//   id: string;
//   ownerId: string;
//   createdAt: Date;
//   updatedAt: Date;
//   members: TeamMember[];
//   name: string;
//   tagline?: string;
// }


export interface TeamMember {
  id: string;
  isLeader: boolean;
  joinedAt: string;
  user: {
    id: string;
    username: string;
    name: string;
    image?: string;
  };
}

export interface Team {
  id: string;
  name: string;
  tagline?: string;
  image?: string;
  createdAt: string;
  memberCount: number;
  members: TeamMember[];
}