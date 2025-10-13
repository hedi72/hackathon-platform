import { Globe, Github, Play } from "lucide-react";

interface BuidlCardProps {
  avatarUrl: string;
  author: string;
  projectImage: string;
  title: string;
  description: string;
  categories: string[];
}

// Convert categories into DoraHacks style "A / B / C"
function formatCategories(categories: string[]): string {
  return categories.join(" / ");
}

export default function BuidlCard({
  avatarUrl,
  author,
  projectImage,
  title,
  description,
  categories,
}: BuidlCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow p-4 max-w-md">
      {/* Author */}
      <div className="flex items-center mb-4">
        <img
          src={avatarUrl}
          alt={author}
          className="w-4 h-4 rounded-full mr-2"
        />
        <span className="text-xs font-medium text-gray-800">{author}</span>
      </div>

      {/* Project */}
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="flex items-center mb-4">
        <img
          src={projectImage}
          alt={title}
          className="w-16 h-16 rounded-md object-cover border"
        />
      </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>

            {/* Action icons */}
            <div className="flex items-center gap-2 text-green-600">
              <a href="#" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Demo">
                <Play className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-3">
        <span className="inline-block px-3 py-1 bg-orange-100 text-blue-600 text-xs font-medium rounded">
          {formatCategories(categories)}
        </span>
      </div>
    </div>
  );
}
