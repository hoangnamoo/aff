import { faHelmetSafety, faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function SignupHeader() {
    return (
        <div className="flex justify-between w-full">
            <div>
                <div>
                    <span className="font-semibold">
                        CH
                        <FontAwesomeIcon
                            className="text-pink-700"
                            icon={faPercent}
                        />
                        ETKHAU.pro
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SignupHeader;
