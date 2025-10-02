'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../src/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Navbar } from '../../src/components/layout/Navbar'
import { Footer } from '../../src/components/layout/Footer'
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Github, 
  Linkedin, 
  Globe, 
  Trophy, 
  Code, 
  Users, 
  Award, 
  Edit3,
  Save,
  X,
  Star,
  TrendingUp,
  Target,
  Clock,
  Settings,
  Bookmark,
  Lightbulb,
  Briefcase
} from 'lucide-react'
import Link from 'next/link'

interface UserProfile {
  id: string
  name: string
  email: string
  image?: string
  bio?: string
  location?: string
  website?: string
  github?: string
  linkedin?: string
  joinDate: Date
  role: 'USER' | 'ORGANIZER' | 'ADMIN'
}

interface HackathonParticipation {
  id: string
  hackathonTitle: string
  hackathonId: string
  position?: number
  teamName?: string
  projectName?: string
  status: 'REGISTERED' | 'SUBMITTED' | 'WINNER' | 'FINALIST'
  startDate: Date
  endDate: Date
  technologies: string[]
  prizeWon?: number
}

interface UserStats {
  totalHackathons: number
  hackathonsWon: number
  totalProjects: number
  totalTeammates: number
  favoriteLanguages: string[]
  experienceYears: number
  totalPrizesMoney: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earnedDate: Date
  category: 'PARTICIPATION' | 'VICTORY' | 'COLLABORATION' | 'INNOVATION'
}

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showPublicView, setShowPublicView] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [participations, setParticipations] = useState<HackathonParticipation[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
    github: '',
    linkedin: ''
  })

  // Simulation des données utilisateur
  useEffect(() => {
    if (user && isAuthenticated) {
      // Simuler les données de profil
      const mockProfile: UserProfile = {
        id: user.id || '1',
        name: user.name || 'John Doe',
        email: user.email || 'john.doe@example.com',
        image: user.image || '',
        bio: 'Développeur Full-Stack passionné par l\'IA et les technologies émergentes. J\'adore participer aux hackathons pour créer des solutions innovantes.',
        location: 'Paris, France',
        website: 'https://johndoe.dev',
        github: 'johndoe',
        linkedin: 'johndoe',
        joinDate: new Date('2023-01-15'),
        role: 'USER'
      }

      const mockStats: UserStats = {
        totalHackathons: 12,
        hackathonsWon: 3,
        totalProjects: 15,
        totalTeammates: 28,
        favoriteLanguages: ['JavaScript', 'Python', 'React', 'Node.js'],
        experienceYears: 4,
        totalPrizesMoney: 15000
      }

      const mockParticipations: HackathonParticipation[] = [
        {
          id: '1',
          hackathonTitle: 'AI Innovation Hackathon 2025',
          hackathonId: '1',
          position: 1,
          teamName: 'AI Pioneers',
          projectName: 'SmartCity Assistant',
          status: 'WINNER',
          startDate: new Date('2025-11-15'),
          endDate: new Date('2025-11-17'),
          technologies: ['Python', 'TensorFlow', 'React', 'Node.js'],
          prizeWon: 10000
        },
        {
          id: '2',
          hackathonTitle: 'Green Tech Challenge',
          hackathonId: '2',
          position: 3,
          teamName: 'EcoCoders',
          projectName: 'Carbon Tracker',
          status: 'FINALIST',
          startDate: new Date('2025-10-20'),
          endDate: new Date('2025-10-22'),
          technologies: ['JavaScript', 'Vue.js', 'Arduino', 'MongoDB'],
          prizeWon: 2500
        },
        {
          id: '3',
          hackathonTitle: 'Fintech Revolution',
          hackathonId: '3',
          teamName: 'BlockchainBros',
          projectName: 'DeFi Wallet',
          status: 'SUBMITTED',
          startDate: new Date('2025-09-01'),
          endDate: new Date('2025-09-03'),
          technologies: ['Solidity', 'Web3', 'React', 'Ethereum']
        }
      ]

      const mockAchievements: Achievement[] = [
        {
          id: '1',
          title: 'Premier Hackathon',
          description: 'Participez à votre premier hackathon',
          icon: '🎯',
          earnedDate: new Date('2023-02-15'),
          category: 'PARTICIPATION'
        },
        {
          id: '2',
          title: 'Champion',
          description: 'Gagnez votre premier hackathon',
          icon: '🏆',
          earnedDate: new Date('2023-06-20'),
          category: 'VICTORY'
        },
        {
          id: '3',
          title: 'Collaborateur',
          description: 'Travaillez avec plus de 20 personnes',
          icon: '🤝',
          earnedDate: new Date('2024-03-10'),
          category: 'COLLABORATION'
        },
        {
          id: '4',
          title: 'Innovateur',
          description: 'Créez un projet utilisant l\'IA',
          icon: '💡',
          earnedDate: new Date('2025-11-17'),
          category: 'INNOVATION'
        }
      ]

      setProfile(mockProfile)
      setUserStats(mockStats)
      setParticipations(mockParticipations)
      setAchievements(mockAchievements)
      
      setEditForm({
        name: mockProfile.name,
        bio: mockProfile.bio || '',
        location: mockProfile.location || '',
        website: mockProfile.website || '',
        github: mockProfile.github || '',
        linkedin: mockProfile.linkedin || ''
      })
    }
  }, [user, isAuthenticated])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleSaveProfile = () => {
    if (profile) {
      const updatedProfile = {
        ...profile,
        name: editForm.name,
        bio: editForm.bio,
        location: editForm.location,
        website: editForm.website,
        github: editForm.github,
        linkedin: editForm.linkedin
      }
      setProfile(updatedProfile)
      setIsEditing(false)
      // Ici, on enverrait les données au serveur
      console.log('Profil mis à jour:', updatedProfile)
    }
  }

  // Calculate profile completion percentage
  const calculateCompletionPercentage = () => {
    if (!profile) return 0
    
    // Same fields for both calculations to keep them synchronized
    const profileFields = [
      { name: 'Name', value: profile.name },
      { name: 'Profile Picture', value: profile.image },
      { name: 'Bio', value: profile.bio },
      { name: 'Location', value: profile.location },
      { name: 'Website', value: profile.website },
      { name: 'GitHub', value: profile.github },
      { name: 'LinkedIn', value: profile.linkedin },
    ]
    
    const filledFields = profileFields.filter(field => field.value && field.value.trim().length > 0).length
    return Math.round((filledFields / profileFields.length) * 100)
  }

  const getItemsToImprove = () => {
    if (!profile) return 7
    
    // Same fields as calculateCompletionPercentage to stay synchronized
    const profileFields = [
      { name: 'Name', value: profile.name },
      { name: 'Profile Picture', value: profile.image },
      { name: 'Bio', value: profile.bio },
      { name: 'Location', value: profile.location },
      { name: 'Website', value: profile.website },
      { name: 'GitHub', value: profile.github },
      { name: 'LinkedIn', value: profile.linkedin },
    ]
    
    return profileFields.filter(field => !field.value || field.value.trim().length === 0).length
  }

  const completionPercentage = calculateCompletionPercentage()
  const itemsToImprove = getItemsToImprove()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'WINNER': return 'bg-yellow-500'
      case 'FINALIST': return 'bg-purple-500'
      case 'SUBMITTED': return 'bg-blue-500'
      case 'REGISTERED': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'WINNER': return 'Gagnant'
      case 'FINALIST': return 'Finaliste'
      case 'SUBMITTED': return 'Soumis'
      case 'REGISTERED': return 'Inscrit'
      default: return status
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'PARTICIPATION': return '🎯'
      case 'VICTORY': return '🏆'
      case 'COLLABORATION': return '🤝'
      case 'INNOVATION': return '💡'
      default: return '⭐'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Accès restreint</h1>
          <p className="text-xl text-gray-600 mb-8">
            Vous devez être connecté pour accéder à votre profil.
          </p>
          <Link href="/auth/signin">
            <Button size="lg">Se connecter</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  if (!profile || !userStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Public View Indicator */}
        {showPublicView && (
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg mb-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">Public Profile View</h3>
                <p className="text-sm text-blue-100">This is how others see your profile</p>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setShowPublicView(false)}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <X className="w-4 h-4 mr-2" />
              Exit Preview
            </Button>
          </div>
        )}

        {/* Profile Header - Style épuré responsive */}
        <div className={`bg-white rounded-lg shadow-sm mb-8 hover:shadow-md transition-shadow duration-300 ${
          showPublicView ? 'border-2 border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50' : ''
        }`}>
          <div className="px-4 md:px-8 py-6">
            <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 w-full md:w-auto">
                <Avatar className="w-24 h-24 ring-4 ring-blue-100 shadow-lg hover:ring-blue-200 transition-all duration-300">
                  <AvatarImage src={profile.image} alt={profile.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-500 text-white text-3xl font-bold relative overflow-hidden">
                    {/* Pattern géométrique comme dans l'image */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-3 grid-rows-3 h-full w-full">
                        <div className="bg-white/30"></div>
                        <div className="bg-white/10"></div>
                        <div className="bg-white/30"></div>
                        <div className="bg-white/10"></div>
                        <div className="bg-white/40"></div>
                        <div className="bg-white/10"></div>
                        <div className="bg-white/30"></div>
                        <div className="bg-white/10"></div>
                        <div className="bg-white/30"></div>
                      </div>
                    </div>
                    <span className="relative z-10">{profile.name.charAt(0)}</span>
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {isEditing ? (
                      <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="text-3xl font-bold border-none p-0 h-auto bg-transparent"
                      />
                    ) : (
                      <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                    )}
                  </div>
                  <p className="text-gray-500 text-base mb-4">@{profile.email.split('@')[0]}</p>
                  
                  {/* Stats inline avec meilleur espacement */}
                  <div className="flex items-center gap-8 text-base">
                    <span className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
                      <strong className="text-gray-900 text-lg">{userStats.totalHackathons}</strong>
                      <span className="text-gray-600">Following</span>
                    </span>
                    <span className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
                      <strong className="text-gray-900 text-lg">{userStats.totalTeammates}</strong>
                      <span className="text-gray-600">Follower</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-4">
                {isEditing ? (
                  <div className="flex gap-3">
                    <Button 
                      size="default" 
                      onClick={handleSaveProfile}
                      className="bg-green-600 hover:bg-green-700 text-white shadow-md"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button 
                      size="default" 
                      variant="outline" 
                      onClick={handleEditToggle}
                      className="hover:bg-gray-100"
                    >
                      <X className="w-4 h-4" />
                      Annuler
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Button 
                      size="default" 
                      variant="outline"
                      onClick={() => setShowPublicView(!showPublicView)} 
                      className={`transition-all duration-200 ${
                        showPublicView 
                          ? 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <User className="w-4 h-4 mr-2" />
                      {showPublicView ? 'Private View' : 'Public View'}
                    </Button>
                    <Link href="/settings">
                      <Button 
                        size="default" 
                        variant="outline"
                        className="hover:bg-gray-50 transition-all duration-200"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </Link>
                    <Button 
                      size="default" 
                      onClick={handleEditToggle} 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 border-none shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Complete your profile section améliorée */}
            {!isEditing && !showPublicView && (
              <div className={`bg-gradient-to-r border rounded-xl p-6 mb-6 relative overflow-hidden transition-all duration-300 ${
                completionPercentage === 100 
                  ? 'from-green-50 to-emerald-50 border-green-200' 
                  : 'from-blue-50 to-indigo-50 border-blue-200'
              }`}>
                {/* Décoration de fond */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16 opacity-30 ${
                  completionPercentage === 100 ? 'bg-green-100' : 'bg-blue-100'
                }`}></div>
                <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-12 -translate-x-12 opacity-40 ${
                  completionPercentage === 100 ? 'bg-emerald-100' : 'bg-indigo-100'
                }`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        completionPercentage === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                      }`}>
                        {completionPercentage === 100 ? (
                          <Award className="w-5 h-5 text-white" />
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {completionPercentage === 100 ? 'Profile Complete!' : 'Complete your profile'}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-700 ease-out ${
                                completionPercentage === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                              }`}
                              style={{ width: `${completionPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-700">{completionPercentage}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {itemsToImprove > 0 ? (
                      <Badge variant="outline" className={`bg-white border-blue-300 text-blue-700 ${
                        itemsToImprove <= 2 ? 'animate-pulse' : ''
                      }`}>
                        {itemsToImprove} item{itemsToImprove > 1 ? 's' : ''} left
                      </Badge>
                    ) : (
                      <Badge className="bg-green-500 text-white">
                        ✓ Complete
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {completionPercentage === 100 
                      ? 'Excellent! Your profile is now complete and will attract more collaborators and opportunities.'
                      : 'Improving your profile can allow more investors to see your excellent self, and help you connect with the right opportunities.'
                    }
                  </p>
                  
                  {/* Missing fields indicator - Only show if profile is not 100% complete */}
                  {itemsToImprove > 0 && completionPercentage < 100 && (
                    <div className="mb-4 p-3 bg-white/60 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Still missing:</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: 'Name', filled: !!profile.name },
                          { name: 'Profile Picture', filled: !!profile.image },
                          { name: 'Bio', filled: !!profile.bio },
                          { name: 'Location', filled: !!profile.location },
                          { name: 'Website', filled: !!profile.website },
                          { name: 'GitHub', filled: !!profile.github },
                          { name: 'LinkedIn', filled: !!profile.linkedin },
                        ].filter(field => !field.filled).slice(0, 4).map((field, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-blue-50 border-blue-300 text-blue-700">
                            {field.name}
                          </Badge>
                        ))}
                        {itemsToImprove > 4 && (
                          <Badge variant="outline" className="text-xs bg-blue-50 border-blue-300 text-blue-700">
                            +{itemsToImprove - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    size="default" 
                    onClick={handleEditToggle} 
                    className={`border-none shadow-md transition-all duration-200 hover:shadow-lg ${
                      completionPercentage === 100 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                    }`}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    {completionPercentage === 100 ? 'Update Profile' : 'Complete Profile'}
                  </Button>
                </div>
              </div>
            )}

            {/* Public Profile Information */}
            {showPublicView && !isEditing && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-100 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Public Profile</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-gray-600">Profile is public and discoverable</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/70 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Profile Views</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">1,234</div>
                      <div className="text-xs text-gray-500">+12% this month</div>
                    </div>
                    
                    <div className="bg-white/70 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">Profile Rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="text-2xl font-bold text-gray-900">4.8</div>
                        <div className="flex">
                          {[1,2,3,4,5].map((star) => (
                            <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">Based on collaborations</div>
                    </div>
                    
                    <div className="bg-white/70 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-gray-700">Activity Score</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">89%</div>
                      <div className="text-xs text-gray-500">Very active</div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {profile.bio || "No bio available"}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {userStats.favoriteLanguages.map((tech, index) => (
                      <Badge key={index} variant="outline" className="bg-white/80 border-blue-300 text-blue-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Expanded editing form with enhanced UI */}
            {isEditing && (
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Edit3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
                    <p className="text-sm text-gray-600">Update your information to complete your profile</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <User className="w-4 h-4 text-blue-500" />
                        Bio
                      </label>
                      <Textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        placeholder="Tell us about yourself, your experience, and what drives your passion for hackathons..."
                        rows={5}
                        className="w-full border-2 border-gray-200 focus:border-blue-400 transition-colors duration-200 resize-none"
                      />
                      <div className="text-xs text-gray-500 mt-1">{editForm.bio?.length || 0}/500 characters</div>
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Location
                      </label>
                      <Input
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        placeholder="e.g. Paris, France"
                        className="w-full border-2 border-gray-200 focus:border-blue-400 transition-colors duration-200"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <Globe className="w-4 h-4 text-blue-500" />
                        Website
                      </label>
                      <Input
                        value={editForm.website}
                        onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                        placeholder="https://yourwebsite.com"
                        className="w-full border-2 border-gray-200 focus:border-blue-400 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <Github className="w-4 h-4 text-blue-500" />
                        GitHub Username
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm">github.com/</span>
                        </div>
                        <Input
                          value={editForm.github}
                          onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                          placeholder="username"
                          className="pl-24 border-2 border-gray-200 focus:border-blue-400 transition-colors duration-200"
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <Linkedin className="w-4 h-4 text-blue-500" />
                        LinkedIn Username
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm">linkedin.com/in/</span>
                        </div>
                        <Input
                          value={editForm.linkedin}
                          onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                          placeholder="username"
                          className="pl-32 border-2 border-gray-200 focus:border-blue-400 transition-colors duration-200"
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <Code className="w-4 h-4 text-blue-500" />
                        Skills & Technologies
                      </label>
                      <Input
                        placeholder="e.g. React, Node.js, Python, Machine Learning..."
                        className="w-full border-2 border-gray-200 focus:border-blue-400 transition-colors duration-200"
                      />
                      <div className="text-xs text-gray-500 mt-1">Separate skills with commas</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Share Profile Section (Public View Only) */}
        {showPublicView && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Share Profile</h4>
                <p className="text-sm text-gray-600">Let others discover your work</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="hover:bg-blue-50 hover:border-blue-300"
              >
                <Globe className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Button 
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        )}

        {/* Enhanced Stats Section - Moved before tabs */}
        <div className="mt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">Hackathons Won</h4>
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{userStats.hackathonsWon}</div>
              <div className="text-sm text-gray-600 mb-3">out of {userStats.totalHackathons} participated</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(userStats.hackathonsWon / userStats.totalHackathons) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {Math.round((userStats.hackathonsWon / userStats.totalHackathons) * 100)}% win rate
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">Total Projects</h4>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{userStats.totalProjects}</div>
              <div className="text-sm text-gray-600 mb-3">across all hackathons</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full w-3/4"></div>
                </div>
                <span className="text-xs text-gray-500">Active</span>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">Prize Money</h4>
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{userStats.totalPrizesMoney.toLocaleString()}€</div>
              <div className="text-sm text-gray-600 mb-3">total earnings</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-600 font-medium">↗ +25% this year</span>
                <span className="text-gray-500">Rank: Top 15%</span>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">Collaborations</h4>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{userStats.totalTeammates}</div>
              <div className="text-sm text-gray-600 mb-3">teammates worked with</div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-xs text-gray-500 ml-2">Excellent collaborator</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation Tabs - Style amélioré avec animations */}
        <Tabs defaultValue="overview" className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ${
          showPublicView ? 'border border-blue-200' : ''
        }`}>
          <div className="border-b border-gray-200">
            <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent py-4 px-6 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 relative group"
              >
                <span className="relative z-10">Overview</span>
                <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-30 transition-opacity duration-200 rounded-t-lg"></div>
              </TabsTrigger>
              <TabsTrigger 
                value="ideas" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent py-4 px-6 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 relative group"
              >
                <span className="relative z-10">Ideas</span>
                <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-30 transition-opacity duration-200 rounded-t-lg"></div>
              </TabsTrigger>
              <TabsTrigger 
                value="bookmarks" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent py-4 px-6 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 relative group"
              >
                <span className="relative z-10">Bookmarks</span>
                <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-30 transition-opacity duration-200 rounded-t-lg"></div>
              </TabsTrigger>
              <TabsTrigger 
                value="contributions" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent py-4 px-6 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 relative group"
              >
                <span className="relative z-10">My Contributions</span>
                <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-30 transition-opacity duration-200 rounded-t-lg"></div>
              </TabsTrigger>
              <TabsTrigger 
                value="collections" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent py-4 px-6 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 relative group"
              >
                <span className="relative z-10">BUIDL Collections</span>
                <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-30 transition-opacity duration-200 rounded-t-lg"></div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="p-6">
            <div className="max-w-4xl mx-auto">
              {/* Activity Chart - Full width */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="hackathons">Hackathons</SelectItem>
                      <SelectItem value="projects">Projects</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Activity Chart amélioré */}
                <div className="relative h-64 mb-6 bg-gray-50 rounded-lg p-4">
                  <div className="absolute inset-4 flex items-end justify-between">
                    {/* Months */}
                    {['Nov', 'Dec', '2025', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month, index) => {
                      const height = Math.random() * 60 + 10;
                      const isActive = index === 1 || index === 4;
                      return (
                        <div key={month} className="flex flex-col items-center group">
                          <div className="w-8 h-full relative mb-2">
                            {/* Grid lines */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-200"></div>
                            
                            {/* Activity bars avec animation */}
                            <div 
                              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 rounded-sm transition-all duration-500 hover:scale-110 cursor-pointer ${
                                isActive 
                                  ? 'bg-gradient-to-t from-blue-500 to-blue-400 shadow-md' 
                                  : 'bg-gray-200 hover:bg-gray-300'
                              }`}
                              style={{ 
                                height: `${height}%`,
                                animationDelay: `${index * 100}ms`
                              }}
                              title={`${month}: ${Math.floor(height/2)} contributions`}
                            >
                              {/* Effet de brillance pour les barres actives */}
                              {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12"></div>
                              )}
                            </div>
                          </div>
                          <span className={`text-xs transition-colors duration-200 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                            {month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Y-axis labels améliorés */}
                  <div className="absolute left-1 top-4 h-full flex flex-col justify-between text-xs text-gray-400 font-medium">
                    <span className="bg-gray-50 px-1">40</span>
                    <span className="bg-gray-50 px-1">30</span>
                    <span className="bg-gray-50 px-1">20</span>
                    <span className="bg-gray-50 px-1">10</span>
                    <span className="bg-gray-50 px-1">0</span>
                  </div>
                </div>

                <div className="text-center text-gray-500 mb-6">
                  <p className="text-lg font-semibold">There is no activity yet..</p>
                  <p className="text-sm mt-1">Showing all 0 activity.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Ideas Tab */}
          <TabsContent value="ideas" className="p-8">
            <div className="text-center py-16 relative">
              {/* Decorative background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <div className="grid grid-cols-6 gap-4">
                  {[...Array(24)].map((_, i) => (
                    <Lightbulb key={i} className="w-8 h-8" />
                  ))}
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Lightbulb className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Ideas Yet</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                  Start sharing your innovative ideas with the community. Your next breakthrough could inspire others!
                </p>
                <div className="space-y-3">
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Share Your First Idea
                  </Button>
                  <div className="text-sm text-gray-500">
                    Join 10k+ innovators sharing ideas
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks" className="p-8">
            <div className="text-center py-16 relative">
              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-16 h-16 bg-blue-100 rounded-full opacity-20"></div>
              <div className="absolute bottom-8 right-8 w-20 h-20 bg-blue-100 rounded-full opacity-20"></div>
              <div className="absolute top-1/3 right-16 w-12 h-12 bg-purple-100 rounded-full opacity-20"></div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Bookmark className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Bookmarks Yet</h3>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
                  Bookmark interesting projects and hackathons to view them later. 
                  Never lose track of inspiring ideas and opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/hackathons">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      Explore Hackathons
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600">
                    <Code className="w-4 h-4 mr-2" />
                    Browse Projects
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* My Contributions Tab */}
          <TabsContent value="contributions" className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">My Hackathon Contributions</h3>
                <Badge variant="outline">{participations.length} total</Badge>
              </div>

              <div className="space-y-6">
                {participations.map((participation, index) => (
                  <Card key={participation.id} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-400 bg-gradient-to-r from-white to-blue-50/30 group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Link 
                            href={`/hackathons/${participation.hackathonId}`}
                            className="text-xl font-bold hover:text-blue-600 transition-colors group-hover:underline"
                          >
                            {participation.hackathonTitle}
                          </Link>
                          <Badge className={`${getStatusColor(participation.status)} text-white shadow-sm`}>
                            {getStatusText(participation.status)}
                          </Badge>
                          {participation.position && participation.position <= 3 && (
                            <Badge className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-none shadow-sm">
                              🏆 #{participation.position}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Progress indicator */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div 
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < (participation.position ? 5 - participation.position + 1 : 3) 
                                    ? 'bg-blue-400' 
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            Performance Score
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {participation.startDate.toLocaleDateString('fr-FR', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.ceil((participation.endDate.getTime() - participation.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced info grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {participation.teamName && (
                        <div className="flex items-center gap-2 bg-white/60 rounded-lg p-3">
                          <Users className="w-4 h-4 text-blue-500" />
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Team</div>
                            <div className="font-medium text-gray-900">{participation.teamName}</div>
                          </div>
                        </div>
                      )}
                      
                      {participation.projectName && (
                        <div className="flex items-center gap-2 bg-white/60 rounded-lg p-3">
                          <Code className="w-4 h-4 text-blue-500" />
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Project</div>
                            <div className="font-medium text-gray-900">{participation.projectName}</div>
                          </div>
                        </div>
                      )}
                      
                      {participation.prizeWon && (
                        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                          <Trophy className="w-4 h-4 text-yellow-600" />
                          <div>
                            <div className="text-xs text-yellow-600 uppercase tracking-wide font-medium">Prize Won</div>
                            <div className="font-bold text-yellow-700">{participation.prizeWon.toLocaleString()}€</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Technologies with better styling */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Technologies Used:</div>
                      <div className="flex flex-wrap gap-2">
                        {participation.technologies.map((tech, techIndex) => (
                          <Badge 
                            key={techIndex} 
                            variant="outline" 
                            className="text-xs bg-white/80 border-gray-300 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-default"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* BUIDL Collections Tab */}
          <TabsContent value="collections" className="p-8">
            <div className="text-center py-16 relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-8 gap-8 transform rotate-12 scale-150">
                  {[...Array(32)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-sm animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:rotate-3 transition-transform duration-300">
                  <Briefcase className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Collections Yet</h3>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
                  Create collections to organize your favorite projects, resources, and inspirations. 
                  Build your own curated library of innovation.
                </p>
                <div className="space-y-4">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Create Your First Collection
                  </Button>
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Organize projects
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      Save resources
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Share with team
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}