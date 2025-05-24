import React from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import { LoadMoreButton } from "@/components/LoadMoreButton";
import { PostCard } from "@/components/PostCard";
import { ThemedText } from "@/components/ThemedText";
import { usePostsData } from "@/hooks/usePostsData";

export default function PostsScreen() {
  const {
    posts,
    loading,
    isFetchingMore,
    fetchMorePosts,
    commentsByPost,
    loadingComments,
    expandedPosts,
    toggleComments,
    getUser,
  } = usePostsData();

  const renderFooter = () =>
    isFetchingMore ? (
      <ActivityIndicator size="large" color="#000" />
    ) : (
      <LoadMoreButton onPress={fetchMorePosts} />
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Example Posts</ThemedText>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              author={getUser(item.userId)}
              comments={commentsByPost[item.id] || []}
              loadingComments={!!loadingComments[item.id]}
              expanded={expandedPosts.has(item.id)}
              onToggleComments={toggleComments}
            />
          )}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    alignItems: "center",
  },
  loader: {
    marginTop: 32,
  },
});
