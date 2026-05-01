import { EmptyState } from "./components/EmptyState";
import { MeetingView } from "./components/MeetingView";
import { Sidebar } from "./components/Sidebar";
import { seedGroups, seedMeetings } from "./types/seed";

function App() {
  const selectedMeetingId = "m3";
  const expandedGroupIds = { g1: true, g2: true };
  const query = "";
  const theme = "light" as const;

  const meeting = seedMeetings.find((m) => m.id === selectedMeetingId);
  const group = meeting
    ? seedGroups.find((g) => g.id === meeting.groupId)
    : undefined;

  return (
    <div className="flex min-h-screen bg-paper text-ink">
      <Sidebar
        groups={seedGroups}
        meetings={seedMeetings}
        selectedMeetingId={selectedMeetingId}
        expandedGroupIds={expandedGroupIds}
        query={query}
        theme={theme}
      />
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
