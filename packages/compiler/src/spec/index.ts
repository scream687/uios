export interface DesignSpec {
  project: {
    name: string;
    type: 'Marketing Website' | 'Dashboard App' | 'CRM Tool' | 'E-commerce Store' | 'Portfolio';
    industry: string;
  };
  brand: {
    archetype:
      | 'Linear Dark'
      | 'Apple Minimal'
      | 'Stripe SaaS'
      | 'Raycast Midnight'
      | 'Luxury Editorial'
      | 'Awesomic Zinc'
      | 'Dala Void'
      | 'Caldera Limestone'
      | 'Jeton Fintech'
      | 'Vivid Prism'
      | 'Notion Paper'
      | 'Steep Analytics'
      | 'Structured Gallery'
      | 'Dayos Brutalist'
      | 'Dope Terminal'
      | 'Ventriloc Observatory'
      | 'Harvest Workbench'
      | 'Oryzo Darkroom'
      | 'Hungry Tiger Tandoor'
      | 'Impossible Velvet'
      | 'GSAP Chalkboard'
      | 'Calendly Navy'
      | 'Ditto Wildflower'
      | 'Arte Harvest'
      | 'SayBriefly Sketchbook'
      | 'August Health Clinical'
      | 'Creative Giants Poster'
      | 'Air Sculpture'
      | 'Visitors Blueprint'
      | 'Eindhoven Editorial'
      | 'MindMarket Storybook';
    personality: string[];
    voice: string;
  };
  audience: {
    target: string;
    techSavviness: 'high' | 'medium' | 'low';
  };
  goals: string[];
  visual: {
    density: 'low' | 'medium' | 'high';
    hierarchy: 'dramatic' | 'balanced' | 'compact';
    radiusPx: number;
    elevation: 'none' | 'subtle' | 'dramatic';
  };
  motion: {
    style: 'subtle' | 'premium' | 'high-energy' | 'none';
    maxDurationMs: number;
  };
}

export class DesignSpecParser {
  public parse(prompt: string): DesignSpec {
    const lower = prompt.toLowerCase();

    let type: DesignSpec['project']['type'] = 'Marketing Website';
    if (lower.includes('dashboard') || lower.includes('admin')) type = 'Dashboard App';
    else if (lower.includes('crm')) type = 'CRM Tool';
    else if (lower.includes('store') || lower.includes('shop')) type = 'E-commerce Store';
    else if (lower.includes('portfolio')) type = 'Portfolio';

    let archetype: DesignSpec['brand']['archetype'] = 'Linear Dark';
    if (lower.includes('mindmarket') || lower.includes('storybook') || lower.includes('cream paper')) {
      archetype = 'MindMarket Storybook';
    } else if (lower.includes('eindhoven') || lower.includes('helveticanow') || lower.includes('municipal')) {
      archetype = 'Eindhoven Editorial';
    } else if (lower.includes('visitors') || lower.includes('openrunde') || lower.includes('blueprint')) {
      archetype = 'Visitors Blueprint';
    } else if (lower.includes('air') || lower.includes('glass') || lower.includes('sculpture')) {
      archetype = 'Air Sculpture';
    } else if (lower.includes('creative giants') || lower.includes('switzer') || lower.includes('poster')) {
      archetype = 'Creative Giants Poster';
    } else if (lower.includes('august') || lower.includes('reckless') || lower.includes('pharmacy')) {
      archetype = 'August Health Clinical';
    } else if (lower.includes('saybriefly') || lower.includes('sketchbook') || lower.includes('bricolage')) {
      archetype = 'SayBriefly Sketchbook';
    } else if (lower.includes('arte') || lower.includes('parafina') || lower.includes('citron')) {
      archetype = 'Arte Harvest';
    } else if (lower.includes('ditto') || lower.includes('hedvig') || lower.includes('wildflower')) {
      archetype = 'Ditto Wildflower';
    } else if (lower.includes('calendly') || lower.includes('gilroy') || lower.includes('navy')) {
      archetype = 'Calendly Navy';
    } else if (lower.includes('gsap') || lower.includes('mori') || lower.includes('chalkboard')) {
      archetype = 'GSAP Chalkboard';
    } else if (lower.includes('impossible') || lower.includes('sans-meat') || lower.includes('velvet') || lower.includes('burgundy')) {
      archetype = 'Impossible Velvet';
    } else if (lower.includes('tiger') || lower.includes('hungry') || lower.includes('tandoor') || lower.includes('salmond')) {
      archetype = 'Hungry Tiger Tandoor';
    } else if (lower.includes('oryzo') || lower.includes('halyard') || lower.includes('darkroom')) {
      archetype = 'Oryzo Darkroom';
    } else if (lower.includes('harvest') || lower.includes('getharvest') || lower.includes('monarch')) {
      archetype = 'Harvest Workbench';
    } else if (lower.includes('ventriloc') || lower.includes('polysans') || lower.includes('ivory')) {
      archetype = 'Ventriloc Observatory';
    } else if (lower.includes('dope') || lower.includes('grandslang') || lower.includes('terminal')) {
      archetype = 'Dope Terminal';
    } else if (lower.includes('dayos') || lower.includes('brutalist') || lower.includes('suisse')) {
      archetype = 'Dayos Brutalist';
    } else if (lower.includes('structured') || lower.includes('davinci') || lower.includes('putty')) {
      archetype = 'Structured Gallery';
    } else if (lower.includes('steep') || lower.includes('signifier') || lower.includes('peach')) {
      archetype = 'Steep Analytics';
    } else if (lower.includes('notion') || lower.includes('paper warmth') || lower.includes('marigold')) {
      archetype = 'Notion Paper';
    } else if (lower.includes('vivid') || lower.includes('prism') || lower.includes('caustics')) {
      archetype = 'Vivid Prism';
    } else if (lower.includes('jeton') || lower.includes('fintech') || lower.includes('signal orange')) {
      archetype = 'Jeton Fintech';
    } else if (lower.includes('caldera') || lower.includes('limestone') || lower.includes('halftone')) {
      archetype = 'Caldera Limestone';
    } else if (lower.includes('dala') || lower.includes('void') || lower.includes('constellation')) {
      archetype = 'Dala Void';
    } else if (lower.includes('awesomic') || lower.includes('zinc')) {
      archetype = 'Awesomic Zinc';
    } else if (lower.includes('apple') || lower.includes('clean') || lower.includes('light')) {
      archetype = 'Apple Minimal';
    }else if (lower.includes('stripe') || lower.includes('vibrant')) archetype = 'Stripe SaaS';
    else if (lower.includes('raycast') || lower.includes('neon')) archetype = 'Raycast Midnight';
    else if (lower.includes('luxury') || lower.includes('editorial')) archetype = 'Luxury Editorial';

    return {
      project: {
        name: 'UIOS Generated Interface',
        type,
        industry: lower.includes('fintech') ? 'Fintech' : 'AI & Technology',
      },
      brand: {
        archetype,
        personality: ['premium', 'editorial', 'trustworthy'],
        voice: 'Direct, clear, authoritative, refined',
      },
      audience: {
        target: 'Founders & Frontend Engineers',
        techSavviness: 'high',
      },
      goals: ['high-conversions', 'storytelling', 'visual-delight'],
      visual: {
        density: type === 'Dashboard App' ? 'high' : 'low',
        hierarchy: 'dramatic',
        radiusPx: archetype === 'Apple Minimal' ? 16 : 8,
        elevation: 'subtle',
      },
      motion: {
        style: 'premium',
        maxDurationMs: 250,
      },
    };
  }
}
