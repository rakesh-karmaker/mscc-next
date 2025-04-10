import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import dayjs from "dayjs";

const DateTimePicker = React.forwardRef(({ value, onChange, label }: {
  value: dayjs.Dayjs;
  onChange: (value: dayjs.Dayjs) => void;
  label: string;
}, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {window.innerWidth < 700 ? (
        <MobileDateTimePicker
          label={label}
          value={value}
          onChange={(newValue) => newValue && onChange(newValue)}
          ref={ref as React.Ref<HTMLDivElement>}
          sx={{ width: "100%" }}
        />
      ) : (
        <DesktopDateTimePicker
          label={label}
          value={value}
          onChange={(newValue) => newValue && onChange(newValue)}
          ref={ref as React.Ref<HTMLDivElement>}
          sx={{ width: "100%" }}
        />
      )}
    </LocalizationProvider>
  );
});

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
