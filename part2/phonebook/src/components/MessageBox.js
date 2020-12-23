import React from 'react';

const MessageBox = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="messageBox">
            <p>{message}</p>
        </div>
    )
}

export default MessageBox;
