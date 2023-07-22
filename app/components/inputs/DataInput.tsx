'use client'

import { useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DataInputProps {
  title: string;
  subtitle: string;
  selectedDate: Date;
  onChange: (date: Date) => void;
}

const DataInput: React.FC<DataInputProps> = ({ title, subtitle, selectedDate, onChange }) => {
  const handleChange = useCallback(
    (date: Date | null) => {
      if (date) {
        onChange(date);
      }
    },
    [onChange]
  );

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="border border-gray-300 rounded-lg p-2 ">
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="dd/MM/yyyy"
          className="text-xl text-neutral-600 text-center"
        />
      </div>
    </div>
  );
};

export default DataInput;
