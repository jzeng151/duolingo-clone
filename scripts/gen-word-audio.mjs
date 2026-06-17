/* Regenerate Spanish word/sentence audio for every string used in the lessons.
   Pulls TTS from Google Translate's tw-ob endpoint into public/audio/es/ and
   writes the string -> file manifest at src/content/word-audio.json.
   Idempotent: only downloads files that are missing. Run: node scripts/gen-word-audio.mjs */
import fs from 'fs';
import { execSync } from 'child_process';

const files = [
  'src/content/spanish-lesson-1.ts',
  'src/content/spanish-lessons.ts',
  'src/content/spanish-unit1.ts',
  'src/content/spanish-unit2.ts',
  'src/content/spanish-unit3.ts',
  'src/content/spanish-unit4.ts',
  'src/content/spanish-unit5.ts',
];
const src = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n');

const set = new Set();
for (const m of src.matchAll(/(?:answer|lead):\s*(?:'([^']+)'|"([^"]+)")/g)) set.add(m[1] || m[2]);
for (const m of src.matchAll(/word:\s*["']([^"']+)["']/g)) set.add(m[1]);
for (const m of src.matchAll(/right:\s*["']([^"']+)["']/g)) set.add(m[1]);
for (const m of src.matchAll(/(?:options|bank):\s*\[([^\]]+)\]/g)) {
  for (const t of m[1].matchAll(/'([^']+)'|"([^"]+)"/g)) set.add(t[1] || t[2]);
}
const strings = [...set].filter((s) => /[a-záéíóúñ¿]/i.test(s)).sort();

const slug = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[¿?¡!.,]/g, '').trim().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

const dir = 'public/audio/es';
fs.mkdirSync(dir, { recursive: true });
const manifest = {};
let ok = 0, fail = 0;
for (const s of strings) {
  const out = `${dir}/${slug(s)}.mp3`;
  manifest[s] = `/audio/es/${slug(s)}.mp3`;
  if (fs.existsSync(out) && fs.statSync(out).size > 500) { ok++; continue; }
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=es&client=tw-ob&q=${encodeURIComponent(s)}`;
  try {
    execSync(`curl -s --compressed -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" ${JSON.stringify(url)} -o ${JSON.stringify(out)}`, { timeout: 15000 });
    if (fs.existsSync(out) && fs.statSync(out).size > 500) ok++;
    else { fail++; console.error('FAIL(small)', s); }
  } catch (e) { fail++; console.error('FAIL', s, e.message); }
  execSync('sleep 0.25');
}
fs.writeFileSync('src/content/word-audio.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`DONE ok=${ok} fail=${fail} total=${strings.length} -> src/content/word-audio.json`);
