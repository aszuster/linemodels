export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-24'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
}

if (!dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable');
}
