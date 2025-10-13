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

export default function CollectionsPage() {
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

    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    }, 1000);
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

      <div>here collections</div>

      <Footer />
    </div>
  );
}
