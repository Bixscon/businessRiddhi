export function getTimeUntilDeadline(endDate: Date | string | null): {
  timeLeft: string;
  isExpired: boolean;
  urgencyLevel: 'low' | 'medium' | 'high' | 'expired';
} {
  if (!endDate) {
    return {
      timeLeft: 'No deadline',
      isExpired: false,
      urgencyLevel: 'low'
    };
  }

  const now = new Date();
  const deadline = new Date(endDate);
  const timeDiff = deadline.getTime() - now.getTime();

  if (timeDiff <= 0) {
    return {
      timeLeft: 'Expired',
      isExpired: true,
      urgencyLevel: 'expired'
    };
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  let timeLeft = '';
  let urgencyLevel: 'low' | 'medium' | 'high' = 'low';

  if (days > 0) {
    if (days === 1) {
      timeLeft = `${days} day`;
    } else {
      timeLeft = `${days} days`;
    }
    
    if (hours > 0) {
      timeLeft += `, ${hours}h`;
    }
    
    // Set urgency level based on days left
    if (days <= 3) {
      urgencyLevel = 'high';
    } else if (days <= 7) {
      urgencyLevel = 'medium';
    }
  } else if (hours > 0) {
    timeLeft = `${hours} hour${hours !== 1 ? 's' : ''}`;
    if (minutes > 0) {
      timeLeft += `, ${minutes}m`;
    }
    urgencyLevel = 'high';
  } else {
    timeLeft = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    urgencyLevel = 'high';
  }

  return {
    timeLeft: `${timeLeft} left`,
    isExpired: false,
    urgencyLevel
  };
}

export function formatDeadlineDate(endDate: Date | string | null): string {
  if (!endDate) return 'No deadline set';
  
  const deadline = new Date(endDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return deadline.toLocaleDateString('en-US', options);
}
