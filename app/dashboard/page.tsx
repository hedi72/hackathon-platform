'use client'

import { useAuth } from '../../src/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Navbar } from '../../src/components/layout/Navbar'
import { Footer } from '../../src/components/layout/Footer'
import { Calendar, Code, Users, Trophy, Plus, ArrowRight, Activity } from 'lucide-react'
import Link from 'next/link'

interface DashboardData {
  upcomingEvents: any[]
  myProjects: any[]
  recentActivity: any[]
  stats: {
    eventsJoined: number
    projectsSubmitted: number
    votesReceived: number
    eventsOrganized: number
  }
}

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin')
      return
    }

    if (isAuthenticated) {
      // In a real app, this would fetch from API
      // For demo, using mock data
      setTimeout(() => {
        setDashboardData({
          upcomingEvents: [
            {
              id: '1',
              title: 'Web3 Innovation Challenge',
              startDate: new Date('2025-02-15'),
              status: 'UPCOMING',
              participants: 234
            },
            {
              id: '2',
              title: 'AI for Good Hackathon',
              startDate: new Date('2025-03-01'),
              status: 'UPCOMING',
              participants: 156
            }
          ],
          myProjects: [
            {
              id: '1',
              title: 'EcoTrack App',
              event: 'Green Tech Challenge',
              votes: 23,
              status: 'ACTIVE'
            },
            {
              id: '2',
              title: 'Smart City Dashboard',
              event: 'Urban Innovation Hack',
              votes: 45,
              status: 'COMPLETED'
            }
          ],
          recentActivity: [
            { type: 'vote', message: 'Your project "EcoTrack App" received a new vote', time: '2 hours ago' },
            { type: 'join', message: 'You joined "AI for Good Hackathon"', time: '1 day ago' },
            { type: 'submit', message: 'You submitted "Smart City Dashboard"', time: '3 days ago' }
          ],
          stats: {
            eventsJoined: 8,
            projectsSubmitted: 5,
            votesReceived: 127,
            eventsOrganized: user?.role === 'ORGANIZER' ? 3 : 0
          }
        })
        setLoading(false)
      }, 1000)
    }
  }, [isAuthenticated, isLoading, router, user])

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg" />
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (!dashboardData) return null

  const { upcomingEvents, myProjects, recentActivity, stats } = dashboardData

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with your projects and events.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.eventsJoined}</p>
                <p className="text-sm text-gray-600">Events Joined</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Code className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.projectsSubmitted}</p>
                <p className="text-sm text-gray-600">Projects Submitted</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Trophy className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.votesReceived}</p>
                <p className="text-sm text-gray-600">Votes Received</p>
              </div>
            </CardContent>
          </Card>
          {user?.role === 'ORGANIZER' && (
            <Card>
              <CardContent className="flex items-center p-6">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.eventsOrganized}</p>
                  <p className="text-sm text-gray-600">Events Organized</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Events you&apos;re registered for</CardDescription>
                  </div>
                  <Link href="/events">
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-gray-600">
                          {event.startDate.toLocaleDateString()} • {event.participants} participants
                        </p>
                      </div>
                      <Badge variant="outline">{event.status}</Badge>
                    </div>
                  ))}
                  {upcomingEvents.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No upcoming events</p>
                      <Link href="/events">
                        <Button variant="link">Browse events</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* My Projects */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>My Projects</CardTitle>
                    <CardDescription>Your submitted projects</CardDescription>
                  </div>
                  <Link href="/projects/create">
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Project
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-gray-600">
                          {project.event} • {project.votes} votes
                        </p>
                      </div>
                      <Badge variant={project.status === 'ACTIVE' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                  ))}
                  {myProjects.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Code className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No projects yet</p>
                      <Link href="/projects/create">
                        <Button variant="link">Create your first project</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>My Events</CardTitle>
                <CardDescription>All events you&apos;ve participated in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No events yet</h3>
                  <p className="mb-4">Start joining hackathons to see them here</p>
                  <Link href="/events">
                    <Button>Browse Events</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Projects</CardTitle>
                  <CardDescription>All your submitted projects</CardDescription>
                </div>
                <Link href="/projects/create">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {myProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myProjects.map((project) => (
                      <Card key={project.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant={project.status === 'ACTIVE' ? 'default' : 'secondary'}>
                              {project.status}
                            </Badge>
                            <p className="text-sm text-gray-600">{project.votes} votes</p>
                          </div>
                          <h3 className="font-semibold mb-2">{project.title}</h3>
                          <p className="text-sm text-gray-600 mb-4">{project.event}</p>
                          <Button variant="outline" size="sm">
                            View Project
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Code className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                    <p className="mb-4">Create your first project and start building</p>
                    <Link href="/projects/create">
                      <Button>Create Project</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest interactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                        <Activity className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Activity className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">No recent activity</h3>
                    <p>Your activity will appear here as you use the platform</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  )
}