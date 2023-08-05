import { faBars, faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const user_info = localStorage.getItem('user_info');
    return (
        <div className="h-16 fixed top-0 w-full flex items-center justify-between p-2 border-b shadow-sm bg-white">
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
            <div className="h-3/4">
                {user_info ? (
                    <div className="rounded-full h-full overflow-hidden  aspect-square">
                        <img
                            className="object-cover h-full"
                            src={`${
                                process.env.REACT_APP_API_PUBLIC_URL
                            }/img/users/${JSON.parse(user_info).avatar}`}
                            alt="user-avatar"
                        />
                    </div>
                ) : (
                    <div className="flex items-center w-full h-full">
                        <Link to="/login">Đăng nhập</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
