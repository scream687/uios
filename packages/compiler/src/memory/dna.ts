export interface BrandTokens {
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
    | 'MindMarket Storybook'
    | 'Philippe Starck Constructivist'
    | 'Ampera Industrial Freight'
    | 'Artify AI Obsidian'
    | 'Botanical Margarita Editorial'
    | 'Travelish Sanctuary Minimal';
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    accent: string;
    border: string;
    ring: string;
    gradientHero: string;
  };
  typography: {
    fontFamilyHeading: string;
    fontFamilyBody: string;
    fontSizeHero: string;
    fontSizeH1: string;
    fontSizeH2: string;
    fontSizeBody: string;
    lineHeightHero: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    card: string;
    glow: string;
  };
  motion: {
    ease: string;
    durationFast: string;
    durationNormal: string;
  };
}

export class BrandDNAEngine {
  public synthesize(
    archetype: BrandTokens['archetype'],
    customColors?: Partial<BrandTokens['colors']>
  ): BrandTokens {
    const tokens = this.synthesizeRaw(archetype);
    if (customColors) {
      tokens.colors = { ...tokens.colors, ...customColors };
    }
    return tokens;
  }

  private synthesizeRaw(archetype: BrandTokens['archetype']): BrandTokens {
    switch (archetype) {
      case 'Philippe Starck Constructivist':
        return {
          archetype: 'Philippe Starck Constructivist',
          colors: {
            background: '#e2ded7', // Newsprint paper canvas
            foreground: '#000000', // Stark pitch black typography
            card: '#ffffff',       // Bio quote card island
            cardForeground: '#000000',
            primary: '#e52424',    // Electric crimson accent
            primaryForeground: '#ffffff',
            secondary: '#222222',  // Charcoal dark structural elements
            accent: '#e52424',     // Crimson vertical typography strip
            border: '#000000',     // Stark black border
            ring: 'rgba(229, 36, 36, 0.4)',
            gradientHero: 'linear-gradient(180deg, #e2ded7 0%, #d8d3cb 100%)',
          },
          typography: {
            fontFamilyHeading: 'Impact, Bebas Neue, Switzer, Inter, ui-sans-serif, sans-serif',
            fontFamilyBody: 'HelveticaNeue, Inter, ui-sans-serif, sans-serif',
            fontSizeHero: '160px',
            fontSizeH1: '90px',
            fontSizeH2: '56px',
            fontSizeBody: '17px',
            lineHeightHero: '0.85',
          },
          radius: {
            sm: '0px',
            md: '0px',
            lg: '0px',
            full: '9999px',
          },
          shadows: {
            card: 'none — 0px flat newsprint brutalist layout',
            glow: '0 0 0 1px #000000',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Ampera Industrial Freight':
        return {
          archetype: 'Ampera Industrial Freight',
          colors: {
            background: '#0a0a0a', // Pitch black industrial canvas
            foreground: '#f4f4f0', // Crisp off-white display typography
            card: '#161616',       // Cargo container card surface
            cardForeground: '#f4f4f0',
            primary: '#ff3b00',    // High-vis safety orange
            primaryForeground: '#0a0a0a',
            secondary: '#ff4500',  // Safety orange accent badge
            accent: '#ff3b00',     // Highlight circle callout
            border: 'rgba(255, 59, 0, 0.3)',
            ring: 'rgba(255, 59, 0, 0.5)',
            gradientHero: 'linear-gradient(180deg, #0a0a0a 0%, #ff3b00 100%)',
          },
          typography: {
            fontFamilyHeading: 'Druk Wide, Anton, Bebas Neue, Switzer, ui-sans-serif, sans-serif',
            fontFamilyBody: 'Inter, system-ui, ui-sans-serif, sans-serif',
            fontSizeHero: '180px',
            fontSizeH1: '100px',
            fontSizeH2: '60px',
            fontSizeBody: '16px',
            lineHeightHero: '0.82',
          },
          radius: {
            sm: '4px',
            md: '8px',
            lg: '9999px', // Pill navigation tags
            full: '9999px',
          },
          shadows: {
            card: 'none — surface contrast (#0a0a0a -> #161616)',
            glow: '0 0 30px -5px rgba(255, 59, 0, 0.4)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Artify AI Obsidian':
        return {
          archetype: 'Artify AI Obsidian',
          colors: {
            background: '#0d0d0e', // Deep obsidian black
            foreground: '#ffffff', // Pure white headers
            card: '#17181c',       // Dark charcoal card island
            cardForeground: '#e2e4e9',
            primary: '#e2ff00',    // Electric neon lime/yellow CTA
            primaryForeground: '#0d0d0e',
            secondary: '#124332',  // Emerald green highlight card
            accent: '#e2ff00',
            border: 'rgba(255, 255, 255, 0.08)',
            ring: 'rgba(226, 255, 0, 0.4)',
            gradientHero: 'linear-gradient(180deg, #0d0d0e 0%, #17181c 100%)',
          },
          typography: {
            fontFamilyHeading: 'Plus Jakarta Sans, Inter, Geist Sans, ui-sans-serif, sans-serif',
            fontFamilyBody: 'Plus Jakarta Sans, Inter, ui-sans-serif, sans-serif',
            fontSizeHero: '64px',
            fontSizeH1: '48px',
            fontSizeH2: '36px',
            fontSizeBody: '16px',
            lineHeightHero: '1.05',
          },
          radius: {
            sm: '12px',
            md: '20px',
            lg: '24px', // Rounded Bento gallery tiles
            full: '9999px',
          },
          shadows: {
            card: '0 8px 32px rgba(0, 0, 0, 0.4)',
            glow: '0 0 40px -5px rgba(226, 255, 0, 0.3)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Botanical Margarita Editorial':
        return {
          archetype: 'Botanical Margarita Editorial',
          colors: {
            background: '#f4efe4', // Warm parchment sand canvas
            foreground: '#0c281e', // Deep jungle green typography
            card: '#ffffff',       // Parchment card island
            cardForeground: '#0c281e',
            primary: '#d48806',    // Rich warm gold display
            primaryForeground: '#ffffff',
            secondary: '#0c281e',  // Jungle green border
            accent: '#e69a10',     // Warm gold highlight
            border: 'rgba(12, 40, 30, 0.15)',
            ring: 'rgba(212, 136, 6, 0.4)',
            gradientHero: 'linear-gradient(180deg, #f4efe4 0%, #e8e1d3 100%)',
          },
          typography: {
            fontFamilyHeading: 'Tiempos Headline, Reckless Neue, Georgia, serif',
            fontFamilyBody: 'Saans, Inter, ui-sans-serif, sans-serif',
            fontSizeHero: '88px',
            fontSizeH1: '64px',
            fontSizeH2: '44px',
            fontSizeBody: '16px',
            lineHeightHero: '0.95',
          },
          radius: {
            sm: '8px',
            md: '16px',
            lg: '24px',
            full: '9999px',
          },
          shadows: {
            card: 'rgba(12, 40, 30, 0.08) 0px 12px 24px 0px',
            glow: 'rgba(212, 136, 6, 0.2) 0px 8px 24px 0px',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Travelish Sanctuary Minimal':
        return {
          archetype: 'Travelish Sanctuary Minimal',
          colors: {
            background: '#f8f9fa', // Soft mist off-white
            foreground: '#1e252b', // Deep slate typography
            card: '#ffffff',       // Clean soft card island
            cardForeground: '#1e252b',
            primary: '#3a8088',    // Muted sage/cyan accent
            primaryForeground: '#ffffff',
            secondary: '#eef2f5',  // Soft slate background stack
            accent: '#3a8088',
            border: 'rgba(30, 37, 43, 0.08)',
            ring: 'rgba(58, 128, 136, 0.3)',
            gradientHero: 'linear-gradient(180deg, #f8f9fa 0%, #eef2f5 100%)',
          },
          typography: {
            fontFamilyHeading: 'Outfit, Satoshi, DM Sans, Inter, ui-sans-serif, sans-serif',
            fontFamilyBody: 'Outfit, Satoshi, DM Sans, Inter, ui-sans-serif, sans-serif',
            fontSizeHero: '56px',
            fontSizeH1: '42px',
            fontSizeH2: '30px',
            fontSizeBody: '16px',
            lineHeightHero: '1.10',
          },
          radius: {
            sm: '12px',
            md: '20px',
            lg: '28px',
            full: '9999px',
          },
          shadows: {
            card: 'rgba(30, 37, 43, 0.04) 0px 4px 12px 0px, rgba(30, 37, 43, 0.06) 0px 16px 32px 0px',
            glow: 'rgba(58, 128, 136, 0.15) 0px 8px 24px 0px',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'MindMarket Storybook':
        return {
          archetype: 'MindMarket Storybook',
          colors: {
            background: '#f5f1e4', // Cream Paper canvas
            foreground: '#2c2e2a', // Ink Black primary text
            card: '#ffffff',       // Pure White elevated card island
            cardForeground: '#2c2e2a',
            primary: '#8ed462',    // Fresh Grass structural accent & green menu
            primaryForeground: '#2c2e2a',
            secondary: '#ff705d',  // Coral Pop service action CTA
            accent: '#f5e211',     // Sunshine Pop footer band
            border: '#2c2e2a',     // Warm near-black border
            ring: 'rgba(142, 212, 98, 0.4)',
            gradientHero: 'linear-gradient(180deg, #f5f1e4 0%, #ffffff 100%)',
          },
          typography: {
            fontFamilyHeading: 'Inter, ui-sans-serif, system-ui, sans-serif',
            fontFamilyBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
            fontSizeHero: '144px',
            fontSizeH1: '81px',
            fontSizeH2: '53px',
            fontSizeBody: '18px',
            lineHeightHero: '0.95',
          },
          radius: {
            sm: '10px',  // Micro chips / tag items
            md: '50px',  // Cards & buttons
            lg: '50px',  // Cards & nav container
            full: '63.75px', // Illustration containers
          },
          shadows: {
            card: 'none — cream-to-white surface stack elevation',
            glow: '0 4px 20px rgba(142, 212, 98, 0.3)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Eindhoven Editorial':
        return {
          archetype: 'Eindhoven Editorial',
          colors: {
            background: '#ffffff',
            foreground: '#000000',
            card: '#ffffff',
            cardForeground: '#000000',
            primary: '#000000',
            primaryForeground: '#ffffff',
            secondary: '#e8e8e8',
            accent: '#ff0000',
            border: '#000000',
            ring: 'rgba(0, 0, 0, 0.4)',
            gradientHero: 'linear-gradient(180deg, #ffffff 0%, #e8e8e8 100%)',
          },
          typography: {
            fontFamilyHeading: 'HelveticaNow, Helvetica Neue, Inter, Neue Haas Grotesk, ui-sans-serif, sans-serif',
            fontFamilyBody: 'HelveticaNow, Helvetica Neue, Inter, Neue Haas Grotesk, ui-sans-serif, sans-serif',
            fontSizeHero: '150px',
            fontSizeH1: '50px',
            fontSizeH2: '35px',
            fontSizeBody: '18px',
            lineHeightHero: '0.93',
          },
          radius: {
            sm: '0px',
            md: '0px',
            lg: '0px',
            full: '500px',
          },
          shadows: {
            card: 'none — 0px shadow flat newsprint surface contrast',
            glow: '0 0 0 1px rgba(0, 0, 0, 0.2)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Visitors Blueprint':
        return {
          archetype: 'Visitors Blueprint',
          colors: {
            background: '#ffffff',
            foreground: '#181925',
            card: '#ffffff',
            cardForeground: '#181925',
            primary: '#918df6',
            primaryForeground: '#ffffff',
            secondary: '#9580ff',
            accent: '#33c758',
            border: '#e8e8e8',
            ring: 'rgba(145, 141, 246, 0.4)',
            gradientHero: 'linear-gradient(90deg, #2c78fc 0%, #918df6 100%)',
          },
          typography: {
            fontFamilyHeading: 'OpenRunde, Geist Sans, Inter, DM Sans, ui-sans-serif, sans-serif',
            fontFamilyBody: 'OpenRunde, Geist Sans, Inter, DM Sans, ui-sans-serif, sans-serif',
            fontSizeHero: '60px',
            fontSizeH1: '48px',
            fontSizeH2: '36px',
            fontSizeBody: '16px',
            lineHeightHero: '1.13',
          },
          radius: {
            sm: '8px',
            md: '16px',
            lg: '24px',
            full: '9999px',
          },
          shadows: {
            card: 'rgba(0, 0, 0, 0.06) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 8px 16px 0px, rgba(0, 0, 0, 0.02) 0px 0px 0px 1px',
            glow: 'rgba(145, 141, 246, 0.2) 0px 4px 12px 0px',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Air Sculpture':
        return {
          archetype: 'Air Sculpture',
          colors: {
            background: '#000000',
            foreground: '#ffffff',
            card: '#f5f5f5',
            cardForeground: '#1b1b1b',
            primary: '#ffffff',
            primaryForeground: '#000000',
            secondary: '#426188',
            accent: '#2b7fff',
            border: '#ffffff',
            ring: 'rgba(43, 127, 255, 0.5)',
            gradientHero: 'linear-gradient(180deg, #000000 0%, #426188 100%)',
          },
          typography: {
            fontFamilyHeading: 'Control Compressed, Anton, Druk Wide, Control Cursive, ui-sans-serif, sans-serif',
            fontFamilyBody: 'Control, Inter, system-ui, sans-serif',
            fontSizeHero: '259px',
            fontSizeH1: '56px',
            fontSizeH2: '32px',
            fontSizeBody: '16px',
            lineHeightHero: '0.85',
          },
          radius: {
            sm: '4px',
            md: '8px',
            lg: '12px',
            full: '9999px',
          },
          shadows: {
            card: 'none — surface contrast (#000000 -> #f5f5f5)',
            glow: '0 0 40px -5px rgba(66, 97, 136, 0.4)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Creative Giants Poster':
        return {
          archetype: 'Creative Giants Poster',
          colors: {
            background: '#fffef7',
            foreground: '#000000',
            card: '#fffef7',
            cardForeground: '#000000',
            primary: '#000000',
            primaryForeground: '#fffef7',
            secondary: '#a5ebd6',
            accent: '#8a0467',
            border: '#aaaaaa',
            ring: 'rgba(0, 0, 0, 0.4)',
            gradientHero: 'linear-gradient(180deg, #fffef7 0%, #a5ebd6 100%)',
          },
          typography: {
            fontFamilyHeading: 'Switzer, Inter, Söhne, ui-sans-serif, sans-serif',
            fontFamilyBody: 'Switzer, Inter, Söhne, ui-sans-serif, sans-serif',
            fontSizeHero: '84px',
            fontSizeH1: '54px',
            fontSizeH2: '34px',
            fontSizeBody: '16px',
            lineHeightHero: '1.00',
          },
          radius: {
            sm: '0px',
            md: '0px',
            lg: '0px',
            full: '1440px',
          },
          shadows: {
            card: 'none — 0px shadow flat paper canvas',
            glow: '0 0 0 1px rgba(255, 255, 255, 0.2)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'August Health Clinical':
        return {
          archetype: 'August Health Clinical',
          colors: {
            background: '#f8f3eb',
            foreground: '#080331',
            card: '#ffffff',
            cardForeground: '#080331',
            primary: '#4865ff',
            primaryForeground: '#ffffff',
            secondary: '#f098d7',
            accent: '#ff6d39',
            border: 'rgba(8, 3, 49, 0.1)',
            ring: 'rgba(72, 101, 255, 0.4)',
            gradientHero: 'linear-gradient(121deg, #f098d7 0%, #4865ff 50%, #1b1463 100%)',
          },
          typography: {
            fontFamilyHeading: 'Reckless Neue, DM Serif Display, Source Serif 4, Georgia, serif',
            fontFamilyBody: 'Saans, Inter, DM Sans, ui-sans-serif, sans-serif',
            fontSizeHero: '64px',
            fontSizeH1: '48px',
            fontSizeH2: '32px',
            fontSizeBody: '16px',
            lineHeightHero: '1.00',
          },
          radius: {
            sm: '16px',
            md: '16px',
            lg: '24px',
            full: '1600px',
          },
          shadows: {
            card: 'rgba(75, 68, 57, 0.1) 0px 12px 24px 0px, rgba(75, 68, 57, 0.1) 0px 48px 48px 0px',
            glow: 'rgba(75, 68, 57, 0.08) 0px 32px 16px 0px',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'SayBriefly Sketchbook':
        return {
          archetype: 'SayBriefly Sketchbook',
          colors: {
            background: '#fcfaf5',
            foreground: '#1a3300',
            card: '#fcfaf5',
            cardForeground: '#1a3300',
            primary: '#1a3300',
            primaryForeground: '#fcfaf5',
            secondary: '#d5f5c2',
            accent: '#ffe95c',
            border: '#b6b6b6',
            ring: 'rgba(255, 233, 92, 0.5)',
            gradientHero: 'linear-gradient(180deg, #fcfaf5 0%, #f1f1f1 100%)',
          },
          typography: {
            fontFamilyHeading: 'Bricolage Grotesque, Archivo Black, Mulish, ui-sans-serif, sans-serif',
            fontFamilyBody: 'Inter, system-ui, ui-sans-serif, sans-serif',
            fontSizeHero: '90px',
            fontSizeH1: '66px',
            fontSizeH2: '55px',
            fontSizeBody: '18px',
            lineHeightHero: '1.00',
          },
          radius: {
            sm: '6px',
            md: '12px',
            lg: '16px',
            full: '9999px',
          },
          shadows: {
            card: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
            glow: 'rgba(255, 235, 90, 0.1) 0px 33px 72px 0px',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Arte Harvest':
        return {
          archetype: 'Arte Harvest',
          colors: {
            background: '#e5dccd',
            foreground: '#ab5700',
            card: '#e5dccd',
            cardForeground: '#ab5700',
            primary: '#e8e359',
            primaryForeground: '#214534',
            secondary: '#7997ff',
            accent: '#e8e359',
            border: '#ab5700',
            ring: 'rgba(232, 227, 89, 0.5)',
            gradientHero: 'linear-gradient(180deg, #e5dccd 0%, #d5c8b5 100%)',
          },
          typography: {
            fontFamilyHeading: 'Parafina, Bricolage Grotesque, Cabinet Grotesk, ui-sans-serif, sans-serif',
            fontFamilyBody: 'Poppins, DM Sans, Manrope, ui-sans-serif, sans-serif',
            fontSizeHero: '173px',
            fontSizeH1: '104px',
            fontSizeH2: '70px',
            fontSizeBody: '16px',
            lineHeightHero: '0.80',
          },
          radius: {
            sm: '20px',
            md: '20px',
            lg: '31px',
            full: '31px',
          },
          shadows: {
            card: 'none — hairline Harvest Copper (#ab5700) border',
            glow: '0 4px 20px rgba(232, 227, 89, 0.4)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Ditto Wildflower':
        return {
          archetype: 'Ditto Wildflower',
          colors: {
            background: '#f9fbf2',
            foreground: '#130e30',
            card: '#eff2e5',
            cardForeground: '#130e30',
            primary: '#ffe228',
            primaryForeground: '#130e30',
            secondary: '#130e30',
            accent: '#59e25d',
            border: '#130e30',
            ring: 'rgba(255, 226, 40, 0.5)',
            gradientHero: 'linear-gradient(135deg, #f9fbf2 0%, #eff2e5 100%)',
          },
          typography: {
            fontFamilyHeading: 'Hedvig Letters Serif, DM Serif Display, Source Serif 4, Georgia, serif',
            fontFamilyBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
            fontSizeHero: '64px',
            fontSizeH1: '48px',
            fontSizeH2: '32px',
            fontSizeBody: '16px',
            lineHeightHero: '1.00',
          },
          radius: {
            sm: '1440px',
            md: '24px',
            lg: '24px',
            full: '1440px',
          },
          shadows: {
            card: 'none — surface contrast (#f9fbf2 -> #eff2e5)',
            glow: '0 4px 20px rgba(255, 226, 40, 0.3)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Calendly Navy':
        return {
          archetype: 'Calendly Navy',
          colors: {
            background: '#f8f9fb',
            foreground: '#0b3558',
            card: '#ffffff',
            cardForeground: '#0b3558',
            primary: '#006bff',
            primaryForeground: '#ffffff',
            secondary: '#0b3558',
            accent: '#e55cff',
            border: '#d4e0ed',
            ring: 'rgba(0, 107, 255, 0.4)',
            gradientHero: 'linear-gradient(135deg, #f8f9fb 0%, #ffffff 100%)',
          },
          typography: {
            fontFamilyHeading: 'Gilroy, Manrope, Inter, ui-sans-serif, sans-serif',
            fontFamilyBody: 'Gilroy, Manrope, Inter, ui-sans-serif, sans-serif',
            fontSizeHero: '80px',
            fontSizeH1: '68px',
            fontSizeH2: '50px',
            fontSizeBody: '16px',
            lineHeightHero: '1.20',
          },
          radius: {
            sm: '4px',
            md: '8px',
            lg: '16px',
            full: '24px',
          },
          shadows: {
            card: 'rgba(71, 103, 136, 0.04) 0px 4px 5px 0px, rgba(71, 103, 136, 0.03) 0px 8px 15px 0px, rgba(71, 103, 136, 0.08) 0px 30px 50px 0px',
            glow: '0 8px 32px rgba(0, 107, 255, 0.2)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'GSAP Chalkboard':
        return {
          archetype: 'GSAP Chalkboard',
          colors: {
            background: '#0e100f',
            foreground: '#fffce1',
            card: '#191919',
            cardForeground: '#fffce1',
            primary: '#0ae448',
            primaryForeground: '#0e100f',
            secondary: '#7c7c6f',
            accent: '#fec5fb',
            border: '#42433d',
            ring: 'rgba(10, 228, 72, 0.5)',
            gradientHero: 'linear-gradient(114.41deg, #0ae448 20.74%, #abff84 65.5%)',
          },
          typography: {
            fontFamilyHeading: 'Mori, Inter Tight, Söhne, DM Sans, ui-sans-serif, sans-serif',
            fontFamilyBody: 'Mori, Inter Tight, Söhne, ui-sans-serif, sans-serif',
            fontSizeHero: '224px',
            fontSizeH1: '101px',
            fontSizeH2: '66px',
            fontSizeBody: '19px',
            lineHeightHero: '0.90',
          },
          radius: {
            sm: '1px',
            md: '8px',
            lg: '8px',
            full: '100px',
          },
          shadows: {
            card: 'none — flat chalkboard surface contrast',
            glow: '0 0 40px -5px rgba(10, 228, 72, 0.4)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Impossible Velvet':
        return {
          archetype: 'Impossible Velvet',
          colors: {
            background: '#260212',
            foreground: '#ffffff',
            card: '#4f0423',
            cardForeground: '#ffc7c6',
            primary: '#e10600',
            primaryForeground: '#ffffff',
            secondary: '#ffc7c6',
            accent: '#e10600',
            border: '#000000',
            ring: 'rgba(225, 6, 0, 0.5)',
            gradientHero: 'linear-gradient(180deg, #260212 0%, #4f0423 100%)',
          },
          typography: {
            fontFamilyHeading: 'sans-meat, Druk Wide, Knockout, Bebas Neue, ui-sans-serif, sans-serif',
            fontFamilyBody: 'sans-meat, Inter, Söhne, ui-sans-serif, sans-serif',
            fontSizeHero: '231px',
            fontSizeH1: '160px',
            fontSizeH2: '103px',
            fontSizeBody: '18px',
            lineHeightHero: '0.73',
          },
          radius: {
            sm: '12px',
            md: '15px',
            lg: '38px',
            full: '15px',
          },
          shadows: {
            card: 'none — flat wine-dark punk surface contrast',
            glow: '0 0 40px -5px rgba(225, 6, 0, 0.5)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Hungry Tiger Tandoor':
        return {
          archetype: 'Hungry Tiger Tandoor',
          colors: {
            background: '#823513',
            foreground: '#faae33',
            card: '#402011',
            cardForeground: '#faae33',
            primary: '#faae33',
            primaryForeground: '#281006',
            secondary: '#9f531b',
            accent: '#d1255c',
            border: '#6b2e12',
            ring: 'rgba(250, 174, 51, 0.5)',
            gradientHero: 'linear-gradient(180deg, #823513 0%, #402011 100%)',
          },
          typography: {
            fontFamilyHeading: 'Salmond, Druk Wide, Antonio, Bebas Neue, ui-sans-serif, sans-serif',
            fontFamilyBody: 'Salmond, Graphikx, Inter, ui-sans-serif, sans-serif',
            fontSizeHero: '195px',
            fontSizeH1: '101px',
            fontSizeH2: '65px',
            fontSizeBody: '13px',
            lineHeightHero: '0.80',
          },
          radius: {
            sm: '6px',
            md: '6px',
            lg: '9999px',
            full: '9999px',
          },
          shadows: {
            card: 'none — flat tandoor wall surface step contrast',
            glow: '0 0 30px -5px rgba(250, 174, 51, 0.4)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Oryzo Darkroom':
        return {
          archetype: 'Oryzo Darkroom',
          colors: {
            background: '#100904',
            foreground: '#ffedd7',
            card: '#382416',
            cardForeground: '#ffedd7',
            primary: '#382416',
            primaryForeground: '#ffedd7',
            secondary: '#6c5f51',
            accent: '#dc5000',
            border: '#40372e',
            ring: 'rgba(220, 80, 0, 0.4)',
            gradientHero: 'linear-gradient(180deg, #100904 0%, #382416 100%)',
          },
          typography: {
            fontFamilyHeading: 'halyard-display-variable, Inter, Söhne, Neue Haas Grotesk, ui-sans-serif, sans-serif',
            fontFamilyBody: 'halyard-display-variable, Inter, Söhne, ui-sans-serif, sans-serif',
            fontSizeHero: '51px',
            fontSizeH1: '41px',
            fontSizeH2: '29px',
            fontSizeBody: '29px',
            lineHeightHero: '0.90',
          },
          radius: {
            sm: '0px',
            md: '12px',
            lg: '22.5px',
            full: '36px',
          },
          shadows: {
            card: 'none — two-step surface stack (#100904 -> #382416)',
            glow: '0 0 30px -5px rgba(220, 80, 0, 0.25)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Harvest Workbench':
        return {
          archetype: 'Harvest Workbench',
          colors: {
            background: '#fff8f1',
            foreground: '#1d1e1c',
            card: '#ffffff',
            cardForeground: '#1d1e1c',
            primary: '#fa5d00',
            primaryForeground: '#ffffff',
            secondary: '#fee3b5',
            accent: '#fa5d00',
            border: '#c0bbb6',
            ring: 'rgba(250, 93, 0, 0.4)',
            gradientHero: 'linear-gradient(135deg, #fff8f1 0%, #fee3b5 100%)',
          },
          typography: {
            fontFamilyHeading: 'Monarch, GT Super, Tiempos Headline, Georgia, serif',
            fontFamilyBody: 'MuotoWeb, Inter, Söhne, ui-sans-serif, sans-serif',
            fontSizeHero: '72px',
            fontSizeH1: '48px',
            fontSizeH2: '34px',
            fontSizeBody: '16px',
            lineHeightHero: '1.20',
          },
          radius: {
            sm: '16px',
            md: '16px',
            lg: '20px',
            full: '999px',
          },
          shadows: {
            card: 'rgba(250, 166, 0, 0.25) 6px 4px 24px 0px',
            glow: 'rgba(0, 0, 0, 0.2) 0px 1px 4px 0px',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Ventriloc Observatory':
        return {
          archetype: 'Ventriloc Observatory',
          colors: {
            background: '#ffffff',
            foreground: '#202020',
            card: '#efefef',
            cardForeground: '#202020',
            primary: '#202020',
            primaryForeground: '#ffffff',
            secondary: '#ebe6dd',
            accent: '#ff682c',
            border: '#e8e8e8',
            ring: 'rgba(255, 104, 44, 0.4)',
            gradientHero: 'linear-gradient(180deg, #ffffff 0%, #efefef 100%)',
          },
          typography: {
            fontFamilyHeading: 'PolySans, Inter Tight, Space Grotesk, ui-sans-serif, sans-serif',
            fontFamilyBody: 'Inter, system-ui, ui-sans-serif, sans-serif',
            fontSizeHero: '66px',
            fontSizeH1: '40px',
            fontSizeH2: '32px',
            fontSizeBody: '16px',
            lineHeightHero: '0.91',
          },
          radius: {
            sm: '0px',
            md: '8px',
            lg: '20px',
            full: '200px',
          },
          shadows: {
            card: 'none — flat observatory contrast',
            glow: '0 4px 12px rgba(255, 104, 44, 0.15)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Dope Terminal':
        return {
          archetype: 'Dope Terminal',
          colors: {
            background: '#090909',
            foreground: '#f7f9fa',
            card: 'rgba(237, 195, 196, 0.05)',
            cardForeground: '#f7f9fa',
            primary: '#af50ff',
            primaryForeground: '#090909',
            secondary: '#423738',
            accent: '#e1bdff',
            border: 'rgba(247, 249, 250, 0.2)',
            ring: 'rgba(175, 80, 255, 0.5)',
            gradientHero: 'linear-gradient(135deg, #090909 0%, #af50ff 100%)',
          },
          typography: {
            fontFamilyHeading: 'GrandSlang, Whyte Inktrap, Tiempos Headline, Lora, serif',
            fontFamilyBody: 'Whyte Inktrap, Inter, General Sans, ui-sans-serif, sans-serif',
            fontSizeHero: '146px',
            fontSizeH1: '88px',
            fontSizeH2: '64px',
            fontSizeBody: '16px',
            lineHeightHero: '0.8',
          },
          radius: {
            sm: '6px',
            md: '8px',
            lg: '19.2px',
            full: '1584px',
          },
          shadows: {
            card: 'none — hairline borders & translucent washes',
            glow: '0 0 40px -5px rgba(175, 80, 255, 0.5)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Dayos Brutalist':
        return {
          archetype: 'Dayos Brutalist',
          colors: {
            background: '#e5e5e5',
            foreground: '#000000',
            card: '#ffffff',
            cardForeground: '#000000',
            primary: '#000000',
            primaryForeground: '#ffffff',
            secondary: '#f3f3f3',
            accent: '#d1ffca',
            border: '#c6c6c6',
            ring: 'rgba(0, 0, 0, 0.4)',
            gradientHero: 'linear-gradient(180deg, #e5e5e5 0%, #ffffff 100%)',
          },
          typography: {
            fontFamilyHeading: 'SuisseIntlCond, Anton, Bebas Neue, Barlow Condensed, ui-sans-serif, sans-serif',
            fontFamilyBody: 'SuisseIntl, Inter, Söhne, ui-sans-serif, sans-serif',
            fontSizeHero: '130px',
            fontSizeH1: '80px',
            fontSizeH2: '48px',
            fontSizeBody: '16px',
            lineHeightHero: '0.90',
          },
          radius: {
            sm: '8px',
            md: '24px',
            lg: '64px',
            full: '48px',
          },
          shadows: {
            card: 'none — flat brutalist surface contrast',
            glow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Structured Gallery':
        return {
          archetype: 'Structured Gallery',
          colors: {
            background: '#c4c3b6',
            foreground: '#000000',
            card: '#e7e5e4',
            cardForeground: '#000000',
            primary: '#000000',
            primaryForeground: '#ffffff',
            secondary: '#ebebeb',
            accent: '#dfdcd5',
            border: '#dfdcd5',
            ring: 'rgba(0, 0, 0, 0.4)',
            gradientHero: 'linear-gradient(180deg, #c4c3b6 0%, #e7e5e4 100%)',
          },
          typography: {
            fontFamilyHeading: 'Davinci, Canela, Tiempos Headline, Playfair Display, serif',
            fontFamilyBody: 'Helvetica Now, Inter, ui-sans-serif, sans-serif',
            fontSizeHero: '374px',
            fontSizeH1: '94px',
            fontSizeH2: '52px',
            fontSizeBody: '15px',
            lineHeightHero: '0.84',
          },
          radius: {
            sm: '2px',
            md: '9px',
            lg: '9px',
            full: '28.8px',
          },
          shadows: {
            card: 'none — gallery wall contrast elevation',
            glow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Steep Analytics':
        return {
          archetype: 'Steep Analytics',
          colors: {
            background: '#ffffff',
            foreground: '#17191c',
            card: '#f2f2f3',
            cardForeground: '#17191c',
            primary: '#17191c',
            primaryForeground: '#ffffff',
            secondary: '#fafafb',
            accent: '#fbe1d1',
            border: '#ececec',
            ring: 'rgba(23, 25, 28, 0.4)',
            gradientHero: 'linear-gradient(180deg, #ffffff 0%, #fafafb 100%)',
          },
          typography: {
            fontFamilyHeading: 'Signifier, GT Sectra, Tiempos Headline, Georgia, serif',
            fontFamilyBody: 'Sohne, Inter, ui-sans-serif, sans-serif',
            fontSizeHero: '90px',
            fontSizeH1: '64px',
            fontSizeH2: '44px',
            fontSizeBody: '17px',
            lineHeightHero: '1.30',
          },
          radius: {
            sm: '12px',
            md: '16px',
            lg: '24px',
            full: '9999px',
          },
          shadows: {
            card: 'none — flat card surfaces',
            glow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Notion Paper':
        return {
          archetype: 'Notion Paper',
          colors: {
            background: '#f6f5f4',
            foreground: '#000000',
            card: '#ffffff',
            cardForeground: '#615d59',
            primary: '#0075de',
            primaryForeground: '#ffffff',
            secondary: '#e6f3fe',
            accent: '#ffb110',
            border: 'rgba(0, 0, 0, 0.08)',
            ring: 'rgba(0, 117, 222, 0.4)',
            gradientHero: 'linear-gradient(180deg, #f6f5f4 0%, #ffffff 100%)',
          },
          typography: {
            fontFamilyHeading: 'NotionInter, Inter, ui-sans-serif, sans-serif',
            fontFamilyBody: 'NotionInter, Lyon Text, Inter, serif, sans-serif',
            fontSizeHero: '96px',
            fontSizeH1: '72px',
            fontSizeH2: '48px',
            fontSizeBody: '16px',
            lineHeightHero: '1.04',
          },
          radius: {
            sm: '4px',
            md: '8px',
            lg: '12px',
            full: '9999px',
          },
          shadows: {
            card: 'none — 1px solid rgba(0, 0, 0, 0.08) hairline',
            glow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          motion: {
            ease: 'cubic-bezier(0.2, 0, 0, 1)',
            durationFast: '150ms',
            durationNormal: '200ms',
          },
        };

      case 'Vivid Prism':
        return {
          archetype: 'Vivid Prism',
          colors: {
            background: '#101010',
            foreground: '#fffdf9',
            card: '#495764',
            cardForeground: '#fffdf9',
            primary: '#fffdf9',
            primaryForeground: '#101010',
            secondary: '#6f879c',
            accent: '#2a7fff',
            border: '#403f3f',
            ring: 'rgba(255, 253, 249, 0.4)',
            gradientHero: 'linear-gradient(135deg, #ff2a2a 0%, #2a7fff 50%, #2aff2a 100%)',
          },
          typography: {
            fontFamilyHeading: 'Neue Montreal, Söhne, Inter, ui-sans-serif, sans-serif',
            fontFamilyBody: 'Neue Montreal, Söhne, Inter, ui-sans-serif, sans-serif',
            fontSizeHero: '136px',
            fontSizeH1: '105px',
            fontSizeH2: '56px',
            fontSizeBody: '20px',
            lineHeightHero: '1.0',
          },
          radius: {
            sm: '0px',
            md: '5px',
            lg: '15px',
            full: '9999px',
          },
          shadows: {
            card: 'none — flat chromatic caustics elevation',
            glow: '0 0 50px -10px rgba(42, 127, 255, 0.3)',
          },
          motion: {
            ease: 'cubic-bezier(0.52, 0.01, 0, 1)',
            durationFast: '200ms',
            durationNormal: '500ms',
          },
        };

      case 'Apple Minimal':
        return {
          archetype: 'Apple Minimal',
          colors: {
            background: '#f5f5f7',
            foreground: '#1d1d1f',
            card: '#ffffff',
            cardForeground: '#1d1d1f',
            primary: '#0071e3',
            primaryForeground: '#ffffff',
            secondary: '#0066cc',
            accent: '#2997ff',
            border: '#d2d2d7',
            ring: 'rgba(0, 113, 227, 0.4)',
            gradientHero: 'linear-gradient(180deg, #f5f5f7 0%, #ffffff 100%)',
          },
          typography: {
            fontFamilyHeading: 'SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont, ui-sans-serif, sans-serif',
            fontFamilyBody: 'SF Pro Text, -apple-system, BlinkMacSystemFont, ui-sans-serif, sans-serif',
            fontSizeHero: '56px',
            fontSizeH1: '44px',
            fontSizeH2: '40px',
            fontSizeBody: '17px',
            lineHeightHero: '1.07',
          },
          radius: {
            sm: '8px',
            md: '8px',
            lg: '8px',
            full: '980px',
          },
          shadows: {
            card: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px',
            glow: '0 8px 32px rgba(0, 113, 227, 0.15)',
          },
          motion: {
            ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
            durationFast: '200ms',
            durationNormal: '400ms',
          },
        };

      case 'Jeton Fintech':
        return {
          archetype: 'Jeton Fintech',
          colors: {
            background: '#ffffff',
            foreground: '#360802',
            card: '#ffffff',
            cardForeground: '#360802',
            primary: '#f73b20',
            primaryForeground: '#ffffff',
            secondary: '#fdedea',
            accent: '#477ee9',
            border: '#e7dcdb',
            ring: 'rgba(247, 59, 32, 0.4)',
            gradientHero: 'linear-gradient(180deg, #ffffff 0%, #fdedea 100%)',
          },
          typography: {
            fontFamilyHeading: 'Sequel Sans, Inter, Manrope, ui-sans-serif, sans-serif',
            fontFamilyBody: 'Sequel Sans, Inter, Manrope, ui-sans-serif, sans-serif',
            fontSizeHero: '106px',
            fontSizeH1: '72px',
            fontSizeH2: '44px',
            fontSizeBody: '16px',
            lineHeightHero: '1.0',
          },
          radius: {
            sm: '8px',
            md: '12px',
            lg: '16px',
            full: '84px',
          },
          shadows: {
            card: 'rgba(0, 0, 0, 0.05) 0px -4px 16px 0px',
            glow: 'rgba(247, 59, 32, 0.1) 0px 8px 24px 0px',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Caldera Limestone':
        return {
          archetype: 'Caldera Limestone',
          colors: {
            background: '#e2e2df',
            foreground: '#070607',
            card: '#f7f6f2',
            cardForeground: '#070607',
            primary: '#fc5000',
            primaryForeground: '#070607',
            secondary: '#524ae9',
            accent: '#f5f28e',
            border: 'transparent',
            ring: 'rgba(252, 80, 0, 0.4)',
            gradientHero: 'linear-gradient(135deg, #524ae9 0%, #fc5000 100%)',
          },
          typography: {
            fontFamilyHeading: 'PP Neue Corp Compact, Bebas Neue, Anton, ui-sans-serif, sans-serif',
            fontFamilyBody: 'DM Sans, Inter, ui-sans-serif, sans-serif',
            fontSizeHero: '189px',
            fontSizeH1: '96px',
            fontSizeH2: '48px',
            fontSizeBody: '16px',
            lineHeightHero: '0.94',
          },
          radius: {
            sm: '16px',
            md: '40px',
            lg: '40px',
            full: '800px',
          },
          shadows: {
            card: 'none — flat contrast elevation',
            glow: '0 0 30px -5px rgba(252, 80, 0, 0.35)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Dala Void':
        return {
          archetype: 'Dala Void',
          colors: {
            background: '#000000',
            foreground: '#ffffff',
            card: 'transparent',
            cardForeground: '#ffffff',
            primary: '#8052ff',
            primaryForeground: '#ffffff',
            secondary: '#15846e',
            accent: '#ffb829',
            border: 'transparent',
            ring: 'rgba(128, 82, 255, 0.5)',
            gradientHero: 'linear-gradient(135deg, #8052ff 0%, #15846e 100%)',
          },
          typography: {
            fontFamilyHeading: 'PPNeueMontreal, Inter, ui-sans-serif, system-ui, sans-serif',
            fontFamilyBody: 'PPNeueMontreal, Inter, ui-sans-serif, system-ui, sans-serif',
            fontSizeHero: '113px',
            fontSizeH1: '78px',
            fontSizeH2: '48px',
            fontSizeBody: '18px',
            lineHeightHero: '1.1',
          },
          radius: {
            sm: '12px',
            md: '24px',
            lg: '24px',
            full: '9999px',
          },
          shadows: {
            card: 'none — void canvas floating elements',
            glow: '0 0 40px -5px rgba(128, 82, 255, 0.4)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Awesomic Zinc':
        return {
          archetype: 'Awesomic Zinc',
          colors: {
            background: '#f4f4f5',
            foreground: '#09090b',
            card: '#ffffff',
            cardForeground: '#18181b',
            primary: '#09090b',
            primaryForeground: '#ffffff',
            secondary: '#18181b',
            accent: '#ff5a00',
            border: '#ececee',
            ring: 'rgba(255, 90, 0, 0.4)',
            gradientHero: 'linear-gradient(180deg, #ffffff 0%, #f4f4f5 100%)',
          },
          typography: {
            fontFamilyHeading: 'Cosmica, DM Sans, ui-sans-serif, system-ui, sans-serif',
            fontFamilyBody: 'Cosmica, DM Sans, ui-sans-serif, system-ui, sans-serif',
            fontSizeHero: '64px',
            fontSizeH1: '56px',
            fontSizeH2: '40px',
            fontSizeBody: '15px',
            lineHeightHero: '1.12',
          },
          radius: {
            sm: '12px',
            md: '14px',
            lg: '36px',
            full: '10000px',
          },
          shadows: {
            card: 'none — 1px solid #ececee hairline border',
            glow: '0 4px 12px rgba(0, 0, 0, 0.04)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Linear Dark':
        return {
          archetype: 'Linear Dark',
          colors: {
            background: '#08090a',
            foreground: '#f7f8f8',
            card: 'rgba(255, 255, 255, 0.03)',
            cardForeground: '#e6e8eb',
            primary: '#5e6ad2',
            primaryForeground: '#ffffff',
            secondary: '#1c1e22',
            accent: '#8a99ff',
            border: 'rgba(255, 255, 255, 0.08)',
            ring: 'rgba(94, 106, 210, 0.5)',
            gradientHero: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
          },
          typography: {
            fontFamilyHeading: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            fontFamilyBody: 'Inter, sans-serif',
            fontSizeHero: 'clamp(3rem, 6vw, 5rem)',
            fontSizeH1: 'clamp(2.25rem, 4vw, 3.5rem)',
            fontSizeH2: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontSizeBody: '1.0625rem',
            lineHeightHero: '1.05',
          },
          radius: {
            sm: '0.375rem',
            md: '0.75rem',
            lg: '1rem',
            full: '9999px',
          },
          shadows: {
            card: '0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 20px rgba(0, 0, 0, 0.5)',
            glow: '0 0 40px -10px rgba(94, 106, 210, 0.3)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Stripe SaaS':
        return {
          archetype: 'Stripe SaaS',
          colors: {
            background: '#0a2540',
            foreground: '#adbdcc',
            card: '#123456',
            cardForeground: '#ffffff',
            primary: '#635bfc',
            primaryForeground: '#ffffff',
            secondary: '#00d4bf',
            accent: '#7a73ff',
            border: 'rgba(255, 255, 255, 0.12)',
            ring: 'rgba(99, 91, 252, 0.5)',
            gradientHero: 'linear-gradient(135deg, #635bfc 0%, #00d4bf 100%)',
          },
          typography: {
            fontFamilyHeading: 'Sohne, -apple-system, BlinkMacSystemFont, sans-serif',
            fontFamilyBody: 'Inter, sans-serif',
            fontSizeHero: 'clamp(3.25rem, 6.5vw, 5.5rem)',
            fontSizeH1: 'clamp(2.25rem, 4.5vw, 3.75rem)',
            fontSizeH2: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontSizeBody: '1.0625rem',
            lineHeightHero: '1.08',
          },
          radius: {
            sm: '0.25rem',
            md: '0.5rem',
            lg: '0.75rem',
            full: '9999px',
          },
          shadows: {
            card: '0 13px 27px -5px rgba(50,50,93,0.25), 0 8px 16px -8px rgba(0,0,0,0.3)',
            glow: '0 10px 40px rgba(99, 91, 252, 0.35)',
          },
          motion: {
            ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
            durationFast: '150ms',
            durationNormal: '250ms',
          },
        };

      default:
        return this.synthesizeRaw('Linear Dark');
    }
  }

  public toCSSVariables(tokens: BrandTokens): string {
    return `
:root {
  --bg-primary: ${tokens.colors.background};
  --text-primary: ${tokens.colors.foreground};
  --card-bg: ${tokens.colors.card};
  --card-fg: ${tokens.colors.cardForeground};
  --color-primary: ${tokens.colors.primary};
  --color-primary-fg: ${tokens.colors.primaryForeground};
  --color-secondary: ${tokens.colors.secondary};
  --color-accent: ${tokens.colors.accent};
  --color-border: ${tokens.colors.border};
  --color-ring: ${tokens.colors.ring};
  --font-heading: ${tokens.typography.fontFamilyHeading};
  --font-body: ${tokens.typography.fontFamilyBody};
  --radius-sm: ${tokens.radius.sm};
  --radius-md: ${tokens.radius.md};
  --radius-lg: ${tokens.radius.lg};
  --shadow-card: ${tokens.shadows.card};
  --shadow-glow: ${tokens.shadows.glow};
  --ease-motion: ${tokens.motion.ease};
}
`.trim();
  }
}
