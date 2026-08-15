import fs from 'node:fs';
const tool = process.env.PRATIX_TOOL_ENTRY || process.argv[2];
if (!tool || !fs.existsSync(tool)) throw new Error(`Expected static tool entry missing: ${tool}`);
if (!fs.existsSync('vercel.json')) throw new Error('vercel.json is missing.');
if (!fs.existsSync('.github/workflows/ci.yml')) throw new Error('CI workflow is missing.');
const html = fs.readFileSync(tool, 'utf8');
if (!/<title>/i.test(html)) throw new Error('HTML title is missing.');
console.log(`Repository verification passed for ${tool}.`);
