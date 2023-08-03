import React, { useState } from 'react';
import SignupStep1 from './SignupStep1';
import SignupStep2 from './SignupStep2';
import SignupStep3 from './SignupStep3';
import SignupStep4 from './SignupStep4';
import SignupHeader from './SignupHeader';
import StepBar from '../../../components/StepBar';

function Signup() {
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
        resetTolen: '',
    });

    const [step, setStep] = useState(1);
    return (
        <div className="h-screen flex flex-col items-center justify-between">
            <div className="w-full px-10 h-10 flex items-end">
                <SignupHeader />
            </div>
            {step === 1 && (
                <SignupStep1
                    setStep={setStep}
                    userInput={userInput}
                    setUserInput={setUserInput}
                />
            )}
            {step === 2 && (
                <SignupStep2
                    setStep={setStep}
                    userInput={userInput}
                    setUserInput={setUserInput}
                />
            )}
            {step === 3 && (
                <SignupStep3
                    setStep={setStep}
                    userInput={userInput}
                    setUserInput={setUserInput}
                />
            )}
            {step === 4 && <SignupStep4 />}
            {step < 4 ? (
                <div className="w-full px-10 h-10">
                    <StepBar stepNumber={3} stepIndex={step} />
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default Signup;
