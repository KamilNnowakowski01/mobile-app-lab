import { Avatar } from "@/components/Avatar";
import { CommentItem } from "@/components/CommentItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

type Post = { id: number; userId: number; title: string; body: string };
type User = { id: number; name: string };
type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export const PostCard: React.FC<{
  post: Post;
  author?: User;
  comments: Comment[];
  loadingComments: boolean;
  expanded: boolean;
  onToggleComments: (id: number) => void;
}> = ({
  post,
  author,
  comments,
  loadingComments,
  expanded,
  onToggleComments,
}) => (
  <ThemedView style={styles.card}>
    {author && (
      <View style={styles.authorContainer}>
        <Avatar name={author.name} />
        <ThemedText style={styles.authorName}>{author.name}</ThemedText>
      </View>
    )}

    <ThemedText style={styles.postTitle}>{post.title}</ThemedText>
    <ThemedText style={styles.postBody}>{post.body}</ThemedText>

    <Pressable
      style={styles.loadCommentsButton}
      onPress={() => onToggleComments(post.id)}
      disabled={loadingComments}
    >
      {loadingComments ? (
        <ActivityIndicator color="#999999" />
      ) : (
        <ThemedText style={styles.loadCommentsText}>
          {expanded ? "Hide Comments" : "Load Comments"}
        </ThemedText>
      )}
    </Pressable>

    {expanded && (
      <FlatList
        data={comments}
        keyExtractor={(c) => c.id.toString()}
        renderItem={({ item }) => <CommentItem comment={item} />}
        style={styles.commentsContainer}
      />
    )}
  </ThemedView>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    margin: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  authorName: {
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 8,
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
  },
  postBody: {
    fontSize: 14,
  },
  loadCommentsButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  loadCommentsText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  commentsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#999999",
  },
});
