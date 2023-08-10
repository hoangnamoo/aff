import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function WithdrawHistory() {
    const [tab, setTab] = useState([
        {
            name: 'Tất cả',
            status: 'all',
            active: true,
        },

        {
            name: 'Đang xử lý',
            status: 'pending',
            active: false,
        },
        {
            name: 'Hoàn thành',
            status: 'completed',
            active: false,
        },
        {
            name: 'Đã huỷ',
            status: 'cancelled',
            active: false,
        },
    ]);

    const handleSelectTab = (value) => {
        setTab((prev) =>
            prev.map((el) => ({ ...el, active: el.status === value }))
        );
    };
    return (
        <div className="h-[100dvh] flex flex-col">
            <div className="p-4 bg-slate-900 text-white font-semibold flex justify-center items-center relative">
                <span className="text-center">Lịch sử rút tiền</span>
                <Link
                    to={'/'}
                    className="absolute right-4 flex justify-center items-center top-1/2 -translate-y-1/2"
                >
                    <FontAwesomeIcon icon={faHome} />
                </Link>
            </div>
            <div className="flex flex-col flex-1 gap-1 overflow-auto">
                <div className="flex justify-between bg-white text-sm text-center">
                    {tab.map((el) => (
                        <span
                            onClick={() => handleSelectTab(el.status)}
                            className={`px-2 py-2 flex-1 hover:bg-slate-200 ${
                                el.active && 'border-b-4 border-pink-500'
                            }`}
                            key={el.name}
                        >
                            {el.name}
                        </span>
                    ))}
                </div>

                <div className="flex justify-end px-2">
                    <span className="px-2 py-1 border rounded-lg bg-white text-sm">
                        Thời gian
                    </span>
                </div>
                <div className="flex-1 overflow-auto text-sm">
                    <div className="flex justify-between items-center p-2 border-b first:border-t select-none">
                        <div className="flex justify-center items-center gap-2">
                            <div className="flex justify-center items-center">
                                <FontAwesomeIcon
                                    className="text-green-500 text-xl p-3"
                                    icon={faArrowUp}
                                />
                            </div>

                            <div className="flex flex-col items-start justify-center">
                                <span className="font-semibold">Rút tiền</span>
                                <span className="text-xs text-gray-500">
                                    11/08/2023 20:11:20
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold">999.999.000đ</p>
                            <div className="flex justify-end">
                                <span className="px-1 bg-orange-100 text-xs text-orange-500 rounded-lg">
                                    Đang xử lý
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WithdrawHistory;
