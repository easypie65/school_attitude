
import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;

    return (
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6 shadow-inner overflow-hidden">
            <div
                className="bg-indigo-500 h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
            ></div>
             <span className="absolute w-full text-center text-xs font-semibold text-white top-0 left-0 leading-4">{Math.round(percentage)}%</span>
        </div>
    );
};

export default ProgressBar;
