import {
    faArrowLeft,
    faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function WithdrawHeader() {
    return (
        <div className="flex absolute w-full justify-between items-center p-4 bg-slate-900 text-white font-semibold">
            <Link
                to={'/'}
                className="flex items-center justify-center rounded-full w-10 aspect-square hover:bg-white hover:text-slate-900"
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <span>Rút tiền</span>
            <Link
                to={'/'}
                className="flex items-center justify-center rounded-full w-10 aspect-square hover:bg-white hover:text-slate-900"
            >
                <FontAwesomeIcon icon={faClockRotateLeft} />
            </Link>
        </div>
    );
}

export default WithdrawHeader;
