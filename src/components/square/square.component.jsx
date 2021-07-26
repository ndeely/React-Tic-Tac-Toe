import React from "react";

import './square.styles.scss';

function Square(props) {
    return (
        <button
            className={props.active ? "square active" : "square"}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export default Square;