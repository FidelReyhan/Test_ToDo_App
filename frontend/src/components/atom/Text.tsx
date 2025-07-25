import { type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label?: string;
  children?: React.ReactNode;
  className?: string;
};

export const Text: FC<Props> = ({ label = "", children, className = "" }) => {
  return (
    <div className={twMerge("", className)}>{children ? children : label}</div>
  );
};
