'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../../src/hooks/useAuth'
import { 
  Building2, 
  Users, 
  Calendar, 
  Trophy, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Crown,
  UserPlus,
  Settings,
  ExternalLink,
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
  Lightbulb
} from 'lucide-react'

// Import shadcn/ui components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Navbar } from '../../src/components/layout/Navbar'
import { Footer } from '../../src/components/layout/Footer'

// Types
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
  userId: string
  organizationId: string
  role: 'OWNER' | 'ADMIN' | 'MEMBER'
  name: string
  email: string
  avatar?: string
  joinedAt: Date
  isActive: boolean
}

interface OrganizationStats {
  totalOrganizations: number
  myOrganizations: number
  totalMembers: number
  activeHackathons: number
  completedHackathons: number
  totalPrizePool: number
}

// Mock data
const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'TechCorp Innovation Lab',
    logo: '/images/org-techcorp.png',
    description: 'Leading technology company focused on AI and machine learning innovations. We organize monthly hackathons to push the boundaries of technology.',
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
  },
  {
    id: '2',
    name: 'Stanford University CS',
    logo: '/images/org-stanford.png',
    description: 'Computer Science Department at Stanford University. Fostering innovation through student-led hackathons and research competitions.',
    website: 'https://cs.stanford.edu',
    location: 'Stanford, CA',
    type: 'UNIVERSITY',
    size: 'LARGE',
    industry: 'Education',
    foundedYear: 1965,
    totalMembers: 850,
    totalHackathons: 18,
    totalPrizes: 85000,
    rating: 4.9,
    isVerified: true,
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2024-09-28')
  },
  {
    id: '3',
    name: 'GreenTech Initiative',
    logo: '/images/org-greentech.png',
    description: 'Non-profit organization dedicated to environmental technology solutions. We host sustainability-focused hackathons.',
    website: 'https://greentech.org',
    location: 'Seattle, WA',
    type: 'NONPROFIT',
    size: 'MEDIUM',
    industry: 'Environment',
    foundedYear: 2020,
    totalMembers: 320,
    totalHackathons: 12,
    totalPrizes: 45000,
    rating: 4.6,
    isVerified: true,
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2024-10-02')
  },
  {
    id: '4',
    name: 'DevStartup Hub',
    logo: '/images/org-devstartup.png',
    description: 'Startup accelerator and hackathon organizer. We help early-stage companies through competitive programming challenges.',
    website: 'https://devstartup.io',
    location: 'Austin, TX',
    type: 'STARTUP',
    size: 'SMALL',
    industry: 'Technology',
    foundedYear: 2022,
    totalMembers: 150,
    totalHackathons: 8,
    totalPrizes: 25000,
    rating: 4.4,
    isVerified: false,
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-09-30')
  }
]

const mockStats: OrganizationStats = {
  totalOrganizations: 156,
  myOrganizations: 3,
  totalMembers: 12543,
  activeHackathons: 8,
  completedHackathons: 67,
  totalPrizePool: 1250000
}

