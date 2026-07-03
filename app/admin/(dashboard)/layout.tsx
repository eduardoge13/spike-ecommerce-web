import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { logoutAction } from './logout-action';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-[#0D1F4E]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold text-white">Punto Clave · Admin</span>
            <nav className="flex items-center gap-4">
              <Link href="/admin" className="text-sm font-medium text-slate-200 hover:text-white">
                Productos
              </Link>
              <Link
                href="/admin/users"
                className="text-sm font-medium text-slate-200 hover:text-white"
              >
                Usuarios
              </Link>
              <Link
                href="/"
                target="_blank"
                className="text-sm font-medium text-slate-200 hover:text-white"
              >
                Ver tienda ↗
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300">{user.email}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg border border-white/25 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
