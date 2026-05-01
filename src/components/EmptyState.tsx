import { Tape } from "./Tape";

export function EmptyState() {
  return (
    <div className="flex flex-1 items-center justify-center p-10 min-h-screen">
      <div className="max-w-md text-center">
        <h1 className="font-display text-5xl font-bold tracking-tight text-ink">
          nothing selected.
        </h1>
        <p className="mt-3 mb-6 font-sans text-base text-ink/70">
          pick a meeting from the sidebar, or start a new one.
        </p>
        <Tape rotate={-2}>or don't. we don't mind.</Tape>
      </div>
    </div>
  );
}
