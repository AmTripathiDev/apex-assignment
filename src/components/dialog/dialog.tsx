import React from "react";

import "./dialog.css";

const Dialog = ({ open, onClose, children, style } : any) => {
  const handleBackdropClick = () => {
    onClose?.();
  };
  return (
    <>
      {open && (
        <>
          <div className="backdrop" onClick={handleBackdropClick}></div>
          <div style={style ?? {}} id="dialog" className="dialog-box">
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default Dialog;
