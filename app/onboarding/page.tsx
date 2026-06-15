'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DuoSpeech from '../../src/components/DuoSpeech';
import OptionCard from '../../src/components/OptionCard';
import OnboardingShell from '../../src/components/OnboardingShell';
import {
  saveOnboarding,
  type LearningReason,
  type Proficiency,
} from '../../src/lib/onboarding';

/* ── Language picker (step "language", shown before the Duo flow) ── */
const LANGUAGES = [
  { name: 'Spanish', flag: 'spanish', learners: '42M', active: true },
  { name: 'French', flag: 'french', learners: '23M' },
  { name: 'Japanese', flag: 'japanese', learners: '18.6M' },
  { name: 'German', flag: 'german', learners: '16M' },
  { name: 'Korean', flag: 'korean', learners: '12.8M' },
  { name: 'Italian', flag: 'italian', learners: '10.7M' },
  { name: 'Chinese', flag: 'chinese', learners: '9.35M' },
  { name: 'Russian', flag: 'russian', learners: '7.88M' },
  { name: 'Portuguese', flag: 'portuguese', learners: '4.51M' },
  { name: 'Dutch', flag: 'dutch', learners: '2.73M' },
  { name: 'Greek', flag: 'greek', learners: '2.57M' },
  { name: 'Swedish', flag: 'swedish', learners: '1.93M' },
];

type Option = { value: string | number; label: string; emoji?: string; sublabel?: string; trailing?: string };

type Step =
  | { kind: 'dialogue'; text: string }
  | { kind: 'benefits'; title: string; items: { emoji: string; title: string; sub: string }[] }
  | { kind: 'question'; field: string; title: string; layout: 'grid' | 'list'; options: Option[] };

