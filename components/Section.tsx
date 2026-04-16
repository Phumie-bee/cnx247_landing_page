import { type ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function Section({
  children,
  className = "",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">{children}</div>
    </section>
  );
}
