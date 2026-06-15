'use client';

import Lottie from '@/app/components/Lottie';

/* Duo the owl + a speech bubble, in the two poses Duolingo's onboarding uses:
   - "hero": big Duo centered, bubble above (intro / transition screens)
   - "prompt": small Duo top-left, bubble to its right (question screens)

   Duo is the real duolingo.com onboarding ("funboarding") owl Lottie served
   on the /welcome screen — frames 600–755 are a ~2.6s idle bob that loops
   seamlessly, so we just loop the whole clip (no idle-range handling needed). */
const DUO_OWL = '/lottie/funboarding/ed177eb496e0280c95367b83efb512d2.json';
/* Duo sits in the lower-center of the 916x939 comp (bbox ~156,555 539x404);
   crop to that region with light padding so he isn't a tiny figure adrift in
   empty canvas. */
const DUO_CROP = '120 515 600 444';

export default function DuoSpeech({
  text,
  variant = 'prompt',
}: {
  text: string;
  variant?: 'hero' | 'prompt';
}) {
  if (variant === 'hero') {
    return (
      <div className="flex flex-col items-center">
        <div className="relative max-w-md rounded-2xl border-2 border-[#E5E5E5] bg-white px-5 py-4 text-center text-lg font-medium text-[#4B4B4B]">
          {text}
          {/* downward tail */}
          <span className="absolute left-1/2 top-full h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-[#E5E5E5] bg-white" />
        </div>
        <Lottie src={DUO_OWL} viewBox={DUO_CROP} className="mt-6 h-44 w-44" />
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <Lottie src={DUO_OWL} viewBox={DUO_CROP} className="h-20 w-20 shrink-0 sm:h-22 sm:w-22" />
      <div className="relative mt-3 rounded-2xl border-2 border-[#E5E5E5] bg-white px-4 py-3 text-base font-medium text-[#4B4B4B] sm:text-lg">
        {text}
        {/* leftward tail */}
        <span className="absolute right-full top-5 h-3 w-3 translate-x-1/2 rotate-45 border-b-2 border-l-2 border-[#E5E5E5] bg-white" />
      </div>
    </div>
  );
}
