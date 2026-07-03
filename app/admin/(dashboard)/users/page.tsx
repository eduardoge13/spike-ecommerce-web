import { listUsers, requireAdmin } from '@/lib/auth';
import ConfirmSubmitButton from '@/components/admin/ConfirmSubmitButton';
import { createUserAction, deleteUserAction } from './actions';

export const dynamic = 'force-dynamic';

interface UsersPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const { error } = await searchParams;
  const currentUser = await requireAdmin();
  const users = listUsers();

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-xl font-bold text-gray-900">Usuarios del panel</h1>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {user.email}
                  {user.id === currentUser.id && (
                    <span className="ml-2 text-xs font-normal text-gray-400">(tú)</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {user.id !== currentUser.id && (
                    <form action={deleteUserAction.bind(null, user.id)}>
                      <ConfirmSubmitButton
                        confirmMessage={`¿Eliminar el acceso de ${user.email}?`}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Eliminar
                      </ConfirmSubmitButton>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-bold text-gray-900">Dar de alta un compañero</h2>
        <form action={createUserAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0D1F4E] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Contraseña (mínimo 8 caracteres)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0D1F4E] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[#0D1F4E] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#11265d]"
          >
            Crear usuario
          </button>
        </form>
      </div>
    </div>
  );
}
