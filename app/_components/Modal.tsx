import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type props = {
  children: ReactNode;
  isOpen: boolean;
};

const Modal: FC<props> = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-4 w-full max-w-2xl max-h-full overflow-auto">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
