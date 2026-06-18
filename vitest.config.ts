import { defineConfig } from 'vitest/config';

// Unit tests cover the pure logic and content-integrity layer (src/lib,
// src/content). They run in plain Node — no jsdom — because the targets are
// framework-free functions and data. The few browser-API touchpoints
// (localStorage) are stubbed per-file.
//
// Do NOT load the app's .env into tests. lib/supabase-browser.ts throws on
// import when NEXT_PUBLIC_SUPABASE_* are unset, and the action tests rely on
// vi.mock fully replacing that module. Keeping the real env out is what makes
// those mocks load-bearing: a broken mock path fails loudly instead of silently
// falling through to a real client.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
});
