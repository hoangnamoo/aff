import { faSpinner, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';

function LinkInput({ link, setLink, isLoading }) {
    const inputRef = useRef();
    let typingTimer;
    const delayActionTime = 500;
    const handleTypingDone = (e) => {
        clearTimeout(typingTimer);
        if (e.target.value) {
            typingTimer = setTimeout(() => {
                setLink(e.target.value.trim());
            }, delayActionTime);
        }
    };

    const handleClearInput = () => {
        setLink('');
        inputRef.current.value = '';
        inputRef.current.focus();
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <input
                    ref={inputRef}
                    onKeyUp={handleTypingDone}
                    className="h-full p-4 w-full rounded-lg bg-white shadow-lg outline-none focus-within:outline-none"
                    type="text"
                    placeholder="Nhập link sản phẩm"
                    autoFocus
                />
                {isLoading && (
                    <span className="absolute top-1/2 right-2 -translate-y-1/2">
                        <FontAwesomeIcon
                            icon={faSpinner}
                            className="animate-spin"
                        />
                    </span>
                )}
                {link && !isLoading && (
                    <FontAwesomeIcon
                        onClick={handleClearInput}
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
                        icon={faXmarkCircle}
                    />
                )}
            </div>
            <div className="flex justify-center items-center h-10">
                <span className="text-sm text-gray-500">Nền tảng hỗ trợ:</span>
                <div className="h-full flex gap-2">
                    <div className="h-full aspect-square overflow-auto">
                        <img
                            className="h-full object-cover"
                            src="/img/brand-logo/logo-shopee.png"
                            alt="shopee-logo"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LinkInput;
