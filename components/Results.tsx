import React from 'react';
import type { GroupScore } from '../types';

interface ResultsProps {
    groupScores: GroupScore[];
    onFinish: () => void;
    onBackToDashboard?: () => void;
    studentName?: string;
}

const ResultBar: React.FC<{ group: GroupScore }> = ({ group }) => {
    const percentage = group.maxScore > 0 ? (group.score / group.maxScore) * 100 : 0;
    
    let barColor = 'bg-green-500';
    if (percentage < 70) barColor = 'bg-yellow-500';
    if (percentage < 40) barColor = 'bg-red-500';

    return (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-slate-700">{group.name}</span>
                <span className="text-sm font-medium text-slate-700">{group.score} / {group.maxScore} 점</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                <div 
                    className={`${barColor} h-4 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};


const Results: React.FC<ResultsProps> = ({ groupScores, onFinish, onBackToDashboard, studentName }) => {
    const totalScore = groupScores.reduce((acc, curr) => acc + curr.score, 0);
    const totalMaxScore = groupScores.reduce((acc, curr) => acc + curr.maxScore, 0);
    const overallPercentage = totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;

    let feedbackMessage = "훌륭해요! 모범적인 학교 생활을 하고 있네요.";
    if (overallPercentage < 75) {
        feedbackMessage = "좋아요! 조금만 더 신경 쓴다면 더 멋진 학교 생활을 할 수 있을 거예요.";
    }
    if (overallPercentage < 50) {
        feedbackMessage = "개선이 필요해요. 자신의 행동을 돌아보고 더 나은 방향으로 노력해봅시다.";
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-slate-200 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">{studentName ? `${studentName} 학생의 결과` : "설문 결과"}</h2>
                <p className="text-slate-600">{studentName ? `학생의 설문 결과를 검토합니다.` : "당신의 학교 생활 태도 점수를 확인해보세요."}</p>
            </div>

            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6 mb-8 text-center">
                 <p className="text-lg font-semibold text-indigo-800 mb-2">총점</p>
                 <p className="text-5xl font-bold text-indigo-600">{totalScore} <span className="text-2xl font-medium text-slate-500">/ {totalMaxScore}</span></p>
                 <p className="mt-4 text-indigo-700">{feedbackMessage}</p>
            </div>
            
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-700 border-b-2 pb-2">분야별 점수</h3>
                {groupScores.map((group, index) => (
                    <ResultBar key={index} group={group} />
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                {onBackToDashboard ? (
                     <button
                        onClick={onBackToDashboard}
                        className="px-8 py-3 text-md font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        대시보드로 돌아가기
                    </button>
                ) : (
                    <button
                        onClick={onFinish}
                        className="px-8 py-3 text-md font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        완료
                    </button>
                )}
            </div>
        </div>
    );
};

export default Results;