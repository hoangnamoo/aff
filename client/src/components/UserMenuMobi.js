import {
    faArrowRightFromBracket,
    faRectangleList,
    faSackDollar,
    faUser,
    faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/authSlice';

function UserMenuMobi({ isOpen }) {
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(authActions.logout());
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_info');
    };

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(`/${path}`);
    };
    const menuList = [
        {
            title: 'Rút tiền',
            path: 'withdraw',
            icon: (
                <FontAwesomeIcon
                    className="pointer-events-none"
                    icon={faSackDollar}
                />
            ),
        },
        {
            title: 'Đơn hàng',
            path: 'signup',
            icon: (
                <FontAwesomeIcon
                    className="pointer-events-none"
                    icon={faRectangleList}
                />
            ),
        },
        {
            title: 'Thông tin tài khoản',
            path: 'login',
            icon: (
                <FontAwesomeIcon
                    className="pointer-events-none"
                    icon={faUserGear}
                />
            ),
        },
    ];
    const { userInfo } = useSelector((state) => state.auth);
    return (
        isOpen && (
            <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full mt-[1px] right-0 bg-white w-full shadow-sm border px-4"
            >
                <div className=" flex justify-center items-center flex-col p-6 gap-3">
                    <div className="flex justify-center items-center">
                        {!userInfo.avatar && (
                            <div className=" flex justify-center items-center flex-col gap-2">
                                <div className="flex items-center justify-center bg-pink-200 text-2xl rounded-full h-16 aspect-square">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div>
                                    <span className="text-xl font-semibold">
                                        {userInfo.name ||
                                            `Người dùng ${userInfo.userId}`}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <span>{`Số dư: 8.080đ`}</span>
                        <span className="border"></span>
                        <span>{`Chờ duyệt: 999.080đ`}</span>
                    </div>
                </div>
                <div className="flex flex-col items-start w-full text-slate-800">
                    {menuList.map((el, index) => (
                        <div
                            onClick={() => handleNavigate(el.path)}
                            key={index}
                            className="flex gap-2 items-center px-2 p-3 cursor-pointer select-none"
                        >
                            <span className="w-5">{el.icon}</span>
                            <span>{el.title}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t w-full select-none">
                    <span
                        onClick={handleLogOut}
                        className="inline-flex gap-2 items-center cursor-pointer px-2 py-4 "
                    >
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        <span>Đăng xuất</span>
                    </span>
                </div>
            </div>
        )
    );
}

export default UserMenuMobi;
