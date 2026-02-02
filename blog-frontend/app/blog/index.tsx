import React from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import { useBlog } from "../../context/BlogContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BlogPost, BlogDraft } from "../../types/blogTypes";
import { BlogListStyles as styles } from "../../assets/styles/BlogListScreen.styles";
import { DraftCard } from "../../components/DraftCard";
import { PostCard } from "../../components/PostCard";
import { EmptyState } from "../../components/EmptyState";

const BlogListScreen = () => {
  const router = useRouter();
  const { posts, drafts, loading, deletePost, deleteDraft } = useBlog();

  const handleDeletePost = (post: BlogPost) => {
    Alert.alert(
      "Delete Post",
      `Are you sure you want to delete "${post.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deletePost(post.id),
        },
      ]
    );
  };

  const handleDeleteDraft = (draft: BlogDraft) => {
    Alert.alert(
      "Delete Draft",
      `Are you sure you want to delete draft "${draft.title || "Untitled"}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteDraft(draft.id),
        },
      ]
    );
  };

  const handleEditPost = (id: number) => {
    router.push({
      pathname: "/blog/edit/[id]",
      params: { id: id.toString() },
    });
  };

  const handleEditDraft = (id: number) => {
    router.push({
      pathname: "/blog/edit/[id]",
      params: { id: id.toString() },
    });
  };

  const handleViewPost = (id: number) => {
    router.push({
      pathname: "/blog/[id]",
      params: { id: id.toString() },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  const hasContent = posts.length > 0 || drafts.length > 0;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>My Blog</Text>
            <Text style={styles.headerSubtitle}>Share your thoughts and ideas</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="library-outline" size={28} color="#7C3AED" />
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, styles.publishedIcon]}>
              <Ionicons name="checkmark-circle" size={20} color="#059669" />
            </View>
            <Text style={styles.statNumber}>{posts.length}</Text>
            <Text style={styles.statLabel}>Published</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, styles.draftIcon]}>
              <Ionicons name="time-outline" size={20} color="#D97706" />
            </View>
            <Text style={styles.statNumber}>{drafts.length}</Text>
            <Text style={styles.statLabel}>Drafts</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, styles.totalIcon]}>
              <Ionicons name="document-text-outline" size={20} color="#7C3AED" />
            </View>
            <Text style={styles.statNumber}>{posts.length + drafts.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {/* Create Button */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push("/blog/edit")}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle" size={24} color="white" />
          <Text style={styles.createButtonText}>Create New Post</Text>
        </TouchableOpacity>

        {/* Drafts Section */}
        {drafts.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Ionicons name="time-outline" size={20} color="#D97706" />
              <Text style={styles.sectionTitle}>Drafts</Text>
            </View>
            {drafts.map((draft) => (
              <DraftCard
                key={draft.id}
                draft={draft}
                onEdit={handleEditDraft}
                onDelete={handleDeleteDraft}
              />
            ))}
          </>
        )}

        {/* Published Posts Section */}
        {posts.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#059669" />
              <Text style={styles.sectionTitle}>Published Posts</Text>
            </View>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPress={handleViewPost}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
              />
            ))}
          </>
        )}

        {/* Empty State */}
        {!hasContent && (
          <EmptyState onAddNew={() => router.push("/blog/edit")} />
        )}

        {/* Spacer for FAB */}
        {hasContent && <View style={styles.fabSpacer} />}
      </ScrollView>

      {/* Floating Action Button */}
      {hasContent && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => router.push("/blog/edit")}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BlogListScreen;