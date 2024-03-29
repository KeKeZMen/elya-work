import React, { FC, ReactNode } from "react";

type PropsType = {
  title: string;
  children: ReactNode;
  addButton?: JSX.Element;
};

export const DataTable: FC<PropsType> = ({ title, children, addButton }) => {
  return (
    <div className="flex flex-col border rounded-md md:w-[50%]">
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
