"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function ApplyMessageModal({
  position,
  onClose,
  onSubmit,
}) {
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[480px] rounded-xl p-6 relative">
        
        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>

        <h3 className="text-xl font-semibold mb-2">
          Apply for {position.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          Write a short message to the team
        </p>

        <textarea
          className="w-full border rounded-lg p-3 min-h-[120px]"
          placeholder="Why are you a good fit for this role?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button
            disabled={!message.trim()}
            onClick={() => onSubmit(message)}
            className="bg-black text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
          >
            Send Application
          </button>
        </div>
      </div>
    </div>
  );
}
