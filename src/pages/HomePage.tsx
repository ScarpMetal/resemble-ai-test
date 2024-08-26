import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { generateTextToSpeech } from "../api/utils";
import voices from "../constants/voices";

export default function HomePage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedAudioPath, setGeneratedAudioPath] = useState<string | null>(
    null
  );
  const audio = useMemo(
    () => (generatedAudioPath === null ? null : new Audio(generatedAudioPath)),
    [generatedAudioPath]
  );

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setText(e.target.value);
      setGeneratedAudioPath(null);
    },
    []
  );

  const handleGenerateTextToSpeech = useCallback(async () => {
    setLoading(true);
    const audioPath = await generateTextToSpeech(text);
    setLoading(false);
    setGeneratedAudioPath(audioPath);
  }, [text]);

  const handlePlayAudio = useCallback(() => {
    if (audio?.paused) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [audio]);

  return (
    <div>
      <div>
        <select className="border">
          {voices.map((voice) => (
            <option key={voice}>{voice}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-4 items-center">
        <span>Convert Text to Speech: </span>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          className="border p-1"
        />
        <button
          type="button"
          onClick={handleGenerateTextToSpeech}
          className="bg-green-300 px-2 py-1 rounded-md"
        >
          Generate
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <button
          type="button"
          disabled={!audio}
          className="bg-green-300 px-4 py-2 rounded-md disabled:opacity-50"
          onClick={handlePlayAudio}
        >
          Play
        </button>
        {loading && <div className="border w-4 h-4 animate-spin"></div>}
      </div>
    </div>
  );
}
