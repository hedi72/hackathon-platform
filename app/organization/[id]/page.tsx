'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useAuth } from '../../../src/hooks/useAuth'
import { 
  Building2, 
  Users, 
  Calendar, 
  Trophy, 
  ArrowLeft,
  MapPin,
  Globe,
  Mail,
  Phone,
  Star,
  Award,
  Target,
  TrendingUp,
  DollarSign,
  Briefcase,
  Code,
  Lightbulb,
  Crown,
  UserPlus,
  Settings,
  Edit,
  MoreVertical,
  ExternalLink,
  Shield,
  CheckCircle2,
  Clock,
  Eye,
  Heart
} from 'lucide-react'

// Import shadcn/ui components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Navbar } from '../../../src/components/layout/Navbar'
import { Footer } from '../../../src/components/layout/Footer'

// Types (same as organization page)
interface Organization {
  id: string
  name: string
  logo?: string
  description: string
  website?: string
  location: string
  type: 'COMPANY' | 'UNIVERSITY' | 'NONPROFIT' | 'STARTUP' | 'GOVERNMENT'
  size: 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE'
  industry: string
  foundedYear: number
  totalMembers: number
  totalHackathons: number
  totalPrizes: number
  rating: number
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

interface OrganizationMember {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'OWNER' | 'ADMIN' | 'MEMBER'
  joinedAt: Date
  isActive: boolean
}

interface Hackathon {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED'
  participants: number
  prizePool: number
  technologies: string[]
}

// Mock data
const mockOrganization: Organization = {
  id: '1',
  name: 'TechCorp Innovation Lab',
  logo: '/images/org-techcorp.png',
  description: 'Leading technology company focused on AI and machine learning innovations. We organize monthly hackathons to push the boundaries of technology and foster innovation in the developer community. Our mission is to create cutting-edge solutions that solve real-world problems.',
  website: 'https://techcorp.com',
  location: 'San Francisco, CA',
  type: 'COMPANY',
  size: 'LARGE',
  industry: 'Technology',
  foundedYear: 2015,
  totalMembers: 1250,
  totalHackathons: 24,
  totalPrizes: 150000,
  rating: 4.8,
  isVerified: true,
  createdAt: new Date('2023-01-15'),
  updatedAt: new Date('2024-10-01')
}

const mockMembers: OrganizationMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    avatar: '/images/avatar-sarah.jpg',
    role: 'OWNER',
    joinedAt: new Date('2023-01-15'),
    isActive: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@techcorp.com',
    avatar: '/images/avatar-michael.jpg',
    role: 'ADMIN',
    joinedAt: new Date('2023-02-01'),
    isActive: true
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@techcorp.com',
    avatar: '/images/avatar-emily.jpg',
    role: 'ADMIN',
    joinedAt: new Date('2023-03-10'),
    isActive: true
  }
]

const mockHackathons: Hackathon[] = [
  {
    id: '1',
    title: 'AI Innovation Challenge 2024',
    description: 'Build the next generation of AI-powered applications',
    startDate: new Date('2024-11-15'),
    endDate: new Date('2024-11-17'),
    status: 'UPCOMING',
    participants: 150,
    prizePool: 25000,
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js']
  },
  {
    id: '2',
    title: 'Sustainable Tech Hackathon',
    description: 'Create technology solutions for environmental challenges',
    startDate: new Date('2024-10-05'),
    endDate: new Date('2024-10-07'),
    status: 'ACTIVE',
    participants: 200,
    prizePool: 30000,
    technologies: ['IoT', 'Machine Learning', 'Mobile Apps']
  },
  {
    id: '3',
    title: 'Fintech Revolution',
    description: 'Innovate the future of financial technology',
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-09-03'),
    status: 'COMPLETED',
    participants: 180,
    prizePool: 20000,
    technologies: ['Blockchain', 'React', 'Node.js', 'Python']
  }
]

