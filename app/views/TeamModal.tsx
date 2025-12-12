"use client";

import { FiX } from "react-icons/fi";

export default function TeamModal({ team, onClose }) {
  const leader = team.members.find((m) => m.isLeader)?.user;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl relative shadow-lg">

        {/* CLOSE BUTTON */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <FiX size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-2">Open Role</h2>
        <p className="text-gray-600 mb-6">
          Message team if you are interested in their open roles.
        </p>

        {/* TEAM HEADER */}
        <div className="flex gap-4 items-center">
          <img
            src={team.image || "/images/default-team.png"}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold">{team.name}</h3>
            <p className="text-sm text-gray-600">
              Leader: {leader?.name || "Unknown"}
            </p>
          </div>
        </div>

        {/* OPEN ROLES */}
        <div className="mt-4">
          <p className="font-semibold text-gray-700 mb-2">Open Roles</p>
          <div className="flex gap-2 flex-wrap">
            {(team.openRoles || []).map((role, i) => (
              <span key={i} className="bg-orange-100 text-orange-700 px-3 py-1 text-sm rounded-full">
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* TEAM DESCRIPTION */}
        <div className="mt-6">
          <p className="font-semibold">Description</p>
          <p className="text-gray-700 mt-1">{team.tagline || "No description."}</p>
        </div>

        {/* MESSAGE BUTTON */}
        <button
          className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold"
          onClick={() => alert("Message feature coming soon!")}
        >
          Message
        </button>
      </div>
    </div>
  );
}
