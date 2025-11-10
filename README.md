# figma-based-modern-frontend-5855-5865

Frontend-backend wiring is finalized at runtime via `/assets/config.json` in the Angular app (see `figma_design_frontend/README_RUNTIME_CONFIG.md` and `figma_design_frontend/README.md`).

Backend-optional mode:
- The frontend now runs without any backend by default.
- A default `figma_design_frontend/public/assets/config.json` is provided with empty `NG_APP_BACKEND_URL` and `NG_APP_API_BASE`.
- In this mode, the health indicator shows “No backend” (neutral) and no errors are thrown. Auth operates entirely in-memory.

To enable backend connectivity:
1) Edit `figma_design_frontend/public/assets/config.json` with your backend URLs:
```json
{
  "NG_APP_BACKEND_URL": "https://YOUR-BACKEND-ORIGIN:3001",
  "NG_APP_API_BASE": "https://YOUR-BACKEND-ORIGIN:3001/api"
}
```
2) Start the app (`ng serve`). The navbar/footer health chips will call `${NG_APP_API_BASE}/health` and display “Online” when healthy.

Current backend preview (example):
- NG_APP_BACKEND_URL: https://vscode-internal-42336-beta.beta01.cloud.kavia.ai:3001
- NG_APP_API_BASE: https://vscode-internal-42336-beta.beta01.cloud.kavia.ai:3001/api
Place them in `figma_design_frontend/public/assets/config.json` to make the app call the correct backend without rebuilds.
