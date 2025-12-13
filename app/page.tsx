"use client";




import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '../src/components/layout/Navbar'
import { Footer } from '../src/components/layout/Footer'
import { Calendar, Users, Trophy, Code, ArrowRight, Zap, Globe, Shield } from 'lucide-react'
import HeroSection from '@/src/components/ui/home-components/HeroSection'
import HackathonsSection from '@/src/components/ui/home-components/HackathonSection'
import ExploreCategories from '@/src/components/ui/home-components/ExploreCategories'
import CertificationSection from '@/src/components/ui/home-components/CertificationSection'
import FAQSection from '@/src/components/ui/home-components/FAQSection'
import JoinCommunitySection from '@/src/components/ui/home-components/JoinCommunitySection'
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from './context/UserContext';
import { getCurrentUser } from './api/auth/getCurrentUser';
import { useEffect } from 'react';

export default function HomePage() {

  const params = useSearchParams();
  const router = useRouter();
  const { setUser } = useUser();
 useEffect(() => {
    const token = params.get("token");

    if (!token) return; // normal visit, nothing to do

    console.log("✅ OAuth token detected on home page");

    // 1️⃣ Store token
    localStorage.setItem("token", token);

    // 2️⃣ Clean URL (remove ?token=...)
    router.replace("/");

    // 3️⃣ Fetch user
    getCurrentUser().then((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("name", user.username || "");
      }
    });
  }, [params, router, setUser]);


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

 

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-full mx-auto text-center">
           <HeroSection />
           <div className='border-2 border-black min-w-full mt-10 mb-6'></div>
           <HackathonsSection/>
           <ExploreCategories/>
           <CertificationSection/>
           <FAQSection/>
           <JoinCommunitySection/>
        </div>
      </section>
      <Footer />
    </div>
  )
}