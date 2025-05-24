import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";

type Props = {
  value: Date | null;
  onChange: (date: Date) => void;
  style?: StyleProp<ViewStyle>;
};

export const DatePickerInput = ({ value, onChange, style }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <DateTimePicker
        value={value || new Date()}
        mode="date"
        display="default"
        onChange={(_, selectedDate) => {
          setShow(false);
          if (selectedDate) {
            onChange(selectedDate);
          }
        }}
      />
    </>
  );
};
