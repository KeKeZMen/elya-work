import clsx from "clsx";
import React, { FC, ReactNode } from "react";

type PropsType = {
  title: string;
  children: ReactNode;
  addButton?: JSX.Element;
  fullWidth?: boolean;
  margin?: string;
};

export const DataTable: FC<PropsType> = ({
  title,
  children,
  addButton,
  fullWidth,
  margin,
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
          <h2 className="text-4xl">{title}</h2>
          {addButton}
        </div>

        <div className="flex flex-col h-[300px] overflow-y-auto shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
};
