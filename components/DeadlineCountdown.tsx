'use client';

import React, { useState, useEffect } from 'react';
import { getTimeUntilDeadline, formatDeadlineDate } from '@/lib/timeUtils';
import { Clock, Calendar } from 'lucide-react';

interface DeadlineCountdownProps {
  endDate: Date | string | null;
  className?: string;
  showFullDate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  plainText?: boolean; // New prop for plain text rendering
}

const DeadlineCountdown: React.FC<DeadlineCountdownProps> = ({
  endDate,
  className = '',
  showFullDate = false,
  size = 'md',
  plainText = false
}) => {
  const [timeData, setTimeData] = useState(() => getTimeUntilDeadline(endDate));

  useEffect(() => {
    if (!endDate) return;

    const updateTime = () => {
      setTimeData(getTimeUntilDeadline(endDate));
    };

    // Update immediately
    updateTime();

    // Update every minute
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [endDate]);

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const urgencyColors = {
    low: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    high: 'text-red-600 bg-red-50 border-red-200',
    expired: 'text-gray-500 bg-gray-50 border-gray-200'
  };

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (!endDate) {
    return (
      <div className={`flex items-center gap-1 ${sizeClasses[size]} text-gray-500 ${className}`}>
        <Calendar className={iconSize[size]} />
        <span>No deadline</span>
      </div>
    );
  }

  // Plain text rendering for matching original typography
  if (plainText) {
    return <span className={className}>{timeData.timeLeft}</span>;
  }

  return (
    <div className={className}>
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border ${urgencyColors[timeData.urgencyLevel]} ${sizeClasses[size]} font-medium`}>
        <Clock className={iconSize[size]} />
        <span>{timeData.timeLeft}</span>
      </div>
      
      {showFullDate && (
        <div className={`mt-1 flex items-center gap-1 ${sizeClasses[size]} text-gray-600`}>
          <Calendar className={iconSize[size]} />
          <span>Apply by {formatDeadlineDate(endDate)}</span>
        </div>
      )}
    </div>
  );
};

export default DeadlineCountdown;
