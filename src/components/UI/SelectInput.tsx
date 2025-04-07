"use client";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Control, FieldError, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

type SelectInputProps = {
 control: Control<FieldValues>,
 name: string,
 errors: FieldError | undefined,
 dataList: { value: string, label: string }[], 
 children: string,
}

const SelectInput = ({ control, name, errors, dataList, children }: SelectInputProps) => {
  return (
    <FormControl fullWidth error={!!errors}>
      <InputLabel id={"select" + children}>{children}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            labelId={"select" + children}
            id={"select-id" + children}
            label={children}
            {...field}
          >
            {dataList.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors && <p style={{ color: "red" }}>{errors.message}</p>}
    </FormControl>
  );
};

export default SelectInput;