export default function OrganizationPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [stats, setStats] = useState<OrganizationStats | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('ALL')
  const [sortBy, setSortBy] = useState('rating')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [newOrgForm, setNewOrgForm] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    type: 'COMPANY' as Organization['type'],
    size: 'MEDIUM' as Organization['size'],
    industry: ''
  })

  useEffect(() => {
    // Simulate API call
    setOrganizations(mockOrganizations)
    setStats(mockStats)
  }, [])

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.industry.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'ALL' || org.type === filterType
    return matchesSearch && matchesFilter
  })

  const sortedOrganizations = [...filteredOrganizations].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'members':
        return b.totalMembers - a.totalMembers
      case 'hackathons':
        return b.totalHackathons - a.totalHackathons
      case 'prizes':
        return b.totalPrizes - a.totalPrizes
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

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

  const getOrgTypeColor = (type: Organization['type']) => {
    switch (type) {
      case 'COMPANY':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'UNIVERSITY':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'NONPROFIT':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'STARTUP':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'GOVERNMENT':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const handleCreateOrganization = () => {
    // Simulate API call
    const newOrg: Organization = {
      id: Date.now().toString(),
      ...newOrgForm,
      foundedYear: new Date().getFullYear(),
      totalMembers: 1,
      totalHackathons: 0,
      totalPrizes: 0,
      rating: 0,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setOrganizations([newOrg, ...organizations])
    setIsCreateDialogOpen(false)
    setNewOrgForm({
      name: '',
      description: '',
      website: '',
      location: '',
      type: 'COMPANY',
      size: 'MEDIUM',
      industry: ''
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading organizations...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Organizations</h1>
              <p className="text-gray-600">Discover and manage hackathon-organizing institutions</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Organization
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Organization</DialogTitle>
                  <DialogDescription>
                    Set up your organization to start hosting hackathons and building a community.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="org-name">Organization Name</Label>
                      <Input
                        id="org-name"
                        value={newOrgForm.name}
                        onChange={(e) => setNewOrgForm({...newOrgForm, name: e.target.value})}
                        placeholder="Enter organization name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-industry">Industry</Label>
                      <Input
                        id="org-industry"
                        value={newOrgForm.industry}
                        onChange={(e) => setNewOrgForm({...newOrgForm, industry: e.target.value})}
                        placeholder="e.g. Technology, Education"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-description">Description</Label>
                    <Textarea
                      id="org-description"
                      value={newOrgForm.description}
                      onChange={(e) => setNewOrgForm({...newOrgForm, description: e.target.value})}
                      placeholder="Describe your organization and its mission"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="org-website">Website</Label>
                      <Input
                        id="org-website"
                        type="url"
                        value={newOrgForm.website}
                        onChange={(e) => setNewOrgForm({...newOrgForm, website: e.target.value})}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-location">Location</Label>
                      <Input
                        id="org-location"
                        value={newOrgForm.location}
                        onChange={(e) => setNewOrgForm({...newOrgForm, location: e.target.value})}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="org-type">Organization Type</Label>
                      <Select value={newOrgForm.type} onValueChange={(value: Organization['type']) => setNewOrgForm({...newOrgForm, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="COMPANY">Company</SelectItem>
                          <SelectItem value="UNIVERSITY">University</SelectItem>
                          <SelectItem value="NONPROFIT">Non-Profit</SelectItem>
                          <SelectItem value="STARTUP">Startup</SelectItem>
                          <SelectItem value="GOVERNMENT">Government</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-size">Organization Size</Label>
                      <Select value={newOrgForm.size} onValueChange={(value: Organization['size']) => setNewOrgForm({...newOrgForm, size: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SMALL">Small (1-50)</SelectItem>
                          <SelectItem value="MEDIUM">Medium (51-500)</SelectItem>
                          <SelectItem value="LARGE">Large (501-5000)</SelectItem>
                          <SelectItem value="ENTERPRISE">Enterprise (5000+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateOrganization}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    >
                      Create Organization
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-900">{stats.totalOrganizations}</p>
                    <p className="text-sm text-blue-700">Total Organizations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-900">{stats.myOrganizations}</p>
                    <p className="text-sm text-purple-700">My Organizations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-900">{stats.totalMembers.toLocaleString()}</p>
                    <p className="text-sm text-green-700">Total Members</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-900">{stats.activeHackathons}</p>
                    <p className="text-sm text-orange-700">Active Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-indigo-900">{stats.completedHackathons}</p>
                    <p className="text-sm text-indigo-700">Completed Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-900">${stats.totalPrizePool.toLocaleString()}</p>
                    <p className="text-sm text-yellow-700">Prize Pool</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search organizations by name, description, or industry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="COMPANY">Companies</SelectItem>
                  <SelectItem value="UNIVERSITY">Universities</SelectItem>
                  <SelectItem value="NONPROFIT">Non-Profits</SelectItem>
                  <SelectItem value="STARTUP">Startups</SelectItem>
                  <SelectItem value="GOVERNMENT">Government</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="members">Most Members</SelectItem>
                  <SelectItem value="hackathons">Most Hackathons</SelectItem>
                  <SelectItem value="prizes">Highest Prizes</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedOrganizations.map((org) => {
            const IconComponent = getOrgTypeIcon(org.type)
            
            return (
              <Card key={org.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={org.logo} alt={org.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-bold text-lg">
                          {org.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{org.name}</CardTitle>
                          {org.isVerified && (
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={getOrgTypeColor(org.type)}>
                            <IconComponent className="w-3 h-3 mr-1" />
                            {org.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {org.industry}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Join Organization
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{org.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {org.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {org.foundedYear}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{org.totalMembers}</div>
                      <div className="text-xs text-gray-500">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{org.totalHackathons}</div>
                      <div className="text-xs text-gray-500">Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">${org.totalPrizes.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Prizes</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.floor(org.rating) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({org.rating})</span>
                    </div>
                    
                    <div className="flex gap-2">
                      {org.website && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={org.website} target="_blank">
                            <Globe className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                        Join
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {sortedOrganizations.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Organization
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}