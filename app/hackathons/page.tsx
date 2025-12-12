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
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import HackathonCard from "@/src/components/ui/hackathon-components/hackathonCard";
import { Hackathon } from "@/src/components/ui/home-components/HackathonSection";
import { getHackathons } from "@/src/api/hackathon/hackathons";
import ButtonUI from "@/src/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredHackathons, setFilteredHackathons] = useState<Hackathon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
     const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
     const router = useRouter();
  
  
    useEffect(() => {
      async function load() {
        const res = await getHackathons({
          page: 1,
          limit: 10,
          category: selectedCategory || undefined,
        });
  
        setHackathons(res.data);
        setFilteredHackathons(res.data);
        setLoading(false);
      }
  
      load();
    }, []);


  useEffect(() => {
    let filtered = hackathons;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event?.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (event) => event.status.toLowerCase() === statusFilter
      );
    }

    setFilteredHackathons(filtered);
  }, [searchTerm, statusFilter, hackathons]);

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

  function HeroCarousel({
    slides,
  }: {
    slides: { src: string; title?: string; href?: string }[];
  }) {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [selected, setSelected] = useState(0);
    const [snaps, setSnaps] = useState<number[]>([]);

    useEffect(() => {
      if (!api) return;
      setSnaps(api.scrollSnapList());
      const onSelect = () => setSelected(api.selectedScrollSnap());
      api.on("select", onSelect);
      api.on("reInit", onSelect);
      onSelect();
      return () => {
        api.off("select", onSelect);
        api.off("reInit", onSelect);
      };
    }, [api]);

    return (
      <Carousel
        className="w-full max-w-[680px]"
        opts={{ loop: true, align: "start" }}
        setApi={setApi}
        plugins={[Autoplay({ delay: 4000, stopOnMouseEnter: true })]}
      >
        <CarouselContent>
          {slides.map((s, i) => (
            <CarouselItem key={i} className="basis-full">
              <a href={s.href ?? "#"} className="block">
                <div className="relative h-[260px] overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={s.src}
                    alt={s.title ?? ""}
                    className="h-full w-full object-cover"
                  />
                  {s.title ? (
                    <div className="absolute left-4 bottom-4 right-4 text-white drop-shadow">
                      <p className="text-lg font-semibold">{s.title}</p>
                    </div>
                  ) : null}
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="bg-white shadow" />
        <CarouselNext className="bg-white shadow" />

        <div className="mt-3 flex justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={
                "h-2 w-2 rounded-full transition-all " +
                (selected === i
                  ? "w-4 bg-orange-500"
                  : "bg-gray-300 hover:bg-gray-400")
              }
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </Carousel>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left: heading + copy + buttons */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Discover Amazing Hackathons
              </h1>
              <p className="items-center text-gray-600 mb-4">
                Join innovative challenges, build incredible projects and
                Hackathons, and compete for amazing prizes.
              </p>
              <div className="flex items-center gap-3">
                {/* <Link href="/hackathons/create">
                   <ButtonUI
                    size="md"
                    variant="primary"
                    withShadow
                    className="inline-flex items-center gap-2"
                  >
                    Create a hackathon 
                  </ButtonUI>
                </Link> */}
                <Link href="/auth/signup">
                  <ButtonUI
                    size="md"
                    variant="outline"
                    withShadow
                    className="inline-flex items-center gap-2"
                  >
                    View Guide
                  </ButtonUI>
                </Link>
              </div>
            </div>

            {/* Right: carousel pinned to the extreme right */}
            <div className="flex justify-end">
              <HeroCarousel
                slides={(events.length
                  ? events
                  : [
                      {
                        src: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
                        title: "Web3 Innovation Challenge",
                      },
                      {
                        src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
                        title: "AI for Good Hackathon",
                      },
                      {
                        src: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
                        title: "Green Tech Challenge",
                      },
                    ]
                )
                  .slice(0, 6)
                  .map((e) => ({
                    src: (e as any).imageUrl ?? e.src,
                    title: (e as any).title,
                    href: (e as any).id
                      ? `/events/${(e as any).id}`
                      : undefined,
                  }))}
              />
            </div>
          </div>
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
          {filteredHackathons.map((event) => (
              <div
            key={event.id}
            onClick={() => router.push(`/hackathons/${event.id}`)}
            className="cursor-pointer"
          >
            <HackathonCard  key={event.id} hackathon={event}></HackathonCard>
            </div>
            // <Card
            //   key={event.id}
            //   className="overflow-hidden hover:shadow-lg transition-shadow"
            // >
            //   <div className="aspect-video bg-gray-200">
            //     <img
            //       src={event.imageUrl}
            //       alt={event.title}
            //       className="w-full h-full object-cover"
            //     />
            //   </div>
            //   <CardHeader>
            //     <div className="flex items-center justify-between mb-2">
            //       <Badge className={getStatusColor(event.status)}>
            //         {event.status}
            //       </Badge>
            //       <div className="flex items-center text-sm text-gray-600">
            //         <Trophy className="h-4 w-4 mr-1" />$
            //         {(event.prizePool / 1000).toFixed(0)}K
            //       </div>
            //     </div>
            //     <CardTitle className="text-lg">{event.title}</CardTitle>
            //     <CardDescription className="line-clamp-2">
            //       {event.description}
            //     </CardDescription>
            //   </CardHeader>
            //   <CardContent className="space-y-3">
            //     <div className="flex items-center text-sm text-gray-600">
            //       <Calendar className="h-4 w-4 mr-2" />
            //       {event.startDate.toLocaleDateString()} -{" "}
            //       {event.endDate.toLocaleDateString()}
            //     </div>
            //     <div className="flex items-center text-sm text-gray-600">
            //       <MapPin className="h-4 w-4 mr-2" />
            //       {event.isVirtual ? "Virtual Event" : event.location}
            //     </div>
            //     <div className="flex items-center text-sm text-gray-600">
            //       <Users className="h-4 w-4 mr-2" />
            //       {event.participants} participants
            //     </div>
            //     <div className="flex flex-wrap gap-1">
            //       {event.categories.slice(0, 3).map((category) => (
            //         <Badge
            //           key={category}
            //           variant="secondary"
            //           className="text-xs"
            //         >
            //           {category}
            //         </Badge>
            //       ))}
            //     </div>
            //   </CardContent>
            //   <CardFooter>
            //     <Link href={`/events/${event.id}`} className="w-full">
            //       <Button className="w-full">
            //         {event.status === "ACTIVE" ? "Join Now" : "View Details"}
            //       </Button>
            //     </Link>
            //   </CardFooter>
            // </Card>
          ))}
        </div>

        {/* {filteredEvents.length === 0 && !loading && (
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
        )} */}
      </div>

      <Footer />
    </div>
  );
}
