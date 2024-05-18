import React from 'react';
import './AbstractBox.css';

const AbstractBox = ({ header, body, footer }) => {
    return (
        <div className="abstractBox">
            <div className="abstractBoxHeader">{header}</div>
            <div className="abstractBoxBody">{body}</div>
            {footer && <div className="abstractBoxFooter">{footer}</div>}
        </div>
    );
};

export default AbstractBox;
