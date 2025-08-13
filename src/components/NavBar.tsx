import Link from 'next/link';

const links = [
  { href: '/', label: '首页' },
  { href: '/dashboard', label: '仪表盘' },
  { href: '/decks', label: '词书' },
  { href: '/study/flashcards', label: '学习' },
  { href: '/games', label: '小游戏' },
  { href: '/stats', label: '统计' },
  { href: '/settings', label: '设置' },
];

export default function NavBar() {
  return (
    <nav className="bg-white shadow mb-4">
      <ul className="flex overflow-x-auto">
        {links.map((l) => (
          <li key={l.href} className="p-2 whitespace-nowrap">
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
