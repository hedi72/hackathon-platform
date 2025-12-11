"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  "What is HederaHub?",
  "How do I participate in hackathons?",
  "Is the certification free?",
  "Can I earn money through the platform?",
  "What makes HederaHub different?",
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-extrabold">
        Frequently Asked<span className="text-primary-600"> Questions</span>
      </h2>
      <p className="text-gray-600 mt-2 mb-10">Everything you need to know about getting started</p>

      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((q, i) => (
          <div
            key={i}
            className="
              bg-white p-4 rounded-lg
              border-[3px] border-[#18191F]
              shadow-[4px_4px_0px_#151528]
              cursor-pointer
            "
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{q}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              />
            </div>

            {openIndex === i && (
              <p className="text-gray-600 text-sm mt-3">
                Placeholder answer — add your real content later.
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
