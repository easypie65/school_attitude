import React, { useMemo } from 'react';
import type { Submission } from '../types';

interface TeacherDashboardProps {
    submissions: Submission[];
    onSelectSubmission: (submission: Submission) => void;
    onLogout: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ submissions, onSelectSubmission, onLogout }) => {
    
    // Filter for valid submissions to prevent rendering errors from corrupted or incomplete data.
    // This check is now more robust, verifying the integrity of nested data and ensuring scores are valid numbers (not NaN).
    const validSubmissions = useMemo(() => submissions.filter(s => {
        if (!s || typeof s.timestamp !== 'number' || typeof s.studentName !== 'string' || !Array.isArray(s.groupScores)) {
            return false;
        }
        // Ensure every entry in groupScores is a valid object with valid numeric scores.
        return s.groupScores.every(gs => 
            gs && 
            typeof gs.score === 'number' && !isNaN(gs.score) &&
            typeof gs.maxScore === 'number' && !isNaN(gs.maxScore)
        );
    }), [submissions]);

    const totalSubmissions = validSubmissions.length;

    const escapeCsvCell = (cell: any): string => {
        const strCell = String(cell ?? ''); // handle null/undefined
        if (strCell.includes(',') || strCell.includes('"') || strCell.includes('\n')) {
            return `"${strCell.replace(/"/g, '""')}"`;
        }
        return strCell;
    };

    const handleExport = () => {
        if (validSubmissions.length === 0) {
            alert("내보낼 제출물이 없습니다.");
            return;
        }

        const allGroupNames = [...new Set(validSubmissions.flatMap(s => s.groupScores.map(g => g.name)))];

        const headers = [
            '학생 이름', '제출 시간', '총점', '최대 총점',
            ...allGroupNames.map(name => `${name} 점수`),
            ...allGroupNames.map(name => `${name} 최대 점수`)
        ].map(escapeCsvCell);

        const csvRows = [...validSubmissions].sort((a,b) => b.timestamp - a.timestamp).map(submission => {
            const totalScore = submission.groupScores.reduce((acc, s) => acc + s.score, 0);
            const totalMaxScore = submission.groupScores.reduce((acc, s) => acc + s.maxScore, 0);
            
            const groupScoresMap = new Map(submission.groupScores.map(g => [g.name, g]));

            const rowData = [
                submission.studentName,
                new Date(submission.timestamp).toLocaleString('ko-KR'),
                totalScore,
                totalMaxScore,
                ...allGroupNames.map(name => groupScoresMap.get(name)?.score ?? ''),
                ...allGroupNames.map(name => groupScoresMap.get(name)?.maxScore ?? '')
            ];
            
            return rowData.map(escapeCsvCell).join(',');
        });

        const csvString = [headers.join(','), ...csvRows].join('\n');
        
        const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        const timestamp = new Date().toISOString().slice(0, 10);
        link.setAttribute('download', `survey_results_${timestamp}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-slate-200 animate-fade-in">
            <div className="flex justify-between items-center mb-8 border-b-2 pb-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-800">교사 대시보드</h2>
                    <p className="text-slate-600">학생 설문 제출물을 검토합니다.</p>
                </div>
                <button
                    onClick={onLogout}
                    className="px-6 py-2 text-md font-bold text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    로그아웃
                </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-slate-700 mb-4">요약</h3>
                        <p className="text-lg text-slate-800">
                            <span className="font-extrabold text-indigo-600 text-2xl">{totalSubmissions}</span> 개의 제출물이 있습니다.
                        </p>
                        <p className="text-sm text-slate-500 mt-2">
                            참고: 제출물은 브라우저의 로컬 저장소에 저장됩니다. 이 컴퓨터에서 설문을 완료한 학생의 결과만 볼 수 있습니다.
                        </p>
                    </div>
                     <button
                        onClick={handleExport}
                        disabled={totalSubmissions === 0}
                        className="px-6 py-2 text-md font-bold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        결과 내보내기 (CSV)
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-700 mb-4">제출된 설문</h3>
                {totalSubmissions > 0 ? (
                    <div className="space-y-3">
                        {[...validSubmissions].sort((a, b) => b.timestamp - a.timestamp).map((submission) => (
                             <div 
                                key={submission.timestamp}
                                className="flex justify-between items-center p-4 rounded-lg border-2 border-slate-200"
                             >
                                <div>
                                    <p className="font-bold text-slate-800">{submission.studentName}</p>
                                    <p className="text-sm text-slate-500">
                                        제출일: {new Date(submission.timestamp).toLocaleString('ko-KR')}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onSelectSubmission(submission)}
                                    className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    결과보기
                                </button>
                             </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 px-6 bg-slate-50 rounded-lg">
                        <p className="text-slate-600">응답자 없음</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherDashboard;