import { ProcessedVideo, SavedQuiz } from '../types';

const STORAGE_KEY = 'youtube-transcript-quiz-app';

interface AppStorage {
  history: ProcessedVideo[];
  savedQuizzes: SavedQuiz[];
}

// Initialize storage
function getStorage(): AppStorage {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return { history: [], savedQuizzes: [] };
}

// Save storage
function saveStorage(data: AppStorage): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Add processed video to history
export function addToHistory(video: ProcessedVideo): void {
  const storage = getStorage();
  
  // Check if video already exists in history
  const existingIndex = storage.history.findIndex(v => v.videoId === video.videoId);
  if (existingIndex !== -1) {
    // Replace existing entry
    storage.history[existingIndex] = video;
  } else {
    // Add new entry
    storage.history.unshift(video);
    
    // Limit history to 10 items
    if (storage.history.length > 10) {
      storage.history = storage.history.slice(0, 10);
    }
  }
  
  saveStorage(storage);
}

// Get history
export function getHistory(): ProcessedVideo[] {
  return getStorage().history;
}

// Save quiz
export function saveQuiz(quiz: SavedQuiz): void {
  const storage = getStorage();
  
  // Check if quiz already exists
  const existingIndex = storage.savedQuizzes.findIndex(q => q.id === quiz.id);
  if (existingIndex !== -1) {
    // Replace existing entry
    storage.savedQuizzes[existingIndex] = quiz;
  } else {
    // Add new entry
    storage.savedQuizzes.unshift(quiz);
  }
  
  saveStorage(storage);
}

// Get saved quizzes
export function getSavedQuizzes(): SavedQuiz[] {
  return getStorage().savedQuizzes;
}

// Delete saved quiz
export function deleteSavedQuiz(id: string): void {
  const storage = getStorage();
  storage.savedQuizzes = storage.savedQuizzes.filter(quiz => quiz.id !== id);
  saveStorage(storage);
}

// Clear all data
export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
}