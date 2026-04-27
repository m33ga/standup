import { Tape } from "./Tape";

type SectionCardProps = {
  label: string;
  hint: string;
  tapeColor: string;
  tapeRotate: number;
  value: string;
};

export function SectionCard({
  label,
  hint,
  tapeColor,
  tapeRotate,
  value,
}: SectionCardProps) {
  return (
    <div className="relative pt-3.5">
      <div className="pointer-events-none absolute top-0 left-3.5 z-10">
        <Tape color={tapeColor} rotate={tapeRotate}>
          {label}
        </Tape>
      </div>

      <div
        className={`min-h-40 rounded-lg border-[3.5px] border-ink bg-paper px-5 pt-6 pb-4 shadow-paper-md`}
      >
        {value.trim() ? (
          <p className="font-sans text-[15px] leading-relaxed whitespace-pre-wrap text-ink">
            {value}
          </p>
        ) : (
          <p className="font-sans text-sm text-ink/50 italic">empty. {hint}.</p>
        )}
      </div>
    </div>
  );
}
