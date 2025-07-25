import React, { type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"button">;

export const Button: FC<Props> = (props) => {
  return (
    <button
      {...props}
      className={twMerge(
        "outline-none border-none bg-primary/90 text-white/90 rounded-lg text-sm cursor-pointer px-4 py-2 glass",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};
