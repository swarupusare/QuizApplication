import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap'; 
import { Button } from '../Common/Button';
import { LoadingSpinner } from './LoadingSpinner/LoadingSpinner';

interface StartScreenProps {
  onStartQuiz: (quizId: string) => void;
  loading: boolean;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartQuiz,
  loading,
}) => {
  const [quizId, setQuizId] = useState('');

  const handleStart = () => {
    if (quizId.trim()) {
      onStartQuiz(quizId.trim());
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-4">
      <Card className="shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <CardBody className="p-5 text-center">
          <div className="mb-4">
            <i className="bi bi-patch-question display-1 text-primary"></i>
            <h1 className="h2 fw-bold text-dark mt-3 mb-2">
              Welcome to the Quiz
            </h1>
            <p className="text-muted">
              Test your knowledge with our interactive quiz. Answer all questions and see how you score!
            </p>
          </div>

          <Form>
            <FormGroup>
              <Label for="quizId" className="form-label text-start w-100">
                Enter Quiz ID:
              </Label>
              <Input
                type="text"
                id="quizId"
                placeholder="Enter quiz identifier"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                disabled={loading}
                bsSize="lg"
              />
            </FormGroup>
          </Form>

          <Button
            onClick={handleStart}
            disabled={loading || !quizId.trim()}
            className="w-100 py-3 mt-3"
            color="primary"
          >
            {loading ? (
              <div className="d-flex align-items-center justify-content-center">
                <LoadingSpinner size="sm" className="me-2" />
                Loading...
              </div>
            ) : (
              'Start Quiz'
            )}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};