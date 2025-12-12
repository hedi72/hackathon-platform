"use client";

export default function TracksList({ tracks }) {
  if (!tracks || tracks.length === 0) {
    return <p className="text-gray-500">No tracks available for this hackathon.</p>;
  }

  return (
    <div className="space-y-6">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="p-5 bg-white rounded-xl shadow border hover:shadow-md transition"
        >
          <h3 className="text-xl font-bold">{track.name}</h3>

          <p className="text-gray-600 mt-2">
            {track.description || "No description provided."}
          </p>

          <p className="mt-3 text-sm text-gray-500">
            🏆 Winners: {track.winnersCount}
          </p>
        </div>
      ))}
    </div>
  );
}
