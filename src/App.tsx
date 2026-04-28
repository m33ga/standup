import { EmptyState } from "./components/EmptyState";
import { MeetingView } from "./components/MeetingView";
import { seedGroups, seedMeetings } from "./types/seed";

function App() {
  const selectedMeetingId = "m3";

  const meeting = seedMeetings.find((m) => m.id === selectedMeetingId);
  const group = meeting
    ? seedGroups.find((g) => g.id === meeting.groupId)
    : undefined;

  return (
    <div className="flex min-h-screen bg-paper text-ink">
      <main className="flex-1">
        {meeting && group ? (
          <MeetingView meeting={meeting} group={group} />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

export default App;
