import React, { type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const Card: FC<Props> = ({ children, className = "", ...rest }) => {
  return (
    <div
      className={twMerge("p-4 rounded-lg bg-white text-slate-700", className)}
      {...rest}
    >
      {children}
    </div>
  );
};
