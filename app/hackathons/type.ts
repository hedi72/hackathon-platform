export interface HackathonDetails {
  id: string;
  title: string;
  slug: string;
  description: string;
  tagline: string | null;
  banner: string | null;

  type: string;
  status: string;

  startDate: string;
  endDate: string;
  registrationStart: string;
  registrationEnd: string;
  judgingStart: string;
  judgingEnd: string;
  winnerAnnouncementDate: string | null;

  prizePool: number;
  prizeToken: string;

  eligibilityRequirements: string;
  submissionGuidelines: string;
  ressources: string;

  maxTeamSize: number;
  minTeamSize: number;
  maxTracksByProject: number;
  maxCustomTabs: number;

  isPrivate: boolean;
  invitePasscode: string | null;
  isProjectWhitelistEnabled: boolean;
  projectWhitelistEmails: string[];

  requiredSubmissionMaterials: any[];
  registrationQuestions: any[];
  bounties: any[];
  prizes: any[];

  categoryId: string;
  category: {
    id: string;
    name: string;
    description: string;
  };

  tracks: {
    id: string;
    hackathonId: string;
    name: string;
    description: string;
    judgingCriteria: string;
    order: number;
    winnersCount: number;
  }[];

  location: {
    city: string;
    state: string;
    address: string;
    country: string;
    zipCode: string;
  };

  otherLocations: any[];

  organizationId: string;
  organization: {
    id: string;
    name: string;
    slug: string;
    displayName: string;
    logo: string | null;
    tagline: string | null;
    description: string | null;
    type: string;
    establishedYear: number | null;
    size: string | null;
    operatingRegions: string[];
    email: string | null;
    phone: string | null;
    country: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    website: string | null;
    linkedin: string | null;
    github: string | null;
    twitter: string | null;
    ownerId: string;
  };

  owner: {
    id: string;
    name: string;
    email: string;
    image: string;
  };

  createdAt: string;
  updatedAt: string;
}
