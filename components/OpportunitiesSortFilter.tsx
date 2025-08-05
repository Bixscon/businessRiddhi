'use client';

import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FundingCardClient } from '@/components/cards/funding-card-client';

export type SortOption = 'deadline-asc' | 'deadline-desc' | 'upload-date-desc' | 'upload-date-asc';

interface OpportunitiesSortFilterProps {
  opportunities: any[];
  userId: string;
}

const OpportunitiesSortFilter: React.FC<OpportunitiesSortFilterProps> = ({ opportunities, userId }) => {
  const [sortBy, setSortBy] = useState<SortOption>('deadline-asc');

  const sortOpportunities = (opportunities: any[], sortOption: SortOption) => {
    const sorted = [...opportunities];
    
    switch (sortOption) {
      case 'deadline-asc':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.endDatetime || a.endDate);
          const dateB = new Date(b.endDatetime || b.endDate);
          
          // Handle invalid dates by putting them at the end
          if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
          if (isNaN(dateA.getTime())) return 1;
          if (isNaN(dateB.getTime())) return -1;
          
          return dateA.getTime() - dateB.getTime();
        });
      
      case 'deadline-desc':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.endDatetime || a.endDate);
          const dateB = new Date(b.endDatetime || b.endDate);
          
          // Handle invalid dates by putting them at the end
          if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
          if (isNaN(dateA.getTime())) return 1;
          if (isNaN(dateB.getTime())) return -1;
          
          return dateB.getTime() - dateA.getTime();
        });
      
      case 'upload-date-desc':
        // Sort by ID (most recent first) - temporary workaround until createdAt is added
        return sorted.sort((a, b) => {
          // UUIDs are generally time-ordered, so we can use ID as a proxy
          if (a.id > b.id) return -1;
          if (a.id < b.id) return 1;
          return 0;
        });
      
      case 'upload-date-asc':
        // Sort by ID (oldest first) - temporary workaround until createdAt is added
        return sorted.sort((a, b) => {
          // UUIDs are generally time-ordered, so we can use ID as a proxy
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
      
      default:
        return sorted;
    }
  };

  const sortedOpportunities = sortOpportunities(opportunities, sortBy);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Funding Opportunities</h1>
          <p className="text-gray-600 mt-1">
            Explore the latest funding opportunities tailored for your needs.
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
          <Label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
            Sort by:
          </Label>
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger id="sort-select" className="w-48 bg-white">
              <SelectValue placeholder="Select sorting option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deadline-asc">Deadline (Earliest First)</SelectItem>
              <SelectItem value="deadline-desc">Deadline (Latest First)</SelectItem>
              <SelectItem value="upload-date-desc">Recently Added</SelectItem>
              <SelectItem value="upload-date-asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-sm text-gray-500 flex items-center gap-2">
        <span>Showing {sortedOpportunities.length} opportunities</span>
        <span className="text-gray-400">•</span>
        <span className="text-blue-600">
          {sortBy === 'deadline-asc' && 'Sorted by deadline (earliest first)'}
          {sortBy === 'deadline-desc' && 'Sorted by deadline (latest first)'}
          {sortBy === 'upload-date-desc' && 'Sorted by ID (most recent first)'}
          {sortBy === 'upload-date-asc' && 'Sorted by ID (oldest first)'}
        </span>
      </div>

      {sortedOpportunities.length > 0 ? (
        <section className="space-y-8">
          {sortedOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="flex justify-center">
              <FundingCardClient
                fundingOpportunity={opportunity}
                business={opportunity.business}
                isSaved={opportunity.isSaved}
                userId={userId}
              />
            </div>
          ))}
        </section>
      ) : (
        <section className="text-center py-10">
          <p className="text-lg text-gray-500">No funding opportunities available at the moment.</p>
        </section>
      )}
    </div>
  );
};

export default OpportunitiesSortFilter;
