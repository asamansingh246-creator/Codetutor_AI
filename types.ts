export interface StudentSummary {
  summaryText: string;
  keyConcepts: string[];
  difficulty: string;
  nextSteps: string;
}

export interface AnalysisResponse {
  language: string;
  stepByStep: string;
  purpose: string;
  usage: string;
  critique: string; // Errors, Bugs, Improvements
  improvedCode: string;
  studentSummary: StudentSummary;
}
