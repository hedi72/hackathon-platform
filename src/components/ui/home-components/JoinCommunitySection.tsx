export default function JoinCommunitySection() {
  return (
    <section className="w-full bg-[#0F0F15] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Join a Global Community of Builders
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-gray-300 text-sm md:text-base">
          Connect with 50,000+ developers, designers, and entrepreneurs building the future of Web3.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1A22] border border-[#2A2A33] text-sm">
            <span>👥</span>
            <span>50K+ Members</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1A22] border border-[#2A2A33] text-sm">
            <span>🌐</span>
            <span>120+ Countries</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1A22] border border-[#2A2A33] text-sm">
            <span>💬</span>
            <span>24/7 Support</span>
          </div>
        </div>

        {/* Call to Action */}
        <button className="mt-10 bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2 mx-auto">
          Join the Community
          <span>→</span>
        </button>
      </div>
    </section>
  );
}
