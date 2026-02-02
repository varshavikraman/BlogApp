export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogDraft {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  updatedAt: string;
}

export interface BlogContextType {
  posts: BlogPost[];
  drafts: BlogDraft[];
  loading: boolean;

  saveDraft: (draft: Partial<BlogDraft>) => Promise<BlogDraft>;
  deleteDraft: (draftId: number) => Promise<void>;
  updateDraft: (draftId: number, data: Partial<BlogDraft>) => Promise<BlogDraft>; 

  createPost: (postData: Partial<BlogPost>) => Promise<BlogPost>;
  updatePost: (postId: number, postData: Partial<BlogPost>) => Promise<BlogPost>;
  deletePost: (postId: number) => Promise<void>;

  publishDraft: (draftId: number) => Promise<void>;
  refreshPosts: () => Promise<void>;
}

