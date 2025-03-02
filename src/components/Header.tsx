import React from 'react';
import { YoutubeIcon, BookOpenIcon, HistoryIcon, SaveIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <YoutubeIcon className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">YT Quiz</span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpenIcon className="h-4 w-4 mr-1" />
              <span>New Quiz</span>
            </Link>
            
            <Link
              to="/history"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/history') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <HistoryIcon className="h-4 w-4 mr-1" />
              <span>History</span>
            </Link>
            
            <Link
              to="/saved"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/saved') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <SaveIcon className="h-4 w-4 mr-1" />
              <span>Saved Quizzes</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;