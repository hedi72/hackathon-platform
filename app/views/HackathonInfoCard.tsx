import { FiGlobe, FiMessageSquare } from "react-icons/fi";

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


  return (
    <div className="bg-white rounded-xl shadow p-8 space-y-8 border border-gray-100">

      {/* Prize Pool */}
      <div>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <span>🏆</span> PRIZE POOL
        </p>
        <h2 className="text-4xl font-bold text-orange-500 mt-1">
          {prizePool?.toLocaleString() || 0}
          <span className="text-gray-800 text-2xl ml-2">{prizeToken}</span>
        </h2>
      </div>

      <hr className="border-gray-200" />

      {/* Timeline */}
      <div>
        <p className="text-gray-600 font-semibold text-sm flex items-center gap-2">
          <span>📅</span> EVENT TIMELINE
        </p>

        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex justify-between text-gray-700">
            <span>Registration</span>
            <span>
              {new Date(registrationStart).toLocaleDateString()} →{" "}
              {new Date(registrationEnd).toLocaleDateString()}
            </span>
          </li>

          <li className="flex justify-between text-gray-700">
            <span>Event Period</span>
            <span>
              {new Date(startDate).toLocaleDateString()} →{" "}
              {new Date(endDate).toLocaleDateString()}
            </span>
          </li>

          <li className="flex justify-between font-semibold">
            <span>Status</span>
            <span className={status === "ACTIVE" ? "text-green-500" : "text-gray-500"}>
              {status}
            </span>
          </li>
        </ul>
      </div>

      {/* Virtual / In-person */}
      <div className="flex items-center gap-2 text-gray-700 text-sm">
        <FiGlobe className="text-gray-600" />
        {type === "ONLINE" ? "Virtual" : "In-person"}
      </div>

      {/* Tags */}
      <div>
        <p className="text-gray-600 uppercase text-sm font-semibold flex gap-2">
          <span>🏷️</span> HACKATHON TAGS
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded-lg"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500">No tags provided</span>
          )}
        </div>
      </div>

      {/* Organization */}
      <div>
        <p className="text-gray-600 uppercase text-sm font-semibold flex gap-2">
          <span>🌐</span> ORGANIZATION
        </p>
        <p className="mt-2 text-sm text-gray-700">
          {organization?.name || "Unknown"}
        </p>
      </div>

      <hr className="border-gray-200" />

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="font-medium flex items-center gap-2">
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs">#</span>
          {title}
        </div>

        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50 transition">
          <FiMessageSquare /> Message
        </button>
      </div>
    </div>
  );
}
