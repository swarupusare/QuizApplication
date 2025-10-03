import React from 'react';
import { useQuiz } from '../../Hooks/useQuiz';
import { ResultScreen } from './ResultScreen';
import { StartScreen } from './StartScreen';
import { Timer } from './Timer';
import { QuestionCard } from './QuestionCard';
import { QuizNavigation } from './QuizNavigation';
import { LoadingSpinner } from './LoadingSpinner/LoadingSpinner';
 

export const Quiz: React.FC = () => {
  const {
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
  } = useQuiz();

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers.find(
    answer => answer.questionId === currentQuestion?.id
  );

  const answeredQuestions = userAnswers.filter(answer => 
    answer.selectedOptionId !== undefined
  ).length;

  if (quizResult) {
    return (
      <ResultScreen 
        result={quizResult} 
        timeSpent={timeSpent}
        onRestart={resetQuiz} 
        questions={questions} // Pass questions to ResultScreen

      />
    );
  }

  if (questions.length === 0 && !loading) {
    return <StartScreen onStartQuiz={startQuiz} loading={loading} />;
  }

  if (loading && questions.length === 0) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center p-4">
        <div className="card text-center" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="card-body p-5">
            <div className="text-danger display-1 mb-4">⚠️</div>
            <h2 className="h3 fw-bold text-dark mb-3">Error</h2>
            <p className="text-muted mb-4">{error}</p>
            <button
              onClick={resetQuiz}
              className="btn btn-primary btn-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-4">
        <div className="row">
          {/* Timer Sidebar */}
          <div className="col-md-3 mb-4">
            <Timer timeSpent={timeSpent} />
          </div>
          
          {/* Main Content */}
          <div className="col-md-9">
            <QuestionCard
              question={currentQuestion}
              currentAnswer={currentAnswer}
              onAnswerSelect={setAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
            
            <QuizNavigation
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onPrevious={goToPreviousQuestion}
              onNext={goToNextQuestion}
              onSubmit={() => submitQuiz(currentQuestion.quizId)}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
              answeredQuestions={answeredQuestions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};