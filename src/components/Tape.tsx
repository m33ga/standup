import type { CSSProperties, ReactNode } from "react";

type TapeProps = {
  children: ReactNode;
  /** any CSS color or var() reference */
  color?: string;
  /** rotation in degrees */
  rotate?: number;
};

export function Tape({
  children,
  color = "var(--color-yolk)",
  rotate = -1.5,
}: TapeProps) {
  const style: CSSProperties = {
    background: color,
    transform: `rotate(${rotate}deg)`,
  };
  return (
    <span
      style={style}
      className="inline-block whitespace-nowrap border-2 border-ink px-3 py-0.5 font-hand text-xl leading-tight text-ink shadow-paper-sm"
    >
      {children}
    </span>
  );
}
