'use client';

import { useEffect, useState } from 'react';
import { CHARACTERS, type CharacterId, type Exercise } from '../content/types';

export type { Exercise } from '../content/types';

/* Character illustration + speech bubble. Uses the repo's existing mascot art. */
function Mascot({ character, line }: { character: CharacterId; line: string }) {
  const { src, name } = CHARACTERS[character];
  return (
    <div className="flex items-end gap-3">
      <img src={src} alt={name} className="mascot-bob h-28 w-28 shrink-0 object-contain" />
      <div className="relative mb-4 rounded-2xl border-2 border-[#E5E5E5] bg-white px-4 py-3">
        <span
          className="absolute -left-2 bottom-3 h-3 w-3 rotate-45 border-b-2 border-l-2 border-[#E5E5E5] bg-white"
          aria-hidden="true"
        />
        <p className="text-lg font-bold text-[#4B4B4B]">{line}</p>
      </div>
    </div>
  );
}

/* The selectable card shape shared by image and translation answers. */
function OptionCard({
  selected,
  onClick,
  index,
  children,
  className = '',
}: {
  selected: boolean;
  onClick: () => void;
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative rounded-2xl border-2 border-b-4 p-3 text-left transition-colors ${
        selected
          ? 'border-[#1CB0F6] bg-[#DDF4FF]'
          : 'border-[#E5E5E5] bg-white hover:bg-[#F7F7F7]'
      } ${className}`}
    >
      <span
        className={`absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-lg border-2 text-xs font-bold ${
          selected ? 'border-[#1CB0F6] text-[#1899D6]' : 'border-[#E5E5E5] text-[#AFAFAF]'
        }`}
      >
        {index + 1}
      </span>
      {children}
    </button>
  );
}

export default function QuestionDisplay({
  exercise,
  onAnswerChange,
}: {
  exercise: Exercise;
  onAnswerChange: (answer: string | null) => void;
}) {
  // select_image / select_translation
  const [selected, setSelected] = useState<string | null>(null);

  // word_bank
  const [placed, setPlaced] = useState<string[]>([]);

  // match
  const [pickedLeft, setPickedLeft] = useState<string | null>(null);
  const [pickedRight, setPickedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Array<{ left: string; right: string }>>([]);
  const [wrongPair, setWrongPair] = useState<{ left: string; right: string } | null>(null);

  // Derive the answer string the footer will grade, or null when not yet checkable.
  let answer: string | null = null;
  if (exercise.type === 'select_image' || exercise.type === 'select_translation') {
    answer = selected;
  } else if (exercise.type === 'word_bank') {
    answer = placed.length > 0 ? placed.join(' ') : null;
  } else if (exercise.type === 'match') {
    answer = matched.length === exercise.pairs.length ? JSON.stringify(matched) : null;
  }

  useEffect(() => {
    onAnswerChange(answer);
    // onAnswerChange is recreated each render by the parent; depending on `answer` is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  function toggleBankWord(word: string, fromBank: boolean) {
    if (fromBank) {
      setPlaced((p) => [...p, word]);
    } else {
      // remove the first matching placed instance
      setPlaced((p) => {
        const i = p.indexOf(word);
        if (i === -1) return p;
        return [...p.slice(0, i), ...p.slice(i + 1)];
      });
    }
  }

  function attemptMatch(left: string | null, right: string | null) {
    if (!left || !right) return;
    if (exercise.type !== 'match') return;
    const isPair = exercise.pairs.some((p) => p.left === left && p.right === right);
    if (isPair) {
      setMatched((m) => [...m, { left, right }]);
    } else {
      setWrongPair({ left, right });
      setTimeout(() => setWrongPair(null), 600);
    }
    setPickedLeft(null);
    setPickedRight(null);
  }

  return (
    <div className="space-y-6">
      {exercise.type === 'select_image' && (
        <>
          <h2 className="text-2xl font-bold text-[#4B4B4B]">Which one of these is {exercise.prompt}?</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {exercise.options.map((opt, i) => (
              <OptionCard
                key={opt.word}
                index={i}
                selected={selected === opt.word}
                onClick={() => setSelected(opt.word)}
                className="flex flex-col items-center gap-3 pt-8"
              >
                <span className="text-6xl leading-none">{opt.emoji}</span>
                <span className="text-base font-bold text-[#4B4B4B]">{opt.word}</span>
              </OptionCard>
            ))}
          </div>
        </>
      )}

      {exercise.type === 'select_translation' && (
        <>
          <h2 className="text-2xl font-bold text-[#4B4B4B]">Select the correct translation</h2>
          <Mascot character={exercise.character ?? 'duo'} line={exercise.prompt} />
          <div className="space-y-3">
            {exercise.options.map((opt, i) => (
              <OptionCard
                key={opt}
                index={i}
                selected={selected === opt}
                onClick={() => setSelected(opt)}
                className="flex items-center pl-12"
              >
                <span className="text-lg font-bold text-[#4B4B4B]">{opt}</span>
              </OptionCard>
            ))}
          </div>
        </>
      )}

      {exercise.type === 'word_bank' && (
        <>
          <h2 className="text-2xl font-bold text-[#4B4B4B]">
            {exercise.instruction ?? 'Write this in Spanish'}
          </h2>
          <Mascot character={exercise.character ?? 'duo'} line={exercise.prompt} />

          {/* Answer line(s) */}
          <div className="flex min-h-[60px] flex-wrap content-start items-start gap-2 border-b-2 border-[#E5E5E5] pb-3">
            {placed.map((word, i) => (
              <button
                key={`${word}-${i}`}
                type="button"
                onClick={() => toggleBankWord(word, false)}
                className="rounded-xl border-2 border-b-4 border-[#E5E5E5] bg-white px-4 py-2 text-base font-bold text-[#4B4B4B]"
              >
                {word}
              </button>
            ))}
          </div>

          {/* Word bank */}
          <div className="flex flex-wrap gap-2">
            {exercise.bank.map((word, i) => {
              const usedCount = placed.filter((w) => w === word).length;
              const bankCount = exercise.bank.filter((w) => w === word).length;
              const exhausted = usedCount >= bankCount;
              return (
                <button
                  key={`${word}-${i}`}
                  type="button"
                  disabled={exhausted}
                  onClick={() => toggleBankWord(word, true)}
                  className={`rounded-xl border-2 border-b-4 px-4 py-2 text-base font-bold transition-colors ${
                    exhausted
                      ? 'border-[#E5E5E5] bg-[#E5E5E5] text-[#E5E5E5]'
                      : 'border-[#E5E5E5] bg-white text-[#4B4B4B] hover:bg-[#F7F7F7]'
                  }`}
                >
                  {word}
                </button>
              );
            })}
          </div>
        </>
      )}

      {exercise.type === 'match' && (
        <>
          <h2 className="text-2xl font-bold text-[#4B4B4B]">Tap the pairs</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3">
              {exercise.pairs.map((pair, i) => {
                const isMatched = matched.some((m) => m.left === pair.left);
                const isPicked = pickedLeft === pair.left;
                const isWrong = wrongPair?.left === pair.left;
                return (
                  <button
                    key={pair.left}
                    type="button"
                    disabled={isMatched}
                    onClick={() => {
                      setPickedLeft(pair.left);
                      attemptMatch(pair.left, pickedRight);
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl border-2 border-b-4 px-4 py-3 text-left text-lg font-bold transition-colors ${
                      isMatched
                        ? 'border-[#E5E5E5] bg-[#F7F7F7] text-transparent'
                        : isWrong
                        ? 'border-[#FF4B4B] bg-[#FFDFE0] text-[#EA2B2B]'
                        : isPicked
                        ? 'border-[#1CB0F6] bg-[#DDF4FF] text-[#1899D6]'
                        : 'border-[#E5E5E5] bg-white text-[#4B4B4B] hover:bg-[#F7F7F7]'
                    }`}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg border-2 border-current text-xs">
                      {i + 1}
                    </span>
                    {pair.left}
                  </button>
                );
              })}
            </div>
            <div className="space-y-3">
              {exercise.pairs.map((pair, i) => {
                const isMatched = matched.some((m) => m.right === pair.right);
                const isPicked = pickedRight === pair.right;
                const isWrong = wrongPair?.right === pair.right;
                return (
                  <button
                    key={pair.right}
                    type="button"
                    disabled={isMatched}
                    onClick={() => {
                      setPickedRight(pair.right);
                      attemptMatch(pickedLeft, pair.right);
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl border-2 border-b-4 px-4 py-3 text-left text-lg font-bold transition-colors ${
                      isMatched
                        ? 'border-[#E5E5E5] bg-[#F7F7F7] text-transparent'
                        : isWrong
                        ? 'border-[#FF4B4B] bg-[#FFDFE0] text-[#EA2B2B]'
                        : isPicked
                        ? 'border-[#1CB0F6] bg-[#DDF4FF] text-[#1899D6]'
                        : 'border-[#E5E5E5] bg-white text-[#4B4B4B] hover:bg-[#F7F7F7]'
                    }`}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg border-2 border-current text-xs">
                      {i + 5}
                    </span>
                    {pair.right}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
