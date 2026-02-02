// components/PostCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlogListStyles as styles } from '../assets/styles/BlogListScreen.styles';
import { BlogPost } from '../types/blogTypes';

interface PostCardProps {
  post: BlogPost;
  onPress: (id: number) => void;  // Change from string to number
  onEdit: (id: number) => void;   // Change from string to number
  onDelete: (post: BlogPost) => void;
}
export const PostCard: React.FC<PostCardProps> = ({ post, onPress, onEdit, onDelete }) => {
  return (
    <TouchableOpacity 
      style={styles.postCard}
      onPress={() => onPress(post.id)}
      activeOpacity={0.9}
    >
      <View style={styles.postHeader}>
        <View style={styles.postIcon}>
          <Ionicons name="document-text-outline" size={20} color="#7C3AED" />
        </View>
        <Text style={styles.postTitle} numberOfLines={2}>
          {post.title}
        </Text>
      </View>
      
      <Text style={styles.postExcerpt} numberOfLines={3}>
        {post.excerpt || post.content.substring(0, 150)}...
      </Text>
      
      <View style={styles.postFooter}>
        <View style={styles.postMeta}>
          <View style={styles.dateBadge}>
            <Ionicons name="calendar-outline" size={14} color="#64748B" />
            <Text style={styles.postDate}>
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }) : 'No date'}
            </Text>
          </View>
          <View style={styles.publishedBadge}>
            <Ionicons name="checkmark-circle" size={12} color="#059669" />
            <Text style={styles.publishedText}>Published</Text>
          </View>
        </View>
        
        <View style={styles.postActions}>
          <TouchableOpacity 
            style={styles.postActionButton}
            onPress={(e) => {
              e.stopPropagation();
              onEdit(post.id);
            }}
          >
            <Ionicons name="create-outline" size={18} color="#7C3AED" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.postActionButton}
            onPress={(e) => {
              e.stopPropagation();
              onDelete(post);
            }}
          >
            <Ionicons name="trash-outline" size={18} color="#DC2626" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};