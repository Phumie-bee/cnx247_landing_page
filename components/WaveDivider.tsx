type WaveDividerProps = {
  /** Color the wave fills — use a hex value like "#ffffff" */
  fill?: string;
  /** Flip vertically so the wave faces up instead of down */
  flip?: boolean;
  className?: string;
};

export default function WaveDivider({
  fill = "#ffffff",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`w-full leading-0 overflow-hidden ${flip ? "rotate-180" : ""} ${className}`}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16 lg:h-20"
      >
        <path
          d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,70 1440,60 L1440,100 L0,100 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
