export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      seller_profiles: {
        Row: {
          id: string
          legal_name: string
          phone: string
          city: string
          postal_code: string
          description: string | null
          rating: number
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          legal_name: string
          phone: string
          city: string
          postal_code: string
          description?: string | null
          rating?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          legal_name?: string
          phone?: string
          city?: string
          postal_code?: string
          description?: string | null
          rating?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      verification_requests: {
        Row: {
          id: string
          user_id: string
          legal_name: string
          phone: string
          city: string
          postal_code: string
          id_document_url: string | null
          status: 'pending' | 'approved' | 'rejected'
          rejection_reason: string | null
          submitted_at: string
          reviewed_at: string | null
          reviewed_by: string | null
        }
        Insert: {
          id?: string
          user_id: string
          legal_name: string
          phone: string
          city: string
          postal_code: string
          id_document_url?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          legal_name?: string
          phone?: string
          city?: string
          postal_code?: string
          id_document_url?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          slug: string
          name_en: string
          name_ar: string
          icon_name: string | null
          parent_id: string | null
          sort_order: number
        }
        Insert: {
          id?: string
          slug: string
          name_en: string
          name_ar: string
          icon_name?: string | null
          parent_id?: string | null
          sort_order?: number
        }
        Update: {
          id?: string
          slug?: string
          name_en?: string
          name_ar?: string
          icon_name?: string | null
          parent_id?: string | null
          sort_order?: number
        }
      }
      listings: {
        Row: {
          id: string
          seller_id: string
          category_id: string
          title: string
          description: string
          price: number
          currency: string
          city: string
          postal_code: string | null
          status: 'active' | 'sold' | 'hidden' | 'deleted' | 'moderation_pending'
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          seller_id: string
          category_id: string
          title: string
          description: string
          price: number
          currency?: string
          city: string
          postal_code?: string | null
          status?: 'active' | 'sold' | 'hidden' | 'deleted' | 'moderation_pending'
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          seller_id?: string
          category_id?: string
          title?: string
          description?: string
          price?: number
          currency?: string
          city?: string
          postal_code?: string | null
          status?: 'active' | 'sold' | 'hidden' | 'deleted' | 'moderation_pending'
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
