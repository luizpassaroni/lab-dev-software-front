/**
 * Response of `POST /api/auth/register` (and the Nest `POST /auth/register`).
 * Register does NOT start a session: no token, no cookie — the user is sent to
 * the login screen afterwards (PRD §8.1 / sprint-1-plan).
 *
 * `id` is typed as `number` to match {@link TAuthUser}; confirm against the
 * real backend once it exists (Prisma may emit a string id).
 */
export type TRegisterResponse = {
  id: number;
  name: string;
  email: string;
};
