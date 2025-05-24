import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

type Props = {
  value: string;
  onChange: (t: string) => void;
};

export const NoteInput = ({ value, onChange }: Props) => {
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <TextInput
      style={[
        styles.input,
        styles.textArea,
        { borderColor, color: textColor, backgroundColor },
      ]}
      placeholder="Note (max 400 chars)"
      placeholderTextColor={textColor + '88'}
      value={value}
      onChangeText={onChange}
      multiline
      maxLength={400}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
