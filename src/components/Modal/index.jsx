import ReactDOM from "react-dom";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function CommonModal({ isOpen, onClose, children }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-rgb-black opacity-80"
      ></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-5 h-2/3 w-1/3 rounded-xl">
        <div className="flex flex-col justify-between h-full">{children}</div>
      </div>
    </div>,
    document.getElementById("backdrop-root")
  );
}

export default CommonModal;
