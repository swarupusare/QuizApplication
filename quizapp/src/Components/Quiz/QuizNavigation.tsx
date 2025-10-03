import React from 'react';
import { Card, CardBody, Row, Col, Progress, Button } from 'reactstrap';
 
interface QuizNavigationProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLastQuestion: boolean;
  answeredQuestions: number;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentQuestionIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
  isLastQuestion,
  answeredQuestions,
}) => {
  return (
    <Card className="mt-4">
      <CardBody>
        <Row className="align-items-center">
          <Col md={4}>
            <Button
              onClick={onPrevious}
              color="secondary"
              disabled={currentQuestionIndex === 0}
              className="w-100"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Previous
            </Button>
          </Col>
          
          <Col md={4} className="text-center">
            <div className="text-muted small">
              Progress: {answeredQuestions}/{totalQuestions} answered
            </div>
            <Progress 
              value={(answeredQuestions / totalQuestions) * 100}
              className="mt-1"
              style={{ height: '6px' }}
            />
          </Col>

          <Col md={4}>
            {isLastQuestion ? (
              <Button 
                onClick={onSubmit} 
                color="primary"
                className="w-100"
                disabled={answeredQuestions !== totalQuestions}
              >
                Submit Quiz
                <i className="bi bi-check-lg ms-2"></i>
              </Button>
            ) : (
              <Button 
                onClick={onNext} 
                color="primary"
                className="w-100"
              >
                Next
                <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};