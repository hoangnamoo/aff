import React, { useState } from 'react';
import UserHeader from '../UserComponents/UserHeader';
import UserTab from '../UserComponents/UserTab';
import Modal from '../../../components/Modal';
import OrderDetail from './OrderDetail';

function Order() {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleOpenModal = () => {
        setIsOpen(true);
    };
    return (
        <div className="h-[100dvh] flex flex-col">
            <UserHeader>Đơn hàng</UserHeader>
            <div className="flex-1 flex flex-col gap-1 overflow-auto">
                <UserTab tab={tab} setTab={setTab} />
                <div className="flex justify-end px-2">
                    <span className="px-2 py-1 bg-white rounded-lg border text-sm">
                        Thời gian
                    </span>
                </div>
                <div className="overflow-auto">
                    <div
                        onClick={handleOpenModal}
                        className="flex justify-between items-center p-2 border-b first:border-t select-none bg-white"
                    >
                        <div className="flex justify-center items-center gap-2">
                            <div className="h-12 aspect-square overflow-hidden">
                                <img
                                    className="h-full w-full object-cover"
                                    src="https://classic.vn/wp-content/uploads/2022/04/logo-shopee.png"
                                    alt="order-logo"
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <span className="font-semibold text-sm">
                                    #SPX456465456
                                </span>
                                <span className="text-xs text-gray-500">
                                    Giá trị đơn: 2.000.000đ
                                </span>
                                <span className="text-xs text-gray-500">
                                    11/08/2023 20:11:20
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold text-sm">+999.000đ</p>
                            <div className="flex justify-end">
                                <span className="px-1 bg-orange-100 text-xs text-orange-500 rounded-lg">
                                    Đang xử lý
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen}>
                <OrderDetail isOpen={isOpen} setIsOpen={setIsOpen} />
            </Modal>
        </div>
    );
}

export default Order;
