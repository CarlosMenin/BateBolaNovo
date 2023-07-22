'use client';

import React, { useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TimeInputProps {
  title: string;
  subtitle: string;
  selectedTime: Date;
  onChange: (time: Date) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ title, subtitle, selectedTime, onChange }) => {
  const handleChange = useCallback(
    (time: Date | null) => {
      if (time) {
        onChange(time);
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
      <div className="border border-gray-300 rounded-lg p-2">
        <DatePicker
          selected={selectedTime}
          onChange={handleChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="HH:mm" // Formato de hora:minuto
          className="text-xl text-neutral-600 text-center"
        />
      </div>
    </div>
  );
};

export default TimeInput;
