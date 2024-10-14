"use client";
import { ReactNode } from "react";

const PrimaryButton = ({
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
        size === "small" ? "text-sm px-8 py-2" : "text-xl leading-3 px-16 py-4"
      } bg-btn_primary text-white rounded-full cursor-pointer hover:shadow-lg text-center flex justify-center flex-col`}
    >
      {children}
    </div>
  );
};

export default PrimaryButton;
