import {
    faArrowRightFromBracket,
    faBox,
    faMoneyBillTransfer,
    faSackDollar,
    faUser,
    faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '../store/authSlice';

function UserMenuMobi({ isOpen }) {
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(authActions.logout());
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_info');
    };
    const menuList = [
        {
            title: 'Thanh toán',
            type: 'nomal',
            path: '/',
            icon: <FontAwesomeIcon icon={faSackDollar} />,
        },
        {
            title: 'Đơn hàng',
            path: '/',
            icon: <FontAwesomeIcon icon={faBox} />,
        },
        {
            title: 'Lịch sử giao dịch',
            path: '/',
            icon: <FontAwesomeIcon icon={faMoneyBillTransfer} />,
        },
        {
            title: 'Thông tin tài khoản',
            path: '/',
            icon: <FontAwesomeIcon icon={faUserGear} />,
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
                <ul className="flex flex-col items-start gap-1 w-full text-slate-800">
                    {menuList.map((el, index) => (
                        <li
                            key={index}
                            className="flex gap-2 items-center px-2 p-3"
                        >
                            <span className="w-4">{el.icon}</span>
                            <Link to={el.path}>{el.title}</Link>
                        </li>
                    ))}
                </ul>
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
