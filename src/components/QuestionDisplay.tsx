export type Exercise =
  | { type: 'translate'; prompt: string; answer: string; hint?: string }
  | { type: 'match'; pairs: Array<{ left: string; right: string }> }
  | { type: 'fill'; template: string; answer: string; options: string[] };

export default function QuestionDisplay({
  exercise,
}: {
  exercise: Exercise;
}) {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {exercise.type === 'translate' && (
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Translate</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{exercise.prompt}</h2>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="translate-answer">
              Your answer
            </label>
            <input
              id="translate-answer"
              type="text"
              defaultValue=""
              placeholder="Write your answer here"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
            {exercise.hint ? (
              <p className="text-sm text-slate-500">Hint: {exercise.hint}</p>
            ) : null}
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
              {exercise.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                >
                  {option}
                </button>
              ))}
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
              {exercise.pairs.map((pair) => (
                <div
                  key={pair.left}
                  className="rounded-2xl bg-white px-4 py-3 text-slate-900 shadow-sm"
                >
                  {pair.left}
                </div>
              ))}
            </div>
            <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-700">Right column</p>
              {exercise.pairs.map((pair) => (
                <div
                  key={pair.right}
                  className="rounded-2xl bg-white px-4 py-3 text-slate-900 shadow-sm"
                >
                  {pair.right}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
