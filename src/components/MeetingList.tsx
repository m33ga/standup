import { Check } from "lucide-react";
import { useStore } from "../store";
import type { Meeting } from "../types";

function formatShortDate(iso: string): string {
  const [yyyy, mm, dd] = iso.split("-");
  return `${dd}.${mm}.${yyyy}`;
}

type MeetingListProps = { meetings: Meeting[] };

export function MeetingList({ meetings }: MeetingListProps) {
  const selectedMeetingId = useStore((s) => s.selectedMeetingId);
  const selectMeeting = useStore((s) => s.selectMeeting);

  if (meetings.length === 0) {
    return (
      <div className="px-1.5 py-1 font-hand text-base text-ink/50">
        nothing here yet
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0.5">
      {meetings.map((m) => {
        const sel = m.id === selectedMeetingId;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => selectMeeting(m.id)}
            className={[
              "flex items-center gap-1.5 rounded px-2 py-1 text-left font-sans text-[13px]",
              sel
                ? "border-2 border-ink bg-yolk font-semibold text-ink shadow-paper-sm"
                : "border-2 border-transparent text-ink/75 hover:bg-ink/[0.04]",
            ].join(" ")}
          >
            {m.completed ? (
              <Check size={14} strokeWidth={3} className="text-ink/70" />
            ) : (
              <span className="ml-0.5 inline-block h-2 w-2 shrink-0 rounded-full border border-ink/40" />
            )}
            <span
              className={`flex-1 truncate ${m.completed ? "line-through" : ""}`}
            >
              {m.title}
            </span>
            <span className="font-mono text-[11px] text-ink/50">
              {formatShortDate(m.date)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
