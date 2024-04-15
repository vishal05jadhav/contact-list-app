import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import{createPortal} from "react-dom"

function Model({ onClose, isOpen, children }) {
  return  createPortal(
    <>
      {isOpen && (
        <>
        <div className="min-h-[200px] max-w-[80%] bg-white p-4 z-40 relative m-auto">
          <div className="flex">
            <IoMdCloseCircle
              onClick={onClose}
              className="text-3xl justify-end "
            />
            {children}
          </div>
        </div>
        <div  onClick={onClose} className="  h-screen w-screen backdrop-blur absolute top-0 z-30"/>
        </>
      )}
    </>
  ,document.getElementById("model-root"));
}

export default Model;
