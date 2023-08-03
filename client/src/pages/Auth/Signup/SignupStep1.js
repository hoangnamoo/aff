import { faAt, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import authApi from '../../../api/authApi';
import { Link } from 'react-router-dom';
import handleEnter from '../../../utils/handerEnter';

function SignupStep1({ setStep, setUserInput, userInput }) {
    // const [input, setInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const inputValid = isEmail(userInput.email);

    const handleSubmit = async () => {
        if (inputValid) {
            setIsLoading(true);
            try {
                const res = await authApi.signUpStep1({
                    email: userInput.email,
                });
                if (`${res.status}`.startsWith('2')) setStep(2);
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
        setUserInput((prev) => ({ ...prev, email: e.target.value }));
        setErrorMsg('');
    };

    return (
        <div
            onKeyDown={(e) => handleEnter(e, handleSubmit)}
            className="flex w-full p-10 flex-col gap-8"
        >
            <div className="flex flex-col gap-4">
                <span className="flex justify-center">
                    <FontAwesomeIcon
                        className="text-2xl p-4 rounded-lg border"
                        icon={faAt}
                    />
                </span>
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-2xl">
                        Tạo tài khoản
                    </span>
                    <span className="text-sm text-gray-400">
                        Nhận mọi chiết khấu từ chietkhau.pro
                    </span>
                </div>
            </div>

            <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                    onChange={handleInput}
                    value={userInput.email}
                    className="p-3 border rounded-lg"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Nhập email của bạn"
                />
                {errorMsg && (
                    <span className="text-sm text-red-500">{errorMsg}</span>
                )}
            </div>

            <button
                disabled={!inputValid || isLoading}
                onClick={handleSubmit}
                className={`p-3 bg-pink-600 text-white rounded-lg ${
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

export default SignupStep1;
