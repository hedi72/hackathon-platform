import {
  FiGlobe,
  FiMessageSquare,
  FiAward,
  FiCalendar
} from "react-icons/fi";

export default function HackathonInfoCard({ hackathon }) {
  if (!hackathon) return null;

  const {
    prizePool,
    prizeToken,
    startDate,
    endDate,
    registrationStart,
    registrationEnd,
    status,
    type,
    tags = [],
    organization,
    title
  } = hackathon;

  // Normalize status
  const isOpen =
    status === "ACTIVE" ||
    status === "OPEN";

  return (
    <div className="w-full max-w-md bg-white rounded-2xl border shadow-sm overflow-hidden">

      {/* ================= PRIZE + STATUS HEADER ================= */}
      <div className="bg-orange-500 text-white px-6 py-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold flex items-center gap-2 opacity-90">
            <FiAward /> PRIZE POOL
          </p>

          {/* STATUS */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
              ${isOpen
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-700"}`}
          >
            {isOpen ? "Open" : status}
          </span>
        </div>

        <h2 className="text-3xl font-bold pr-12">
          {prizePool?.toLocaleString() || 0}
          <span className="text-lg font-semibold ml-1">
            {prizeToken}
          </span>
        </h2>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-6 space-y-6">

        {/* ================= TIMELINE ================= */}
        <div className="border rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
            <FiCalendar /> Event Timeline
          </p>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Registration</span>
              <span>
                {new Date(registrationStart).toLocaleDateString()} →{" "}
                {new Date(registrationEnd).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Hackathon</span>
              <span>
                {new Date(startDate).toLocaleDateString()} →{" "}
                {new Date(endDate).toLocaleDateString()}
              </span>
            </div>

            {/* STATUS ROW */}
            <div className="flex justify-between font-semibold pt-2">
              <span>Status</span>
              <span className={isOpen ? "text-green-600" : "text-gray-500"}>
                {isOpen ? "Open" : status}
              </span>
            </div>
          </div>
        </div>

        {/* ================= TYPE ================= */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FiGlobe className="text-gray-600" />
          {type === "ONLINE" ? "Virtual" : "In-person"}
        </div>

        {/* ================= TAGS ================= */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">
            Tags
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400">
                No tags provided
              </span>
            )}
          </div>
        </div>

        {/* ================= ORGANIZER ================= */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-sm">
            {organization?.name?.[0] || "?"}
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Organized by
            </p>
            <p className="text-sm font-medium text-gray-800">
              {organization?.name || "Unknown"}
            </p>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm font-medium text-gray-700 truncate">
            {title}
          </p>

          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition">
            <FiMessageSquare />
            Message
          </button>
        </div>
      </div>
    </div>
  );
}
