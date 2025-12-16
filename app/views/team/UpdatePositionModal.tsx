"use client";

import { useState } from "react";
import { updateTeamPosition } from "@/app/api/team/updateTeamPosition";

export default function UpdatePositionModal({
  hackathonId,
  teamId,
  position,
  onClose,
  onUpdated,
}) {
  const [title, setTitle] = useState(position?.title || "");
  const [description, setDescription] = useState(position?.description || "");

  const [skills, setSkills] = useState(
    Array.isArray(position?.requiredSkills)
      ? position.requiredSkills.join(", ")
      : ""
  );

  const [status, setStatus] = useState(position?.status || "OPEN");

async function handleUpdate() {
  const res = await updateTeamPosition(
    hackathonId,
    teamId,
    position.id,
    {
      title,
      description,
      requiredSkills: skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      status,
    }
  );

  // ✅ SEND UPDATED POSITION BACK
  if (typeof onUpdated === "function") {
    onUpdated(res.data);
  }

  onClose();
}



  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px]">
        <h2 className="text-xl font-bold mb-4">Update Position</h2>

        <input
          className="w-full border p-2 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Position title"
        />

        <textarea
          className="w-full border p-2 rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Node.js, React"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="OPEN">OPEN</option>
          <option value="CLOSED">CLOSED</option>
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleUpdate}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
