// components/EmptyState.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlogListStyles as styles } from '../assets/styles/BlogListScreen.styles';

interface EmptyStateProps {
  onAddNew: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddNew }) => {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyStateIcon}>
        <Ionicons name="library-outline" size={48} color="#7C3AED" />
      </View>
      
      <Text style={styles.emptyStateTitle}>No Posts Yet</Text>
      <Text style={styles.emptyStateText}>
        Start writing your first blog post and share your thoughts with the world.
      </Text>
      
      <TouchableOpacity 
        style={styles.emptyStateButton}
        onPress={onAddNew}
        activeOpacity={0.8}
      >
        <Ionicons name="add-circle" size={20} color="white" />
        <Text style={styles.emptyStateButtonText}>Create First Post</Text>
      </TouchableOpacity>
    </View>
  );
};