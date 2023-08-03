import {
    faCheckCircle,
    faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import authApi from '../../../api/authApi';
import {
    faEye,
    faEyeSlash,
    faKeyboard,
} from '@fortawesome/free-regular-svg-icons';
import handleEnter from '../../../utils/handerEnter';
import { Link } from 'react-router-dom';

function SignupStep3({ setStep, setUserInput, userInput }) {
    // const [input, setInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [eye, setEye] = useState(false);

    const inputValid = userInput.password.length >= 8;

    const handleSubmit = async () => {
        if (inputValid) {
            setIsLoading(true);
            try {
                const res = await authApi.signUpStep3({
                    email: userInput.email,
                    password: userInput.password,
                    resetToken: userInput.resetToken,
                });
                localStorage.setItem('access_token', res.data.token);
                if (`${res.status}`.startsWith('2')) setStep(4);
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

    const handleInput = (e) => {
        setUserInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrorMsg('');
    };

    const handleOpenEye = () => {
        setEye((prev) => !prev);
    };

    return (
        <div
            onKeyDown={(e) => handleEnter(e, handleSubmit)}
            className="flex w-full p-10 flex-col gap-8 select-none"
        >
            <div className="flex flex-col gap-4">
                <span className="flex justify-center">
                    <FontAwesomeIcon
                        className="text-2xl p-4 rounded-lg border"
                        icon={faKeyboard}
                    />
                </span>
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-2xl">
                        Cập nhật mật khẩu
                    </span>
                    <span className="text-sm text-gray-400">
                        Chỉ còn bước cuối cùng là hoàn thành rùi.
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password">Mật khẩu mới</label>
                <div className="relative">
                    <input
                        onChange={handleInput}
                        value={userInput.password}
                        className="p-3 border rounded-lg w-full"
                        type={eye ? 'text' : 'password'}
                        name="password"
                        id="password"
                        placeholder="**********"
                    />
                    <span
                        onClick={handleOpenEye}
                        className="absolute top-1/2 -translate-y-1/2 right-2"
                    >
                        {eye ? (
                            <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                            <FontAwesomeIcon icon={faEye} />
                        )}
                    </span>
                </div>

                <span className="text-sm">
                    *Tối thiểu 8 ký tự{' '}
                    <FontAwesomeIcon
                        className={`text-xs text-green-600 ${
                            !inputValid && 'hidden'
                        }`}
                        icon={faCheckCircle}
                    />
                </span>

                {errorMsg && (
                    <span className="text-sm text-red-500">{errorMsg}</span>
                )}
            </div>

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
                    'Tạo tài khoản'
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

export default SignupStep3;
