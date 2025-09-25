'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Navbar } from '../../src/components/layout/Navbar'
import { Footer } from '../../src/components/layout/Footer'
import { Calendar, MapPin, Users, Trophy, Search, Filter } from 'lucide-react'
import Link from 'next/link'

interface Event {
  id: string
  title: string
  description: string
  imageUrl: string
  startDate: Date
  endDate: Date
  location: string
  isVirtual: boolean
  status: 'UPCOMING' | 'ACTIVE' | 'ENDED'
  participants: number
  prizePool: number
  organizer: string
  categories: string[]
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Web3 Innovation Challenge',
        description: 'Build the next generation of decentralized applications using cutting-edge blockchain technology.',
        imageUrl: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg',
        startDate: new Date('2025-02-15'),
        endDate: new Date('2025-02-17'),
        location: 'San Francisco, CA',
        isVirtual: false,
        status: 'UPCOMING',
        participants: 234,
        prizePool: 50000,
        organizer: 'TechCorp',
        categories: ['Blockchain', 'DeFi', 'Web3']
      },
      {
        id: '2',
        title: 'AI for Good Hackathon',
        description: 'Create AI solutions that address global challenges and make a positive impact on society.',
        imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
        startDate: new Date('2025-03-01'),
        endDate: new Date('2025-03-03'),
        location: 'Virtual Event',
        isVirtual: true,
        status: 'UPCOMING',
        participants: 156,
        prizePool: 25000,
        organizer: 'AI Foundation',
        categories: ['AI', 'Machine Learning', 'Social Impact']
      },
      {
        id: '3',
        title: 'Green Tech Challenge',
        description: 'Develop sustainable technology solutions to combat climate change and environmental issues.',
        imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
        startDate: new Date('2025-01-20'),
        endDate: new Date('2025-01-22'),
        location: 'Austin, TX',
        isVirtual: false,
        status: 'ENDED',
        participants: 189,
        prizePool: 35000,
        organizer: 'EcoTech',
        categories: ['Sustainability', 'CleanTech', 'IoT']
      },
      {
        id: '4',
        title: 'Mobile Innovation Summit',
        description: 'Push the boundaries of mobile technology with innovative apps and cutting-edge features.',
        imageUrl: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg',
        startDate: new Date('2025-01-10'),
        endDate: new Date('2025-01-12'),
        location: 'Virtual Event',
        isVirtual: true,
        status: 'ACTIVE',
        participants: 312,
        prizePool: 40000,
        organizer: 'MobileDev Inc',
        categories: ['Mobile', 'iOS', 'Android']
      }
    ]

    setTimeout(() => {
      setEvents(mockEvents)
      setFilteredEvents(mockEvents)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = events

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(event => event.status.toLowerCase() === statusFilter)
    }

    setFilteredEvents(filtered)
  }, [searchTerm, statusFilter, events])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'UPCOMING':
        return 'bg-blue-100 text-blue-800'
      case 'ENDED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Amazing Hackathons
          </h1>
          <p className="text-gray-600">
            Join innovative challenges, build incredible projects, and compete for amazing prizes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search events, categories, or organizers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ended">Ended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Trophy className="h-4 w-4 mr-1" />
                    ${(event.prizePool / 1000).toFixed(0)}K
                  </div>
                </div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.isVirtual ? 'Virtual Event' : event.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {event.participants} participants
                </div>
                <div className="flex flex-wrap gap-1">
                  {event.categories.slice(0, 3).map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/events/${event.id}`} className="w-full">
                  <Button className="w-full">
                    {event.status === 'ACTIVE' ? 'Join Now' : 'View Details'}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && !loading && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No events are currently available'}
            </p>
            <Button asChild>
              <Link href="/organize">Host Your Own Event</Link>
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}