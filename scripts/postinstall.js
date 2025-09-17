#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const specsDir = path.join(__dirname, '..', 'templates', 'docs', 'specs');
const source = path.join(specsDir, 'AGENTS.md');
const target = path.join(specsDir, 'CLAUDE.md');

async function pathInfo(filePath) {
  try {
    return await fs.promises.lstat(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

async function ensureSymlink() {
  const sourceStats = await pathInfo(source);
  if (!sourceStats) {
    // If the source is missing there's nothing we can do.
    return;
  }

  const targetStats = await pathInfo(target);
  if (targetStats) {
    if (targetStats.isSymbolicLink()) {
      const current = await fs.promises.readlink(target);
      if (current === 'AGENTS.md') {
        return; // Correct symlink already in place.
      }
    }

    // Remove any existing file/link so we can replace it.
    await fs.promises.unlink(target);
  }

  try {
    await fs.promises.symlink('AGENTS.md', target);
  } catch (error) {
    // On Windows or file systems without symlink support fall back to copying.
    if (error.code === 'EPERM' || error.code === 'EEXIST' || error.code === 'EOPNOTSUPP') {
      await fs.promises.copyFile(source, target);
    } else {
      throw error;
    }
  }
}

ensureSymlink().catch((error) => {
  console.warn('[sdd-agents] Failed to set up CLAUDE.md symlink:', error.message);
});
