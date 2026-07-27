import { readDesignDirection, type Dials } from '@uios/knowledge';

export interface IntentOutput {
  rawPrompt: string;
  category: 'Marketing' | 'Dashboard' | 'CRM' | 'Analytics' | 'E-commerce' | 'Portfolio' | 'Documentation';
  industry: string;
  styleArchetype: 'Linear Dark' | 'Apple Minimal' | 'Stripe SaaS' | 'Raycast Midnight' | 'Luxury Editorial';
  targetAudience: string;
  primaryGoal: 'Conversions' | 'Data Density' | 'User Retention' | 'Brand Awareness' | 'Workflow Efficiency';
  complexity: 'High' | 'Medium' | 'Low';
  inferredFeatures: string[];
  /** The "Design Read": inferred taste direction + dials (taste-skill). */
  directionId: string;
  dials: Dials;
}

export class IntentEngine {
  public parse(userPrompt: string): IntentOutput {
    const lower = userPrompt.toLowerCase();
    
    // Category Detection
    let category: IntentOutput['category'] = 'Marketing';
    if (lower.includes('dashboard') || lower.includes('admin') || lower.includes('analytics')) {
      category = 'Dashboard';
    } else if (lower.includes('crm') || lower.includes('sales')) {
      category = 'CRM';
    } else if (lower.includes('store') || lower.includes('ecommerce') || lower.includes('shop')) {
      category = 'E-commerce';
    } else if (lower.includes('portfolio') || lower.includes('personal')) {
      category = 'Portfolio';
    } else if (lower.includes('docs') || lower.includes('documentation')) {
      category = 'Documentation';
    }

    // Industry Detection
    let industry = 'Technology / AI';
    if (lower.includes('finance') || lower.includes('fintech') || lower.includes('crypto')) {
      industry = 'Fintech';
    } else if (lower.includes('health') || lower.includes('medical')) {
      industry = 'Healthcare';
    } else if (lower.includes('real estate') || lower.includes('property')) {
      industry = 'Real Estate';
    } else if (lower.includes('creator') || lower.includes('media')) {
      industry = 'Media & Entertainment';
    }

    // Style Archetype Inference
    let styleArchetype: IntentOutput['styleArchetype'] = 'Linear Dark';
    if (lower.includes('apple') || lower.includes('clean') || lower.includes('minimal') || lower.includes('light')) {
      styleArchetype = 'Apple Minimal';
    } else if (lower.includes('stripe') || lower.includes('gradient') || lower.includes('vibrant')) {
      styleArchetype = 'Stripe SaaS';
    } else if (lower.includes('raycast') || lower.includes('command') || lower.includes('neon')) {
      styleArchetype = 'Raycast Midnight';
    } else if (lower.includes('luxury') || lower.includes('editorial') || lower.includes('serif')) {
      styleArchetype = 'Luxury Editorial';
    }

    // Features extraction
    const inferredFeatures: string[] = [];
    if (lower.includes('hero') || category === 'Marketing') inferredFeatures.push('Hero Section', 'Bento Grid', 'Pricing Table', 'Feature Showcase', 'Social Proof / Logos');
    if (category === 'Dashboard') inferredFeatures.push('Metrics Overview Cards', 'Data Chart / Graph', 'Recent Activity Feed', 'Data Table with Filtering', 'Quick Actions Sidebar');
    if (category === 'CRM') inferredFeatures.push('Kanban Pipeline Board', 'Customer Detail View', 'Activity Timeline', 'Lead Scoring Indicator');
    if (category === 'E-commerce') inferredFeatures.push('Hero Section', 'Bento Grid', 'Pricing Table', 'Feature Showcase', 'Data Table with Filtering');
    if (category === 'Portfolio') inferredFeatures.push('Hero Section', 'Feature Showcase', 'Bento Grid', 'Social Proof / Logos', 'Activity Timeline');
    if (category === 'Documentation') inferredFeatures.push('Hero Section', 'Feature Showcase', 'Data Table with Filtering', 'Quick Actions Sidebar');

    const read = readDesignDirection(userPrompt);

    return {
      rawPrompt: userPrompt,
      category,
      industry,
      styleArchetype,
      targetAudience: category === 'Marketing' ? 'Founders & Engineers' : 'Enterprise Users & Operators',
      primaryGoal: category === 'Marketing' ? 'Conversions' : 'Workflow Efficiency',
      complexity: inferredFeatures.length > 4 ? 'High' : 'Medium',
      inferredFeatures,
      directionId: read.direction.id,
      dials: read.dials,
    };
  }
}
