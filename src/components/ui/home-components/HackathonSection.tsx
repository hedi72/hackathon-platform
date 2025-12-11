"use client"
import React, { useEffect, useState } from "react";
import ButtonUI from "../button";
import HackathonCard from "../hackathon-components/hackathonCard";
import { getHackathons } from "@/src/api/hackathon/hackathons";

export interface Hackathon {
  id: string;
  title: string;
  slug: string;
  status: "ACTIVE" | "DRAFT" | "ARCHIVED" | "CANCELLED" | string;
  type: string;
  category: {
    id: string;
    name: string;
    description: string;
  } | null;
  banner: string | null;
  tagline: string;
  prizePool: number;
  prizeToken: string;
  isPrivate: boolean;
  registrationStart: string;
  registrationEnd: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  organization: {
    id: string;
    name: string;
    slug: string;
    logo: string;
  } | null;
}


export default function HackathonsSection() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);

  useEffect(() => {
    async function load() {
      const res = await getHackathons({
        page: 1,
        limit: 10,
      });

      const mapped = res.data.map((h: any) => ({
        id: h.id,
        title: h.title,
        status: h.status === "ACTIVE" ? "Open" : "Coming Soon",
        date: new Date(h.startDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        location: h.type === "ONLINE" ? "Online" : h.organization?.name ?? "Unknown",
        participants: "N/A",
        prize: `$${h.prizePool?.toLocaleString() ?? 0}`,
      }));

      setHackathons(res.data);
    }

    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="bg-primary-600 text-black px-3 py-1 rounded-xl text-sm font-semibold border-2 border-black">
          Hackathons
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-left">
            Build, Compete, Win
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            Join exciting hackathons, showcase your skills, and win amazing
            prizes.
          </p>
        </div>

        <ButtonUI variant="outline" size="sm" withShadow>
          View All →
        </ButtonUI>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hackathons.map((hackathon) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}
      </div>
    </div>
  );
}
