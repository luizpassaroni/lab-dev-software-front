/**
 * Error carrying the HTTP status of a failed request, so callers (BFF route
 * handlers, React Query mutations) can branch on it — e.g. map 409 to an
 * inline field error and 5xx to a generic retry message.
 *
 * `status === 0` means the request never reached the server (network failure).
 */
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
