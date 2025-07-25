import React, { type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"input">;

export const Input: FC<Props> = (props) => {
  return (
    <input
      className={twMerge(
        "px-3 py-2 border-none outline-none rounded glass bg-white/30",
        props.className
      )}
      spellCheck='false'
      autoComplete='new-password'
      autoCapitalize='off'
      {...props}
    />
  );
};
