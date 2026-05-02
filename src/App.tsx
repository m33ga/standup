import { useState } from "react";
import { EmptyState } from "./components/EmptyState";
import { MeetingView } from "./components/MeetingView";
import { Sidebar } from "./components/Sidebar";
import { seedGroups, seedMeetings } from "./types/seed";
import type { Id, IsoDate, Meeting, SectionKey } from "./types";

function App() {
  const [meetings, setMeetings] = useState<Meeting[]>(seedMeetings);
  const [selectedMeetingId, setSelectedMeetingId] = useState<Id | null>("m3");
  const expandedGroupIds = { g1: true, g2: true };
  const query = "";
  const theme = "light" as const;

  const meeting = meetings.find((m) => m.id === selectedMeetingId);
  const group = meeting
    ? seedGroups.find((g) => g.id === meeting.groupId)
    : undefined;

  const renameMeeting = (id: Id, title: string) => {
    setMeetings((ms) => ms.map((m) => (m.id === id ? { ...m, title } : m)));
  };

  const setMeetingDate = (id: Id, date: IsoDate) => {
    setMeetings((ms) => ms.map((m) => (m.id === id ? { ...m, date } : m)));
  };

  const deleteMeeting = (id: Id) => {
    if (!window.confirm("delete this meeting?")) return;
    setMeetings((ms) => ms.filter((m) => m.id !== id));
    if (selectedMeetingId === id) setSelectedMeetingId(null);
  };

  const toggleCompleted = (id: Id) => {
    setMeetings((ms) =>
      ms.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m)),
    );
  };

  const setSection = (id: Id, key: SectionKey, value: string) => {
    setMeetings((ms) =>
      ms.map((m) => (m.id === id ? { ...m, [key]: value } : m)),
    );
  };

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
          <MeetingView
            meeting={meeting}
            group={group}
            onRenameMeeting={renameMeeting}
            onSetMeetingDate={setMeetingDate}
            onDeleteMeeting={deleteMeeting}
            onToggleCompleted={toggleCompleted}
            onSetSection={setSection}
          />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

export default App;
