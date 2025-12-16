"use client";

import React, { useState } from "react";
import HackersList from "./HackersList";

import { useToken } from "../context/TokenContext";
import JoinTeamList from "./team/JoinTeamsList";
import TracksList from "./TracksList";
import InviteMemberToTeam from "./InviteMembertoTeam";
import { Table } from "@/components/ui/table";

export default function HackathonDetailsSection({ hackathon }) {
  const [activeTab, setActiveTab] = useState("details");
  const { token } = useToken();

  return (
    <div className="w-full bg-white mt-10 pb-20 border-t">
      {/* TABS NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-8 overflow-x-auto py-4 text-gray-700 font-medium">
          <button
            onClick={() => setActiveTab("details")}
            className={
              activeTab === "details"
                ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                : "pb-2"
            }
          >
            Details
          </button>

          <button
            onClick={() => setActiveTab("buidls")}
            className={
              activeTab === "buidls"
                ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                : "pb-2"
            }
          >
            Submissions
          </button>

          <button
            onClick={() => setActiveTab("hackers")}
            className={
              activeTab === "hackers"
                ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                : "pb-2"
            }
          >
            Hackers
          </button>

          <button
            onClick={() => setActiveTab("teams")}
            className={
              activeTab === "teams"
                ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                : "pb-2 hover:text-gray-700"
            }
          >
            Join a Team
          </button>
          <button
            onClick={() => setActiveTab("invite-member-teams")}
            className={
              activeTab === "invite-member-teams"
                ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                : "pb-2 hover:text-gray-700"
            }
          >
            Team
          </button>

          <button
            onClick={() => setActiveTab("tracks")}
            className={
              activeTab === "tracks"
                ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                : "pb-2"
            }
          >
            Tracks
          </button>

          <button
            onClick={() => setActiveTab("guidelines")}
            className={
              activeTab === "guidelines"
                ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                : "pb-2"
            }
          >
            Submission Guide
          </button>

          <button
            onClick={() => setActiveTab("rules")}
            className={
              activeTab === "rules"
                ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                : "pb-2"
            }
          >
            Hackathon rules
          </button>

          <button
            onClick={() => setActiveTab("agenda")}
            className={
              activeTab === "agenda"
                ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                : "pb-2"
            }
          >
            Training Agenda
          </button>

          <button
            onClick={() => setActiveTab("social")}
            className={
              activeTab === "social"
                ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                : "pb-2"
            }
          >
            Hackathon social life
          </button>

          <button
            onClick={() => setActiveTab("stations")}
            className={
              activeTab === "stations"
                ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                : "pb-2"
            }
          >
            Hacking stations program
          </button>

          <button
            onClick={() => setActiveTab("ask")}
            className={
              activeTab === "ask"
                ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                : "pb-2"
            }
          >
            Ask Question
          </button>

          <button
            onClick={() => setActiveTab("ideas")}
            className={
              activeTab === "ideas"
                ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                : "pb-2"
            }
          >
            Ideas
          </button>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        {activeTab === "details" && (
          <div>
            <h2 className="text-xl font-bold italic">UPDATE</h2>
            <p>Hackathon details go here…</p>
          </div>
        )}

        {activeTab === "hackers" && <HackersList hackathonId={hackathon?.id} />}

        {activeTab === "buidls" && (
          <div>
            <h2 className="text-xl font-semibold">BUIDLs</h2>
            <p>No submissions yet.</p>
          </div>
        )}

        {activeTab === "teams" && (
          <JoinTeamList hackathonId={hackathon?.id} token={token} />
        )}
        {activeTab === "invite-member-teams" && <InviteMemberToTeam />}

        {activeTab === "tracks" && (
          <TracksList tracks={hackathon?.tracks || []} />
        )}

        {activeTab === "guidelines" && (
          <div>
            <h2 className="text-xl font-bold">Submission Guidelines</h2>
            <p className="mt-4 whitespace-pre-line">
              {hackathon?.submissionGuidelines || "No submission guide yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
