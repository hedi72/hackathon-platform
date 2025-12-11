import { Code2, Shield, Layers, Wrench, Gamepad2, Coins } from "lucide-react";

const categories = [
  { name: "DeFi", color: "bg-blue-500", icon: Coins },
  { name: "NFTs", color: "bg-green-500", icon: Layers },
  { name: "Gaming", color: "bg-primary-600", icon: Gamepad2 },
  { name: "Security", color: "bg-green-500", icon: Shield },
  { name: "Infrastructure", color: "bg-primary-500", icon: Wrench },
  { name: "Development", color: "bg-green-500", icon: Code2 },
];

export default function ExploreCategories() {
  return (
    <section className="py-20 bg-[#f4f2ef] text-center border-t-4 border-b-4 border-black mt-10">
      <span className="px-3 py-1 rounded-lg text-xs bg-green-500 font-semibold border-2 border-black">
        BUILDs
      </span>

      <h2 className="text-3xl font-extrabold mt-3">Explore by Category</h2>
      <p className="text-gray-600 mt-1">Dive into projects that interest you most</p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`flex items-center gap-2 px-4 py-2 border-[3px] border-[#18191F] shadow-[4px_4px_0px_#151528] rounded-xl ${cat.color} cursor-pointer hover:scale-105 transition`}
          >
            <cat.icon className={`w-4 h-4 ${cat.color}`} />
            <span className="font-semibold">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
