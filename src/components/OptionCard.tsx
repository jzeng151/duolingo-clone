'use client';

/* A selectable card used across the onboarding question screens.
   - emoji + label              → reason / "how did you hear" grids
   - label + sublabel           → proficiency / choose-path lists
   - label + trailing           → daily-goal list (time left, tier right) */
export default function OptionCard({
  label,
  emoji,
  sublabel,
  trailing,
  selected,
  onClick,
}: {
  label: string;
  emoji?: string;
  sublabel?: string;
  trailing?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center gap-4 rounded-2xl border-2 border-b-4 px-5 py-4 text-left transition-colors ${
        selected
          ? 'border-[#58CC02] bg-[#DDF4C7]'
          : 'border-[#E5E5E5] bg-white hover:bg-[#F7F7F7]'
      }`}
    >
      {emoji && <span className="text-2xl leading-none">{emoji}</span>}
      <span className="flex-1">
        <span className="block font-bold text-[#4B4B4B]">{label}</span>
        {sublabel && <span className="mt-0.5 block text-sm font-medium text-[#777777]">{sublabel}</span>}
      </span>
      {trailing && <span className="font-bold text-[#777777]">{trailing}</span>}
    </button>
  );
}
