import type { Group, Meeting } from "../types";

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${parseInt(d, 10)} ${MONTHS[parseInt(m, 10) - 1]} ${y}`;
}

type MeetingHeaderProps = {
  meeting: Meeting;
  group: Group;
};

export function MeetingHeader({ meeting, group }: MeetingHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-2 font-sans text-xs text-ink/60">
        <span className="font-semibold text-ink/80">{group.name}</span>
        <span className="opacity-50">/</span>
        <span className="font-mono">meeting</span>
        {meeting.completed && (
          <span className="ml-1 inline-flex items-center rounded-full border-2 border-ink bg-mint px-2 py-px font-sans text-[10px] font-bold tracking-widest text-ink uppercase">
            completed
          </span>
        )}
      </div>

      <h1
        className={`mt-2 font-display text-5xl leading-none font-bold tracking-tight text-ink ${
          meeting.completed
            ? "line-through decoration-yolk decoration-[3px]"
            : ""
        }`}
      >
        {meeting.title}
      </h1>

      <div className="mt-3 inline-flex items-center gap-1.5 border-2 border-ink bg-paper-2 px-2.5 py-1 font-mono text-[13px] font-medium text-ink">
        {formatLongDate(meeting.date)}
      </div>
    </div>
  );
}
