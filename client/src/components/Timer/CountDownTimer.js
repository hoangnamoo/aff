import React, { useState, useEffect } from 'react';

function CountDownTimer() {
    const [time, setTime] = useState(30);

    useEffect(() => {
        let timeCounter;
        timeCounter = setInterval(() => {
            if (time > 0) {
                setTime(time - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timeCounter);
        };
    });

    return <div>{time}</div>;
}

export default CountDownTimer;
