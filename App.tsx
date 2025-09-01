
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { surveyQuestions } from './data/surveyData';
import type { Answers, GroupScore, Submission } from './types';
import Survey from './components/Survey';
import Results from './components/Results';
import Entry from './components/Entry';
import TeacherDashboard from './components/TeacherDashboard';

const App: React.FC = () => {
    // App state
    const [userRole, setUserRole] = useState<'student' | 'teacher' | null>(null);
    const [studentName, setStudentName] = useState<string>('');
    const [answers, setAnswers] = useState<Answers>({});
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [viewingSubmission, setViewingSubmission] = useState<Submission | null>(null);
    
    // Load submissions and in-progress survey from localStorage on mount
    useEffect(() => {
        try {
            const storedSubmissions = localStorage.getItem('surveySubmissions');
            if (storedSubmissions) {
                const parsedSubmissions = JSON.parse(storedSubmissions);
                if (Array.isArray(parsedSubmissions)) {
                    setSubmissions(parsedSubmissions);
                } else {
                    console.warn("Stored submissions were not in the expected array format. Clearing storage.");
                    localStorage.removeItem('surveySubmissions');
                    setSubmissions([]);
                }
            }
        } catch (error) {
            console.error("Failed to load or parse submissions from local storage. Clearing storage.", error);
            localStorage.removeItem('surveySubmissions');
            setSubmissions([]);
        }

        // Load in-progress survey and auto-login student if progress exists
        try {
            const savedProgress = localStorage.getItem('surveyInProgress');
            if (savedProgress) {
                const { studentName: savedName, answers: savedAnswers } = JSON.parse(savedProgress);
                if (savedName && typeof savedName === 'string') {
                    // If we find saved progress, restore the entire session
                    setStudentName(savedName);
                    setUserRole('student'); 
                    if (savedAnswers && typeof savedAnswers === 'object') {
                        setAnswers(savedAnswers);
                    }
                }
            }
        } catch (error) {
            console.error("Failed to load in-progress survey from local storage.", error);
            localStorage.removeItem('surveyInProgress');
        }
    }, []);

    // Auto-save survey progress for students
    useEffect(() => {
        if (userRole === 'student' && !isCompleted && studentName) {
            try {
                const progress = { studentName, answers };
                localStorage.setItem('surveyInProgress', JSON.stringify(progress));
            } catch (error) {
                console.error("Failed to auto-save survey progress", error);
            }
        }
    }, [userRole, isCompleted, studentName, answers]);


    const calculateGroupScores = useCallback((currentAnswers: Answers): GroupScore[] => {
        const scores: Record<string, { score: number, maxScore: number }> = {};
        
        surveyQuestions.forEach((q, index) => {
            const groupName = q.group.replace(/\(역문항\)/, '').trim();
            if (!scores[groupName]) {
                scores[groupName] = { score: 0, maxScore: 0 };
            }
            const maxPoints = Math.max(...q.points);
            scores[groupName].maxScore += maxPoints;

            if (currentAnswers[index]) {
                scores[groupName].score += currentAnswers[index].score;
            }
        });

        return Object.entries(scores).map(([name, data]) => ({
            name,
            score: data.score,
            maxScore: data.maxScore,
        }));
    }, []);

    const groupScoresForCurrentSurvey = useMemo(() => {
        return calculateGroupScores(answers);
    }, [answers, calculateGroupScores]);

    const handleAnswerChange = useCallback((questionIndex: number, choiceIndex: number, score: number) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: { choice: choiceIndex, score: score }
        }));
    }, []);

    const handleSubmit = useCallback(() => {
        if (Object.keys(answers).length === surveyQuestions.length) {
            const finalGroupScores = calculateGroupScores(answers);
            const newSubmission: Submission = {
                studentName,
                answers,
                groupScores: finalGroupScores,
                timestamp: Date.now(),
            };
            
            const updatedSubmissions = [...submissions, newSubmission];
            setSubmissions(updatedSubmissions);
            try {
                localStorage.setItem('surveySubmissions', JSON.stringify(updatedSubmissions));
                localStorage.removeItem('surveyInProgress'); // Clear auto-saved data on successful submission
            } catch (error) {
                 console.error("Failed to save submission to local storage", error);
                 alert("답변을 저장하는 중 오류가 발생했습니다.");
            }

            setIsCompleted(true);
            window.scrollTo(0, 0);
        } else {
            alert('모든 필수 질문에 답변해주세요.');
        }
    }, [answers, submissions, studentName, calculateGroupScores]);

    const handleLogin = useCallback((role: 'student' | 'teacher', name?: string) => {
        if (role === 'student' && name) {
            // If it's a new student (different name), clear old answers.
            // This is mainly for the case where progress wasn't auto-loaded.
            if (name !== studentName) {
                setAnswers({});
            }
            setStudentName(name);
            setUserRole('student');
            setIsCompleted(false);
        } else if (role === 'teacher') {
            setUserRole('teacher');
            // Clear any student progress when teacher logs in to avoid confusion
            setStudentName('');
            setAnswers({});
            localStorage.removeItem('surveyInProgress');
        }
    }, [studentName]);

    const handleLogout = useCallback(() => {
        setUserRole(null);
        setStudentName('');
        setViewingSubmission(null);
        setIsCompleted(false);
        setAnswers({});
        localStorage.removeItem('surveyInProgress'); // Clear auto-saved data on logout
    }, []);

    const renderContent = () => {
        if (!userRole) {
            return <Entry onSelectRole={handleLogin} />;
        }

        if (userRole === 'teacher') {
            if (viewingSubmission) {
                return (
                    <Results 
                        groupScores={viewingSubmission.groupScores}
                        onFinish={() => {}} // Not applicable for teacher view
                        onBackToDashboard={() => setViewingSubmission(null)}
                        studentName={viewingSubmission.studentName}
                    />
                );
            } else {
                return (
                    <TeacherDashboard 
                        submissions={submissions}
                        onSelectSubmission={setViewingSubmission}
                        onLogout={handleLogout}
                    />
                );
            }
        }

        if (userRole === 'student') {
            if (isCompleted) {
                return <Results groupScores={groupScoresForCurrentSurvey} onFinish={handleLogout} studentName={studentName} />;
            }
            return (
                <Survey 
                    questions={surveyQuestions}
                    answers={answers}
                    onAnswerChange={handleAnswerChange}
                    onSubmit={handleSubmit}
                />
            );
        }

        return null;
    };


    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
            <header className="bg-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-700">학교 생활 태도 설문</h1>
                        {userRole === 'student' && studentName ? (
                            <div className="flex items-center space-x-4">
                                <span className="font-medium text-slate-600 hidden sm:block">안녕하세요, {studentName}님</span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-bold text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-all duration-300"
                                    aria-label="Logout"
                                >
                                    로그아웃
                                </button>
                            </div>
                        ) : userRole === null && (
                            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                S
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                {renderContent()}
            </main>
            <footer className="text-center py-4 text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} 설문 앱. 모든 권리 보유.</p>
            </footer>
        </div>
    );
};

export default App;
