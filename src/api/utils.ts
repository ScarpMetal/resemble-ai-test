import audioPath from "../assets/sample.mp3";

export async function generateTextToSpeech(text: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(audioPath);
    }, 2000);
  });
}
