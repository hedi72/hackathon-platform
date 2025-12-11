"use client";
import { ArrowRight } from "lucide-react";
import ButtonUI from "../button";

export default function HeroSection() {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 text-center">
      {/* Badge */}
      <ButtonUI  size="md"
          variant="rounded"
          withShadow
          className="inline-flex items-center gap-2">⭐ The #1 Web3 Learning Platform</ButtonUI>  
     

      {/* Title */}
      <h1
      style={{ fontWeight: 800 }}
       className="text-4xl md:text-6xl text-gray-900 leading-tight mt-4">
        Learn, Earn, and Connect
        <br />
        in One Platform
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
        Your complete ecosystem for mastering skills, earning through
        opportunities, and building meaningful connections in the Web3 community.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex items-center justify-center gap-4 flex-wrap mb-8">
        <ButtonUI
          size="md"
          variant="primary"
          withShadow
          className="inline-flex items-center gap-2"
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </ButtonUI>

        <ButtonUI
          size="md"
          variant="outline"
          withShadow
          className="inline-flex items-center gap-2"
        >
          Explore Hackathons
        </ButtonUI>
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <StatBox value="50K+" label="Builders" />
        <StatBox value="200+" label="Hackathons" />
        <StatBox value="$2M+" label="Prizes Awarded" />
        <StatBox value="150+" label="Partners" />
      </div>
    </section>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-6 px-2 border-[3px] border-[#18191F] shadow-[4px_4px_0px_#151528] bg-white rounded-xl">
      <p className="text-2xl font-extrabold text-orange-500">{value}</p>
      <p className="mt-1 text-gray-700 font-medium">{label}</p>
    </div>
  );
}
