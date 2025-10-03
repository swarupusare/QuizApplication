import { useState, useCallback, useEffect, useRef } from 'react';
import type { Answer, Question, ResultViewModel, UserAnswer } from '../Models/QuizModel';
import { quizService } from '../Services/Quiz.service';
 

interface UseQuizReturn {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  quizResult: ResultViewModel | null;
  loading: boolean;
  error: string | null;
  timeSpent: number;
  startQuiz: (quizId: string) => Promise<void>;
  submitQuiz: (quizId: string) => Promise<void>;
  setAnswer: (questionId: string, optionId: string) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  resetQuiz: () => void;
}

export const useQuiz = (): UseQuizReturn => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizResult, setQuizResult] = useState<ResultViewModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  
  // Use useRef for timer to avoid re-renders and type issues
  const timerRef = useRef<number | null>(null);

  // Timer effect
  useEffect(() => {
    if (questions.length > 0 && !quizResult && !timerRef.current) {
      timerRef.current = window.setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [questions.length, quizResult]);

  const startQuiz = useCallback(async (quizId: string) => {
    setLoading(true);
    setError(null);
    setTimeSpent(0);
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    try {
      const fetchedQuestions = await quizService.getQuestions(quizId);
      setQuestions(fetchedQuestions);
      setUserAnswers([]);
      setQuizResult(null);
      setCurrentQuestionIndex(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start quiz');
    } finally {
      setLoading(false);
    }
  }, []);

  const submitQuiz = useCallback(async (quizId: string) => {
    if (userAnswers.length !== questions.length) {
      setError('Please answer all questions before submitting');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Convert UserAnswer to Answer for backend
      const answers: Answer[] = userAnswers.map(answer => ({
        questionId: answer.questionId,
        answerId: answer.selectedOptionId
      }));

      const result = await quizService.submitAnswers(quizId, answers);
      setQuizResult(result);
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit quiz');
    } finally {
      setLoading(false);
    }
  }, [userAnswers, questions.length]);

  const setAnswer = useCallback((questionId: string, optionId: string) => {
    setUserAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(
        answer => answer.questionId === questionId
      );

      if (existingAnswerIndex >= 0) {
        const updated = [...prev];
        updated[existingAnswerIndex] = { questionId, selectedOptionId: optionId };
        return updated;
      }

      return [...prev, { questionId, selectedOptionId: optionId }];
    });
  }, []);

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestionIndex(prev => 
      prev < questions.length - 1 ? prev + 1 : prev
    );
  }, [questions.length]);

  const goToPreviousQuestion = useCallback(() => {
    setCurrentQuestionIndex(prev => prev > 0 ? prev - 1 : prev);
  }, []);

  const resetQuiz = useCallback(() => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
    setError(null);
    setTimeSpent(0);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    questions,
    currentQuestionIndex,
    userAnswers,
    quizResult,
    loading,
    error,
    timeSpent,
    startQuiz,
    submitQuiz,
    setAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    resetQuiz,
  };
};