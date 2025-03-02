import React from 'react';
import { BookOpenIcon } from 'lucide-react';

interface SummaryProps {
  summary: string;
}

const Summary: React.FC<SummaryProps> = ({ summary }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center mb-3">
        <BookOpenIcon className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-bold text-gray-800">Summary</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">{summary}</p>
    </div>
  );
};

export default Summary;