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
  Edit,
  Settings,
  Crown,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Star,
  MapPin,
  Globe,
  Mail,
  Phone,
  Award,
  Target,
  TrendingUp,
  DollarSign,
  Briefcase,
  Code,
  Lightbulb,
  Shield
} from 'lucide-react'

// Import shadcn/ui components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import { Navbar } from '../../src/components/layout/Navbar'
import { Footer } from '../../src/components/layout/Footer'

// Types
interface UserOrganization {
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
  isVerified: boolean
  userRole: 'OWNER' | 'ADMIN' | 'MEMBER'
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
  permissions: string[]
}

interface Hackathon {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'DRAFT'
  participants: number
  prizePool: number
  technologies: string[]
  registrationOpen: boolean
}

// Mock data
const mockUserOrganizations: UserOrganization[] = [
  {
    id: '1',
    name: 'Innovation Hub Labs',
    logo: '/images/org-innovation.png',
    description: 'Leading innovation lab focused on emerging technologies and startup acceleration.',
    website: 'https://innovationhub.com',
    location: 'San Francisco, CA',
    type: 'STARTUP',
    size: 'MEDIUM',
    industry: 'Technology',
    foundedYear: 2020,
    totalMembers: 45,
    totalHackathons: 8,
    totalPrizes: 50000,
    isVerified: true,
    userRole: 'OWNER',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-10-01')
  },
  {
    id: '2',
    name: 'EduTech Solutions',
    logo: '/images/org-edutech.png',
    description: 'Educational technology organization focused on transforming learning experiences.',
    location: 'Boston, MA',
    type: 'NONPROFIT',
    size: 'SMALL',
    industry: 'Education',
    foundedYear: 2019,
    totalMembers: 22,
    totalHackathons: 4,
    totalPrizes: 15000,
    isVerified: false,
    userRole: 'ADMIN',
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2024-09-15')
  }
]

const mockMembers: OrganizationMember[] = [
  {
    id: '1',
    name: 'Current User',
    email: 'user@innovationhub.com',
    role: 'OWNER',
    joinedAt: new Date('2023-01-15'),
    isActive: true,
    permissions: ['all']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@innovationhub.com',
    role: 'ADMIN',
    joinedAt: new Date('2023-03-20'),
    isActive: true,
    permissions: ['manage_events', 'manage_members']
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@innovationhub.com',
    role: 'MEMBER',
    joinedAt: new Date('2023-05-10'),
    isActive: true,
    permissions: ['view_events']
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
    technologies: ['Python', 'TensorFlow', 'React'],
    registrationOpen: true
  },
  {
    id: '2',
    title: 'EdTech Revolution',
    description: 'Transform education through technology',
    startDate: new Date('2024-10-05'),
    endDate: new Date('2024-10-07'),
    status: 'ACTIVE',
    participants: 89,
    prizePool: 15000,
    technologies: ['React', 'Node.js', 'MongoDB'],
    registrationOpen: false
  },
  {
    id: '3',
    title: 'Startup Showcase',
    description: 'Present your innovative startup ideas',
    startDate: new Date('2024-09-20'),
    endDate: new Date('2024-09-22'),
    status: 'COMPLETED',
    participants: 120,
    prizePool: 10000,
    technologies: ['Any'],
    registrationOpen: false
  }
]

