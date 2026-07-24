import fs from 'fs';
import path from 'path';

export interface UIOSSkill {
  id: string;
  name: string;
  description: string;
  skillFilePath: string;
  content: string;
}

export class UIOSSkillPackLoader {
  public loadAllSkills(): UIOSSkill[] {
    const skillIds = ['anti-slop-frontend', 'impeccable-craftsmanship', 'ui-ux-pro-max'];
    const skills: UIOSSkill[] = [];

    for (const skillId of skillIds) {
      try {
        const skillPath = path.resolve(process.cwd(), `../../packages/ui/skills/${skillId}/SKILL.md`);
        if (fs.existsSync(skillPath)) {
          const content = fs.readFileSync(skillPath, 'utf-8');
          skills.push({
            id: skillId,
            name: skillId.replace(/-/g, ' ').toUpperCase(),
            description: `Production-Grade Design Skill: ${skillId}`,
            skillFilePath: skillPath,
            content,
          });
        }
      } catch (e) {
        // Fallback
      }
    }

    return skills;
  }
}
