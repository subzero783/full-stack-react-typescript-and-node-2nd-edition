# Northstar — SaaS landing page

A modern SaaS marketing page built with **React 19 + TypeScript + Vite**, using
plain CSS (custom properties, native nesting) and no UI dependencies.

It lives in its own npm project inside the `Test/` folder so it can be run,
built and linted independently of the chapter exercises in this repository.

## Getting started

```bash
cd Test
npm install
npm run dev
```

Then open the URL Vite prints (http://localhost:5173 by default).

## Scripts

| Script            | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR        |
| `npm run build`   | Typecheck (`tsc -b`) and build to `dist/` |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | Run ESLint over the project               |

## Page sections

- **Header** — sticky, blurred nav with anchor links and a trial CTA.
- **Hero** — headline, dual CTA, trust stats and a CSS-only product mock.
- **Features** (`#features`) — six capability cards driven by `data/features.ts`.
- **Pricing** (`#pricing`) — monthly/annual toggle and three tiers
  (`Starter`, `Pro`, `Enterprise`) driven by `data/plans.ts`.
- **Contact** (`#contact`) — contact details plus a validated message form.
- **Footer** — brand blurb, link columns and social profiles.

## Project structure

```
src/
├── components/       one folder-less component + its CSS per section
├── data/             content: navigation.ts, features.ts, plans.ts
├── lib/sendMessage.ts  simulated transport for the contact form
├── types.ts          shared types (Plan, Feature, ContactFormValues, …)
├── App.tsx           composes the sections
├── App.css           page shell + shared blocks (container, buttons, icons)
└── index.css         design tokens, dark mode, reset, typography
```

Icons are a single sprite at `public/icons.svg`, consumed as
`<svg role="presentation"><use href="/icons.svg#icon-id" /></svg>`.

## The contact form

`Test` has no backend, so `lib/sendMessage.ts` simulates delivery (a short delay
and a `console.info`). The form itself is complete: required-field, email-format
and message-length validation, per-field error messages wired with
`aria-invalid` / `aria-describedby`, an `aria-live` status region, a pending
state and a success panel with a reset action.

To talk to a real API, replace the body of `sendMessage` with a `fetch` call —
the component keeps working because it only awaits the returned promise.

## Notes on conventions

- `verbatimModuleSyntax` is on, so type-only imports use `import type`.
- `erasableSyntaxOnly` is on, so there are no `enum`s — string-literal unions
  and `as const` maps are used instead.
- Config files (`tsconfig.*.json`, `eslint.config.js`, `vite.config.ts`) mirror
  the setup used by `Chapter 6/redux`.
