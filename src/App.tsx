import { useEffect } from "react";
import { seedGroups, seedMeetings } from "./types/seed";

function App() {
  useEffect(() => {
    console.log("seed groups:", seedGroups);
    console.log("seed meetings:", seedMeetings);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 text-stone-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tight">standup.</h1>
        <p className="mt-3 text-base text-stone-600">
          {seedGroups.length} groups & {seedMeetings.length} meetings (in
          devtools)
        </p>
      </div>
    </div>
  );
}

export default App;
