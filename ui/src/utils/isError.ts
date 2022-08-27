type Error = { error: string; message?: string };

export function isError(error: unknown): error is Error {
  return typeof error === 'object' && error !== null && 'error' in error;
}
