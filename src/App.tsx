import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import SavedQuizzesPage from './pages/SavedQuizzesPage';
import QuizPage from './pages/QuizPage';
import SavedQuizPage from './pages/SavedQuizPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/saved" element={<SavedQuizzesPage />} />
            <Route path="/quiz/:videoId" element={<QuizPage />} />
            <Route path="/saved-quiz/:quizId" element={<SavedQuizPage />} />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;