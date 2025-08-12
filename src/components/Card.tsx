import { ReactNode } from 'react';

export default function Card({ children }: { children: ReactNode }) {
  return <div className="border p-4 rounded bg-white shadow-sm">{children}</div>;
}
