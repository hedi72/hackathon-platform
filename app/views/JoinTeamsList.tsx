"use client";

import { useEffect, useState } from "react";
import { getHackathonTeams } from "../api/team/getTeams";


export default function JoinTeamList({ hackathonId, token }) {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    if (!token) return;

    getHackathonTeams(hackathonId, token)
      .then((res) => setTeams(res.data || []))
      .catch(console.error);
  }, [hackathonId, token]);

  const filtered = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        placeholder="🔍 search for teams..."
        className="w-full p-3 border rounded-lg"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {filtered.map((team) => (
          <div key={team.id} onClick={() => setSelectedTeam(team)}>
            <TeamCard team={team} />
          </div>
        ))}
      </div>

      {selectedTeam && (
        <TeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
      )}
    </div>
  );
}

function TeamCard({ team }) {
  const leader = team.members.find((m) => m.isLeader)?.user;

  return (
    <div className="p-5 bg-white rounded-xl shadow cursor-pointer hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        <img
          src={team.image || "/images/default-team.png"}
          className="w-16 h-16 rounded-lg"
        />
        <div>
          <p className="font-bold text-lg">{team.name}</p>
          <p className="text-sm text-gray-600">
            Leader: {leader?.name || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}
