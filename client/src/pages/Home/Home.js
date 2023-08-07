import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import LinkInput from './LinkInput';
import ProductCard from '../../components/ProductCard';
import generateLinkApi from '../../api/generateLinkApi';
import { useSelector } from 'react-redux';

function Home() {
    const [link, setLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [productInfo, setProductInfo] = useState({
        productInfo: {
            productName: 'Quan lot khe oke',
            shopName: 'Viet Pro',
            price: '99000',
            commission: '8000',
            imageUrl:
                'https://images.unsplash.com/photo-1636096625948-c1235f1b2e9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        },
        linkAffiliate: {
            shortLink: 'https://google.com.vn',
        },
    });
    const [errorMsg, setErrorMsg] = useState('');

    const authState = useSelector((state) => state.auth);

    const access_token = localStorage.getItem('access_token');

    // const handleGetShortLink = async (link, access_token) => {
    //     if (link) {
    //         setIsLoading(true);
    //         if (!access_token) {
    //             try {
    //                 const { data } = await generateLinkApi.getLinkEcomUnlogin({
    //                     link,
    //                 });
    //                 setProductInfo(data.data);
    //             } catch (error) {
    //                 setErrorMsg(
    //                     'Link không được hỗ trợ, Vui lòng kiểm tra lại.'
    //                 );
    //             }
    //         } else {
    //             try {
    //                 const res = await generateLinkApi.getLinkEcomlogedin({
    //                     link,
    //                 });
    //                 setProductInfo(res.data.data);
    //             } catch (error) {
    //                 setErrorMsg(
    //                     'Link không được hỗ trợ, Vui lòng kiểm tra lại.'
    //                 );
    //             }
    //         }
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     setProductInfo();
    //     setErrorMsg('');
    //     handleGetShortLink(link, access_token);
    // }, [link, access_token]);
    return (
        <div className="h-[100dvh] flex flex-col">
            <Header />
            <div
                className={`mt-16 p-2 flex flex-col gap-4 h-full ${
                    !link && 'mt-40'
                }`}
            >
                {!link && (
                    <div>
                        <p className="p-2 text-xl font-semibold text-center">
                            Thoả sức mua sắm hoàn tiền, chiết khấu cao, rút tiền
                            không giới hạn
                        </p>
                    </div>
                )}
                <LinkInput
                    link={link}
                    setLink={setLink}
                    isLoading={isLoading}
                />

                {errorMsg && (
                    <div className="text-center text-red-500 border border-red-500 p-2 rounded-lg border-dashed">
                        <span>{errorMsg}</span>
                    </div>
                )}

                {productInfo && (
                    <div className=" flex justify-center p-2">
                        {isLoading ? (
                            'Loading'
                        ) : (
                            <ProductCard
                                productInfo={productInfo.productInfo}
                                linkAff={productInfo.linkAffiliate}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
