import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function UserHeader({ children }) {
    return (
        <div>
            <div className="p-4 bg-slate-900 text-white font-semibold flex justify-center items-center relative">
                <span className="text-center">{children}</span>
                <Link
                    to={'/'}
                    className="absolute right-4 flex justify-center items-center top-1/2 -translate-y-1/2"
                >
                    <FontAwesomeIcon icon={faHome} />
                </Link>
            </div>
        </div>
    );
}

export default UserHeader;
