import { ClickCounts } from '../types';

const NAMESPACE = 'archicad-addon-repo';
const API_BASE = 'https://api.countapi.xyz';

// Generate a safe key from addon name
export const generateKey = (addonName: string): string => {
  return addonName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 64);
};

// Increment click count for an addon
export const trackClick = async (addonName: string): Promise<number> => {
  const key = generateKey(addonName);
  try {
    const response = await fetch(`${API_BASE}/hit/${NAMESPACE}/${key}`);
    if (response.ok) {
      const data = await response.json();
      return data.value || 0;
    }
  } catch (error) {
    console.error('Failed to track click:', error);
  }
  return 0;
};

// Get click count for a single addon
export const getClickCount = async (addonName: string): Promise<number> => {
  const key = generateKey(addonName);
  try {
    const response = await fetch(`${API_BASE}/get/${NAMESPACE}/${key}`);
    if (response.ok) {
      const data = await response.json();
      return data.value || 0;
    }
  } catch (error) {
    // Key might not exist yet, return 0
    return 0;
  }
  return 0;
};

// Get click counts for multiple addons (batch fetch with caching)
export const getAllClickCounts = async (addonNames: string[]): Promise<ClickCounts> => {
  const counts: ClickCounts = {};

  // Check localStorage cache first
  const cacheKey = 'addon-click-counts';
  const cacheTimestamp = 'addon-click-counts-time';
  const cached = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(cacheTimestamp);

  // Use cache if less than 5 minutes old
  if (cached && cachedTime) {
    const age = Date.now() - parseInt(cachedTime);
    if (age < 5 * 60 * 1000) {
      return JSON.parse(cached);
    }
  }

  // Fetch counts in parallel with batching to avoid rate limits
  const batchSize = 10;
  for (let i = 0; i < addonNames.length; i += batchSize) {
    const batch = addonNames.slice(i, i + batchSize);
    const promises = batch.map(async (name) => {
      const count = await getClickCount(name);
      counts[name] = count;
    });
    await Promise.all(promises);

    // Small delay between batches to avoid rate limiting
    if (i + batchSize < addonNames.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Cache the results
  localStorage.setItem(cacheKey, JSON.stringify(counts));
  localStorage.setItem(cacheTimestamp, Date.now().toString());

  return counts;
};

// Update local cache after a click
export const updateLocalCache = (addonName: string, newCount: number): void => {
  const cacheKey = 'addon-click-counts';
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const counts = JSON.parse(cached);
    counts[addonName] = newCount;
    localStorage.setItem(cacheKey, JSON.stringify(counts));
  }
};
