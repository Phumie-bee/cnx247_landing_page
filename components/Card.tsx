import { type ReactNode } from "react";

type CardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
};

export default function Card({
  icon,
  title,
  description,
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1.5 hover:border-accent/30 border border-transparent transition-all duration-300 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-bg-light flex items-center justify-center text-primary mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-heading mb-2">{title}</h3>
      <p className="text-body leading-relaxed text-[15px]">{description}</p>
    </div>
  );
}
