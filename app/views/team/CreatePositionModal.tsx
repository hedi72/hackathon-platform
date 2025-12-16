"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useToken } from "@/app/context/TokenContext";
import { useToast } from "@/hooks/use-toast";
import { createTeamPosition } from "@/app/api/team/createTeamPosition";


export default function CreatePositionModal({
  hackathonId,
  teamId,
  onClose,
}) {
  const { token } = useToken();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
 const [skillsInput, setSkillsInput] = useState("");
const [requiredSkills, setRequiredSkills] = useState<string[]>([]);



  async function handleSubmit() {
    if (!title.trim()) {
      toast({
        title: "Position title is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      await createTeamPosition( hackathonId,
  teamId,
  {
    title,
    description,
    requiredSkills, // must be string[]
  
      });

      toast({
        title: "✅ Position created",
        description: "Your team is now looking for this role.",
        variant: "default",
      });

      onClose(); // close modal
    } catch (err: any) {
      toast({
        title: "❌ Failed to create position",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl relative shadow-lg">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Add Open Position</h2>

        {/* TITLE */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Role Title
          </label>
          <input
            className="w-full border rounded-lg p-2"
            placeholder="e.g. Frontend Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Description (optional)
          </label>
          <textarea
            className="w-full border rounded-lg p-2"
            rows={3}
            placeholder="Skills, expectations, tech stack..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-6">
  <label className="block text-sm font-medium mb-1">
    Required Skills (comma separated)
  </label>
  <input
  type="text"
  placeholder="React, Node.js, Solidity"
  value={skillsInput}
  onChange={(e) => setSkillsInput(e.target.value)}
  onBlur={() => {
    setRequiredSkills(
      skillsInput
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
    );
  }}
  className="w-full border rounded-lg p-3"
/>

</div>


        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-[#FEC601] border border-[#18191F] font-semibold"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
