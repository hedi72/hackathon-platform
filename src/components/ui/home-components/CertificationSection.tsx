import { CheckCircle, Award, BookOpen, Star } from "lucide-react";

export default function CertificationSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">

        <div className="
          bg-white 
          border-[3px] border-[#18191F] 
          shadow-[4px_4px_0px_#151528] 
          rounded-xl 
          p-10
          flex flex-col md:flex-row items-center justify-between
          gap-10
        ">
          
          <div className="flex-1 text-left">
            <span className="bg-primary-600 text-black px-3 py-1 rounded-xl text-sm font-semibold border-2 border-black">
              Certification
            </span>

            <h2 className="text-3xl font-extrabold mt-4">
              Get Certified in Hedera Development
            </h2>

            <p className="text-gray-600 mt-2 max-w-md">
              Validate your blockchain expertise with our comprehensive certification program.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm font-bold">
              <div className="flex items-center gap-2">
                <img src="/images/self-paced.png" className="w-8 h-8" /> Self-paced
              </div>
              <div className="flex items-center gap-2">
                <img src="/images/industry-recognized.png" className="w-8 h-8" /> Industry Recognized
              </div>
              <div className="flex items-center gap-2">
                <img src="/images/members.png" className="w-8 h-8" /> 10K+ Certified
              </div>
              <div className="flex items-center gap-2">
                <img src="/images/certificat.png" className="w-8 h-8" /> Free Certificate
              </div>
            </div>

            <button
              className="
                mt-6 px-5 py-2 
                bg-primary-500 text-white 
                font-semibold rounded-lg
                border-[3px] border-[#18191F]
                shadow-[3px_3px_0px_#151528]
              "
            >
              Start Learning
            </button>
          </div>

          {/* Decorative Graphic */}
          <div className="flex items-center justify-center">
            <img src="/images/certified.png" />
          </div>
        </div>

      </div>
    </section>
  );
}
