import React, { createContext, useContext, useState, useEffect, ReactNode, } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { blogService } from "../services/blogService";
import { BlogPost, BlogDraft, BlogContextType, } from "../types/blogTypes";



const BlogContext = createContext<BlogContextType | null>(null);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [drafts, setDrafts] = useState<BlogDraft[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadDrafts();
    loadPosts();
  }, []);

  const loadDrafts = async () => {
    try {
      const storedDrafts = await AsyncStorage.getItem("blog_drafts");
      if (storedDrafts) setDrafts(JSON.parse(storedDrafts));
    } catch (error) {
      console.error("Error loading drafts:", error);
    }
  };

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await blogService.getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async (draft: Partial<BlogDraft>): Promise<BlogDraft> => {
    try {
      const newDraft: BlogDraft = {
        id: draft.id || Date.now(),
        title: draft.title || "",
        content: draft.content || "",
        excerpt: draft.excerpt || "",
        updatedAt: new Date().toISOString(),
      };

      const existingIndex = drafts.findIndex((d) => d.id === newDraft.id);

      const updatedDrafts =
        existingIndex >= 0
          ? drafts.map((d, i) => (i === existingIndex ? newDraft : d))
          : [...drafts, newDraft];

      setDrafts(updatedDrafts);
      await AsyncStorage.setItem("blog_drafts", JSON.stringify(updatedDrafts));

      await Notifications.scheduleNotificationAsync({
        content: { title: "Draft Saved", body: "Your draft is saved!" },
        trigger: null,
      });

      return newDraft;
    } catch (error) {
      console.error("Error saving draft:", error);
      throw error;
    }
  };

  const updateDraft = async (
    draftId: number,
    data: Partial<BlogDraft>
  ): Promise<BlogDraft> => {
    try {
      const draftIndex = drafts.findIndex((d) => d.id === draftId);
      if (draftIndex < 0) throw new Error("Draft not found");

      const updatedDraft: BlogDraft = {
        ...drafts[draftIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      const updatedDrafts = [...drafts];
      updatedDrafts[draftIndex] = updatedDraft;

      setDrafts(updatedDrafts);
      await AsyncStorage.setItem("blog_drafts", JSON.stringify(updatedDrafts));

      return updatedDraft;
    } catch (error) {
      console.error("Error updating draft:", error);
      throw error;
    }
  };

  const deleteDraft = async (draftId: number): Promise<void> => {
    try {
      const updatedDrafts = drafts.filter((d) => d.id !== draftId);

      setDrafts(updatedDrafts);
      await AsyncStorage.setItem("blog_drafts", JSON.stringify(updatedDrafts));

      await Notifications.scheduleNotificationAsync({
        content: { title: "Draft Deleted", body: "Draft deleted" },
        trigger: null,
      });
    } catch (error) {
      console.error("Error deleting draft:", error);
      throw error;
    }
  };


  const createPost = async (
    postData: Partial<BlogPost>
  ): Promise<BlogPost> => {
    setLoading(true);
    try {
      const newPost = await blogService.createPost(postData);
      setPosts((prev) => [newPost, ...prev]);

      await Notifications.scheduleNotificationAsync({
        content: { title: "Post Published!", body: "Your post is live!" },
        trigger: null,
      });

      return newPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (
    postId: number,
    postData: Partial<BlogPost>
  ): Promise<BlogPost> => {
    setLoading(true);
    try {
      const updatedPost = await blogService.updatePost(String(postId), postData);

      setPosts((prev) =>
        prev.map((post) => (post.id === postId ? updatedPost : post))
      );

      return updatedPost;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: number): Promise<void> => {
    setLoading(true);
    try {
      await blogService.deletePost(String(postId));
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const publishDraft = async (draftId: number): Promise<void> => {
    const draft = drafts.find((d) => d.id === draftId);
    if (!draft) throw new Error("Draft not found");

    await createPost({
      title: draft.title,
      content: draft.content,
      excerpt: draft.excerpt,
    });

    await deleteDraft(draftId);
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        drafts,
        loading,
        saveDraft,
        deleteDraft,
        updateDraft,
        createPost,
        updatePost,
        deletePost,
        publishDraft,
        refreshPosts: loadPosts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context)
    throw new Error("useBlog must be used inside BlogProvider");
  return context;
};
