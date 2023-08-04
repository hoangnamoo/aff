import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function AuthHeader() {
    return (
        <div className="flex justify-between w-full">
            <div>
                <div>
                    <Link to={'/'} className="font-semibold">
                        CH
                        <FontAwesomeIcon
                            className="text-pink-700"
                            icon={faPercent}
                        />
                        ETKHAU.pro
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AuthHeader;
