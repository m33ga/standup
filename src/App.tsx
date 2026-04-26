import { useEffect } from "react";
import { Tape } from "./components/Tape";
import { seedGroups, seedMeetings } from "./types/seed";

function App() {
  useEffect(() => {
    console.log("seed groups:", seedGroups);
    console.log("seed meetings:", seedMeetings);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 text-ink">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold tracking-tight">
          standup.
        </h1>
        <p className="mt-3 font-sans text-lg text-ink/60">
          {seedGroups.length} groups & {seedMeetings.length} meetings (in
          devtools)
        </p>
        <div className="mt-8 inline-block">
          <Tape rotate={-2}>hello world</Tape>
        </div>
      </div>
    </div>
  );
}

export default App;
