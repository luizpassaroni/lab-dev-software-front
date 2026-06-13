'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  compact?: boolean;
}

export default function SearchBar({ compact = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'flex gap-2' : 'flex gap-2 w-full'}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar filmes e séries..."
        className="border rounded px-3 py-1 flex-1 text-sm"
      />
      <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
        Buscar
      </button>
    </form>
  );
}