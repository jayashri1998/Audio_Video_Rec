import React, { useEffect, useState } from "react";
import { getRecordings, clearRec } from "../utlis/storage";


export default function RecordingsList() {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    setRecordings(getRecordings());
  }, []);
  const handleClear=()=>{
    clearRec()
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">List of Recordings</h2>
      {recordings.length === 0 ? (
        <p>No recordings found.</p>
      ) : (
        <>
       <div className="flex justify-end mb-4">
  <button onClick={handleClear} className="border border-black rounded-2xl px-4 py-2">
    Clear Recording List
  </button>
</div>

        <ul className="space-y-4">
          {recordings.map((rec, index) => (
            <li key={index} className="border p-4 rounded-md">
              <p className="text-sm text-gray-600">
                {new Date(rec.timestamp).toLocaleString()}
              </p>

              {rec.type === "audio" ? (
                <audio controls src={rec.base64} />
              ) : (
                <video
                  controls
                  src={rec.base64}
                  className="mt-2 w-full max-w-md"
                />
              )}

              <a
                href={rec.base64}
                download={`recording-${index}.${
                  rec.type === "audio" ? "webm" : "mp4"
                }`}
                className="mt-2 inline-block text-blue-600 underline"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
        </>
      )}

    </div>
  );
}
