export interface Question {
  question: string;
  type: 'MC' | 'SC';
  options: string[];
  points: number[];
  required: boolean;
  group: string;
}

export interface Answer {
  choice: number;
  score: number;
}

export type Answers = Record<number, Answer>;

export interface GroupScore {
    name: string;
    score: number;
    maxScore: number;
}

export interface Submission {
  studentName: string;
  answers: Answers;
  groupScores: GroupScore[];
  timestamp: number;
}
