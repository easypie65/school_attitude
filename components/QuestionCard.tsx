
import React from 'react';
import type { Question, Answer } from '../types';

interface QuestionCardProps {
    question: Question;
    questionIndex: number;
    selectedAnswer: Answer | undefined;
    onAnswerChange: (questionIndex: number, choiceIndex: number, score: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionIndex, selectedAnswer, onAnswerChange }) => {
    const questionId = `question-${questionIndex}`;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 transition-shadow hover:shadow-xl mb-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
                <span className="text-indigo-500 font-bold mr-2">{questionIndex + 1}.</span>
                {question.question}
                {question.required && <span className="text-red-500 ml-2">*</span>}
            </h3>
            <div className="space-y-3">
                {question.options.map((option, choiceIndex) => (
                    <label 
                        key={choiceIndex}
                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            selectedAnswer?.choice === choiceIndex 
                                ? 'bg-indigo-50 border-indigo-500 shadow-md' 
                                : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
                        }`}
                    >
                        <input
                            type="radio"
                            name={questionId}
                            value={choiceIndex}
                            checked={selectedAnswer?.choice === choiceIndex}
                            onChange={() => onAnswerChange(questionIndex, choiceIndex, question.points[choiceIndex])}
                            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <span className="ml-4 text-slate-700 font-medium">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;
