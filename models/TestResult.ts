import mongoose from 'mongoose';

const TestResultSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  wpm: {
    type: Number,
    required: true
  },
  accuracy: {
    type: Number,
    required: true
  },
  rank: {
    type: String,
    enum: ['e', 'd', 'c', 'b', 'a', 's'],
    required: true
  },
  testDuration: {
    type: Number,
    required: true
  },
  completedCharacters: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.TestResult || mongoose.model('TestResult', TestResultSchema); 