export interface HeroMomentSpec {
  type: 'cinematic' | '3d-monolith' | 'interactive-canvas' | 'editorial-split';
  dominantObject: string;
  camera: 'close' | 'wide' | 'isometric' | 'macro';
  lighting: 'volcanic_backlight' | 'dramatic_chiaroscuro' | 'soft_diffused' | 'neon_rim';
  interaction: 'parallax' | '3d-rotate' | 'pan-zoom' | 'cursor-spotlight';
}

export interface ExperienceSpec {
  heroMoment: HeroMomentSpec;
  emotionCurve: Array<'curiosity' | 'craft' | 'science' | 'desire' | 'confidence' | 'wonder'>;
  memorableMoments: string[];
}

export interface CompositionSpec {
  rhythm: string[];   // e.g. ["100vh", "40vh", "140vh", "60vh", "80vh"]
  density: Array<'low' | 'medium' | 'high' | 'ultra-low'>;
  tension: Array<'center' | 'offset' | 'overlap' | 'break-grid'>;
  whitespacePaddingY: string[];
}

export interface SceneNode {
  id: string;
  name: string;
  narrativeGoal: string;
  camera: string;
  lighting: string;
  atmosphere: {
    particles: boolean;
    ambientGlow: string;
    fogDensity: number;
  };
  focalObject: string;
  motionNarrative: string[];
  experienceModule: string; // Domain-specific Experience Module name
}

export interface DomainExperienceModule {
  id: string;
  domain: 'coffee' | 'real-estate' | 'medical' | 'saas';
  name: string;
  description: string;
  interactionType: 'interactive-spectrum' | 'telemetry-dashboard' | '3d-viewport' | 'timeline';
  renderComponent: string;
}

export class ExperienceDirectorEngine {
  public generateExperience(domain: string): ExperienceSpec {
    if (domain.includes('coffee')) {
      return {
        heroMoment: {
          type: 'cinematic',
          dominantObject: 'Volcanic_Obsidian_Coffee_Monolith',
          camera: 'close',
          lighting: 'volcanic_backlight',
          interaction: 'parallax',
        },
        emotionCurve: ['curiosity', 'craft', 'science', 'desire', 'confidence'],
        memorableMoments: [
          'floating_volcanic_monolith',
          'interactive_flavor_spectrum',
          'anaerobic_fermentation_chamber_visualization',
          'cast_iron_roasting_drum_physics',
        ],
      };
    }

    return {
      heroMoment: {
        type: '3d-monolith',
        dominantObject: 'Property_Presentation_Viewport',
        camera: 'wide',
        lighting: 'dramatic_chiaroscuro',
        interaction: '3d-rotate',
      },
      emotionCurve: ['curiosity', 'wonder', 'confidence'],
      memorableMoments: ['3d_masterplan_sunpath', 'neighborhood_growth_map'],
    };
  }
}

export class CompositionEngine {
  public generateComposition(): CompositionSpec {
    return {
      rhythm: ['100vh', '35vh', '140vh', '60vh', '90vh'],
      density: ['low', 'ultra-low', 'high', 'medium', 'low'],
      tension: ['break-grid', 'center', 'overlap', 'offset', 'break-grid'],
      whitespacePaddingY: ['144px', '64px', '160px', '96px', '144px'],
    };
  }
}

export class SceneComposerEngine {
  public composeSceneGraph(experience: ExperienceSpec, composition: CompositionSpec): SceneNode[] {
    return [
      {
        id: 'scene-1',
        name: 'Scene 1: Cinematic Terroir Hero',
        narrativeGoal: 'Evoke curiosity & volcanic high-altitude atmosphere',
        camera: 'close',
        lighting: 'volcanic_backlight',
        atmosphere: { particles: true, ambientGlow: '#ff3b00', fogDensity: 0.8 },
        focalObject: experience.heroMoment.dominantObject,
        motionNarrative: [
          'Volcanic smoke drifts across viewport',
          'Oversized 130px typography reveals with letter tracking',
          'SCA 94.5 telemetry badge breathes on hover',
        ],
        experienceModule: 'TerroirElevationMap',
      },
      {
        id: 'scene-2',
        name: 'Scene 2: Anaerobic Fermentation Science',
        narrativeGoal: 'Teach anaerobic vat sugar breakdown science',
        camera: 'macro',
        lighting: 'dramatic_chiaroscuro',
        atmosphere: { particles: false, ambientGlow: '#000000', fogDensity: 0.2 },
        focalObject: 'FermentationChamberChronoVat',
        motionNarrative: ['120-hour nitrogen pressure meter increments', 'Flavor ester molecules dissolve'],
        experienceModule: 'AnaerobicVatChamber',
      },
      {
        id: 'scene-[#ff3b00]-subscription',
        name: 'Scene 3: Collector Monolith Allocation',
        narrativeGoal: 'Trigger bi-weekly subscription desire',
        camera: 'wide',
        lighting: 'neon_rim',
        atmosphere: { particles: true, ambientGlow: '#ff3b00', fogDensity: 0.5 },
        focalObject: 'MonolithSubscriptionCard',
        motionNarrative: ['Vermilion card breaks section boundary', 'Direct air-ship route animates'],
        experienceModule: 'ReserveAllocationMonolith',
      },
    ];
  }
}

export class DomainExperienceLibrary {
  private modules: Map<string, DomainExperienceModule[]> = new Map();

  constructor() {
    this.modules.set('coffee', [
      { id: 'exp-coffee-1', domain: 'coffee', name: 'FlavorSpectrum', description: 'Interactive SCA flavor wheel', interactionType: 'interactive-spectrum', renderComponent: 'FlavorSpectrum' },
      { id: 'exp-coffee-2', domain: 'coffee', name: 'RoastCurvePhysics', description: 'Real-time thermal roaster drum telemetry', interactionType: 'telemetry-dashboard', renderComponent: 'RoastCurvePhysics' },
      { id: 'exp-coffee-3', domain: 'coffee', name: 'AnaerobicVatChamber', description: 'Pressurized nitrogen fermentation visualization', interactionType: 'telemetry-dashboard', renderComponent: 'AnaerobicVatChamber' },
      { id: 'exp-coffee-4', domain: 'coffee', name: 'TerroirElevationMap', description: '2,100m Ethiopian volcanic soil map', interactionType: '3d-viewport', renderComponent: 'TerroirElevationMap' },
    ]);

    this.modules.set('real-estate', [
      { id: 'exp-re-1', domain: 'real-estate', name: 'ParcelExplorer', description: '3D Sun Path and Site Masterplan', interactionType: '3d-viewport', renderComponent: 'ParcelExplorer' },
      { id: 'exp-re-2', domain: 'real-estate', name: 'ConstructionTelemetry', description: 'Layer-by-layer architectural blueprint', interactionType: 'timeline', renderComponent: 'ConstructionTelemetry' },
    ]);
  }

  public getModulesForDomain(domain: string): DomainExperienceModule[] {
    return this.modules.get(domain) || [];
  }
}
