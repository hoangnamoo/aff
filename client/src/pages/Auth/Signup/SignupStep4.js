import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignupStep4() {
    const initTimeCounter = 10;
    const [time, setTime] = useState(initTimeCounter);

    const navigate = useNavigate();

    useEffect(() => {
        let timeCounter;
        timeCounter = setInterval(() => {
            if (time > 0) {
                setTime(time - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timeCounter);
        };
    });

    if (time === 0) navigate('/');
    return (
        <div className="flex w-full p-10 flex-col gap-8 select-none">
            <div className="flex flex-col gap-4">
                <span className="flex justify-center">
                    <FontAwesomeIcon
                        className="text-2xl p-4 rounded-lg border"
                        icon={faCheck}
                    />
                </span>
                <div className="flex flex-col gap-1 items-center">
                    <span className="font-semibold text-2xl">
                        Tạo tài khoản thành công
                    </span>
                    <span className="text-sm text-gray-400">
                        {` về Trang chủ sau ${time} giây`}
                    </span>
                </div>
            </div>
            <Link
                to="/"
                className="p-3 bg-pink-600 text-white rounded-lg text-center"
            >
                Lấy chiết khấu ngay thuii
            </Link>
        </div>
    );
}

export default SignupStep4;
