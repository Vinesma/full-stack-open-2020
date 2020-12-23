import React from 'react';

const ErrorBox = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="errorBox">
            <p>{message}</p>
        </div>
    )
}

export default ErrorBox;
