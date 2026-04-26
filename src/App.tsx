import { useEffect } from "react";
import { seedGroups, seedMeetings } from "./types/seed";

function App() {
  useEffect(() => {
    console.log("seed groups:", seedGroups);
    console.log("seed meetings:", seedMeetings);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 56, margin: 0, letterSpacing: "-0.02em" }}>
          standup.
        </h1>
        <p style={{ marginTop: 8, opacity: 0.6 }}>
          {seedGroups.length} groups & {seedMeetings.length} meetings (in
          devtools)
        </p>
      </div>
    </div>
  );
}

export default App;
