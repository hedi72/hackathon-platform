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
                <BookOpen className="w-4 h-4" /> Self-paced
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" /> Industry Recognized
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> 10K+ Certified
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" /> Free Certificate
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
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-[8px] border-red-500 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full border-[3px] border-[#18191F] flex items-center justify-center">
                  <Award className="w-8 h-8 text-red-500" />
                </div>
              </div>

              <div className="absolute w-6 h-6 bg-yellow-300 rounded-full top-2 right-2"></div>
              <div className="absolute w-6 h-6 bg-green-400 rounded-full bottom-3 left-3"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
