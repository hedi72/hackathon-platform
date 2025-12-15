"use client";

import { useEffect, useState } from "react";
import HackathonInfoCard from "@/app/views/HackathonInfoCard";
import { getHackathonDetails } from "@/src/api/hackathon/hackathonDetails";
import HackathonDetailsSection from "@/app/views/HackathonDetailsSection";
import { useToken } from "@/app/context/TokenContext";
import { registerToHackathon } from "@/app/api/hackathon/register";
import SubmitBuidlModal from "@/app/views/SubmitBuidlModal";
import HackathonTabs from "../hackathon-tabs/HackathonTabs";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/src/components/layout/Navbar";

export default function HackathonDetails({ params }) {
  const [hackathon, setHackathon] = useState(null);
  const { token } = useToken();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();



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
      toast({
  title: "❗ You must be logged in to register.",
  description: "You are now registered as a hacker for this hackathon.",
  variant: "destructive",
});
      

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
      setIsRegistered(true);
           toast({
  title: "🎉 You are now registered for this hackathon!",
  description: "You are now registered as a hacker for this hackathon.",
});
   
       const saved = localStorage.getItem("registered-" + params.id);
      if (saved === "true") {
    setIsRegistered(true);
  }



    } catch (error) {
      console.error("❌ Registration error:", error);

               toast({
  title: "Registration failed: " + error.message,
 variant: "destructive",
});
      
    
    }
  }

  return (
   <main className="min-h-screen bg-[#f2f2f5]  flex flex-col">
<Navbar/>
  {/* TOP SECTION WITH IMAGE + CARD */}
<div className="w-full px-10 mb-10">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
    
    <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-sm h-[620px]">
      <img src="/images/signin-art5.png" className="w-full h-full object-cover" />
    </div>

    <div className="col-span-1 h-[620px]">
      <HackathonInfoCard hackathon={hackathon} />
    </div>
    </div>
  </div>

  {/* ✅ NEW SECTION — Hackathon Header */}
 {/* HEADER SECTION BELOW CARD */}
<div className="w-full bg-white border-y border-gray-200">
  <div className="max-w-7xl mx-auto px-10 py-5
                  flex flex-col gap-4
                  lg:flex-row lg:items-center  justify-between">
   <div className="flex flex-col max-w-3xl">
    {/* TITLE */}
   <h1 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
      {hackathon?.title}
    </h1>
      <p className="text-sm text-gray-500">
            Build, collaborate, and submit your project
          </p>
</div>
    {/* BUTTONS */}
    <div className="flex gap-3 flex-wrap">
    <button
  onClick={() => setShowModal(true)}
  className="px-5 py-2.5 rounded-lg bg-[#FCFAF7] hover:bg-gray-200 border border-[#18191F]"
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
                  ?  "px-5 py-2.5 rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed"
                : "px-5 py-2.5 rounded-lg bg-[#FEC601] text-white hover:bg-gray-800"
              }
            >
              {isRegistered ? "Registered" : "Register as Hacker"}
            </button>
    </div>
  </div>
</div>

<HackathonDetailsSection hackathon={hackathon} />

{/* <HackathonTabs/> */}

</main>

  );
}