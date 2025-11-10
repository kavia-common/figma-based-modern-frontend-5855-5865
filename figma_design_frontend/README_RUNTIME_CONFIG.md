# Runtime Configuration

This app loads deployment-time configuration from `/assets/config.json` during bootstrap via `APP_INITIALIZER`. If the file is missing or invalid, the app continues with sensible defaults and environment fallbacks.

Keys supported in `/assets/config.json`:
- NG_APP_API_BASE: string — Full API base (e.g., http://localhost:3001/api)
- NG_APP_BACKEND_URL: string — Backend origin (e.g., http://localhost:3001)
- NG_APP_WS_URL: string — WebSocket URL (e.g., ws://localhost:3001)
- NG_APP_FEATURE_FLAGS: object — Arbitrary feature flags map
- NG_APP_EXPERIMENTS_ENABLED: boolean — Toggles experiments

No-backend mode:
- If both `NG_APP_API_BASE` and `NG_APP_BACKEND_URL` are empty strings (or omitted), the app runs in a backend-optional mode.
- HealthService does not make network calls and shows a neutral “No backend” status.
- AuthService operates in-memory only.

Environment fallbacks (for local dev and containers):
- window.env.NG_APP_* or process.env.NG_APP_* if present
- If at least one of `NG_APP_API_BASE`/`NG_APP_BACKEND_URL` is provided (non-empty), the app uses those and will build missing values (apiBase defaults to `<backend>/api`).
- If both are missing AND environment variables do not supply values, the app stays in no-backend mode.
- Health path default: `/health`

Convenient getters are available from EnvironmentService:
- getApiBase(), getBackendUrl(), getWebSocketUrl(), getFeatureFlags(), getExperimentsEnabled(), isBackendConfigured
- Helpers: toApiUrl(path), healthUrl(), shouldLog(level)

Note: Do not hardcode secrets here. Use this file only for public, non-sensitive runtime options.
