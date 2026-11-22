export function isFormspreeEndpoint(endpoint) {
  return (
    typeof endpoint === 'string' && /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)
  );
}

export async function sendContact(endpoint, data, request = fetch) {
  if (!isFormspreeEndpoint(endpoint)) return 'unavailable';
  try {
    const response = await request(endpoint, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(20000),
    });
    return response.ok ? 'success' : response.status === 429 ? 'limit' : 'error';
  } catch {
    return 'network';
  }
}
