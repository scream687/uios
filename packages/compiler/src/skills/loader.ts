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
    const skills: UIOSSkill[] = [];
    const registryPath = path.resolve(process.cwd(), '../../packages/ui/skills/master-skill-registry.json');

    if (fs.existsSync(registryPath)) {
      try {
        const raw = fs.readFileSync(registryPath, 'utf-8');
        const parsed = JSON.parse(raw);
        for (const item of parsed.skills || []) {
          const skillPath = path.resolve(process.cwd(), `../../${item.path}`);
          if (fs.existsSync(skillPath)) {
            const content = fs.readFileSync(skillPath, 'utf-8');
            skills.push({
              id: item.id,
              name: item.id.replace(/-/g, ' ').toUpperCase(),
              description: item.description,
              skillFilePath: skillPath,
              content,
            });
          }
        }
      } catch (e) {
        // Fallback
      }
    }

    // Fallback if registry not found or empty
    if (skills.length === 0) {
      const fallbackIds = ['anti-slop-frontend', 'impeccable-craftsmanship', 'ui-ux-pro-max', 'taste-skill', 'impeccable', 'brutalist-skill', 'minimalist-skill', 'soft-skill', 'redesign-skill'];
      for (const id of fallbackIds) {
        skills.push({
          id,
          name: id.replace(/-/g, ' ').toUpperCase(),
          description: `Production-Grade Design Skill: ${id}`,
          skillFilePath: `/packages/ui/skills/${id}/SKILL.md`,
          content: `Content for ${id}`,
        });
      }
    }

    return skills;
  }
}
