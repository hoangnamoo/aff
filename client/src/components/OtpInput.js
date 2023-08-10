import React, { useEffect, useRef, useState } from 'react';
let currentIndex = 0;
function OtpInput({ otp, setOtp }) {
    const [otpIndex, setOtpIndex] = useState(0);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current?.focus();
    }, [otpIndex]);

    const handleOnChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (!otp.join('')) {
            setOtp((prev) => {
                prev.forEach((el, index) => {
                    prev[index] = value[index] || '';
                });
                return [...prev];
            });
            return setOtpIndex(value.length);
        }
        if (!value) {
            setOtpIndex(currentIndex - 1);
        } else {
            setOtpIndex(currentIndex + 1);
        }

        setOtp((prev) => {
            prev[currentIndex] = value.substring(value.length - 1);
            return [...prev];
        });
    };

    const handleKeyDow = (e, index) => {
        const includeKey = [8, 9, 86, 91, 39, 37];
        currentIndex = index;
        if (isNaN(e.key * 1) && !includeKey.includes(e.keyCode)) {
            return e.preventDefault();
        }
        if ('Backspace'.includes(e.key)) {
            setOtp((prev) => {
                prev[currentIndex] = '';
                return [...prev];
            });
            setOtpIndex(currentIndex - 1);
        }
        if ('Tab'.includes(e.key)) {
            e.preventDefault();
            setOtpIndex(currentIndex + 1);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between gap-2">
                {otp.map((el, index) => (
                    <div key={index}>
                        <input
                            onKeyDown={(e) => handleKeyDow(e, index)}
                            onChange={handleOnChange}
                            ref={index === otpIndex ? inputRef : null}
                            value={el}
                            type="text"
                            className="h-16 w-full border rounded-lg appearance-none text-3xl text-center"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OtpInput;
