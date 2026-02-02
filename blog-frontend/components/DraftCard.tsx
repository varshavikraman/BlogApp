// components/DraftCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlogListStyles as styles } from '../assets/styles/BlogListScreen.styles';
import { BlogDraft } from '../types/blogTypes';

interface DraftCardProps {
  draft: BlogDraft;
  onEdit: (id: number) => void;  // Change from string to number
  onDelete: (draft: BlogDraft) => void;
}

export const DraftCard: React.FC<DraftCardProps> = ({ draft, onEdit, onDelete }) => {
  return (
    <View style={styles.draftCard}>
      <View style={styles.draftHeader}>
        <View style={styles.draftIcon}>
          <Ionicons name="document-text-outline" size={20} color="#D97706" />
        </View>
        <Text style={styles.draftTitle} numberOfLines={1}>
          {draft.title || 'Untitled Draft'}
        </Text>
      </View>
      
      <View style={styles.draftContent}>
        <Text style={styles.draftExcerpt} numberOfLines={3}>
          {draft.content || 'No content yet...'}
        </Text>
      </View>
      
      <View style={styles.draftFooter}>
        <View style={styles.draftMeta}>
          <View style={styles.dateBadge}>
            <Ionicons name="time-outline" size={14} color="#D97706" />
            <Text style={styles.draftDate}>
              {draft.updatedAt ? `Edited ${new Date(draft.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}` : 'Not saved'}
            </Text>
          </View>
          <View style={styles.draftBadge}>
            <Ionicons name="time-outline" size={12} color="#D97706" />
            <Text style={styles.draftStatusText}>Draft</Text>
          </View>
        </View>
        
        <View style={styles.draftActions}>
          <TouchableOpacity 
            style={styles.draftActionButton}
            onPress={() => onEdit(draft.id)}
          >
            <Ionicons name="create-outline" size={18} color="#7C3AED" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.draftActionButton}
            onPress={() => onDelete(draft)}
          >
            <Ionicons name="trash-outline" size={18} color="#DC2626" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};