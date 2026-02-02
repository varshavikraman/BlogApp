import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useBlog } from "../../../context/BlogContext";
import { BlogEditorStyles as styles } from "../../../assets/styles/BlogEditor.styles";

const CreatePostScreen = () => {
  const { createPost, saveDraft, loading } = useBlog();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Missing Fields", "Title and content are required.");
      return;
    }

    await createPost({ title, content, excerpt });
    router.replace("/");
  };

  const handleSaveDraft = async () => {
    if (!title.trim() && !content.trim()) {
      Alert.alert("Empty Draft", "Draft must have at least a title or content.");
      return;
    }

    await saveDraft({ title, content, excerpt });
    router.replace("/"); 
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#7C3AED" />
        </View>
      )}

      <ScrollView 
        style={styles.form}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Title */}
        <View style={styles.screenHeader}>
          <Ionicons name="create-outline" size={32} color="#7C3AED" />
          <Text style={styles.screenTitle}>Create New Post</Text>
          <Text style={styles.screenSubtitle}>Share your thoughts with the world</Text>
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

        {/* Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.draftButton} 
          onPress={handleSaveDraft}
          activeOpacity={0.8}
        >
          <Ionicons name="save-outline" size={20} color="#7C3AED" />
          <Text style={styles.draftText}>Save Draft</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.publishButton} 
          onPress={handlePublish}
          activeOpacity={0.8}
        >
          <View style={styles.publishButtonInner}>
            <Ionicons name="send" size={20} color="white" />
            <Text style={styles.publishText}>Publish</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreatePostScreen;