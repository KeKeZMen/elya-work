import clsx from "clsx";
import React, { FC, ReactNode } from "react";

type PropsType = {
  title: string;
  children: ReactNode;
  addButton?: JSX.Element;
  fullWidth?: boolean;
  margin?: string;
  padding?: string;
  fullHeight?: boolean;
  count?: number;
};

export const DataTable: FC<PropsType> = ({
  title,
  children,
  addButton,
  fullWidth,
  margin,
  padding,
  fullHeight,
  count,
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col border rounded-md",
        fullWidth ? "w-full" : "md:w-[50%]"
      )}
      style={{
        margin,
      }}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center border-b p-3">
          <h2 className="text-4xl">
            {title}
            {count && `: ${count}`}
          </h2>
          {addButton}
        </div>

        <div
          className={clsx(
            "flex flex-col overflow-y-auto shrink-0",
            fullHeight ? "h-full" : "h-[300px]"
          )}
          style={{ padding }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
