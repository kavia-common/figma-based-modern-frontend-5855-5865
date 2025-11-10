# figma-based-modern-frontend-5855-5865

Frontend-backend wiring is finalized at runtime via `/assets/config.json` in the Angular app (see `figma_design_frontend/README_RUNTIME_CONFIG.md` and `figma_design_frontend/README.md`).

For the current backend preview:
- NG_APP_BACKEND_URL: https://vscode-internal-42336-beta.beta01.cloud.kavia.ai:3001
- NG_APP_API_BASE: https://vscode-internal-42336-beta.beta01.cloud.kavia.ai:3001/api

Place them in `figma_design_frontend/public/assets/config.json` to make the app call the correct backend without rebuilds.
