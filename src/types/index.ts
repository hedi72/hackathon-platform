import { User, Event, Project, EventParticipant, Vote } from '@prisma/client'

export type UserRole = 'USER' | 'ORGANIZER' | 'ADMIN'

export type EventStatus = 'DRAFT' | 'UPCOMING' | 'ACTIVE' | 'ENDED' | 'CANCELLED'

export interface ExtendedUser extends User {
  _count?: {
    organizedEvents: number
    participations: number
    projects: number
  }
}

export interface ExtendedEvent extends Event {
  organizer: User
  _count: {
    participants: number
    projects: number
  }
  categories?: { id: string; name: string }[]
  participants?: EventParticipant[]
}

export interface ExtendedProject extends Project {
  teamLead: User
  event: Event
  _count: {
    votes: number
    members: number
  }
  members?: { userId: string; role: string }[]
  votes?: Vote[]
}

export interface DashboardStats {
  totalEvents: number
  totalProjects: number
  totalVotes: number
  recentActivity: any[]
}

export interface EventFilters {
  search?: string
  status?: EventStatus
  category?: string
  dateRange?: {
    start: Date
    end: Date
  }
}

export interface CreateEventData {
  title: string
  description: string
  imageUrl?: string
  startDate: Date
  endDate: Date
  location?: string
  isVirtual: boolean
  maxTeamSize: number
  prizePool?: number
  rules?: string
  requirements?: string
  categories: string[]
}

export interface CreateProjectData {
  title: string
  description: string
  imageUrl?: string
  repoUrl?: string
  demoUrl?: string
  techStack: string[]
  eventId: string
  members: string[]
}