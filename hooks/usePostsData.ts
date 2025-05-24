import { jsonPlaceholderService } from "@/services/ExampleService";
import { useEffect, useState } from "react";

const POSTS_PER_PAGE = 5;

export function usePostsData() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [commentsByPost, setCommentsByPost] = useState<Record<number, any[]>>(
    {}
  );
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());
  const [loadingComments, setLoadingComments] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [postsResp, usersResp] = await Promise.all([
        jsonPlaceholderService.getPosts({ _start: 0, _limit: POSTS_PER_PAGE }),
        jsonPlaceholderService.getUsers(),
      ]);
      setPosts(postsResp.data);
      setUsers(usersResp.data);
      setLoading(false);
    })();
  }, []);

  const fetchMorePosts = async () => {
    setIsFetchingMore(true);
    const nextPage = page + 1;
    const resp = await jsonPlaceholderService.getPosts({
      _start: nextPage * POSTS_PER_PAGE,
      _limit: POSTS_PER_PAGE,
    });
    setPosts((prev) => [...prev, ...resp.data]);
    setPage(nextPage);
    setIsFetchingMore(false);
  };

  const toggleComments = async (postId: number) => {
    if (expandedPosts.has(postId)) {
      setExpandedPosts((prev) => {
        const updated = new Set(prev);
        updated.delete(postId);
        return updated;
      });
    } else {
      if (!commentsByPost[postId]) {
        setLoadingComments((prev) => ({ ...prev, [postId]: true }));
        const resp = await jsonPlaceholderService.getComments({ postId });
        setCommentsByPost((prev) => ({ ...prev, [postId]: resp.data }));
        setLoadingComments((prev) => ({ ...prev, [postId]: false }));
      }
      setExpandedPosts((prev) => new Set(prev).add(postId));
    }
  };

  const getUser = (userId: number) => users.find((u) => u.id === userId);

  return {
    posts,
    loading,
    isFetchingMore,
    fetchMorePosts,
    commentsByPost,
    loadingComments,
    expandedPosts,
    toggleComments,
    getUser,
  };
}
