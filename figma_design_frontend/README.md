# Angular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Runtime API configuration

This app reads deployment-time configuration from `/assets/config.json` at bootstrap (see `README_RUNTIME_CONFIG.md` for details). This allows pointing the frontend to any backend without rebuilding.

- Keys supported:
  - `NG_APP_BACKEND_URL`: Backend origin, e.g. `http://localhost:3001` or your preview URL.
  - `NG_APP_API_BASE`: Full API base, e.g. `http://localhost:3001/api`. If omitted, it defaults to `<NG_APP_BACKEND_URL>/api`.

- Where to place the file:
  - Put `config.json` under `public/assets/config.json` (already added to build assets). It will be served at `/assets/config.json`.

- Example for the current backend preview:
  ```json
  {
    "NG_APP_BACKEND_URL": "https://vscode-internal-42336-beta.beta01.cloud.kavia.ai:3001",
    "NG_APP_API_BASE": "https://vscode-internal-42336-beta.beta01.cloud.kavia.ai:3001/api"
  }
  ```

- Environment fallbacks:
  - If `config.json` is missing, the app falls back to `window.env.NG_APP_*` / `process.env.NG_APP_*` if provided, otherwise defaults to `http://localhost:3001` and `/api`.

Note: Do not include secrets in `config.json`. It is publicly served.

## Verifying frontend-backend wiring

- Health indicator (navbar/footer) calls the backend health endpoint at `${NG_APP_API_BASE}/health` using `EnvironmentService` and `ApiService`.
- To check connectivity:
  1. Ensure your backend is running and exposes `/health` (Express preview is at port 3001).
  2. Set `/public/assets/config.json` as shown above.
  3. Start the app: `ng serve`.
  4. Observe the status chip show “Online” when healthy.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
