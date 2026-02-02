import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from "expo-router";
import { useBlog } from "../../context/BlogContext";
import { BlogDetailStyles as styles } from '../../assets/styles/BlogDetailScreen.styles';

const BlogDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { posts, loading } = useBlog();
  const [showFullContent, setShowFullContent] = useState(false);

  const post = posts.find((p) => p.id === Number(id));

  const needsTruncation = post?.content && post.content.length > 500;
  const displayedContent = showFullContent || !needsTruncation 
    ? post?.content 
    : post?.content.substring(0, 500) + '...';

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.center}>
        <Ionicons name="document-outline" size={48} color="#94A3B8" />
        <Text style={styles.notFoundText}>Post not found</Text>
        <Text style={styles.notFoundSubtext}>The blog post you're looking for doesn't exist.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Card */}
        <View style={styles.headerCard}>
          <Text style={styles.title}>{post.title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.dateBadge}>
              <Ionicons name="calendar-outline" size={14} color="#7C3AED" />
              <Text style={styles.dateText}>
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                }) : "Unknown"}
              </Text>
            </View>
            
            {post.updatedAt && post.updatedAt !== post.createdAt && (
              <View style={styles.updateBadge}>
                <Ionicons name="refresh-outline" size={14} color="#059669" />
                <Text style={styles.updateText}>
                  Updated {new Date(post.updatedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </Text>
              </View>
            )}
          </View>

          {post.excerpt && (
            <View style={styles.excerptContainer}>
              <Ionicons name="chatbubble-outline" size={20} color="#7C3AED" style={styles.quoteIcon} />
              <Text style={styles.excerpt}>{post.excerpt}</Text>
            </View>
          )}
        </View>

        {/* Content Card */}
        <View style={styles.contentCard}>
          <View style={styles.contentHeader}>
            <View style={styles.contentIcon}>
              <Ionicons name="document-text-outline" size={20} color="#7C3AED" />
            </View>
            <Text style={styles.contentTitle}>Content</Text>
          </View>
          <Text style={styles.content}>{displayedContent}</Text>
          
          {needsTruncation && (
            <TouchableOpacity
              style={styles.readMoreButton}
              onPress={() => setShowFullContent(!showFullContent)}
              activeOpacity={0.7}
            >
              <Text style={styles.readMoreText}>
                {showFullContent ? 'Show Less' : 'Read More'}
              </Text>
              <Ionicons 
                name={showFullContent ? "chevron-up" : "chevron-down"} 
                size={16} 
                color="#7C3AED" 
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Spacer for button */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Edit Button - Floating Action Style */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push(`/blog/edit/${post.id}`)}
        activeOpacity={0.8}
      >
        <View style={styles.editButtonInner}>
          <Ionicons name="create" size={22} color="white" />
          <Text style={styles.editButtonText}>Edit Post</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BlogDetailScreen;