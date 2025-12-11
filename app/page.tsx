import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '../src/components/layout/Navbar'
import { Footer } from '../src/components/layout/Footer'
import { Calendar, Users, Trophy, Code, ArrowRight, Zap, Globe, Shield } from 'lucide-react'
import HeroSection from '@/src/components/ui/home-components/HeroSection'
import HackathonsSection from '@/src/components/ui/home-components/HackathonSection'

export default function HomePage() {
  const features = [
    {
      icon: Calendar,
      title: 'Host Hackathons',
      description: 'Create and manage amazing hackathons with our comprehensive event management tools.',
    },
    {
      icon: Users,
      title: 'Build Teams',
      description: 'Connect with talented developers and form powerful teams for your next big project.',
    },
    {
      icon: Trophy,
      title: 'Compete & Win',
      description: 'Showcase your skills, compete with the best, and win exciting prizes.',
    },
    {
      icon: Code,
      title: 'Submit Projects',
      description: 'Share your innovations with the community and get feedback from industry experts.',
    },
  ]

  const stats = [
    { label: 'Active Hackathons', value: '50+' },
    { label: 'Registered Users', value: '10K+' },
    { label: 'Projects Submitted', value: '5K+' },
    { label: 'Prize Pool', value: '$500K+' },
  ]

    const hackathons = [
    {
      id: 1,
      title: "Hedera Hackathon NYC",
      status: "Open" as const,
      date: "Feb 15, 2025",
      location: "New York",
      participants: "500+ participants",
      prize: "$15,000",
    },
    {
      id: 2,
      title: "DeFi Builder Summit",
      status: "Open" as const,
      date: "Mar 20, 2025",
      location: "San Francisco",
      participants: "300+ participants",
      prize: "$25,000",
    },
    {
      id: 3,
      title: "NFT Innovation Week",
      status: "Coming Soon" as const,
      date: "Apr 5, 2025",
      location: "Miami",
      participants: "400+ participants",
      prize: "$20,000",
    },
    {
      id: 4,
      title: "Web3 Gaming Jam",
      status: "Coming Soon" as const,
      date: "May 10, 2025",
      location: "Austin",
      participants: "250+ participants",
      prize: "$18,000",
    },
    {
      id: 5,
      title: "Web3 Gaming Jam",
      status: "Coming Soon" as const,
      date: "May 10, 2025",
      location: "Austin",
      participants: "250+ participants",
      prize: "$18,000",
    },
    {
      id: 6,
      title: "Web3 Gaming Jam",
      status: "Coming Soon" as const,
      date: "May 10, 2025",
      location: "Austin",
      participants: "250+ participants",
      prize: "$18,000",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
           <HeroSection />
           <HackathonsSection hackathons={hackathons.slice(0, 4)}/>
        </div>
      </section>

      <Footer />
    </div>
  )
}