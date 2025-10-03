import React from 'react';
import { Card, CardBody } from 'reactstrap';

interface TimerProps {
  timeSpent: number;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({ timeSpent, className = '' }) => {
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={className}>
      <Card className="border-0 shadow-sm">
        <CardBody className="text-center">
          <h5 className="card-title mb-3">
            <i className="bi bi-clock me-2"></i>
            Time Elapsed
          </h5>
          <div className="display-6 fw-bold text-primary">
            {formatTime(timeSpent)}
          </div>
          <small className="text-muted">HH:MM:SS</small>
        </CardBody>
      </Card>
    </div>
  );
};