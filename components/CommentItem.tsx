import { Avatar } from "@/components/Avatar";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { StyleSheet, View } from "react-native";

type Comment = { id: number; email: string; name: string; body: string };
export const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => (
  <View style={styles.comment}>
    <View style={styles.commentHeader}>
      <Avatar name={comment.email} />
      <ThemedText style={styles.commentEmail}>{comment.email}</ThemedText>
    </View>
    <ThemedText style={styles.commentName}>{comment.name}</ThemedText>
    <ThemedText style={styles.commentBody}>{comment.body}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  comment: {
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: "#999999",
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  commentEmail: { fontWeight: "600", fontSize: 14, marginLeft: 8 },
  commentName: { fontSize: 14, marginBottom: 4, marginLeft: 40 },
  commentBody: { fontStyle: "italic", fontSize: 12, marginLeft: 40 },
});
