const glob = require('fast-glob');
const path = require('path');

const ROOT = path.join(__dirname, '../../');

// Given a path, resolve it under root. Paths (absolute or relative) that
// resolve outside of root will return null.
function resolve(unknownPath, options) {
  const { relative } = options || {};

  const absolutePath = path.resolve(ROOT, unknownPath);
  const relativePath = path.relative(ROOT, absolutePath);
  if (!relativePath) return null;
  if (relativePath.startsWith('..')) return null;
  if (path.isAbsolute(relativePath)) return null;
  return relative ? relativePath : absolutePath;
}

// Given a list of glob patterns, locate all files under root that match the
// glob.
//
// Returns a list of root-relative paths.
async function globWithinWorkspace(patterns, options) {
  const { ignore, relative } = options || {};

  const relativePaths = await glob(patterns, { ignore, dot: true, cwd: ROOT });
  if (relative) return relativePaths;
  return relativePaths.map((relativePath) => path.join(ROOT, relativePath));
}

module.exports = {
  ROOT,
  resolve,
  glob: globWithinWorkspace,
};