export default function MyOrganizationPage() {
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [organizations, setOrganizations] = useState<UserOrganization[]>([])
  const [selectedOrg, setSelectedOrg] = useState<UserOrganization | null>(null)
  const [members, setMembers] = useState<OrganizationMember[]>([])
  const [hackathons, setHackathons] = useState<Hackathon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Form states
  const [newOrgForm, setNewOrgForm] = useState({
    name: '',
    description: '',
    type: '',
    size: '',
    industry: '',
    location: '',
    website: '',
    foundedYear: new Date().getFullYear()
  })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrganizations(mockUserOrganizations)
      setSelectedOrg(mockUserOrganizations[0])
      setMembers(mockMembers)
      setHackathons(mockHackathons)
      setIsLoading(false)
    }, 1000)
  }, [])

  const getOrgTypeIcon = (type: UserOrganization['type']) => {
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
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
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

  const handleCreateOrganization = () => {
    if (!newOrgForm.name.trim() || !newOrgForm.description.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      })
      return
    }

    const newOrg: UserOrganization = {
      id: (organizations.length + 1).toString(),
      name: newOrgForm.name,
      description: newOrgForm.description,
      type: newOrgForm.type as UserOrganization['type'],
      size: newOrgForm.size as UserOrganization['size'],
      industry: newOrgForm.industry,
      location: newOrgForm.location,
      website: newOrgForm.website,
      foundedYear: newOrgForm.foundedYear,
      totalMembers: 1,
      totalHackathons: 0,
      totalPrizes: 0,
      isVerified: false,
      userRole: 'OWNER',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setOrganizations([...organizations, newOrg])
    setIsCreateDialogOpen(false)
    setNewOrgForm({
      name: '',
      description: '',
      type: '',
      size: '',
      industry: '',
      location: '',
      website: '',
      foundedYear: new Date().getFullYear()
    })

    toast({
      title: 'Success',
      description: 'Organization created successfully!'
    })
  }

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || hackathon.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-4">Please sign in to manage your organizations.</p>
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your organizations...</p>
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Organizations</h1>
            <p className="text-gray-600">Manage your organizations and hackathons</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Organization
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Organization</DialogTitle>
                <DialogDescription>
                  Fill in the details to create your new organization.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Organization Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter organization name"
                    value={newOrgForm.name}
                    onChange={(e) => setNewOrgForm({...newOrgForm, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your organization"
                    value={newOrgForm.description}
                    onChange={(e) => setNewOrgForm({...newOrgForm, description: e.target.value})}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={newOrgForm.type} onValueChange={(value) => setNewOrgForm({...newOrgForm, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="COMPANY">Company</SelectItem>
                        <SelectItem value="STARTUP">Startup</SelectItem>
                        <SelectItem value="UNIVERSITY">University</SelectItem>
                        <SelectItem value="NONPROFIT">Non-Profit</SelectItem>
                        <SelectItem value="GOVERNMENT">Government</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="size">Size</Label>
                    <Select value={newOrgForm.size} onValueChange={(value) => setNewOrgForm({...newOrgForm, size: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SMALL">Small (1-50)</SelectItem>
                        <SelectItem value="MEDIUM">Medium (51-200)</SelectItem>
                        <SelectItem value="LARGE">Large (201-1000)</SelectItem>
                        <SelectItem value="ENTERPRISE">Enterprise (1000+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      placeholder="e.g., Technology"
                      value={newOrgForm.industry}
                      onChange={(e) => setNewOrgForm({...newOrgForm, industry: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., San Francisco, CA"
                      value={newOrgForm.location}
                      onChange={(e) => setNewOrgForm({...newOrgForm, location: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website (optional)</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    value={newOrgForm.website}
                    onChange={(e) => setNewOrgForm({...newOrgForm, website: e.target.value})}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateOrganization}>
                  Create Organization
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {organizations.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Organizations Yet</h3>
            <p className="text-gray-600 mb-6">Create your first organization to start organizing hackathons.</p>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Organization
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        ) : (
          <>
            {/* Organization Selector */}
            <div className="mb-8">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {organizations.map((org) => {
                  const IconComponent = getOrgTypeIcon(org.type)
                  return (
                    <Card 
                      key={org.id} 
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedOrg?.id === org.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedOrg(org)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={org.logo} alt={org.name} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-bold">
                                {org.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900">{org.name}</h3>
                                {org.isVerified && (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className={getRoleColor(org.userRole)}>
                                  <Crown className="w-3 h-3 mr-1" />
                                  {org.userRole}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{org.description}</p>
                        
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center">
                            <div className="font-semibold text-blue-600">{org.totalMembers}</div>
                            <div className="text-gray-500">Members</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-green-600">{org.totalHackathons}</div>
                            <div className="text-gray-500">Events</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-purple-600">${org.totalPrizes.toLocaleString()}</div>
                            <div className="text-gray-500">Prizes</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Selected Organization Details */}
            {selectedOrg && (
              <div className="space-y-6">
                {/* Organization Header */}
                <Card>
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex flex-col sm:flex-row items-start gap-6">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={selectedOrg.logo} alt={selectedOrg.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-bold text-xl">
                            {selectedOrg.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-gray-900">{selectedOrg.name}</h2>
                            {selectedOrg.isVerified && (
                              <Badge className="bg-green-100 text-green-700 border-green-200">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {selectedOrg.type}
                            </Badge>
                            <Badge variant="outline">{selectedOrg.industry}</Badge>
                            <Badge variant="outline">{selectedOrg.size}</Badge>
                            <Badge variant="outline" className={getRoleColor(selectedOrg.userRole)}>
                              {selectedOrg.userRole}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{selectedOrg.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {selectedOrg.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Founded {selectedOrg.foundedYear}
                            </div>
                            {selectedOrg.website && (
                              <div className="flex items-center gap-1">
                                <Globe className="w-4 h-4" />
                                <a href={selectedOrg.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                                  Website
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                        <Link href={`/organization/${selectedOrg.id}`}>
                          <Button variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View Public
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Content Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4 bg-white border">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Total Members</p>
                              <p className="text-2xl font-bold text-blue-600">{selectedOrg.totalMembers}</p>
                            </div>
                            <Users className="w-8 h-8 text-blue-500" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Hackathons</p>
                              <p className="text-2xl font-bold text-green-600">{selectedOrg.totalHackathons}</p>
                            </div>
                            <Calendar className="w-8 h-8 text-green-500" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Total Prizes</p>
                              <p className="text-2xl font-bold text-purple-600">${selectedOrg.totalPrizes.toLocaleString()}</p>
                            </div>
                            <Trophy className="w-8 h-8 text-purple-500" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Active Events</p>
                              <p className="text-2xl font-bold text-orange-600">
                                {hackathons.filter(h => h.status === 'ACTIVE').length}
                              </p>
                            </div>
                            <Star className="w-8 h-8 text-orange-500" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Activity */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">New hackathon created</p>
                              <p className="text-xs text-gray-500">AI Innovation Challenge 2024 • 2 hours ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">New member joined</p>
                              <p className="text-xs text-gray-500">John Doe joined the organization • 1 day ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">Hackathon completed</p>
                              <p className="text-xs text-gray-500">EdTech Revolution finished successfully • 3 days ago</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="hackathons" className="space-y-6">
                    {/* Hackathons Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="Search hackathons..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-64"
                          />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Hackathon
                      </Button>
                    </div>

                    {/* Hackathons List */}
                    <div className="space-y-4">
                      {filteredHackathons.map((hackathon) => (
                        <Card key={hackathon.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="text-lg font-semibold text-gray-900">{hackathon.title}</h4>
                                  <Badge className={getStatusColor(hackathon.status)}>
                                    {hackathon.status}
                                  </Badge>
                                  {hackathon.registrationOpen && (
                                    <Badge className="bg-green-100 text-green-700">Registration Open</Badge>
                                  )}
                                </div>
                                <p className="text-gray-600 mb-4">{hackathon.description}</p>
                                
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
                              </div>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="members" className="space-y-6">
                    {/* Members Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">Organization Members</h3>
                        <p className="text-sm text-gray-500">{members.length} total members</p>
                      </div>
                      <Button>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Invite Member
                      </Button>
                    </div>

                    {/* Members List */}
                    <div className="space-y-4">
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
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                                    {member.role === 'OWNER' && <Crown className="w-4 h-4 text-yellow-500" />}
                                  </div>
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
                                {selectedOrg?.userRole === 'OWNER' && member.role !== 'OWNER' && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <MoreVertical className="w-4 h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Edit Role</DropdownMenuItem>
                                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-red-600">
                                        Remove Member
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-6">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Analytics dashboard is coming soon. Track your organization's performance, engagement metrics, and hackathon success rates.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}