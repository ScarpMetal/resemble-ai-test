import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import thumbnail from "../assets/thumbnail.webp";
import voices from "../constants/voices";

export default function VoicesPage() {
  const [text, setText] = useState("");
  const filteredVoices = useMemo(
    () =>
      voices.filter((voice) =>
        voice.toLowerCase().includes(text.toLowerCase())
      ),
    [text]
  );

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setText(e.target.value);
    },
    []
  );

  return (
    <div>
      <div className="flex gap-2 items-center">
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          value={text}
          onChange={handleTextChange}
          className="border p-2"
          placeholder="search"
        />
      </div>
      <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {filteredVoices.map((voice) => (
          <div key={voice} className="bg-gray-200 rounded-md p-4">
            <div className="h-16">
              <img
                src={thumbnail}
                alt={`${voice} thumbnail`}
                className="h-full"
              />
            </div>
            <div>{voice}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
