export interface Submit {
  difficulty: string;
  count: number;
}

export interface Progress {
  submitStats: {
    acSubmissionNum: Submit[];
    totalSubmissionNum: Submit[];
  }
}
