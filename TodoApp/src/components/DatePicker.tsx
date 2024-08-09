import React from 'react';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void; // Function to handle date changes
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value); // Pass the new date to the parent component
  };

  return (
    <div>
      <label>Due Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={handleChange}
      />
    </div>
  );
};

export default DatePicker;