export default function OrganizationDetailPage() {
  const params = useParams()
  const { user, isAuthenticated } = useAuth()
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [members, setMembers] = useState<OrganizationMember[]>([])
  const [hackathons, setHackathons] = useState<Hackathon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMember, setIsMember] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrganization(mockOrganization)
      setMembers(mockMembers)
      setHackathons(mockHackathons)
      setIsLoading(false)
      // Simulate user membership check
      setIsMember(Math.random() > 0.5)
    }, 1000)
  }, [params])

  const getOrgTypeIcon = (type: Organization['type']) => {
    switch (type) {
      case 'COMPANY':
        return Building2
      case 'UNIVERSITY':
        return Briefcase
      case 'NONPROFIT':
        return Award
      case 'STARTUP':
        return Lightbulb
      case 'GOVERNMENT':
        return Crown
      default:
        return Building2
    }
  }

  const getStatusColor = (status: Hackathon['status']) => {
    switch (status) {
      case 'UPCOMING':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'ACTIVE':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getRoleColor = (role: OrganizationMember['role']) => {
    switch (role) {
      case 'OWNER':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'ADMIN':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'MEMBER':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading organization...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Organization not found</h2>
            <p className="text-gray-600 mb-4">The organization you're looking for doesn't exist.</p>
            <Link href="/organization">
              <Button>Back to Organizations</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const IconComponent = getOrgTypeIcon(organization.type)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <Link href="/organization" className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Organizations
        </Link>

        {/* Organization Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={organization.logo} alt={organization.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-bold text-2xl">
                  {organization.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{organization.name}</h1>
                  {organization.isVerified && (
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <IconComponent className="w-3 h-3 mr-1" />
                    {organization.type}
                  </Badge>
                  <Badge variant="outline">{organization.industry}</Badge>
                  <Badge variant="outline">{organization.size}</Badge>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">{organization.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {organization.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Founded {organization.foundedYear}
                  </div>
                  {organization.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <a href={organization.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="border-2">
                <Heart className="w-4 h-4 mr-2" />
                Follow
              </Button>
              {isMember ? (
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Member
                </Button>
              ) : (
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join Organization
                </Button>
              )}
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{organization.totalMembers}</div>
              <div className="text-sm text-gray-500">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{organization.totalHackathons}</div>
              <div className="text-sm text-gray-500">Hackathons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">${organization.totalPrizes.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Prizes</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(organization.rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">{organization.rating} Rating</div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-white border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Hackathons */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Hackathons</CardTitle>
                <CardDescription>Latest events organized by this organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hackathons.slice(0, 3).map((hackathon) => (
                    <div key={hackathon.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-900">{hackathon.title}</h4>
                          <Badge variant="outline" className={getStatusColor(hackathon.status)}>
                            {hackathon.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{hackathon.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{hackathon.participants} participants</span>
                          <span>${hackathon.prizePool.toLocaleString()} prize pool</span>
                          <span>{hackathon.startDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Members */}
            <Card>
              <CardHeader>
                <CardTitle>Key Members</CardTitle>
                <CardDescription>Leadership and active members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getRoleColor(member.role)}>
                          {member.role}
                        </Badge>
                        {member.role === 'OWNER' && <Crown className="w-4 h-4 text-yellow-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hackathons" className="space-y-6">
            <div className="grid gap-6">
              {hackathons.map((hackathon) => (
                <Card key={hackathon.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{hackathon.title}</h3>
                          <Badge className={getStatusColor(hackathon.status)}>
                            {hackathon.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{hackathon.description}</p>
                      </div>
                      <Button>
                        {hackathon.status === 'UPCOMING' ? 'Register' : 'View Details'}
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hackathon.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Participants</div>
                        <div className="font-semibold">{hackathon.participants}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Prize Pool</div>
                        <div className="font-semibold">${hackathon.prizePool.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Duration</div>
                        <div className="font-semibold">
                          {hackathon.startDate.toLocaleDateString()} - {hackathon.endDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <div className="grid gap-4">
              {members.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-500">{member.email}</p>
                          <p className="text-xs text-gray-400">Joined {member.joinedAt.toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getRoleColor(member.role)}>
                          {member.role}
                        </Badge>
                        {member.isActive && (
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Mission</h4>
                  <p className="text-gray-600">{organization.description}</p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Organization Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span>{organization.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Industry:</span>
                        <span>{organization.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Size:</span>
                        <span>{organization.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Founded:</span>
                        <span>{organization.foundedYear}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Contact Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{organization.location}</span>
                      </div>
                      {organization.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <a href={organization.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {organization.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}