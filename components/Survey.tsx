
import React from 'react';
import type { Question, Answers } from '../types';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';

interface SurveyProps {
    questions: Question[];
    answers: Answers;
    onAnswerChange: (questionIndex: number, choiceIndex: number, score: number) => void;
    onSubmit: () => void;
}

const Survey: React.FC<SurveyProps> = ({ questions, answers, onAnswerChange, onSubmit }) => {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = questions.length;
    const allAnswered = answeredCount === totalQuestions;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">학생 생활 태도 설문지</h2>
                <p className="text-slate-600">각 문항을 잘 읽고 자신에게 해당하는 것에 솔직하게 답변해주세요.</p>
                <div className="mt-6">
                    <ProgressBar current={answeredCount} total={totalQuestions} />
                    <p className="text-right text-sm text-slate-500 font-semibold">{answeredCount} / {totalQuestions} 문항 답변 완료</p>
                </div>
            </div>
            
            <div className="space-y-6">
                {questions.map((q, index) => (
                    <QuestionCard 
                        key={index}
                        question={q}
                        questionIndex={index}
                        selectedAnswer={answers[index]}
                        onAnswerChange={onAnswerChange}
                    />
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={onSubmit}
                    disabled={!allAnswered}
                    className={`px-12 py-4 text-lg font-bold text-white rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                        allAnswered
                            ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                            : 'bg-slate-400 cursor-not-allowed'
                    }`}
                >
                    결과 보기
                </button>
            </div>
        </div>
    );
};

export default Survey;
