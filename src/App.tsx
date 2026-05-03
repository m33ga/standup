import { useEffect } from "react";
import { EmptyState } from "./components/EmptyState";
import { MeetingView } from "./components/MeetingView";
import { Sidebar } from "./components/Sidebar";
import { useStore } from "./store";
import { useShallow } from "zustand/shallow";

function App() {
  const theme = useStore((s) => s.theme);
  const { meeting, group } = useStore(
    useShallow((s) => {
      const meeting = s.meetings.find((m) => m.id === s.selectedMeetingId);
      const group = meeting
        ? s.groups.find((g) => g.id === meeting.groupId)
        : undefined;
      return { meeting, group };
    }),
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="flex min-h-screen bg-paper text-ink">
      <Sidebar />
      <main className="flex-1">
        {meeting && group ? (
          <MeetingView key={meeting.id} meeting={meeting} group={group} />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

export default App;
