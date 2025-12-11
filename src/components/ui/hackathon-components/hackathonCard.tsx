// components/HackathonCard.tsx
import React from "react";
import { Hackathon } from "../home-components/HackathonSection";

interface HackathonCardProps {
  className?: string;
  hackathon: Hackathon;
}

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-green-500 text-white",
  DRAFT: "bg-gray-300 text-gray-900",
  ARCHIVED: "bg-gray-400 text-white",
};

export default function HackathonCard({ className = "", hackathon }: HackathonCardProps) {
  return (
    <div
      className={`bg-white border-[3px] border-[#18191F] shadow-[4px_4px_0px_#151528] rounded-xl p-6 flex flex-col justify-between text-left ${className}`}
    >
      <span
        className={`w-fit px-2 py-1 rounded-full text-xs font-semibold border-2 border-black ${
          statusStyles[hackathon.status] || "bg-gray-200 text-gray-700"
        }`}
      >
        {hackathon.status == "ACTIVE" ? "Open" : hackathon.status}
      </span>

      <h3 className="text-xl font-bold mt-3">{hackathon.title}</h3>

      <div className="mt-2 text-gray-600 text-sm space-y-1">
        <div>📅 Starts: {new Date(hackathon.startDate || "").toLocaleDateString()}</div>
        <div>🏷 Type: {hackathon.type}</div>
        <div>🏢 Org: {hackathon.organization?.name}</div>
      </div>

      <div className="mt-4 pt-4 border-t border-dashed border-gray-300 flex justify-between items-center">
        <span className="flex items-center gap-1 text-sm font-semibold">
          🏆 Prize Pool
        </span>
        <span className="text-primary-500 font-bold">
          {hackathon.prizePool} {hackathon.prizeToken}
        </span>
      </div>
    </div>
  );
}
