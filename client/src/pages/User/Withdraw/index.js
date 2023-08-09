import React, { useState } from 'react';
import WithdrawStep1 from './WithdrawStep1';
import WithdrawStep2 from './WithdrawStep2';
import WithdrawHeader from './WithdrawHeader';

function Withdraw() {
    const [step, setStep] = useState(1);
    const [requestInfo, setRequestInfo] = useState({});
    return (
        <div className="h-[100dvh] flex flex-col justify-between relative">
            <WithdrawHeader />
            {step === 1 && (
                <WithdrawStep1
                    setStep={setStep}
                    setRequestInfo={setRequestInfo}
                />
            )}
            {step === 2 && (
                <WithdrawStep2 setStep={setStep} requestInfo={requestInfo} />
            )}
        </div>
    );
}

export default Withdraw;
