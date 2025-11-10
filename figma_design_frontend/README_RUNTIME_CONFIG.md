# Runtime Configuration

This app loads deployment-time configuration from `/assets/config.json` during bootstrap via `APP_INITIALIZER`. If the file is missing or invalid, the app continues with sensible defaults and environment fallbacks.

Keys supported in `/assets/config.json`:
- NG_APP_API_BASE: string — Full API base (e.g., http://localhost:3001/api)
- NG_APP_BACKEND_URL: string — Backend origin (e.g., http://localhost:3001)
- NG_APP_WS_URL: string — WebSocket URL (e.g., ws://localhost:3001)
- NG_APP_FEATURE_FLAGS: object — Arbitrary feature flags map
- NG_APP_EXPERIMENTS_ENABLED: boolean — Toggles experiments

Environment fallbacks (for local dev and containers):
- window.env.NG_APP_* or process.env.NG_APP_* if present
- Defaults: backend http://localhost:3001, apiBase <backend>/api, healthPath /health

Convenient getters are available from EnvironmentService:
- getApiBase(), getBackendUrl(), getWebSocketUrl(), getFeatureFlags(), getExperimentsEnabled()
- Helpers: toApiUrl(path), healthUrl(), shouldLog(level)

Note: Do not hardcode secrets here. Use this file only for public, non-sensitive runtime options.
