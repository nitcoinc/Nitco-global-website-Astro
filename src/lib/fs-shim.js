// Stub for Node.js `fs` module in Cloudflare Workers prerender environment.
// gray-matter requires `fs` at module level but only uses it in matter.read(),
// which this project never calls. All stubs are intentionally no-ops.
const readFileSync = () => '';
const readdirSync = () => [];
const existsSync = () => false;
const writeFileSync = () => {};
const mkdirSync = () => {};
const statSync = () => ({ isDirectory: () => false, isFile: () => true });
const lstatSync = statSync;
const unlinkSync = () => {};
const renameSync = () => {};
const copyFileSync = () => {};

export {
  readFileSync,
  readdirSync,
  existsSync,
  writeFileSync,
  mkdirSync,
  statSync,
  lstatSync,
  unlinkSync,
  renameSync,
  copyFileSync,
};

export default {
  readFileSync,
  readdirSync,
  existsSync,
  writeFileSync,
  mkdirSync,
  statSync,
  lstatSync,
  unlinkSync,
  renameSync,
  copyFileSync,
};
