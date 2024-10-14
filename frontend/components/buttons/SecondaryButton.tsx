"use client";

import { ReactNode } from "react";

const SecondaryButton = ({
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
      className={`${
        size === "small" ? "text-sm px-8 pt-2" : "text-xl leading-3 px-16 py-4"
      } border text-black border-black rounded-full cursor-pointer hover:shadow-lg`}
    >
      {children}
    </div>
  );
};

export default SecondaryButton;
