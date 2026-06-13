'use client';

import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white px-6 py-4 flex items-center gap-6">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-blue-400 whitespace-nowrap">
        Guia de Streaming
      </Link>

      {/* Barra de busca */}
      <div className="flex-1">
        <SearchBar compact />
      </div>

      {/* Slot de auth — estado real entra na FRONT-07 */}
      <nav className="flex gap-4 text-sm whitespace-nowrap">
        <Link href="/login" className="hover:text-blue-400">
          Entrar
        </Link>
        <Link href="/cadastro" className="hover:text-blue-400">
          Cadastrar
        </Link>
      </nav>
    </header>
  );
}