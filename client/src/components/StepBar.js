import React from 'react';

function StepBar({ stepNumber, stepIndex }) {
    const stepList = new Array(stepNumber).fill('');
    return (
        <div className="flex justify-between gap-2 w-full">
            {stepList.map((el, index) => (
                <span
                    className={`${
                        index + 1 === stepIndex ? 'bg-pink-700' : 'bg-pink-200'
                    } w-full block p-1 rounded-lg`}
                    key={index}
                ></span>
            ))}
        </div>
    );
}

export default StepBar;
