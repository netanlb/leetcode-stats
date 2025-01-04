export interface SkillTag {
  problemsSolved: number;
  tagName: string;
  tagSlug: string;
}

export interface SkillStats {
  tagProblemCounts: {
    advanced: SkillTag[];
    fundamental: SkillTag[];
    intermediate: SkillTag[];
  }
}
