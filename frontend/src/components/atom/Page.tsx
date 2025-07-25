import type { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const Page: FC<Props> = ({ className = "", ...props }) => {
  return (
    <div
      className={twMerge(
        "bg-gradient-to-tr from-primary via-primary/60 to-white min-h-screen flex flex-col items-center py-8 px-4",
        className
      )}
      {...props}
    >
      {props.children}
    </div>
  );
};
