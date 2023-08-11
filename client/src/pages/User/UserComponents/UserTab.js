import React from 'react';

function UserTab({ tab, setTab }) {
    const handleSelectTab = (value) => {
        setTab((prev) =>
            prev.map((el) => ({ ...el, active: el.status === value }))
        );
    };
    return (
        <div className="flex justify-between items-center bg-white text-sm text-center shadow select-none">
            {tab.map((el) => (
                <span
                    onClick={() => handleSelectTab(el.status)}
                    className={`px-2 py-3 flex-1  transition delay-50 ${
                        el.active && 'border-b-4 border-pink-500'
                    }`}
                    key={el.name}
                >
                    {el.name}
                </span>
            ))}
        </div>
    );
}

export default UserTab;
