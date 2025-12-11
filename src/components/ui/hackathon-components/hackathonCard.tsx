// components/HackathonCard.tsx
import React from 'react';
import { Calendar, MapPin, Users, Award } from 'lucide-react';

interface HackathonCardProps {
  className?: string;
  hackathon: {
    id: number;
    title: string;
    status: "Open" | "Coming Soon";
    date: string;
    location: string;
    participants: string;
    prize: string;
  };
}

const statusStyles = {
  Open: "bg-green-500 text-white",
  "Coming Soon": "bg-gray-200 text-gray-800",
};

const borderStyles = {
  Open: "border-green-500",
  "Coming Soon": "border-yellow-500",
};

const HackathonCard: React.FC<HackathonCardProps> = ({ className = '', hackathon }) => {
  return (
     <div
            key={hackathon.id}
            className="bg-white 
            border-[3px] border-[#18191F] 
            shadow-[4px_4px_0px_#151528] 
            rounded-xl 
            p-6 
            flex flex-col 
            justify-between text-left"
          >
            <span
              className={`w-fit px-2 py-1 rounded-full text-xs font-semibold border-2 border-black ${
                statusStyles[hackathon.status]
              }`}
            >
              {hackathon.status}
            </span>
            <h3 className="text-xl font-bold mt-3">{hackathon.title}</h3>
            <div className="mt-2 text-gray-600 text-sm space-y-1">
              <div>📅 {hackathon.date}</div>
              <div>📍 {hackathon.location}</div>
              <div>👥 {hackathon.participants}</div>
            </div>
            <div className="mt-4 pt-4 border-t border-dashed border-gray-300 flex justify-between items-center">
              <span className="flex items-center gap-1 text-sm font-semibold">
                🏆 Prize Pool
              </span>
              <span className="text-primary-500 font-bold">
                {hackathon.prize}
              </span>
            </div>
          </div>
  );
};

export default HackathonCard;