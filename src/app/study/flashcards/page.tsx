'use client';
import { useState } from 'react';
import { nextSchedule } from '../../../lib/srs';

const sampleWords = [
  { id: '1', headword: 'invoice', translation_zh: '发票' },
  { id: '2', headword: 'agenda', translation_zh: '议程' },
  { id: '3', headword: 'deadline', translation_zh: '截止期限' },
];

export default function FlashcardsPage() {
  const [index, setIndex] = useState(0);
  const remaining = sampleWords.length - index;
  const word = sampleWords[index];

  const handle = (grade: 0 | 1 | 2) => {
    nextSchedule(undefined, grade); // 调用以示意
    setIndex((i) => i + 1);
  };

  if (!word) {
    return <p>学习完成！</p>;
  }

  return (
    <div className="space-y-4">
      <p>剩余：{remaining} 张</p>
      <div className="border p-4 rounded">
        <p className="text-xl font-bold">{word.headword}</p>
        <p className="text-gray-500">{word.translation_zh}</p>
      </div>
      <div className="flex space-x-2">
        <button className="px-3 py-1 bg-red-500 text-white" onClick={() => handle(0)}>
          忘记
        </button>
        <button className="px-3 py-1 bg-yellow-500 text-white" onClick={() => handle(1)}>
          模糊
        </button>
        <button className="px-3 py-1 bg-green-600 text-white" onClick={() => handle(2)}>
          认识
        </button>
      </div>
    </div>
  );
}
