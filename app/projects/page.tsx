"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "../../src/components/layout/Navbar";
import { Footer } from "../../src/components/layout/Footer";
import { Calendar, MapPin, Users, Trophy, Search, Filter } from "lucide-react";
import Link from "next/link";
import BuidlCard from "@/src/components/ui/buidlCard";

interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  location: string;
  isVirtual: boolean;
  status: "UPCOMING" | "ACTIVE" | "ENDED";
  participants: number;
  prizePool: number;
  organizer: string;
  categories: string[];
}

export default function ProjectsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockEvents: Event[] = [
      {
        id: "1",
        title: "Web3 Innovation Challenge",
        description:
          "Build the next generation of decentralized applications using cutting-edge blockchain technology.",
        imageUrl:
          "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
        startDate: new Date("2025-02-15"),
        endDate: new Date("2025-02-17"),
        location: "San Francisco, CA",
        isVirtual: false,
        status: "UPCOMING",
        participants: 234,
        prizePool: 50000,
        organizer: "TechCorp",
        categories: ["Blockchain", "DeFi", "Web3"],
      },
      {
        id: "2",
        title: "AI for Good Hackathon",
        description:
          "Create AI solutions that address global challenges and make a positive impact on society.",
        imageUrl:
          "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
        startDate: new Date("2025-03-01"),
        endDate: new Date("2025-03-03"),
        location: "Virtual Event",
        isVirtual: true,
        status: "UPCOMING",
        participants: 156,
        prizePool: 25000,
        organizer: "AI Foundation",
        categories: ["AI", "Machine Learning", "Social Impact"],
      },
      {
        id: "3",
        title: "Green Tech Challenge",
        description:
          "Develop sustainable technology solutions to combat climate change and environmental issues.",
        imageUrl:
          "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
        startDate: new Date("2025-01-20"),
        endDate: new Date("2025-01-22"),
        location: "Austin, TX",
        isVirtual: false,
        status: "ENDED",
        participants: 189,
        prizePool: 35000,
        organizer: "EcoTech",
        categories: ["Sustainability", "CleanTech", "IoT"],
      },
      {
        id: "4",
        title: "Mobile Innovation Summit",
        description:
          "Push the boundaries of mobile technology with innovative apps and cutting-edge features.",
        imageUrl:
          "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg",
        startDate: new Date("2025-01-10"),
        endDate: new Date("2025-01-12"),
        location: "Virtual Event",
        isVirtual: true,
        status: "ACTIVE",
        participants: 312,
        prizePool: 40000,
        organizer: "MobileDev Inc",
        categories: ["Mobile", "iOS", "Android"],
      },
    ];

    // setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    // }, 1000);
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.categories.some((cat) =>
            cat.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (event) => event.status.toLowerCase() === statusFilter
      );
    }

    setFilteredEvents(filtered);
  }, [searchTerm, statusFilter, events]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "UPCOMING":
        return "bg-blue-100 text-blue-800";
      case "ENDED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Banner */}
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden mb-8"
          style={{
            backgroundImage: `url(${filteredEvents[1]?.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />

          {/* Centered content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
            <h1 className="text-3xl sm:text-4xl font-bold">
              The home for BUIDLs
            </h1>
            <p className="max-w-2xl mt-2 text-sm sm:text-base text-gray-200">
              {filteredEvents[1]?.description}
            </p>
            <div className="flex items-center mt-4 text-sm text-gray-200">
              <Trophy className="h-4 w-4 mr-2" />$
              {((filteredEvents[1]?.prizePool || 0) / 1000).toFixed(0)}K
            </div>
          </div>
        </div>

        {/* Filters */}
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 sticky top-16 bg-gray-50 z-20">
          {/* Left side */}
          <Button className="bg-blue-600 text-white font-semibold shadow-md hover:bg-blue">
            Create BUIDL
          </Button>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search BUIDLs"
                className="pl-10 w-60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-44">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEvents.map((event) => (
            <BuidlCard
              key={event.id}
              avatarUrl="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg"
              author={event.organizer}
              projectImage={event.imageUrl}
              title={event.title}
              description={event.description}
              categories={event.categories} 
            />
          ))}
        </div>

        {filteredEvents.length === 0 && !loading && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No events are currently available"}
            </p>
            <Button asChild>
              <Link href="/organize">Host Your Own Event</Link>
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
