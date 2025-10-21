"use client";
import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Folder } from "lucide-react";
import { Navbar } from "../../src/components/layout/Navbar";
import { Footer } from "../../src/components/layout/Footer";

const collections = [
  {
    id: 1,
    title: "Edge City Lanna Hackathon: Global Solutions for Human Progress",
    banner: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
    logos: ["https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg", "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg", "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg"],
    count: 24,
  },
  {
    id: 2,
    title: "Hack For Good 2.0: African Solutions for Social Change",
    banner: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    logos: ["https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg", "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg", "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg"],    count: 18,
  },
  {
    id: 3,
    title: "CAPTCHA Game Challenge: Reimagining Web Security Through Play",
    banner: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
    logos: ["https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg", "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg", "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg"],    count: 12,
  },
  {
    id: 4,
    title: "ETHKyiv Impulse: Building the Future of DeFi Trading",
    banner: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg",
    logos: ["https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg", "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg", "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg"],    count: 30,
  },
];

export default function CollectionsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
          <Navbar />
      <div className="bg-gradient-to-b from-blue-50 to-white py-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-10 mt-6">
        <h1 className="text-4xl font-bold text-gray-900 text-left">BUIDL Collections</h1>
        <p className="text-lg text-gray-600 mt-2 text-left">
          Explore specially curated BUIDL collections from past and present events
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 z-10 hover:scale-110 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
        >
          {collections.map((col) => (
            <div
              key={col.id}
              className="max-w-[320px] bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all flex-shrink-0 p-4"
            >
              {/* Banner */}
              <div className="rounded-2xl overflow-hidden mb-3">
                <Image
                  src={col.banner}
                  alt={col.title}
                  width={400}
                  height={200}
                  className="object-cover w-full h-48"
                />
              </div>

              {/* Logos */}
              <div className="flex gap-2 mb-3">
                {col.logos.map((logo, idx) => (
                  <Image
                    key={idx}
                    src={logo}
                    alt="logo"
                    width={48}
                    height={48}
                    className="rounded-md border border-gray-200 object-cover"
                  />
                ))}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {col.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 z-10 hover:scale-110 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      </div>
    </div>
       <main className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Section */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              All BUIDL Collections
            </h1>

            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <button className="bg-blue-600 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md">
                Create BUIDL Collection
              </button>

              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none">
                <option>Sort by</option>
                <option>Most Recent</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          {/* Collections Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="flex flex-col bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {collection.logos.map((logo, idx) => (
                      <img
                        key={idx}
                        src={logo}
                        alt="buidl logo"
                        className="w-12 h-12 rounded-md object-cover border border-gray-200"
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">
                    <Folder size={16} />
                    {collection.count}
                  </div>
                </div>

                <h2 className="mt-4 text-base font-semibold text-gray-800 leading-snug">
                  {collection.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </main>
 <Footer />
    </div>
    
  );
}
