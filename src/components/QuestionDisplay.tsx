"use client";

export type Exercise =
  | { type: 'translate'; prompt: string; answer: string; hint?: string }
  | { type: 'match'; pairs: Array<{ left: string; right: string }> }
  | { type: 'fill'; template: string; answer: string; options: string[] };

import { useState } from 'react';

export default function QuestionDisplay({
  exercise,
  onSubmit,
}: {
  exercise: Exercise;
  onSubmit: (result: { answer: string; isCorrect: boolean }) => void;
}) {
  // translate input
  const [text, setText] = useState('');

  // fill selection
  const [selectedFill, setSelectedFill] = useState<string | null>(null);

  // match selections
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Array<{ left: string; right: string }>>([]);

  function resetMatchSelection() {
    setSelectedLeft(null);
    setSelectedRight(null);
  }

  function handleLeftSelect(left: string) {
    if (matchedPairs.some((p) => p.left === left)) {
      return;
    }

    if (selectedRight && !matchedPairs.some((p) => p.right === selectedRight)) {
      setMatchedPairs((m) => [...m, { left, right: selectedRight }]);
      resetMatchSelection();
      return;
    }

    setSelectedLeft(left);
  }

  function handleRightSelect(right: string) {
    if (matchedPairs.some((p) => p.right === right)) {
      return;
    }

    if (selectedLeft && !matchedPairs.some((p) => p.left === selectedLeft)) {
      setMatchedPairs((m) => [...m, { left: selectedLeft, right }]);
      resetMatchSelection();
      return;
    }

    setSelectedRight(right);
  }

  // call when user clicks Check
  function handleCheck() {
    if (exercise.type === 'translate') {
      const entered = text.trim();
      const isCorrect = entered.toLowerCase() === exercise.answer.trim().toLowerCase();
      onSubmit({ answer: entered, isCorrect });
      return;
    }

    if (exercise.type === 'fill') {
      const selected = selectedFill ?? '';
      const isCorrect = selected.trim().toLowerCase() === exercise.answer.trim().toLowerCase();
      onSubmit({ answer: selected, isCorrect });
      return;
    }

    if (exercise.type === 'match') {
      // ensure all pairs matched
      const answerPairs = matchedPairs.slice();
      const serialized = JSON.stringify(answerPairs);
      // evaluate correctness: compare sets of left|right
      const expected = new Set(exercise.pairs.map((p) => `${p.left}|||${p.right}`));
      const actual = new Set(answerPairs.map((p) => `${p.left}|||${p.right}`));
      const isCorrect = expected.size === actual.size && [...expected].every((v) => actual.has(v));
      onSubmit({ answer: serialized, isCorrect });
      return;
    }
  }

  // Derived validity
  const canCheck =
    (exercise.type === 'translate' && text.trim().length > 0) ||
    (exercise.type === 'fill' && selectedFill !== null) ||
    (exercise.type === 'match' && matchedPairs.length === exercise.pairs.length);

  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {exercise.type === 'translate' && (
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Translate</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{exercise.prompt}</h2>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Your answer</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your answer here"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
            {exercise.hint ? <p className="text-sm text-slate-500">Hint: {exercise.hint}</p> : null}
          </div>
        </div>
      )}

      {exercise.type === 'fill' && (
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Fill in the blank</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {exercise.template.split('___').map((segment, index, array) => (
                <span key={index}>
                  {segment}
                  {index < array.length - 1 ? (
                    <span className="inline-block min-w-[4rem] border-b-2 border-slate-300 text-lg font-semibold text-slate-900">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  ) : null}
                </span>
              ))}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">Choose the correct word</p>
            <div className="grid grid-cols-2 gap-3">
              {exercise.options.map((option) => {
                const selected = selectedFill === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedFill(option)}
                    className={`rounded-2xl border p-3 text-left text-sm font-medium transition ${
                      selected ? 'bg-[#F0F8FF] border-[#1CB0F6]' : 'bg-slate-50 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {exercise.type === 'match' && (
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Match</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Pair the words</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-700">Left column</p>
              {exercise.pairs.map((pair) => {
                const isSelected = selectedLeft === pair.left;
                const isMatched = matchedPairs.some((p) => p.left === pair.left);
                return (
                <button
                  key={pair.left}
                  type="button"
                  onClick={() => handleLeftSelect(pair.left)}
                  className={`w-full text-left rounded-2xl px-4 py-3 ${
                    isMatched ? 'bg-white opacity-60' : isSelected ? 'bg-[#F0F8FF] border border-[#1CB0F6]' : 'bg-white'
                  }`}
                >
                  {pair.left}
                </button>
              );
              })}
            </div>
            <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-700">Right column</p>
              {exercise.pairs.map((pair) => {
                const isSelected = selectedRight === pair.right;
                const isMatched = matchedPairs.some((p) => p.right === pair.right);
                return (
                <button
                  key={pair.right}
                  type="button"
                  onClick={() => handleRightSelect(pair.right)}
                  className={`w-full text-left rounded-2xl px-4 py-3 ${
                    isMatched ? 'bg-white opacity-60' : isSelected ? 'bg-[#F0F8FF] border border-[#1CB0F6]' : 'bg-white'
                  }`}
                >
                  {pair.right}
                </button>
              );
              })}
            </div>
          </div>

          <div className="mt-2">
            <p className="text-sm text-slate-600">Matched pairs:</p>
            <div className="mt-2 space-y-2">
              {matchedPairs.map((p, i) => (
                <div key={i} className="rounded-xl bg-white p-3 text-sm">
                  {p.left} — {p.right}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <button
          type="button"
          onClick={handleCheck}
          disabled={!canCheck}
          className={`w-full rounded-xl px-6 py-3 text-lg font-bold text-white uppercase tracking-wide ${
            canCheck ? 'bg-[#58CC02] border-b-4 border-[#46A302] hover:bg-[#46A302]' : 'bg-[#E5E5E5] border-[#E5E5E5] text-[#AFAFAF] cursor-not-allowed'
          }`}
        >
          Check
        </button>
      </div>
    </section>
  );
}
