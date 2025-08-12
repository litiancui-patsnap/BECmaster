'use client';
import { useState } from 'react';

const pairs = [
  { en: 'invoice', zh: '发票' },
  { en: 'agenda', zh: '议程' },
  { en: 'deadline', zh: '截止期限' },
];

export default function MatchGamePage() {
  const [matched, setMatched] = useState(0);
  const [done, setDone] = useState(false);

  const handleFinish = () => {
    setDone(true);
  };

  if (done) {
    return <p>成绩已记录</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">快速匹配</h1>
      <p>共有 {pairs.length} 组词语。</p>
      <button
        className="mt-4 px-3 py-1 bg-blue-600 text-white"
        onClick={handleFinish}
        data-testid="finish-match"
      >
        完成游戏
      </button>
    </div>
  );
}
