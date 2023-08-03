import React from 'react';

function ProductDetail() {
    return (
        <div className="border rounded-lg p-2 relative">
            <div className="flex flex-col text-sm gap-2">
                <div className="flex justify-center">
                    <div className="h-40 aspect-square overflow-hidden rounded-lg">
                        <img
                            className="h-full object-cover"
                            src="https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="quan-ao"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span>
                        Áo 2 dây HIPHOP Dirty Coin Áo 2 dây HIPHOP Dirty CoinÁo
                        2 dây HIPHOP Dirty Coin
                    </span>
                    <div className="flex justify-between">
                        <span>Rap Việt</span>
                        <span>15k lượt bán</span>
                    </div>
                    <span className="text-base">90.000đ</span>
                    <span className="text-pink-600">Tỷ lệ chiết khấu: 23%</span>
                    <span className="text-pink-600">
                        Số tiền chiết khấu: 20.000đ
                    </span>

                    <button className="p-1 bg-pink-600 text-white rounded-lg absolute bottom-2 right-2">
                        Mua ngay
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
