import { faBars, faPercent, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserMenuMobi from './UserMenuMobi';

function Header() {
    const { isLogined, userInfo } = useSelector((state) => state.auth);
    const [openMobiMenu, setOpenMobiMenu] = useState(false);
    const handeOpenMobiMenu = () => {
        setOpenMobiMenu((prev) => !prev);
    };

    const handeBlurMobiMenu = () => {
        setOpenMobiMenu(false);
    };

    return (
        <div className="h-16 fixed top-0 w-full flex items-center justify-between p-2 border-b shadow-sm bg-white z-10">
            <div className="h-full flex gap-2 items-center font-semibold">
                <span className="text-2xl">
                    <FontAwesomeIcon icon={faBars} />
                </span>
                <span>
                    CH
                    <FontAwesomeIcon
                        className="text-pink-600"
                        icon={faPercent}
                    />
                    ETKHAU.pro
                </span>
            </div>
            <div className="h-2/3">
                {isLogined && (
                    <div
                        tabIndex={1}
                        onClick={handeOpenMobiMenu}
                        onBlur={handeBlurMobiMenu}
                        className="rounded-full h-full overflow-hidden aspect-square flex items-center justify-center hover:border border-pink-400"
                    >
                        {userInfo.avatar && (
                            <img
                                className="object-cover h-full"
                                src={`${process.env.REACT_APP_API_PUBLIC_URL}/img/users/${userInfo.avatar}}`}
                                alt="user-avatar"
                            />
                        )}
                        {!userInfo.avatar && (
                            <span className="flex justify-center items-center bg-pink-200 w-full h-full">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        )}
                        <UserMenuMobi isOpen={openMobiMenu} />
                    </div>
                )}
                {!isLogined && (
                    <div className="flex items-center w-full h-full bg-slate-950 py-4 px-2 text-white rounded-lg">
                        <Link to="/login">Đăng nhập</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
