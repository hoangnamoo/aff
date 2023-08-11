import React from 'react';

function OrderDetail({ setIsOpen }) {
    return (
        <div
            className={`absolute bg-white w-full bottom-0 top-8 rounded-t-3xl animate-slideUp`}
        >
            <div className="flex flex-col p-2 h-full">
                <div className="flex flex-col justify-center items-center">
                    <div className="w-16">
                        <img
                            src="https://classic.vn/wp-content/uploads/2022/04/logo-shopee.png"
                            alt="shopee-logo"
                        />
                    </div>
                    <span className="font-semibold">Đơn hàng Shopee</span>
                    <span className="text-xs px-1 py-[2px] rounded-lg bg-green-100 text-green-600">
                        Hoàn thành
                    </span>
                </div>
                <div className="text-sm">
                    <div className="flex justify-between p-1">
                        <span>Mã đơn hàng</span>
                        <span>#SPX456465456</span>
                    </div>
                    <div className="flex justify-between p-1">
                        <span>Giá trị đơn hàng</span>
                        <span>99.000đ</span>
                    </div>
                    <div className="flex justify-between p-1">
                        <span>Hoàn tiền</span>
                        <span className="text-pink-600 font-semibold">
                            9.000đ
                        </span>
                    </div>
                    <div className="flex justify-between p-1">
                        <span>Mua hàng</span>
                        <span>20/08/2023 20:23:20</span>
                    </div>
                    <div className="flex justify-between p-1">
                        <span>Ghi nhận giao dịch</span>
                        <span>21/08/2023 08:23:20</span>
                    </div>
                    <div className="flex justify-between p-1">
                        <span>Thời gian hoàn tiền</span>
                        <span>12/09/2023</span>
                    </div>
                </div>
                <div className="text-sm border-t p-1 w-full flex-1 overflow-auto">
                    <div>Danh sách sản phẩm</div>
                    <div className="flex-1 flex flex-col gap-1">
                        <div className="border p-1 flex gap-2 justify-between w-full overflow-auto">
                            <div className="h-16 aspect-square">
                                <img
                                    src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1305&q=80"
                                    alt="prduct"
                                    className="object-cover h-full w-full overflow-hidden"
                                />
                            </div>
                            <div className="flex flex-col flex-1 gap-1 items-center">
                                <div className="flex gap-1 justify-between w-full">
                                    <span className="overflow-hidden text-ellipsis line-clamp-2">
                                        Quần thể thao nam Quần thể thao nam Quần
                                        Quần thể thao nam Quần thể thao nam Quần
                                    </span>
                                    <span>99.000đ</span>
                                </div>
                                <div className="flex gap-1 justify-between w-full">
                                    <span>Coolmate VN</span>
                                    <span>số lượng: 1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-1 flex justify-between gap-2 text-sm">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="flex-1 border px-1 py-2 rounded-lg bg-pink-600 text-white"
                    >
                        Đóng
                    </button>
                    <button className="flex-1 border px-1 py-2 rounded-lg">
                        Trợ giúp
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
