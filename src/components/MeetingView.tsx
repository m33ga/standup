import type { Group, Id, Meeting, SectionKey } from "../types";
import { SECTION_META } from "../utils/sectionsMap";
import { MeetingHeader } from "./MeetingHeader";
import { SectionCard } from "./SectionCard";

const TOP_KEYS = [
  "promised",
  "done",
  "willDo",
] as const satisfies readonly SectionKey[];
const BOTTOM_KEYS = [
  "discussion",
  "notes",
] as const satisfies readonly SectionKey[];

type MeetingViewProps = {
  meeting: Meeting;
  group: Group;
  onSetSection: (id: Id, key: SectionKey, value: string) => void;
};

export function MeetingView({
  meeting,
  group,
  onSetSection,
}: MeetingViewProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-10 py-8 pb-20">
      <MeetingHeader meeting={meeting} group={group} />

      <div className="mt-7 flex flex-wrap gap-5">
        {TOP_KEYS.map((k) => (
          <div key={k} className="flex-1 min-w-[280px]">
            <SectionCard
              {...SECTION_META[k]}
              value={meeting[k]}
              onChange={(v) => onSetSection(meeting.id, k, v)}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {BOTTOM_KEYS.map((k) => (
          <SectionCard
            key={k}
            {...SECTION_META[k]}
            value={meeting[k]}
            onChange={(v) => onSetSection(meeting.id, k, v)}
          />
        ))}
      </div>
    </div>
  );
}
