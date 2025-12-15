"use client";
import { useEffect, useState } from "react";
import { createSubmission } from "@/app/api/hackathon/submissions/createSubmission";
import { useToken } from "@/app/context/TokenContext";
import { useToast } from "@/hooks/use-toast";
import { useAlert } from "../context/AlertProvider";
import { Team } from "@/src/types/team";
import { useParams } from "next/navigation";
import { getTeams } from "@/src/api/hackathon/team";
import { useAuth } from "@/src/hooks/useAuth";

export default function SubmitBuidlModal({ hackathonId, hackathon, onClose }) {
  const { token } = useToken();
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const { id } = useParams();

  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const { user, isAuthenticated } = useAuth();

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
    showAlert(
      "warning",
      "Authentication required",
      "You must be logged in to submit a BUIDL."
    );

    setLoading(true);

    try {
      const payload = {
        ...submission,
        teamId: selectedTeam?.id,
        technologies: submission.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const result = await createSubmission(hackathonId, payload);

      showAlert("success", "Submitted!", "🎉  BUIDL submitted successfully!");

      onClose();
    } catch (err) {
      showAlert(
        "warning",
        "❌ Submit failed",
        err.message || "Something went wrong. Please try again."
      );
    }

    setLoading(false);
  }
  useEffect(() => {
    if (!id || !user?.id) return;

    const fetchTeams = async () => {
      try {
        const res = await getTeams(id as string, {
          page: 1,
          limit: 10,
        });

        setTeams(res.data);

        const team = res.data.find((team) =>
          team.members?.some((member) => member.user?.id === user.id)
        );

        console.log("User's team:", team);
        setSelectedTeam(team ?? null);
      } catch (err) {
        console.error("Error loading teams:", err);
      }
    };

    fetchTeams();
  }, [id, user?.id]);

  function input(
    label,
    key,
    type = "text",
    disabled = false,
    defaultValue = ""
  ) {
    return (
      <div className="flex flex-col gap-1">
        <label className="font-medium">{label}</label>
        <input
          type={type}
          className="border p-2 rounded w-full"
          value={disabled ? defaultValue : submission[key]}
          onChange={(e) =>
            setSubmission({ ...submission, [key]: e.target.value })
          }
          placeholder={
            disabled ? defaultValue : `Enter ${label.toLowerCase()}...`
          }
          disabled={disabled}
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
        {input(
          "Team",
          selectedTeam?.id as string,
          "text",
          true,
          selectedTeam?.name
        )}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Track</label>
          <select
            className="border p-2 rounded w-full"
            value={submission.trackId}
            onChange={(e) =>
              setSubmission({ ...submission, trackId: e.target.value })
            }
          >
            <option value="">Select a track</option>

            {hackathon?.tracks?.map((track) => (
              <option key={track.id} value={track.id}>
                {track.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">Bounty</label>
          <select
            className="border p-2 rounded w-full"
            value={submission.bountyId}
            onChange={(e) =>
              setSubmission({ ...submission, bountyId: e.target.value })
            }
          >
            <option value="">Select a Bounty</option>

            {hackathon?.bounties?.map((bounty) => (
              <option key={bounty.id} value={bounty.id}>
                {bounty.name}
              </option>
            ))}
          </select>
        </div>
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
