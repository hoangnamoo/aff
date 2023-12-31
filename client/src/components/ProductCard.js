import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProductCard({ productInfo, linkAff }) {
    const { isLogined } = useSelector((state) => state.auth);
    const { productName, shopName, price, commission, imageUrl } = productInfo;
    const userRatio = (commission / price).toFixed(2);
    return (
        <div className="flex flex-col text-xs gap-1 relative w-52 bg-white shadow-md rounded-lg">
            <div className="flex justify-center">
                <div className="h-52 aspect-square overflow-hidden rounded-lg">
                    <img
                        className="h-full w-full object-cover"
                        src={imageUrl}
                        alt="quan-ao"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1 p-1">
                <span className="overflow-hidden text-ellipsis line-clamp-2">
                    {productName}
                </span>
                <div className="flex justify-between">
                    <span className="overflow-hidden text-ellipsis line-clamp-1">
                        {shopName}
                    </span>
                    <span className="whitespace-nowrap">15k lượt bán</span>
                </div>
                <span className="text-sm">{price}</span>
                <span className="text-pink-600">{`Tỷ lệ chiết khấu: ${userRatio}`}</span>
                <span className="text-pink-600">{`Hoàn tiền: ${commission}`}</span>
            </div>
            <Link
                target={isLogined ? '_blank' : '_self'}
                to={!isLogined ? '/login' : linkAff.shortLink}
                className="p-1 bg-pink-600 text-white rounded-lg absolute bottom-2 right-2"
            >
                Mua ngay
            </Link>
        </div>
    );
}

export default ProductCard;
