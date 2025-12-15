"use client";
import { useState } from "react";
import { createSubmission } from "@/app/api/hackathon/submissions/createSubmission";
import { useToken } from "@/app/context/TokenContext";
import { useToast } from "@/hooks/use-toast";

export default function SubmitBuidlModal({ hackathonId, onClose }) {
  const { token } = useToken();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [submission, setSubmission] = useState({
    teamId: "",
    trackId: "",
    bountyId: "",
    title: "",
    tagline: "",
    description: "",
    logo: "",
    demoUrl: "",
    videoUrl: "",
    repoUrl: "",
    pitchUrl: "",
    technologies: "",
  });

  async function handleSubmit() {
    if (!token) return;
    toast({
      title: "Authentication required",
      description: "You must be logged in to submit a BUIDL.",
      variant: "destructive",
    });

    setLoading(true);

    try {
      const payload = {
        ...submission,
        technologies: submission.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const result = await createSubmission(hackathonId, token, payload);

      toast({
        title: "🎉  BUIDL submitted successfully!",
      });

      onClose();
    } catch (err) {
      toast({
        title: "❌ Submit failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
  }

  function input(label, key, type = "text") {
    return (
      <div className="flex flex-col gap-1">
        <label className="font-medium">{label}</label>
        <input
          type={type}
          className="border p-2 rounded w-full"
          value={submission[key]}
          onChange={(e) =>
            setSubmission({ ...submission, [key]: e.target.value })
          }
          placeholder={label}
        />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[600px] max-h-[90vh] overflow-y-auto space-y-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Submit Your BUIDL</h2>

        {/* ALL INPUTS */}
        {input("Team ID", "teamId")}
        {input("Track ID", "trackId")}
        {input("Bounty ID", "bountyId")}
        {input("Title", "title")}
        {input("Tagline", "tagline")}

        <div className="flex flex-col gap-1">
          <label className="font-medium">Description</label>
          <textarea
            className="border p-2 rounded w-full"
            rows={4}
            value={submission.description}
            onChange={(e) =>
              setSubmission({ ...submission, description: e.target.value })
            }
          />
        </div>

        {input("Logo URL", "logo")}
        {input("Demo URL", "demoUrl")}
        {input("Video URL", "videoUrl")}
        {input("Repository URL", "repoUrl")}
        {input("Pitch URL", "pitchUrl")}

        {/* Technologies (comma separated) */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Technologies (comma separated)</label>
          <input
            className="border p-2 rounded w-full"
            value={submission.technologies}
            onChange={(e) =>
              setSubmission({ ...submission, technologies: e.target.value })
            }
            placeholder="React, Node.js, Solidity..."
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600"
          >
            {loading ? "Submitting..." : "Submit BUIDL"}
          </button>
        </div>
      </div>
    </div>
  );
}
