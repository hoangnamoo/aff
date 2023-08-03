import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import authApi from '../../../api/authApi';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { formatDuration } from 'date-fns';
import { vi } from 'date-fns/locale';
import handleEnter from '../../../utils/handerEnter';
import { Link } from 'react-router-dom';

let currentIndex = 0;
function SignupStep1({ setStep, userInput, setUserInput }) {
    const initTimeCounter = useRef(180);
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [otpIndex, setOtpIndex] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [outOfTime, setOutOfTime] = useState(false);
    const [time, setTime] = useState(initTimeCounter.current);

    const inputRef = useRef();

    useEffect(() => {
        let timeCounter;
        timeCounter = setInterval(() => {
            if (time > 0) {
                setTime(time - 1);
            }
            if (time <= 0) setOutOfTime(true);
        }, 1000);

        return () => {
            clearInterval(timeCounter);
        };
    });

    useEffect(() => {
        inputRef.current?.focus();
    }, [otpIndex]);

    const inputValid = otp.every((el) => el);
    const handleSubmit = async () => {
        if (inputValid) {
            setIsLoading(true);
            try {
                const res = await authApi.signUpStep2({
                    email: userInput.email,
                    OTPCode: otp.join(''),
                });
                if (`${res.status}`.startsWith('2')) {
                    setUserInput((prev) => ({
                        ...prev,
                        resetToken: res.data.resetToken,
                    }));
                    setStep(3);
                }
            } catch (error) {
                console.log(error);
                if (
                    error.response &&
                    `${error.response.status}`.startsWith('4')
                ) {
                    setErrorMsg(error.response.data.message);
                } else {
                    setErrorMsg(error.message);
                }
            }
            setIsLoading(false);
        }
    };

    const resendOTP = async () => {
        if (outOfTime) {
            try {
                const res = await authApi.signUpStep1({
                    email: userInput.email,
                });
                if (`${res.status}`.startsWith('2')) {
                    setOutOfTime(false);
                    setTime(initTimeCounter.current);
                }
            } catch (error) {
                console.log(error);
                if (
                    error.response &&
                    `${error.response.status}`.startsWith('4')
                ) {
                    setErrorMsg(error.response.data.message);
                } else {
                    setErrorMsg(error.message);
                }
            }
        }
    };

    const handleOnChange = (e) => {
        setErrorMsg('');
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
        <div
            onKeyDown={(e) => handleEnter(e, handleSubmit)}
            className="flex w-full p-6 flex-col gap-8"
        >
            <div className="flex flex-col gap-4">
                <span className="flex justify-center">
                    <FontAwesomeIcon
                        className="text-2xl p-4 rounded-lg border"
                        icon={faPaperPlane}
                    />
                </span>
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-2xl">
                        Xác thực email
                    </span>
                    <span className="text-sm text-gray-400">
                        Mã xác thực vừa được gửi tới email của bạn.
                    </span>
                </div>
            </div>
            <div>
                <div className="flex justify-between gap-2">
                    {otp.map((el, index) => (
                        <div key={index}>
                            <input
                                ref={index === otpIndex ? inputRef : null}
                                value={el}
                                onKeyDown={(e) => handleKeyDow(e, index)}
                                onChange={handleOnChange}
                                type="text"
                                className="h-16 w-full border rounded-lg appearance-none text-3xl text-center"
                            />
                        </div>
                    ))}
                </div>
                {errorMsg && (
                    <span className="text-red-500 text-sm">{errorMsg}</span>
                )}
            </div>

            {outOfTime ? (
                <div className="flex justify-center gap-2">
                    <span className="text-gray-400">
                        Bạn không nhận được email?
                    </span>
                    <button
                        onClick={resendOTP}
                        className="text-pink-700 underline"
                    >
                        Gửi lại
                    </button>
                </div>
            ) : (
                <div className="w-full text-center">
                    {`Thời gian xác thực: ${formatDuration(
                        {
                            seconds: time,
                        },
                        {
                            delimiter: ':',
                            locale: vi,
                            zero: true,
                        }
                    )}`}
                </div>
            )}

            <button
                disabled={!inputValid || isLoading}
                onClick={handleSubmit}
                className={`p-2 bg-pink-600 text-white rounded-lg ${
                    (!inputValid || isLoading) &&
                    'opacity-60 cursor-not-allowed'
                }`}
            >
                {isLoading ? (
                    <FontAwesomeIcon
                        className="animate-spin"
                        icon={faCircleNotch}
                    />
                ) : (
                    'Xác thực'
                )}
            </button>
            <div className="flex gap-1 justify-center">
                <span>Bạn đã có tài khoản?</span>
                <Link className="underline text-pink-700" to="/login">
                    Đăng nhập
                </Link>
            </div>
        </div>
    );
}

export default SignupStep1;
