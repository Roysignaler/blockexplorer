import React from 'react';
import '../App.css';

function ChainSelector({ button1Active, button2Active, button3Active }) {
    return (
        <div
            className="Chain--selector"
            style={{
                backgroundColor:
                    button1Active
                        ? "rgba(76, 175, 80, 0.5)"
                        : button2Active
                            ? "rgba(60, 60, 61, 0.5)"
                            : button3Active
                                ? "rgba(6, 77, 176, 0.5)"
                                : "darkblue",
            }}
        ></div>
    );
}

export default ChainSelector;
