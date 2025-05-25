import React, { FC, ReactNode, MouseEventHandler } from "react";

type props = {
  children: ReactNode;
  onclick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<props> = ({ children, onclick }) => {
  return (
    <button
      type="submit"
      className="focus:outline-none text-black bg-[rgb(245,191,32)] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900"
      onClick={onclick}
    >
      {children}
    </button>
  );
};

export default Button;
