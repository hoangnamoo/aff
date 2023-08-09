import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Select from 'react-select';

function WithdrawStep1({ setStep, setRequestInfo }) {
    const cash = 999999;
    const cashConvert = new Intl.NumberFormat();

    const [isLoading, setIsLoading] = useState(false);
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

        if (name === 'amount') {
            return setInput((prev) => ({
                ...prev,
                [e.target.name]: {
                    ...prev[name],
                    value: value * 1 < cash ? value : cash,
                    validate: true,
                },
            }));
        }

        setInput((prev) => ({
            ...prev,
            [e.target.name]: {
                ...prev[name],
                value,
                validate: true,
            },
        }));
    };

    const handleSubmit = () => {
        if (validateAll) {
            console.log('next Stepp');
            setIsLoading(true);
            setRequestInfo(input);
            setStep((prev) => prev + 1);
            setIsLoading(false);
        }
    };

    const handleBlur = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        validate(value, name);
    };

    const handleBlurSelect = (value, name) => {
        validate(value, name);
    };

    const handleFocusSelect = () => {
        setInput((prev) => ({
            ...prev,
            bank: { ...prev.bank, validate: true },
        }));
    };

    const handleSelect = (value) => {
        setInput((prev) => ({
            ...prev,
            bank: { ...prev.bank, value },
        }));
    };

    const validate = (value, type) => {
        switch (type) {
            case 'amount':
                setInput((prev) => ({
                    ...prev,
                    [type]: {
                        ...prev[type],
                        validate: !isNaN(value) && value.length > 0,
                    },
                }));
                break;
            case 'accountNumber':
                setInput((prev) => ({
                    ...prev,
                    [type]: {
                        ...prev[type],
                        validate: !isNaN(value) && value.length > 0,
                    },
                }));
                break;
            case 'accountName':
                setInput((prev) => ({
                    ...prev,
                    [type]: {
                        ...prev[type],
                        validate: value.length > 0,
                    },
                }));
                break;
            case 'bank':
                setInput((prev) => ({
                    ...prev,
                    [type]: {
                        ...prev[type],
                        validate: value ? true : false,
                    },
                }));
                break;
            default:
                break;
        }
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

    const validateAll = Object.keys(input).every((el) => input[el].value);
    return (
        <div className="h-full flex flex-col justify-between">
            <div></div>
            <div>
                <div className="flex flex-col items-center justify-start flex-1 text-slate-900">
                    <span className="text-sm">SỐ DƯ</span>
                    <span className="px-4 py-2 text-2xl font-semibold flex justify-center items-center gap-1">
                        {`${cashConvert.format(cash)}`}
                        <span className="text-base flex items-end">đ</span>
                    </span>
                </div>
                <div className="p-4 relative flex flex-col gap-6">
                    {Object.keys(input).map((el, index) =>
                        !input[el].exclude ? (
                            <div key={index} className={`h-11`}>
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
                            </div>
                        ) : (
                            <div key={index} className="h-11">
                                <Select
                                    value={input.bank.value}
                                    onBlur={() =>
                                        handleBlurSelect(input[el].value, el)
                                    }
                                    onFocus={handleFocusSelect}
                                    onChange={handleSelect}
                                    options={bankList}
                                    isClearable
                                    components={{
                                        IndicatorSeparator: false,
                                        NoOptionsMessage: 'Không có lựa chọn',
                                    }}
                                    placeholder="Tên ngân hàng"
                                    styles={{
                                        control: (baseStyle, state) => ({
                                            ...baseStyle,
                                            padding: '4px',
                                            borderRadius: 8,
                                            height: 44,
                                            borderWidth: 1,
                                            borderColor: input.bank.validate
                                                ? '#e5e7eb'
                                                : 'red',
                                        }),
                                    }}
                                />
                            </div>
                        )
                    )}
                    {validateAll && (
                        <div className="flex justify-end items-center gap-1">
                            <span className="text-sm text-gray-400">
                                Lưu tài khoản này làm mặc định?
                            </span>
                            <button className="px-2 py-1 rounded-lg text-white text-sm bg-pink-700">
                                Lưu
                            </button>
                        </div>
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
                <button
                    onClick={handleSubmit}
                    disabled={!validateAll}
                    className={`p-3 w-full bg-pink-600 text-white rounded-lg ${
                        !validateAll && 'opacity-60 cursor-not-allowed'
                    }`}
                >
                    {isLoading ? (
                        <span>
                            <FontAwesomeIcon
                                className="animate-spin"
                                icon={faCircleNotch}
                            />
                        </span>
                    ) : (
                        'Tiếp theo'
                    )}
                </button>
            </div>
        </div>
    );
}

export default WithdrawStep1;
