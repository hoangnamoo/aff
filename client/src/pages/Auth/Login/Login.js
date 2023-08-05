import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import {
    faArrowRightToBracket,
    faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import authApi from '../../../api/authApi';
import AuthHeader from '../../../components/AuthHeader';

function Login() {
    const navigate = useNavigate();
    const [eye, setEye] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState({
        email: {
            name: 'email',
            type: 'text',
            placeholder: 'Email',
            validate: true,
            value: '',
            msg: 'Vui lòng nhập địa chỉ email. Ví dụ: vidu@example.com',
        },
        password: {
            name: 'password',
            type: 'password',
            placeholder: 'Mật khẩu',
            validate: true,
            value: '',
            msg: 'Mật khẩu không thể bỏ trống',
        },
    });

    const handleInput = (e) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: {
                ...prev[e.target.name],
                value: e.target.value.trim(),
                validate: true,
            },
        }));
    };

    const validator = (value, type) => {
        switch (type) {
            case 'email':
                return isEmail(value);
            case 'password':
                return value.trim().length > 0;
            default:
                break;
        }
    };

    const handleBlur = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput((prev) => ({
            ...prev,
            [name]: { ...prev[name], validate: validator(value, name) },
        }));
    };

    const handleOpenEye = () => {
        setEye((prev) => !prev);
    };

    const handleSubmit = async () => {
        if (validateAll) {
            setIsLoading(true);
            try {
                const res = await authApi.login({
                    email: input.email.value,
                    password: input.password.value,
                });
                localStorage.setItem('access_token', res.data.token);
                navigate('/');
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

    const handleEnter = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    const validateAll = Object.keys(input).every((el) =>
        validator(input[el].value, el)
    );

    useEffect(() => {
        setInput((prev) => ({
            ...prev,
            password: {
                ...prev.password,
                type: eye ? 'text' : 'password',
            },
        }));
    }, [eye]);

    return (
        <div
            onKeyDown={handleEnter}
            className="h-[100dvh]  flex flex-col items-center justify-between"
        >
            <div className="w-full px-10 h-10 flex items-end">
                <AuthHeader />
            </div>
            <div className="flex w-full p-10 flex-col gap-8 select-none">
                <div className="flex flex-col gap-4">
                    <span className="flex justify-center">
                        <FontAwesomeIcon
                            className="text-2xl p-4 rounded-lg border"
                            icon={faArrowRightToBracket}
                        />
                    </span>
                    <span className="text-2xl font-semibold">Đăng nhập</span>
                </div>
                {errorMsg && (
                    <div className="flex justify-center border border-red-500 p-2 text-red-500">
                        <span>{errorMsg}</span>
                    </div>
                )}
                <div className="flex flex-col gap-4">
                    {Object.keys(input).map((el, index) => (
                        <div key={index} className="relative">
                            <input
                                className={`p-3 rounded-lg w-full ${
                                    input[el].validate
                                        ? 'border'
                                        : 'border border-red-500'
                                } `}
                                type={input[el].type}
                                name={input[el].name}
                                placeholder={input[el].placeholder}
                                onChange={handleInput}
                                onBlur={handleBlur}
                            />
                            {el === 'password' && input[el].value && (
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
                            )}
                            {!input[el].validate && (
                                <span className="text-sm text-red-500">
                                    {input[el].msg}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex justify-end">
                        <Link
                            to="forgot-password"
                            className="text-sm text-pink-800"
                        >
                            Quên mật khẩu
                        </Link>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={!validateAll}
                        className={`p-3 bg-pink-600 text-white rounded-lg ${
                            !validateAll && 'opacity-60 cursor-not-allowed'
                        }`}
                    >
                        {isLoading ? (
                            <FontAwesomeIcon
                                className="animate-spin"
                                icon={faCircleNotch}
                            />
                        ) : (
                            'Đăng nhập'
                        )}
                    </button>
                </div>
                <div className="flex justify-center gap-1">
                    <span>Bạn chưa có tài khoản?</span>{' '}
                    <Link to="/signup" className="text-pink-600 underline">
                        Đăng ký
                    </Link>
                </div>
            </div>
            <div className="w-full px-10 h-10 flex items-end"></div>
        </div>
    );
}
export default Login;

Login.loader = () => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) return redirect('/');
    return null;
};
