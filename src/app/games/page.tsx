import Link from 'next/link';

export default function GamesPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">小游戏</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <Link href="/games/match" className="text-blue-600 underline">
            快速匹配
          </Link>
        </li>
        <li>
          <Link href="/games/choice" className="text-blue-600 underline">
            四选一
          </Link>
        </li>
      </ul>
    </div>
  );
}
