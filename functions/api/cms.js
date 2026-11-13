import { isAdminRequest, jsonResponse } from '../_lib/auth.js';

const DATABASE_ERROR = 'Global CMS storage is unavailable. Check the Cloudflare D1 binding named DB.';

const removeSensitiveFields = (data) => {
  const safeData = structuredClone(data);
  if (safeData.siteSettings) {
    delete safeData.siteSettings.adminPassword;
  }
  return safeData;
};

export async function onRequestGet({ request, env }) {
  if (!env.DB) {
    return jsonResponse({ error: DATABASE_ERROR }, 503);
  }

  try {
    const row = await env.DB.prepare('SELECT data FROM cms_content WHERE id = 1').first();
    if (!row) return jsonResponse({ data: null });

    const data = removeSensitiveFields(JSON.parse(row.data));
    if (!(await isAdminRequest(request, env))) {
      data.inquiries = [];
      data.newsletterSubscribers = [];
    }
    return jsonResponse({ data });
  } catch (error) {
    console.error('Failed to read global CMS data', error);
    return jsonResponse({ error: DATABASE_ERROR }, 500);
  }
}

export async function onRequestPut({ request, env }) {
  if (!env.DB) {
    return jsonResponse({ error: DATABASE_ERROR }, 503);
  }

  if (!(await isAdminRequest(request, env))) {
    return jsonResponse({ error: 'Admin session required' }, 401);
  }

  if (Number(request.headers.get('Content-Length') || 0) > 2_000_000) {
    return jsonResponse({ error: 'CMS data exceeds the 2 MB limit' }, 413);
  }

  try {
    const data = await request.json();
    if (!data || typeof data !== 'object' || Array.isArray(data) || !data.siteSettings || !data.galleryItems) {
      return jsonResponse({ error: 'Invalid CMS data' }, 400);
    }

    const safeData = removeSensitiveFields(data);
    const serializedData = JSON.stringify(safeData);
    if (new TextEncoder().encode(serializedData).length > 2_000_000) {
      return jsonResponse({ error: 'CMS data exceeds the 2 MB limit' }, 413);
    }

    await env.DB.prepare(`
      INSERT INTO cms_content (id, data, updated_at)
      VALUES (1, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        data = excluded.data,
        updated_at = CURRENT_TIMESTAMP
    `).bind(serializedData).run();

    return jsonResponse({ saved: true });
  } catch (error) {
    console.error('Failed to save global CMS data', error);
    return jsonResponse({ error: 'Could not save global CMS data' }, 500);
  }
}
