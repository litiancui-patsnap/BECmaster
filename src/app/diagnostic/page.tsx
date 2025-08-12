'use client';
import { useState } from 'react';

export default function DiagnosticPage() {
  const [done, setDone] = useState(false);
  const handle = () => setDone(true);
  if (done) return <p>建议：从 BEC 中级词书开始学习。</p>;
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">诊断测试</h1>
      <p>共 10 题，占位。</p>
      <button className="mt-4 px-3 py-1 bg-blue-600 text-white" onClick={handle}>
        完成
      </button>
    </div>
  );
}
