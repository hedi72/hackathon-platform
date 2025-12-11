import React from "react";
import ButtonUI from "../button";
import HackathonCard from "../hackathon-components/hackathonCard";

interface Hackathon {
  id: number;
  title: string;
  status: "Open" | "Coming Soon";
  date: string;
  location: string;
  participants: string;
  prize: string;
}

interface HackathonsSectionProps {
  hackathons: Hackathon[];
}



export default function HackathonsSection({
  hackathons,
}: HackathonsSectionProps) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="bg-yellow-400 text-black px-3 py-1 rounded-xl text-sm font-semibold border-2 border-black">
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
          View All &rarr;
        </ButtonUI>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hackathons.map((hackathon) => (
         <HackathonCard hackathon={hackathon}/>
        ))}
      </div>
    </div>
  );
}
