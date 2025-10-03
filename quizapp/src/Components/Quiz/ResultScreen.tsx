import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  Button, 
  Collapse,
  Badge
} from 'reactstrap';
import type { Question, ResultViewModel } from '../../Models/QuizModel';
 
interface ResultScreenProps {
  result: ResultViewModel;
  timeSpent: number;
  onRestart: () => void;
  questions: Question[]; // Add questions prop to show question text
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  timeSpent,
  onRestart,
  questions,
}) => {
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

  const toggleQuestion = (questionId: string) => {
    setOpenQuestionId(openQuestionId === questionId ? null : questionId);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'danger';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent! 🎉';
    if (percentage >= 70) return 'Great job! 👍';
    if (percentage >= 50) return 'Good effort! 💪';
    return 'Keep practicing! 📚';
  };

  // Find the question text and options for each answer
  const getQuestionDetails = (questionId: string) => {
    return questions.find(q => q.id === questionId);
  };

  // Find the option text for a given option ID
  const getOptionText = (questionId: string, optionId?: string) => {
    const question = getQuestionDetails(questionId);
    if (!question || !optionId) return 'Not answered';
    
    const option = question.options.find(opt => opt.id === optionId);
    return option ? option.text : 'Unknown option';
  };

 

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            {/* Score Summary */}
            <Card className="shadow-lg mb-4">
              <CardBody className="text-center p-5">
                <div className="mb-4">
                  <div className="display-1 mb-3">🎯</div>
                  <h1 className="h2 fw-bold text-dark mb-2">Quiz Completed!</h1>
                  <p className="text-muted">Here's how you performed</p>
                </div>

                <div className="row mb-4">
                  <div className="col-md-4 mb-3">
                    <Card className={`border-0 bg-${getScoreColor(result.percentage)} text-white`}>
                      <CardBody>
                        <h5 className="card-title">Score</h5>
                        <div className="display-4 fw-bold">
                          {result.percentage.toFixed(1)}%
                        </div>
                        <p className="mb-0">
                          {result.correctAnswers} / {result.answers.length} correct
                        </p>
                      </CardBody>
                    </Card>
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <Card className="border-0 bg-success text-white">
                      <CardBody>
                        <h5 className="card-title">Correct Answers</h5>
                        <div className="display-4 fw-bold">
                          {result.correctAnswers}
                        </div>
                        <p className="mb-0">Out of {result.answers.length}</p>
                      </CardBody>
                    </Card>
                  </div>

                  <div className="col-md-4 mb-3">
                    <Card className="border-0 bg-info text-white">
                      <CardBody>
                        <h5 className="card-title">Time Taken</h5>
                        <div className="display-4 fw-bold">
                          {formatTime(timeSpent)}
                        </div>
                        <p className="mb-0">Total duration</p>
                      </CardBody>
                    </Card>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className={`text-${getScoreColor(result.percentage)} mb-3`}>
                    {getScoreMessage(result.percentage)}
                  </h4>
                </div>
              </CardBody>
            </Card>

            {/* Questions Review */}
            <Card className="shadow-lg">
              <CardBody>
                <h4 className="mb-4">
                  <i className="bi bi-list-check me-2"></i>
                  Question Review
                </h4>
                
                <div className="accordion" id="questionsAccordion">
                  {result.answers.map((answer, index) => {
                    const question = getQuestionDetails(answer.questionId);
                    const userAnswerText = getOptionText(answer.questionId, answer.answerId);
                    
                    return (
                      <Card key={answer.questionId} className="mb-3">
                        <CardBody className="p-0">
                          <div 
                            className="p-3 d-flex justify-content-between align-items-center cursor-pointer"
                            onClick={() => toggleQuestion(answer.questionId)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="d-flex align-items-center">
                              <Badge 
                                color={answer.isCorrect ? 'success' : 'danger'} 
                                className="me-3"
                              >
                                Q{index + 1}
                              </Badge>
                              <div>
                                <h6 className="mb-1">
                                  {question?.text || 'Question not found'}
                                </h6>
                                <small className={`text-${answer.isCorrect ? 'success' : 'danger'}`}>
                                  {answer.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                                </small>
                              </div>
                            </div>
                            <div>
                              <Badge color="secondary" className="me-2">
                                Your answer: {userAnswerText}
                              </Badge>
                              <i 
                                className={`bi bi-chevron-${openQuestionId === answer.questionId ? 'up' : 'down'}`}
                              ></i>
                            </div>
                          </div>

                          <Collapse isOpen={openQuestionId === answer.questionId}>
                            <div className="p-3 border-top bg-light">
                              {question && (
                                <>
                                  <h6 className="mb-3">Question:</h6>
                                  <p className="mb-3">{question.text}</p>
                                  
                                  <h6 className="mb-2">Options:</h6>
                                  <div className="list-group">
                                    {question.options.map((option) => (
                                      <div
                                        key={option.id}
                                        className={`list-group-item ${
                                          answer.answerId === option.id
                                            ? answer.isCorrect
                                              ? 'list-group-item-success'
                                              : 'list-group-item-danger'
                                            : ''
                                        }`}
                                      >
                                        <div className="d-flex align-items-center">
                                          <span className="flex-grow-1">{option.text}</span>
                                          {answer.answerId === option.id && (
                                            <Badge color={answer.isCorrect ? 'success' : 'danger'}>
                                              Your Answer
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  <div className={`mt-3 p-2 rounded ${answer.isCorrect ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                                    <strong>
                                      {answer.isCorrect 
                                        ? '✅ Your answer was correct!' 
                                        : '❌ Your answer was incorrect'
                                      }
                                    </strong>
                                  </div>
                                </>
                              )}
                            </div>
                          </Collapse>
                        </CardBody>
                      </Card>
                    );
                  })}
                </div>
              </CardBody>
            </Card>

            {/* Restart Button */}
            <div className="text-center mt-4">
              <Button 
                color="primary" 
                size="lg"
                onClick={onRestart}
                className="px-5"
              >
                <i className="bi bi-arrow-repeat me-2"></i>
                Take Quiz Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};