const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

/**
 * 마이그레이션 정의
 * 각 마이그레이션은 순차적으로 실행됩니다.
 */
const migrations = [
  {
    version: '1.7.0',
    name: 'remove-act-command',
    description: 'Remove deprecated act.md command',
    async execute(currentDir) {
      const actPath = path.join(currentDir, '.claude/commands/act.md');

      // act.md 파일이 존재하지 않으면 스킵
      if (!await fs.pathExists(actPath)) {
        console.log('  ℹ️  act.md not found - skipping');
        return;
      }

      // 사용자에게 삭제 여부 확인
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const answer = await new Promise((resolve) => {
        rl.question('  ⚠️  act.md command is deprecated. Delete it? (Y/n): ', (ans) => {
          rl.close();
          resolve(ans.toLowerCase());
        });
      });

      if (answer === 'y' || answer === 'yes' || answer === '') {
        await fs.remove(actPath);
        console.log('  ✅ act.md has been removed');
      } else {
        console.log('  ⚠️  act.md was kept. Note: This command is no longer maintained.');
      }
    }
  },
  {
    version: '1.8.0',
    name: 'restructure-templates',
    description: 'Move spec-writing-guide.md to .agent/templates/, remove deprecated files',
    async execute(currentDir) {
      const specReviewPath = path.join(currentDir, 'docs/templates/spec-review-guide.md');
      const specWritingOldPath = path.join(currentDir, 'docs/templates/spec-writing-guide.md');
      const agentTemplatesDir = path.join(currentDir, '.agent/templates');
      const specWritingNewPath = path.join(agentTemplatesDir, 'spec-writing-guide.md');

      // 1. spec-review-guide.md 삭제
      if (await fs.pathExists(specReviewPath)) {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        const answer = await new Promise((resolve) => {
          rl.question('  ⚠️  spec-review-guide.md is deprecated (replaced by validate-specs command). Delete it? (Y/n): ', (ans) => {
            rl.close();
            resolve(ans.toLowerCase());
          });
        });

        if (answer === 'y' || answer === 'yes' || answer === '') {
          await fs.remove(specReviewPath);
          console.log('  ✅ spec-review-guide.md has been removed');
        } else {
          console.log('  ⚠️  spec-review-guide.md was kept. Note: This file is deprecated.');
        }
      } else {
        console.log('  ℹ️  spec-review-guide.md not found - skipping');
      }

      // 2. spec-writing-guide.md를 .agent/templates/로 이동
      if (await fs.pathExists(specWritingOldPath)) {
        // .agent/templates 디렉토리 생성
        await fs.ensureDir(agentTemplatesDir);

        // 파일 이동
        await fs.move(specWritingOldPath, specWritingNewPath, { overwrite: false });
        console.log('  ✅ spec-writing-guide.md moved to .agent/templates/');
      } else {
        console.log('  ℹ️  spec-writing-guide.md not found in docs/templates/ - skipping move');
      }

      // 3. Deprecated commands 삭제
      const deprecatedCommands = ['korean.md', 'plan.md', 'debug.md'];
      const commandsDir = path.join(currentDir, '.claude/commands');

      for (const cmdFile of deprecatedCommands) {
        const cmdPath = path.join(commandsDir, cmdFile);
        if (await fs.pathExists(cmdPath)) {
          await fs.remove(cmdPath);
          console.log(`  ✅ Deprecated command ${cmdFile} has been removed`);
        }
      }

      // 4. docs/templates/ 폴더가 비었는지 확인하고 정리
      const docsTemplatesDir = path.join(currentDir, 'docs/templates');
      if (await fs.pathExists(docsTemplatesDir)) {
        const files = await fs.readdir(docsTemplatesDir);
        if (files.length === 0) {
          console.log('  ℹ️  docs/templates/ directory is now empty (this is expected)');
        }
      }
    }
  }
];

/**
 * 마이그레이션 매니저
 */
class MigrationManager {
  constructor(currentDir) {
    this.currentDir = currentDir;
    this.versionFile = path.join(currentDir, '.claude/.sdd-version');
  }

  /**
   * 현재 설치된 버전 가져오기
   */
  async getCurrentVersion() {
    try {
      if (await fs.pathExists(this.versionFile)) {
        const version = await fs.readFile(this.versionFile, 'utf-8');
        return version.trim();
      }
    } catch (error) {
      // 버전 파일이 없거나 읽을 수 없으면 null 반환
    }
    return null;
  }

  /**
   * 버전 정보 저장
   */
  async saveVersion(version) {
    await fs.writeFile(this.versionFile, version, 'utf-8');
  }

  /**
   * 버전 비교 (semver 간단 구현)
   */
  compareVersions(v1, v2) {
    if (!v1) return -1; // v1이 없으면 v2가 더 새로운 버전
    if (!v2) return 1;

    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < 3; i++) {
      if (parts1[i] > parts2[i]) return 1;
      if (parts1[i] < parts2[i]) return -1;
    }
    return 0;
  }

  /**
   * 필요한 마이그레이션 필터링
   */
  getRequiredMigrations(currentVersion, targetVersion) {
    return migrations.filter(migration => {
      // 현재 버전보다 크고 타겟 버전 이하인 마이그레이션만 실행
      return this.compareVersions(migration.version, currentVersion) > 0 &&
             this.compareVersions(migration.version, targetVersion) <= 0;
    });
  }

  /**
   * 마이그레이션 실행
   */
  async run(targetVersion) {
    const currentVersion = await this.getCurrentVersion();
    const requiredMigrations = this.getRequiredMigrations(currentVersion, targetVersion);

    if (requiredMigrations.length === 0) {
      return;
    }

    console.log('🔄 Running migrations...');

    for (const migration of requiredMigrations) {
      console.log(`  📦 ${migration.name} (${migration.version}): ${migration.description}`);
      try {
        await migration.execute(this.currentDir);
      } catch (error) {
        console.error(`  ❌ Migration ${migration.name} failed:`, error.message);
        throw error;
      }
    }

    console.log('✅ Migrations completed');
  }
}

module.exports = { MigrationManager, migrations };
