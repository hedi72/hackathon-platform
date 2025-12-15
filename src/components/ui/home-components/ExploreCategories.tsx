import { useCategories } from "@/src/hooks/useCategories";
import { Code2, Shield, Layers, Wrench, Gamepad2, Coins } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Local mapping between category name → icon + color
const categoryIconMap: Record<
  string,
  { color: string; icon: React.ElementType, imageSrc?: string }
> = {
  AI: { color: "bg-blue-500", icon: Coins, imageSrc: "/images/defi.png" },
  DEFI: { color: "bg-blue-500", icon: Coins, imageSrc: "/images/defi.png" },
  WEB3: { color: "bg-green-500", icon: Layers, imageSrc: "/images/defi.png" },
  Gaming: { color: "bg-primary-600", icon: Gamepad2, imageSrc: "/images/gaming.png" },
  'ZK & PRIVACY': { color: "bg-red-500", icon: Shield, imageSrc: "/images/security.png" },
  Infrastructure: { color: "bg-primary-500", icon: Wrench, imageSrc: "/images/infrastructure.png" },
  Development: { color: "bg-yellow-500", icon: Code2, imageSrc: "/images/dev.png" },
};

// Default when category is unknown
const defaultCategoryStyle = {
  color: "bg-green-500",
  icon: Code2,
  imageSrc: "/images/defi.png",
};

export default function ExploreCategories() {
  const { categories, loadingCategories, errorLoadingCategories } = useCategories();
  const router = useRouter();
  const handleCategoryClick = ( name: string ) => {
    router.push(`/hackathons?category=${encodeURIComponent(name)}`);
  };
  
  // Function to find matching category style by checking if name contains keywords
  const getCategoryStyle = (categoryName: string) => {
    const lowerName = categoryName.toLowerCase();
    
    // Check if category name contains "ai"
    if (lowerName.includes("ai")) {
      return categoryIconMap.AI || defaultCategoryStyle;
    }
    
    // Check other categories if needed (optional)
    if (lowerName.includes("web3") || lowerName.includes("blockchain")) {
      return categoryIconMap.WEB3 || defaultCategoryStyle;
    }
    
    if (lowerName.includes("gaming") || lowerName.includes("game")) {
      return categoryIconMap.Gaming || defaultCategoryStyle;
    }
    
    if (lowerName.includes("security")) {
      return categoryIconMap.Security || defaultCategoryStyle;
    }
    
    if (lowerName.includes("infrastructure")) {
      return categoryIconMap.Infrastructure || defaultCategoryStyle;
    }
    
    if (lowerName.includes("development") || lowerName.includes("dev")) {
      return categoryIconMap.Development || defaultCategoryStyle;
    }
    
    // Check for exact match in the map
    if (categoryIconMap[categoryName]) {
      return categoryIconMap[categoryName];
    }
    
    return defaultCategoryStyle;
  };

  const getCategorySrc = (categoryName: string) => {
    // Get the matching style first to ensure consistency
    const match = getCategoryStyle(categoryName);
    
    // Return the image source from the match, or default
    return match.imageSrc || "/images/defi.png";
  }

  return (
    <section className="py-20 bg-[#f4f2ef] text-center border-t-4 border-b-4 border-black mt-10">
      <span className="px-3 py-1 rounded-lg text-xs bg-green-500 font-semibold border-2 border-black">
        BUILDs
      </span>

      <h2 className="text-3xl font-extrabold mt-3">Explore by Category</h2>
      <p className="text-gray-600 mt-1">Dive into projects that interest you most</p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {categories?.map((cat) => {
          const match = getCategoryStyle(cat.name);
          const Icon = match.icon;

          return (
            <div
              onClick={() => handleCategoryClick(cat.name)}
              key={cat.name}
              className={`flex items-center gap-2 px-4 py-2 border-[3px] border-[#18191F] shadow-[4px_4px_0px_#151528] rounded-xl ${match.color} cursor-pointer hover:scale-105 transition`}
            >
              <img
                src={match.imageSrc || "/images/defi.png"}
                alt={cat.name}
                className="w-6 h-6"
              />
              <span className="font-semibold text-white">{cat.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}