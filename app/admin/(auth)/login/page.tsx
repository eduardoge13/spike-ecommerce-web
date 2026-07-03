import { loginAction } from './actions';

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Panel de administración</h1>
        <p className="mt-1 text-sm text-gray-500">Punto Clave MX</p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
            Correo o contraseña incorrectos.
          </p>
        )}

        <form action={loginAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0D1F4E] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0D1F4E] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#0D1F4E] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#11265d]"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
