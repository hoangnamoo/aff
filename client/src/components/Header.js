import { faBars, faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Header() {
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
                <div className="rounded-full h-full overflow-hidden  aspect-square">
                    <img
                        className="object-cover h-full"
                        src="https://images.pexels.com/photos/6897439/pexels-photo-6897439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="user-avatar"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
