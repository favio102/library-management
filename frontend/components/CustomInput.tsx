import React from "react";
import { CustomInputProps } from "@/types";

const CustomInput = ({
  label,
  placeholder,
  name,
  btnType = "text",
  value,
  onChange,
}: CustomInputProps) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-bold">{label}</label>
      <input
        type={btnType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder.slice(0, 251)}
        className="pl-4 py-2.5 bg-transparent rounded-md border dark:border-slate-700 outline-none w-full"
      />
    </div>
  );
};

export default CustomInput;