const STEPS: Step[] = [
  { kind: 'dialogue', text: "Hi there! I'm Duo!" },
  { kind: 'dialogue', text: "Let's get this party started!" },
  {
    kind: 'question',
    field: 'source',
    title: 'How did you hear about us?',
    layout: 'grid',
    options: [
      { value: 'webtoon', label: 'Webtoon', emoji: '📲' },
      { value: 'social', label: 'Facebook/Instagram', emoji: '📸' },
      { value: 'friends', label: 'Friends/family', emoji: '🧑‍🤝‍🧑' },
      { value: 'tiktok', label: 'TikTok', emoji: '🎵' },
      { value: 'google', label: 'Google Search', emoji: '🔍' },
      { value: 'tv', label: 'TV', emoji: '📺' },
      { value: 'youtube', label: 'YouTube', emoji: '▶️' },
      { value: 'news', label: 'News/article/blog', emoji: '📰' },
      { value: 'other', label: 'Other', emoji: '💬' },
    ],
  },
  {
    kind: 'question',
    field: 'reason',
    title: 'Why are you learning Spanish?',
    layout: 'grid',
    options: [
      { value: 'education', label: 'Support my education', emoji: '📚' },
      { value: 'people', label: 'Connect with people', emoji: '🧑‍🤝‍🧑' },
      { value: 'fun', label: 'Just for fun', emoji: '🎉' },
      { value: 'travel', label: 'Prepare for travel', emoji: '✈️' },
      { value: 'productivity', label: 'Spend time productively', emoji: '🧠' },
      { value: 'career', label: 'Boost my career', emoji: '💼' },
      { value: 'other', label: 'Other', emoji: '💬' },
    ],
  },
  {
    kind: 'question',
    field: 'proficiency',
    title: 'How much Spanish do you know?',
    layout: 'list',
    options: [
      { value: 'new', label: "I'm new to Spanish" },
      { value: 'words', label: 'I know some common words' },
      { value: 'basic', label: 'I can have basic conversations' },
      { value: 'topics', label: 'I can talk about various topics' },
      { value: 'detailed', label: 'I can discuss most topics in detail' },
    ],
  },
  {
    kind: 'benefits',
    title: "Here's what you can achieve!",
    items: [
      { emoji: '💬', title: 'Converse with confidence', sub: 'Stress-free speaking and listening exercises' },
      { emoji: '🅰️', title: 'Build a large vocabulary', sub: 'Common words and practical phrases' },
      { emoji: '⏱️', title: 'Develop a learning habit', sub: 'Smart reminders, fun challenges, and more' },
    ],
  },
  {
    kind: 'question',
    field: 'goalMinutes',
    title: "What's your daily learning goal?",
    layout: 'list',
    options: [
      { value: 5, label: '5 min / day', trailing: 'Casual' },
      { value: 10, label: '10 min / day', trailing: 'Regular' },
      { value: 15, label: '15 min / day', trailing: 'Serious' },
      { value: 20, label: '20 min / day', trailing: 'Intense' },
    ],
  },
  {
    kind: 'question',
    field: 'path',
    title: "Now let's find the best place to start!",
    layout: 'list',
    options: [
      { value: 'scratch', label: 'Start from scratch', sublabel: 'Take the easiest lesson of the Spanish course' },
      { value: 'find', label: 'Find my level', sublabel: 'Let Duo recommend where you should start learning' },
    ],
  },
  { kind: 'dialogue', text: 'It can be hard to stay motivated…' },
  { kind: 'dialogue', text: '…so Duolingo is designed to be fun like a game!' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string | number>>({});

  const current = STEPS[step];

  function finish() {
    saveOnboarding({
      language: 'es',
      reason: selections.reason as LearningReason,
      proficiency: selections.proficiency as Proficiency,
      goalMinutes: Number(selections.goalMinutes),
      source: selections.source as string | undefined,
    });
    router.push('/lesson');
  }

  function handleBack() {
    if (step === 0) {
      setStarted(false);
      return;
    }
    setStep((s) => s - 1);
  }

  function handleContinue() {
    if (step === STEPS.length - 1) {
      finish();
      return;
    }
    setStep((s) => s + 1);
  }

  // ── Language select: its own screen, no shell chrome ──
  if (!started) {
    return (
      <main className="min-h-screen bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-center text-2xl font-bold text-[#4B4B4B]">I want to learn…</h1>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.name}
                type="button"
                disabled={!lang.active}
                onClick={() => lang.active && setStarted(true)}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 border-b-4 px-3 py-5 transition-colors ${
                  lang.active
                    ? 'border-[#E5E5E5] bg-white hover:bg-[#F7F7F7]'
                    : 'cursor-not-allowed border-[#E5E5E5] bg-white opacity-50'
                }`}
              >
                <Image src={`/flags/${lang.flag}.svg`} alt="" width={56} height={40} className="h-10 w-14 rounded object-cover" />
                <span className="text-sm font-bold text-[#4B4B4B]">{lang.name}</span>
                <span className="text-xs font-medium text-[#AFAFAF]">
                  {lang.active ? `${lang.learners} learners` : 'Coming soon'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const progress = ((step + 1) / STEPS.length) * 100;
  const canContinue = current.kind !== 'question' || selections[current.field] != null;

  return (
    <OnboardingShell progress={progress} onBack={handleBack} onContinue={handleContinue} canContinue={canContinue}>
      {current.kind === 'dialogue' && (
        <div className="flex min-h-[55vh] items-center justify-center">
          <DuoSpeech text={current.text} variant="hero" />
        </div>
      )}

      {current.kind === 'benefits' && (
        <div>
          <DuoSpeech text={current.title} />
          <div className="mt-10 divide-y divide-[#E5E5E5]">
            {current.items.map((item) => (
              <div key={item.title} className="flex items-center gap-4 py-5">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <p className="font-bold text-[#4B4B4B]">{item.title}</p>
                  <p className="text-sm text-[#777777]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {current.kind === 'question' && (
        <div>
          <DuoSpeech text={current.title} />
          <div className={`mt-10 ${current.layout === 'grid' ? 'grid gap-3 sm:grid-cols-2' : 'mx-auto flex max-w-md flex-col gap-3'}`}>
            {current.options.map((opt) => (
              <OptionCard
                key={String(opt.value)}
                label={opt.label}
                emoji={opt.emoji}
                sublabel={opt.sublabel}
                trailing={opt.trailing}
                selected={selections[current.field] === opt.value}
                onClick={() => setSelections((prev) => ({ ...prev, [current.field]: opt.value }))}
              />
            ))}
          </div>
        </div>
      )}
    </OnboardingShell>
  );
}
