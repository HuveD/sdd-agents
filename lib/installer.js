const fs = require('fs-extra');
const path = require('path');
const { MigrationManager } = require('./migrations');
const packageJson = require('../package.json');

class SddInstaller {
  constructor() {
    this.templatesDir = path.join(__dirname, '../templates');
    this.currentDir = process.cwd();
  }

  async init(options = {}) {
    console.log('🚀 Initializing SDD Agents...');

    try {
      // 1. Create .claude directory structure
      await this.createClaudeDirectory();

      // 2. Copy agents files
      await this.copyAgentsFiles(options.force);

      // 3. Copy commands files
      await this.copyCommandsFiles(options.force);

      // 4. Create docs directory structure
      await this.createDocsDirectory();

      // 5. Copy docs template files
      await this.copyDocsTemplates(options.force);

      // 6. Copy docs specs files
      await this.copyDocsSpecs(options.force);

      // 7. Copy templates root files
      await this.copyTemplatesRootFiles(options.force);

      // 8. Save version (for first-time installation)
      const migrationManager = new MigrationManager(this.currentDir);
      const currentVersion = await migrationManager.getCurrentVersion();
      if (!currentVersion) {
        await migrationManager.saveVersion(packageJson.version);
      }

      console.log('✅ SDD Agents initialized successfully!');
      console.log('\nNext steps:');
      console.log('1. Use /init-sdd command in Claude to create CLAUDE.md with project context');
      console.log('2. Configure .claude/settings.local.json for your local environment');
      console.log('3. Start with: describe what you want to build');

    } catch (error) {
      console.error('❌ Failed to initialize SDD Agents:', error.message);
      process.exit(1);
    }
  }

  async upgrade() {
    console.log('🔄 Upgrading SDD Agents...');

    try {
      // 1. Run migrations
      const migrationManager = new MigrationManager(this.currentDir);
      const targetVersion = packageJson.version;
      await migrationManager.run(targetVersion);

      // 2. Run normal upgrade (force copy all files)
      await this.init({ force: true });

      // 3. Save new version
      await migrationManager.saveVersion(targetVersion);

      console.log('✅ SDD Agents upgraded successfully!');
    } catch (error) {
      console.error('❌ Failed to upgrade SDD Agents:', error.message);
      process.exit(1);
    }
  }

  async createDocsDirectory() {
    const docsDir = path.join(this.currentDir, 'docs');
    await fs.ensureDir(docsDir);
    await fs.ensureDir(path.join(docsDir, 'templates'));
    await fs.ensureDir(path.join(docsDir, 'specs'));
    console.log('📁 docs directory structure created');
  }

  async copyDocsTemplates(force = false) {
    const docsSource = path.join(this.templatesDir, 'docs/templates');
    const docsDest = path.join(this.currentDir, 'docs/templates');
    
    const templateFiles = await fs.readdir(docsSource);
    
    for (const file of templateFiles) {
      const source = path.join(docsSource, file);
      const dest = path.join(docsDest, file);
      
      if (await fs.pathExists(dest) && !force) {
        console.log(`⚠️  docs/templates/${file} already exists (use --force to overwrite)`);
        continue;
      }
      
      await fs.copy(source, dest);
      console.log(`📄 Template ${file} copied`);
    }
  }

  async copyDocsSpecs(force = false) {
    const specsSource = path.join(this.templatesDir, 'docs/specs');
    const specsDest = path.join(this.currentDir, 'docs/specs');

    const specFiles = await fs.readdir(specsSource);

    for (const file of specFiles) {
      if (file === 'CLAUDE.md') {
        continue; // handled separately to ensure symlink creation
      }

      const source = path.join(specsSource, file);
      const dest = path.join(specsDest, file);

      if (await fs.pathExists(dest)) {
        if (!force) {
          console.log(`⚠️  docs/specs/${file} already exists (use --force to overwrite)`);
          continue;
        }
        await fs.remove(dest);
      }

      await fs.copy(source, dest);
      console.log(`📄 Spec ${file} copied`);
    }

    await this.ensureClaudeSpecLink(specsDest, force);
  }

  async ensureClaudeSpecLink(specsDest, force = false) {
    const source = path.join(specsDest, 'AGENTS.md');
    const target = path.join(specsDest, 'CLAUDE.md');

    if (!(await fs.pathExists(source))) {
      console.warn('⚠️  docs/specs/AGENTS.md is missing, skipping CLAUDE.md link creation');
      return;
    }

    if (await fs.pathExists(target)) {
      if (!force) {
        console.log('⚠️  docs/specs/CLAUDE.md already exists (use --force to overwrite)');
        return;
      }
      await fs.remove(target);
    }

    try {
      await fs.symlink('AGENTS.md', target);
      console.log('🔗 Spec CLAUDE.md linked');
    } catch (error) {
      if (['EPERM', 'EEXIST', 'EOPNOTSUPP'].includes(error.code)) {
        await fs.copy(source, target);
        console.log('📄 Spec CLAUDE.md copied (symlink fallback)');
      } else {
        throw error;
      }
    }
  }

  async createClaudeDirectory() {
    const claudeDir = path.join(this.currentDir, '.claude');
    await fs.ensureDir(claudeDir);
    await fs.ensureDir(path.join(claudeDir, 'agents'));
    await fs.ensureDir(path.join(claudeDir, 'commands'));
    console.log('📁 .claude directory structure created');
  }

  async copyAgentsFiles(force = false) {
    const agentsSource = path.join(this.templatesDir, '.claude/agents');
    const agentsDest = path.join(this.currentDir, '.claude/agents');
    
    const agentFiles = await fs.readdir(agentsSource);
    
    for (const file of agentFiles) {
      const source = path.join(agentsSource, file);
      const dest = path.join(agentsDest, file);
      
      if (await fs.pathExists(dest) && !force) {
        console.log(`⚠️  .claude/agents/${file} already exists (use --force to overwrite)`);
        continue;
      }
      
      await fs.copy(source, dest);
      console.log(`🤖 Agent ${file} copied`);
    }
  }

  async copyCommandsFiles(force = false) {
    const commandsSource = path.join(this.templatesDir, '.claude/commands');
    const commandsDest = path.join(this.currentDir, '.claude/commands');

    const commandFiles = await fs.readdir(commandsSource);

    for (const file of commandFiles) {
      const source = path.join(commandsSource, file);
      const dest = path.join(commandsDest, file);

      if (await fs.pathExists(dest) && !force) {
        console.log(`⚠️  .claude/commands/${file} already exists (use --force to overwrite)`);
        continue;
      }

      await fs.copy(source, dest);
      console.log(`⚙️  Command ${file} copied`);
    }
  }

  async copyTemplatesRootFiles(force = false) {
    const templatesRootSource = this.templatesDir;
    const projectRootDest = this.currentDir;

    const rootFiles = ['AGENTS.md', 'CLAUDE.md'];

    for (const file of rootFiles) {
      const source = path.join(templatesRootSource, file);
      const dest = path.join(projectRootDest, file);

      if (!(await fs.pathExists(source))) {
        console.warn(`⚠️  templates/${file} not found, skipping`);
        continue;
      }

      if (await fs.pathExists(dest) && !force) {
        console.log(`⚠️  ${file} already exists (use --force to overwrite)`);
        continue;
      }

      await fs.copy(source, dest);
      console.log(`📄 Template ${file} copied`);
    }
  }
}

const installer = new SddInstaller();

module.exports = {
  init: installer.init.bind(installer),
  upgrade: installer.upgrade.bind(installer)
};
