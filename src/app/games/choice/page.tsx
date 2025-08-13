'use client';
import { useState } from 'react';

const questions = [
  {
    q: 'invoice',
    options: ['发票', '议程', '截止'],
    answer: '发票',
  },
  {
    q: 'agenda',
    options: ['议程', '发票', '截止'],
    answer: '议程',
  },
];

export default function ChoiceGamePage() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const question = questions[index];

  const choose = (opt: string) => {
    if (opt === question.answer) setScore((s) => s + 1);
    if (index + 1 >= questions.length) setDone(true);
    else setIndex((i) => i + 1);
  };

  if (done) {
    return <p>成绩：{score}/{questions.length}</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">四选一</h1>
      <p className="mb-2">{question.q}</p>
      <div className="space-y-2">
        {question.options.map((opt) => (
          <button
            key={opt}
            className="block w-full border p-2"
            onClick={() => choose(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
