import React from 'react';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem, FormGroup, Input, Label } from 'reactstrap';
import type { Question, UserAnswer } from '../../Models/QuizModel';
 
interface QuestionCardProps {
  question: Question;
  currentAnswer: UserAnswer | undefined;
  onAnswerSelect: (questionId: string, optionId: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted small">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="badge bg-primary">ID: {question.id}</span>
        </div>
      </CardHeader>
      <CardBody className="p-4">
        <h3 className="card-title h4 mb-4 text-dark">{question.text}</h3>

        <ListGroup flush>
          {question.options.map((option) => (
            <ListGroupItem 
              key={option.id}
              tag="button"
              action
              className={`border-0 ${currentAnswer?.selectedOptionId === option.id ? 'bg-primary text-white' : ''}`}
              onClick={() => onAnswerSelect(question.id, option.id)}
              style={{ cursor: 'pointer' }}
            >
              <FormGroup check className="d-flex align-items-center mb-0">
                <Input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={currentAnswer?.selectedOptionId === option.id}
                  onChange={() => onAnswerSelect(question.id, option.id)}
                />
                <Label check className="form-check-label ms-3 flex-grow-1 mb-0">
                  {option.text}
                </Label>
              </FormGroup>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};