"use client";

import { useEffect, useState } from "react";
import HackathonInfoCard from "@/app/views/HackathonInfoCard";
import { getHackathonDetails } from "@/src/api/hackathon/hackathonDetails";
import HackathonDetailsSection from "@/app/views/HackathonDetailsSection";
import { useToken } from "@/app/context/TokenContext";
import { registerToHackathon } from "@/app/api/hackathon/register";
import SubmitBuidlModal from "@/app/views/SubmitBuidlModal";

export default function HackathonDetails({ params }) {
  const [hackathon, setHackathon] = useState(null);
  const { token } = useToken();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);


 useEffect(() => {
    console.log("🔥 Calling getHackathonDetails from Browser:", params.id);

    getHackathonDetails(params.id)
      .then((data) => {
        console.log("🔥 Hackathon Data (browser):", data);
        setHackathon(data);
      })
      .catch((error) => {
        console.error("❌ Error (browser):", error);
      });

  }, [params.id]);

  async function handleRegister() {
    if (!token) {
      alert("❗ You must be logged in to register.");
      console.log("🔑 Token used for registration:", token);

      return;
    }

    try {
      console.log("➡️ Sending registration request...");

      const response = await registerToHackathon(
        hackathon.id,
        token,
        "",      // passCode — leave empty unless required
        []       // registrationAnswers (future support)
      );

      console.log("🎉 Registration success:", response);
      alert("🎉 You are now registered for this hackathon!");
       const saved = localStorage.getItem("registered-" + params.id);
      if (saved === "true") {
    setIsRegistered(true);
  }



    } catch (error) {
      console.error("❌ Registration error:", error);
      alert("Registration failed: " + error.message);
    }
  }

  return (
   <main className="min-h-screen bg-[#f2f2f5] p-10 flex flex-col items-center">

  {/* TOP SECTION WITH IMAGE + CARD */}
  <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

    <div className="col-span-2 bg-white rounded-2xl overflow-hidden shadow-sm h-[620px]">
      <img src="/images/signin-art5.png" className="w-full h-full object-cover" />
    </div>

    <div className="col-span-1 h-[620px]">
      <HackathonInfoCard hackathon={hackathon} />
    </div>
  </div>

  {/* ✅ NEW SECTION — Hackathon Header */}
 {/* HEADER SECTION BELOW CARD */}
<div className="w-full bg-[#f2f2f5] ">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between ">

    {/* TITLE */}
    <h1 className="text-3xl font-extrabold text-gray-900">
      {hackathon?.title}
    </h1>

    {/* BUTTONS */}
    <div className="flex gap-4">
    <button
  onClick={() => setShowModal(true)}
  className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition"
>
  Submit BUIDL
</button>

{showModal && (
  <SubmitBuidlModal
    hackathonId={hackathon?.id}
    onClose={() => setShowModal(false)}
  />
)}


    <button
              onClick={!isRegistered ? handleRegister : undefined}
              disabled={isRegistered}
              className={
                isRegistered
                  ? "px-6 py-2 rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "px-6 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 bg-white transition"
              }
            >
              {isRegistered ? "Registered" : "Register as Hacker"}
            </button>
    </div>
  </div>
</div>

<HackathonDetailsSection hackathon={hackathon} />



</main>

  );
}
