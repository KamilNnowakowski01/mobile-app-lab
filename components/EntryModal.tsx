import { CardHistory } from "@/components/CardHistory";
import { icons, MoodValue } from "@/constants/Mood";
import { MoodEntry } from "@/services/MoodServices";
import React from "react";
import { Modal, Pressable, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  entry: MoodEntry | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export const EntryModal = ({
  visible,
  entry,
  onClose,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable onPress={() => {}}>
          {entry && (
            <CardHistory
              title={entry.date}
              image={icons[entry.mood - 1]}
              mood={entry.mood as MoodValue}
              subtitle={entry.note || ""}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
});
