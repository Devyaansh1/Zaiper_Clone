"use client";

import { ReactNode } from "react";

const DarkButton = ({
  children,
  onClick,
  size = "small",
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "small" | "big";
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col justify-center px-8 py-2 text-white bg-purple-800 rounded cursor-pointer hover:shadow-lg text-center`}
    >
      {children}
    </div>
  );
};

export default DarkButton;
