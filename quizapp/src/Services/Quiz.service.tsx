import type { Answer, Question, ResultViewModel } from "../Models/QuizModel";

 
const API_BASE_URL = 'https://localhost:7222/api'; // Adjust based on your backend

export class QuizService {
  async getQuestions(quizId: string): Promise<Question[]> {
    const response = await fetch(`${API_BASE_URL}/Quiz/${quizId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    
    const apiResponse = await response.json();
    return apiResponse.data;
  }

  async submitAnswers(quizId: string, answers: Answer[]): Promise<ResultViewModel> {
    const response = await fetch(`${API_BASE_URL}/Quiz/${quizId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error('Failed to submit answers');
    }

    const apiResponse = await response.json();
    return apiResponse.data;
  }
}

export const quizService = new QuizService();