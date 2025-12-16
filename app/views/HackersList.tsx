"use client";

import { useEffect, useState } from "react";
import { useToken } from "@/app/context/TokenContext";
import { FiUsers, FiMail } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";
import { getHackathonRegistrations } from "../api/hackathon/getRegistrations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HackersList({ hackathonId }) {
  const { token } = useToken();
  const [hackers, setHackers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!token) return;

    getHackathonRegistrations(hackathonId, token)
      .then((res) => {
        console.log("📌 API returned:", res);
        setHackers(res.data || []); // EXTRACT THE ARRAY HERE
      })
      .catch((err) => console.error(err));
  }, [hackathonId, token]);

  const filtered = hackers.filter((h) =>
    h.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* SEARCH BAR */}
      <div className="max-w-xl mb-6">
        <input
          type="text"
          placeholder="🔍 search for hackers..."
          className="w-full p-3 border rounded-lg shadow-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((h) => {
          const user = h.user;

          return (
            <div
              key={h.id}
              className="p-5 bg-white rounded-xl shadow hover:shadow-md transition relative"
            >
              {/* CARD CONTENT */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={user?.image || ""}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="bg-orange-100 text-orange-700 font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.username}</p>

                  <span className="inline-block mt-1 text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                    BUIDL Submitted
                  </span>
                </div>

                <FaChevronRight className="absolute right-4 top-6 text-gray-400" />
              </div>

              <div className="mt-4 flex gap-4 text-gray-600 text-lg">
                <FiUsers className="cursor-pointer hover:text-black" />
                <FiMail className="cursor-pointer hover:text-black" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
