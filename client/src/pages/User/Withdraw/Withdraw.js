import {
    faArrowLeft,
    faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

function Withdraw() {
    const cash = 999999;
    const cashConvert = new Intl.NumberFormat();

    const [input, setInput] = useState({
        bank: {
            value: null,
            validate: true,
            exclude: true,
        },
        amount: {
            name: 'amount',
            type: 'number',
            placeholder: 'Số tiền rút',
            validate: true,
            value: '',
            msg: 'Vui lòng nhập số tiền cần rút.',
        },
        accountName: {
            name: 'accountName',
            type: 'text',
            placeholder: 'Chủ tài khoản',
            validate: true,
            value: '',
            msg: 'Vui lòng nhập tên Chủ tài khoản.',
        },
        accountNumber: {
            name: 'accountNumber',
            type: 'number',
            placeholder: 'Số tài khoản',
            validate: true,
            value: '',
            msg: 'Vui lòng nhập số tài khoản.',
        },
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput((prev) => ({
            ...prev,
            [e.target.name]: { ...prev[name], value, validate: true },
        }));
    };

    const handleBlur = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput((prev) => ({
            ...prev,
            [e.target.name]: { ...prev[name], validate: value.trim() > 0 },
        }));
    };

    const handleSelect = (value) => {
        setInput((prev) => ({
            ...prev,
            bank: { ...prev.bank, value },
        }));
    };

    const bankList = [
        {
            value: 'TPB',
            label: 'Ngân hàng Tiên Phong',
        },
        {
            value: 'TCB',
            label: 'Ngân hàng Thương Kỹ',
        },
        {
            value: 'VCB',
            label: 'Ngân hàng Ngoại Thương Việt Nam',
        },
    ];

    console.log(input);
    return (
        <div className="h-[100dvh] flex flex-col justify-between">
            <div className="flex justify-between items-center p-4 bg-slate-900 text-white font-semibold">
                <Link
                    to={'/'}
                    className="flex items-center justify-center rounded-full w-10 aspect-square hover:bg-white hover:text-slate-900"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <span>Rút tiền</span>
                <Link
                    to={'/'}
                    className="flex items-center justify-center rounded-full w-10 aspect-square hover:bg-white hover:text-slate-900"
                >
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                </Link>
            </div>
            <div>
                <div className="flex flex-col items-center justify-start flex-1 text-slate-900">
                    <span className="p-4 text-2xl font-semibold flex justify-center items-center gap-1">
                        {`${cashConvert.format(cash)}`}
                        <span className="text-base flex items-end">đ</span>
                    </span>
                </div>
                <div className="p-4 relative flex flex-col gap-6">
                    {Object.keys(input).map((el, index) =>
                        !input[el].exclude ? (
                            <div key={index} className={`h-11 border`}>
                                <input
                                    onBlur={handleBlur}
                                    value={input[el].value}
                                    onChange={handleInput}
                                    name={input[el].name}
                                    type={input[el].type}
                                    placeholder={input[el].placeholder}
                                    className={`p-2 w-full h-full rounded-lg border  ${
                                        !input[el].validate && 'border-red-500'
                                    }`}
                                />
                                {!input[el].validate && (
                                    <span className="text-sm text-red-500">
                                        {input[el].msg}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div key={index} className="h-11">
                                <Select
                                    value={input.bank.value}
                                    onChange={handleSelect}
                                    options={bankList}
                                    isClearable
                                    components={{
                                        IndicatorSeparator: false,
                                    }}
                                    placeholder="Tên ngân hàng"
                                    styles={{
                                        control: (baseStyle, state) => ({
                                            ...baseStyle,
                                            padding: '4px',
                                            borderRadius: 8,
                                            height: 44,
                                            borderWidth: 1,
                                            borderColor: '#e5e7eb',
                                        }),
                                    }}
                                />
                            </div>
                        )
                    )}
                </div>
                <div className="p-4">
                    <div className="bg-pink-100 rounded-lg p-4 text-pink-500 flex flex-col gap-2 text-sm">
                        <div className="flex justify-between items-center">
                            <span>Thời gian xử lý:</span> <span>1-2 ngày</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Số tiền rút tối thiểu:</span>
                            <span>Bao nhiêu cũng được</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center p-4">
                <button className="p-3 w-full bg-pink-600 text-white rounded-lg">
                    Tiếp theo
                </button>
            </div>
        </div>
    );
}

export default Withdraw;
