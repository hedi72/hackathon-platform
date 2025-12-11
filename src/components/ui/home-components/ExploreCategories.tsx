"use client";
import { useCategories } from "@/src/hooks/useCategories";
import { Code2, Shield, Layers, Wrench, Gamepad2, Coins } from "lucide-react";

// Local mapping between category name → icon + color
const categoryIconMap: Record<
  string,
  { color: string; icon: React.ElementType }
> = {
  AI: { color: "bg-blue-500", icon: Coins },
  WEB3: { color: "bg-green-500", icon: Layers },
  Gaming: { color: "bg-primary-600", icon: Gamepad2 },
  Security: { color: "bg-red-500", icon: Shield },
  Infrastructure: { color: "bg-primary-500", icon: Wrench },
  Development: { color: "bg-yellow-500", icon: Code2 },
};

// Default when category is unknown
const defaultCategoryStyle = {
  color: "bg-gray-300",
  icon: Code2,
};

export default function ExploreCategories() {
  const { categories, loadingCategories, errorLoadingCategories } =
    useCategories();

  return (
    <section className="py-20 bg-[#f4f2ef] text-center border-t-4 border-b-4 border-black mt-10">
      <span className="px-3 py-1 rounded-lg text-xs bg-green-500 font-semibold border-2 border-black">
        BUILDs
      </span>

      <h2 className="text-3xl font-extrabold mt-3">Explore by Category</h2>
      <p className="text-gray-600 mt-1">Dive into projects that interest you most</p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {categories?.map((cat) => {
          const match = categoryIconMap[cat.name] || defaultCategoryStyle;
          const Icon = match.icon;

          return (
            <div
              key={cat.name}
              className={`flex items-center gap-2 px-4 py-2 border-[3px] border-[#18191F] shadow-[4px_4px_0px_#151528] rounded-xl ${match.color} cursor-pointer hover:scale-105 transition`}
            >
              <Icon className="w-4 h-4 text-white" />
              <span className="font-semibold text-white">{cat.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
