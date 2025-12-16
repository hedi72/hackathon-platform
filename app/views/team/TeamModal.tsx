"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "@/src/hooks/useAuth";
import CreatePositionModal from "./CreatePositionModal";
import UpdatePositionModal from "./UpdatePositionModal";
import { applyToPosition } from "@/app/api/team/applyToPosition";

export default function TeamModal({ team, hackathonId, onClose }) {
  const { user } = useAuth();
  const leader = team.members.find((m) => m.isLeader)?.user;

  const [showCreatePosition, setShowCreatePosition] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  const [applyingId, setApplyingId] = useState<string | null>(null);

 const [positions, setPositions] = useState(team.teamPositions || []);


  const isLeader = team.members.some(
    (m) => m.isLeader && m.user?.id === user?.id
  );

  async function handleApply(positionId: string) {
    try {
      setApplyingId(positionId);

     await applyToPosition(
  hackathonId,        // ✅ FIX — use the prop
  team.id,
  positionId,
  "I am a great developer and I want to join the team"
);


      alert("✅ Application sent successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to apply");
    } finally {
      setApplyingId(null);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl relative shadow-lg">
        {/* CLOSE */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <FiX size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-1">Open Roles</h2>
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

        {/* ADD POSITION (LEADER) */}
        {isLeader && (
          <button
            onClick={() => setShowCreatePosition(true)}
            className="mt-6 px-4 py-2 bg-[#FEC601] border border-[#18191F] rounded-lg font-semibold"
          >
            + Add Position
          </button>
        )}

        {/* POSITIONS */}
        <div className="mt-6 space-y-4">
          {positions.length === 0 ? (
            <p className="text-gray-500">No open positions yet</p>
          ) : (
            positions.map((pos) => (
              <div
                key={pos.id}
                className="border rounded-2xl p-5 hover:shadow-md transition"
              >
                {/* HEADER */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{pos.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {pos.description}
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                    {pos.status}
                  </span>

                
                </div>
                

                {/* ACTIONS */}
                <div className="mt-5 flex items-center justify-between">
                  {isLeader ? (
                    <button
                      onClick={() => setEditingPosition(pos)}
                      className="text-sm underline text-gray-600 hover:text-black"
                    >
                      Edit position
                    </button>
                  ) : (
                    <span />
                  )}

                  {!isLeader && pos.status === "OPEN" && (
                    <button
                      disabled={applyingId === pos.id}
                      onClick={() => handleApply(pos.id)}
                      className={`px-5 py-2 rounded-lg text-sm font-medium text-white ${
                        applyingId === pos.id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-black hover:bg-gray-900"
                      }`}
                    >
                      {applyingId === pos.id ? "Applying…" : "Apply"}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODALS */}
      {showCreatePosition && (
        <CreatePositionModal
          hackathonId={hackathonId}
          teamId={team.id}
          onClose={() => setShowCreatePosition(false)}
        />
      )}

    {editingPosition && (
  <UpdatePositionModal
    hackathonId={hackathonId}
    teamId={team.id}
    position={editingPosition}
    onClose={() => setEditingPosition(null)}
    onUpdated={(updatedPosition) => {
      setPositions((prev) =>
        prev.map((p) =>
          p.id === updatedPosition.id ? updatedPosition : p
        )
      );
    }}
  />
)}

    </div>
  );
}
