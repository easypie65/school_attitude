import React, { useState } from 'react';

interface EntryProps {
    onSelectRole: (role: 'student' | 'teacher', name?: string) => void;
}

const Entry: React.FC<EntryProps> = ({ onSelectRole }) => {
    const [studentName, setStudentName] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [teacherPassword, setTeacherPassword] = useState('');

    const handleTeacherLoginClick = () => {
        setShowPasswordInput(true);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (teacherPassword === '8808935') {
            onSelectRole('teacher');
        } else {
            alert('비밀번호가 올바르지 않습니다.');
            setTeacherPassword('');
        }
    };

    const handleStudentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedName = studentName.trim();
        if (trimmedName) {
            onSelectRole('student', trimmedName);
        } else {
            alert("이름을 입력해야 설문을 시작할 수 있습니다.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto text-center animate-fade-in py-16">
            <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-200">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6">
                    S
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4">학교 생활 태도 설문</h1>
                <p className="text-slate-600 mb-10 text-lg">설문을 시작하려면 이름을 입력하고 역할을 선택하세요.</p>
                
                <form onSubmit={handleStudentSubmit} className="space-y-4 mb-6">
                    <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="여기에 이름을 입력하세요"
                        className="w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                        aria-label="Student Name"
                    />
                    <button
                        type="submit"
                        disabled={!studentName.trim()}
                        className="w-full px-8 py-4 text-lg font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        학생으로 설문 시작
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <hr className="flex-grow border-t border-slate-300"/>
                    <span className="px-4 text-slate-500 font-semibold">또는</span>
                    <hr className="flex-grow border-t border-slate-300"/>
                </div>

                {!showPasswordInput ? (
                    <button
                        onClick={handleTeacherLoginClick}
                        className="w-full px-8 py-4 text-lg font-bold text-indigo-600 bg-white border-2 border-indigo-600 rounded-lg shadow-md hover:bg-indigo-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        교사로 로그인
                    </button>
                ) : (
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                         <input
                            type="password"
                            value={teacherPassword}
                            onChange={(e) => setTeacherPassword(e.target.value)}
                            placeholder="교사 비밀번호를 입력하세요"
                            className="w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                            aria-label="Teacher Password"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="w-full px-8 py-4 text-lg font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            확인
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Entry;