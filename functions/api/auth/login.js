import { createAdminCookie, isSameOrigin, jsonResponse } from '../../_lib/auth.js';

const constantTimeEqual = (first, second) => {
  let difference = first.length ^ second.length;
  const length = Math.max(first.length, second.length);
  for (let index = 0; index < length; index += 1) {
    difference |= (first.charCodeAt(index) || 0) ^ (second.charCodeAt(index) || 0);
  }
  return difference === 0;
};

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) {
    return jsonResponse({ error: 'Request origin is not allowed' }, 403);
  }

  if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
    return jsonResponse({ error: 'Admin authentication is not configured in Cloudflare Pages' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid login request' }, 400);
  }

  if (typeof body.password !== 'string' || !constantTimeEqual(body.password, env.ADMIN_PASSWORD)) {
    return jsonResponse({ error: 'Incorrect admin passcode' }, 401);
  }

  try {
    const cookie = await createAdminCookie({ ...env, REQUEST_URL: request.url });
    return jsonResponse({ authenticated: true }, 200, { 'Set-Cookie': cookie });
  } catch (error) {
    console.error('Failed to create admin session', error);
    return jsonResponse({ error: 'Could not create an admin session' }, 500);
  }
}
