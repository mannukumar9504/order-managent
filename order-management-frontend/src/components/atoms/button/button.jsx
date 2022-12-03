import React from "react";

function ButtonAtom(props) {
    const { className, onClick, children, ...rest } = props;
    return (
        <button type="submit" className={className || "btn btn-primary"} onClick={onClick} {...rest}>
            {children}
        </button>
    );
}

export default ButtonAtom;
