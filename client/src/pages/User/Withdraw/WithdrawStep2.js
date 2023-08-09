import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import OtpInput from '../../../components/OtpInput';
import { useSelector } from 'react-redux';
import hideStringEmail from '../../../utils/hideStringEmail';

function WithdrawStep2({ requestInfo }) {
    const { userInfo } = useSelector((state) => state.auth);
    return (
        <div className="h-full flex flex-col justify-between">
            <div></div>
            <div className="flex flex-col justify-center items-center">
                <div className="p-4 flex flex-col   w-full">
                    <div className="px-4 py-6 w-full bg-pink-100 text-pink-700 text-sm rounded-lg">
                        <div className="p-2 border-b border-dashed border-pink-600 flex justify-between items-center">
                            Thông tin giao dịch
                        </div>
                        <div className="p-2 border-b border-dashed border-pink-600 flex justify-between items-center">
                            <span>Số tiền:</span>
                            <span>{requestInfo.amount.value}</span>
                        </div>
                        <div className="p-2 border-b border-dashed border-pink-600 flex justify-between items-center">
                            <span>Ngân hàng:</span>
                            <span>
                                {requestInfo.bank
                                    ? requestInfo.bank.value.label
                                    : ''}
                            </span>
                        </div>
                        <div className="p-2 border-b border-dashed border-pink-600 flex justify-between items-center">
                            <span>Chủ tài khoản:</span>
                            <span>{requestInfo.accountName.value}</span>
                        </div>
                        <div className="p-2 border-b border-dashed border-pink-600 flex justify-between items-center">
                            <span>Số tài khoản:</span>
                            <span>{requestInfo.accountNumber.value}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                    <span className="flex justify-center items-center">
                        <FontAwesomeIcon
                            className="border p-4 text-2xl rounded-lg"
                            icon={faPaperPlane}
                        />
                    </span>
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <span className="text-2xl font-semibold">
                            Xác thực rút tiền
                        </span>
                        <span className="text-sm text-gray-400">
                            {`Mã xác thực đã được gửi email  ${hideStringEmail(
                                userInfo.email,
                                5
                            )}`}
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <OtpInput />
                </div>
            </div>
            <div className="flex justify-center p-4">
                <button className="p-3 bg-pink-600 text-white w-full rounded-lg">
                    Xác nhận
                </button>
            </div>
        </div>
    );
}

export default WithdrawStep2;
