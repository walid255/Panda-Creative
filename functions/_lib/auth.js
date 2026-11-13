const SESSION_COOKIE = 'panda_admin_session';
const SESSION_TTL_SECONDS = 12 * 60 * 60;

const encodeBase64Url = (bytes) => {
  let binary = '';
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const sign = async (value, secret) => {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return encodeBase64Url(new Uint8Array(signature));
};

const constantTimeEqual = (first, second) => {
  let difference = first.length ^ second.length;
  const length = Math.max(first.length, second.length);
  for (let index = 0; index < length; index += 1) {
    difference |= (first.charCodeAt(index) || 0) ^ (second.charCodeAt(index) || 0);
  }
  return difference === 0;
};

export function isSameOrigin(request) {
  return request.headers.get('Origin') === new URL(request.url).origin;
}

export async function createAdminCookie(env) {
  if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
    throw new Error('Admin authentication is not configured');
  }

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${expiresAt}.${crypto.randomUUID()}`;
  const token = `${payload}.${await sign(payload, env.SESSION_SECRET)}`;
  const secure = new URL(env.REQUEST_URL || 'https://localhost').protocol === 'https:';
  const secureAttribute = secure ? '; Secure' : '';

  return `${SESSION_COOKIE}=${token}; HttpOnly${secureAttribute}; SameSite=Strict; Path=/; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearAdminCookie() {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

export async function isAdminRequest(request, env) {
  if (!env.SESSION_SECRET) return false;

  const cookieHeader = request.headers.get('Cookie') || '';
  const cookie = cookieHeader.split(';').map(value => value.trim())
    .find(value => value.startsWith(`${SESSION_COOKIE}=`));
  if (!cookie) return false;

  const token = cookie.slice(SESSION_COOKIE.length + 1);
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [expiresAt, nonce, signature] = parts;
  if (!/^\d+$/.test(expiresAt) || Number(expiresAt) <= Math.floor(Date.now() / 1000) || !nonce) {
    return false;
  }

  const payload = `${expiresAt}.${nonce}`;
  const expectedSignature = await sign(payload, env.SESSION_SECRET);
  return constantTimeEqual(signature, expectedSignature);
}

export function jsonResponse(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...headers
    }
  });
}
