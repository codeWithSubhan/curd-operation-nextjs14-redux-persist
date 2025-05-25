import React, { FC, ReactNode } from "react";

type props = {
  children: ReactNode;
};

const Header: FC<props> = function ({ children }) {
  return (
    <header className="text-3xl font-bold mb-5 flex justify-between items-center">
      {children}
    </header>
  );
};

export default Header;
