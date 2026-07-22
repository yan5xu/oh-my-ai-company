export const ASSET_CACHE_CONTROL = "public, max-age=31536000, immutable";
export const ASSET_STATE_VERSION = 1;

function assertEntry(entry, label) {
  if (!entry || typeof entry !== "object") throw new Error(`${label} must be an object`);
  if (!/^assets\/(?!.*(?:^|\/)\.\.(?:\/|$))[^\0]+$/.test(entry.path || "")) {
    throw new Error(`${label} has an invalid path: ${entry.path}`);
  }
  if (!/^[a-f0-9]{64}$/.test(entry.sha256 || "")) throw new Error(`${label} has an invalid sha256: ${entry.path}`);
  if (!Number.isInteger(entry.size) || entry.size < 0) throw new Error(`${label} has an invalid size: ${entry.path}`);
  if (typeof entry.content_type !== "string" || !entry.content_type) {
    throw new Error(`${label} has an invalid content type: ${entry.path}`);
  }
}

function syncEntry(entry) {
  return {
    path: entry.path,
    sha256: entry.sha256,
    size: entry.size,
    content_type: entry.content_type,
    cache_control: entry.cache_control || ASSET_CACHE_CONTROL
  };
}

export function normalizeCurrentAssets(entries) {
  if (!Array.isArray(entries)) throw new Error("generated public-assets manifest must be an array");
  const normalized = entries.map((entry, index) => {
    assertEntry(entry, `generated asset ${index}`);
    return syncEntry(entry);
  }).sort((a, b) => a.path.localeCompare(b.path));
  if (new Set(normalized.map((entry) => entry.path)).size !== normalized.length) {
    throw new Error("generated public-assets manifest contains duplicate paths");
  }
  return normalized;
}

export function parseRemoteState(value) {
  const state = typeof value === "string" ? JSON.parse(value) : value;
  if (!state || state.version !== ASSET_STATE_VERSION || !Array.isArray(state.assets)) {
    throw new Error("remote asset state has an unsupported format");
  }
  const assets = state.assets.map((entry, index) => {
    assertEntry(entry, `remote asset ${index}`);
    return syncEntry(entry);
  }).sort((a, b) => a.path.localeCompare(b.path));
  if (new Set(assets.map((entry) => entry.path)).size !== assets.length) {
    throw new Error("remote asset state contains duplicate paths");
  }
  return { ...state, assets };
}

export function createSyncPlan(currentEntries, previousState = null) {
  const current = normalizeCurrentAssets(currentEntries);
  if (!previousState) return { bootstrap: true, puts: current, deletes: [], unchanged: [] };

  const previous = parseRemoteState(previousState).assets;
  const previousByPath = new Map(previous.map((entry) => [entry.path, entry]));
  const currentByPath = new Map(current.map((entry) => [entry.path, entry]));
  const puts = [];
  const unchanged = [];

  for (const entry of current) {
    const prior = previousByPath.get(entry.path);
    if (prior
      && prior.sha256 === entry.sha256
      && prior.size === entry.size
      && prior.content_type === entry.content_type
      && prior.cache_control === entry.cache_control) {
      unchanged.push(entry);
    } else {
      puts.push(entry);
    }
  }

  const deletes = previous.filter((entry) => !currentByPath.has(entry.path));
  return { bootstrap: false, puts, deletes, unchanged };
}

export function buildRemoteState(currentEntries, generatedAt = new Date().toISOString()) {
  return {
    version: ASSET_STATE_VERSION,
    generated_at: generatedAt,
    assets: normalizeCurrentAssets(currentEntries)
  };
}
