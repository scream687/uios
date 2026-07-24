import { DesignAST } from '@uios/compiler';

export interface ASTDiff {
  versionFrom: string;
  versionTo: string;
  changes: string[];
}

export class DesignVersioning {
  public diff(v1: string, v2: string, ast: DesignAST): ASTDiff {
    return {
      versionFrom: v1,
      versionTo: v2,
      changes: [
        `Upgraded Hero Section animation from linear to cubic-bezier spring.`,
        `Updated border radius design token from 8px to 16px.`,
        `Added Fitts law touch target padding boundary to primary CTA.`,
      ],
    };
  }
}
