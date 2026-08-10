"use client";

import { useState } from "react";

export default function QuizQuestion(props) {
  const questionId = props.questionId;
  const stem = props.stem;
  const options = props.options;
  const correctOptionId = props.correctOptionId;
  const explanationCorrect = props.explanationCorrect;
  const explanationsWrong = props.explanationsWrong;
  const hints = props.hints;
  const onCorrect = props.onCorrect;

  const [chosen, setChosen] = useState(null);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const isCorrect = chosen === correctOptionId;
  const hasAnswered = chosen !== null;

  async function handleChoose(optionId) {
    if (submitting) return;
    setChosen(optionId);
    setSubmitting(true);
    try {
      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: questionId,
          chosenOptionId: optionId,
          correct: optionId === correctOptionId,
          hintsUsed: hintsRevealed,
        }),
      });
      if (res.ok && optionId === correctOptionId && onCorrect) {
        onCorrect();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-lg border border-line bg-panel p-5">
      <p className="font-body text-[15px] leading-relaxed text-ink mb-4">{stem}</p>

      <div className="flex flex-col gap-2">
        {options.map(function(opt) {
          const isChosenOne = chosen === opt.id;
          const showAsCorrect = hasAnswered && opt.id === correctOptionId;
          const showAsWrong = hasAnswered && isChosenOne && !isCorrect;
          let cls = "text-left rounded border px-4 py-2.5 text-sm font-body transition-colors ";
          if (showAsCorrect) {
            cls = cls + "border-sage bg-sage/10 text-ink";
          } else if (showAsWrong) {
            cls = cls + "border-clay bg-clay/10 text-ink";
          } else {
            cls = cls + "border-line bg-white hover:border-teal/60";
          }
          if (hasAnswered) {
            cls = cls + " cursor-default";
          } else {
            cls = cls + " cursor-pointer";
          }
          return (
            <button key={opt.id} disabled={hasAnswered} onClick={function() { handleChoose(opt.id); }} className={cls}>
              <span className="font-mono text-xs text-teal mr-2">{opt.id}</span>
              {opt.text}
            </button>
          );
        })}
      </div>

      {!hasAnswered && hints.length > 0 && (
        <div className="mt-4">
          {hintsRevealed < hints.length && (
            <button onClick={function() { setHintsRevealed(hintsRevealed + 1); }} className="text-xs font-body text-teal underline decoration-gold decoration-2 underline-offset-4">
              Show a hint ({hintsRevealed}/{hints.length} used)
            </button>
          )}
          {hints.slice(0, hintsRevealed).map(function(h, i) {
            return (
              <p key={i} className="mt-2 text-xs font-body text-ink/70 italic">
                Hint {i + 1}: {h}
              </p>
            );
          })}
        </div>
      )}

      {hasAnswered && (
        <div className="mt-4">
          <p className={"text-sm font-medium " + (isCorrect ? "text-teal" : "text-clay")}>
            {isCorrect ? "Correct." : "Not quite."}
          </p>
          <p className="mt-1 text-sm font-body text-ink/80 leading-relaxed">
            {isCorrect ? explanationCorrect : (explanationsWrong[chosen] || explanationCorrect)}
          </p>
          {!isCorrect && (
            <button onClick={function() { setChosen(null); }} className="mt-3 text-xs font-body text-teal underline underline-offset-4">
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
