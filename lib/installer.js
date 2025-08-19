const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

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
      await this.init({ force: true });
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
}

const installer = new SddInstaller();

module.exports = {
  init: installer.init.bind(installer),
  upgrade: installer.upgrade.bind(installer)
};