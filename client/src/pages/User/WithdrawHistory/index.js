import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import UserHeader from '../UserComponents/UserHeader';
import UserTab from '../UserComponents/UserTab';

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

    return (
        <div className="h-[100dvh] flex flex-col">
            <UserHeader>Lịch sử rút tiền</UserHeader>
            <div className="flex flex-col flex-1 gap-1 overflow-auto select-none">
                <UserTab tab={tab} setTab={setTab} />

                <div className="flex justify-end px-2">
                    <span className="px-2 py-1 border rounded-lg bg-white text-sm">
                        Thời gian
                    </span>
                </div>
                <div className="flex-1 overflow-auto text-sm">
                    <div className="flex justify-between items-center p-2 border-b first:border-t select-none bg-white">
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
