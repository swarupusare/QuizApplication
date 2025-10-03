export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  options: Option[];
}

export interface Answer {
  questionId: string;
  answerId?: string;
}

export interface AnswerViewModel {
  questionId: string;
  answerId?: string;
  isCorrect: boolean;
}

export interface ResultViewModel {
  correctAnswers: number;
  percentage: number;
  answers: AnswerViewModel[];
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  answers: AnswerViewModel[];
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId?: string;
}