import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { useBlog } from "../../../context/BlogContext";
import { BlogEditorStyles as styles } from "../../../assets/styles/BlogEditor.styles";

export default function EditPostScreen() {
  const { id } = useLocalSearchParams();
  const { posts, drafts, updatePost, updateDraft, createPost, saveDraft, loading, publishDraft } = useBlog();

  const numericId = Number(id);

  const existingPost = posts.find((p) => p.id === numericId);
  const existingDraft = drafts.find((d) => d.id === numericId);

  const initial = existingPost || existingDraft;

  const [title, setTitle] = useState(initial?.title || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [content, setContent] = useState(initial?.content || "");

  const isDraft = Boolean(existingDraft);

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Missing Fields", "Title and content are required.");
      return;
    }

    const postId = Number(id);

    if (existingPost) {
      await updatePost(postId, { title, excerpt, content });
    } else if (existingDraft) {
      await updateDraft(postId, { title, excerpt, content });
    }

    router.push("/blog");
  };

  const publishDraftNow = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Incomplete Draft", "Draft must have title and content before publishing.");
      return;
    }

    if (existingDraft) {
        await updateDraft(numericId, { title, excerpt, content });
        await publishDraft(numericId); 
    } else {
        await createPost({ title, excerpt, content }); 
    }

    router.back();
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        style={styles.form}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Header */}
        <View style={styles.screenHeader}>
          <Ionicons name={isDraft ? "document-outline" : "create-outline"} size={32} color="#7C3AED" />
          <Text style={styles.screenTitle}>
            {isDraft ? "Edit Draft" : "Edit Post"}
          </Text>
          <Text style={styles.screenSubtitle}>
            {isDraft 
              ? "Update your draft before publishing" 
              : "Make changes to your published post"}
          </Text>
        </View>

        {/* Title Card */}
        <View style={styles.inputCard}>
          <View style={styles.labelContainer}>
            <Ionicons name="text-outline" size={18} color="#7C3AED" />
            <Text style={styles.label}>Title</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter a captivating title..."
            placeholderTextColor="#94A3B8"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Excerpt Card */}
        <View style={styles.inputCard}>
          <View style={styles.labelContainer}>
            <Ionicons name="chatbubble-outline" size={18} color="#7C3AED" />
            <Text style={styles.label}>Excerpt (Optional)</Text>
          </View>
          <TextInput
            style={[styles.input, styles.excerptInput]}
            placeholder="A short summary of your post..."
            placeholderTextColor="#94A3B8"
            value={excerpt}
            onChangeText={setExcerpt}
            multiline
          />
          <Text style={styles.charHint}>Keep it brief and engaging</Text>
        </View>

        {/* Content Card */}
        <View style={styles.inputCard}>
          <View style={styles.labelContainer}>
            <Ionicons name="document-text-outline" size={18} color="#7C3AED" />
            <Text style={styles.label}>Content</Text>
          </View>
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.textarea}
              placeholder="Write your amazing content here..."
              placeholderTextColor="#94A3B8"
              multiline
              value={content}
              onChangeText={setContent}
            />
            <View style={styles.contentFooter}>
              <Ionicons name="create-outline" size={16} color="#64748B" />
              <Text style={styles.charCount}>{content.length} characters</Text>
            </View>
          </View>
        </View>

        {/* Status Badge */}
        <View style={styles.statusCard}>
          <View style={[
            styles.statusBadge,
            isDraft ? styles.draftBadge : styles.publishedBadge
          ]}>
            <Ionicons 
              name={isDraft ? "time-outline" : "checkmark-circle"} 
              size={16} 
              color={isDraft ? "#F59E0B" : "#059669"} 
            />
            <Text style={[
              styles.statusText,
              isDraft ? styles.draftStatusText : styles.publishedStatusText
            ]}>
              {isDraft ? "Draft" : "Published"}
            </Text>
          </View>
          <Text style={styles.statusHint}>
            {isDraft 
              ? "Save as draft or publish when ready"
              : "Changes will update the published post"}
          </Text>
        </View>

        {/* Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        {isDraft && (
          <TouchableOpacity 
            style={styles.publishButton} 
            onPress={publishDraftNow}
            activeOpacity={0.8}
          >
            <View style={styles.publishButtonInner}>
              <Ionicons name="send" size={20} color="white" />
              <Text style={styles.publishText}>Publish</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.draftButton} 
          onPress={handleUpdate}
          activeOpacity={0.8}
        >
          <Ionicons name={isDraft ? "save-outline" : "refresh-outline"} size={20} color="#7C3AED" />
          <Text style={styles.draftText}>
            {isDraft ? "Save Draft" : "Update Post"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}