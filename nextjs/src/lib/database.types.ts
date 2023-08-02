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
      listings: {
        Row: {
          additional_img_srcs: string[] | null
          address_city: string | null
          address_full: string | null
          address_state: string | null
          address_street: string | null
          address_zipcode: string | null
          baths: number | null
          beds: number | null
          building_name: string | null
          created_at: string
          days_on_market: number
          description: string | null
          listed_at: string
          listing_contact_email: string | null
          listing_contact_name: string | null
          listing_contact_phone: string | null
          listing_id: number
          listing_source: string
          listing_source_detail_url: string | null
          listing_source_id: string
          listing_start_date: string
          listing_type: string
          location: unknown | null
          preview_img_src: string | null
          price: number | null
          price_estimate_high: number | null
          price_estimate_low: number | null
          ranged_price: boolean
          square_footage: number | null
          status: string
          updated_at: string
        }
        Insert: {
          additional_img_srcs?: string[] | null
          address_city?: string | null
          address_full?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zipcode?: string | null
          baths?: number | null
          beds?: number | null
          building_name?: string | null
          created_at?: string
          days_on_market?: number
          description?: string | null
          listed_at?: string
          listing_contact_email?: string | null
          listing_contact_name?: string | null
          listing_contact_phone?: string | null
          listing_id?: number
          listing_source: string
          listing_source_detail_url?: string | null
          listing_source_id: string
          listing_start_date?: string
          listing_type: string
          location?: unknown | null
          preview_img_src?: string | null
          price?: number | null
          price_estimate_high?: number | null
          price_estimate_low?: number | null
          ranged_price: boolean
          square_footage?: number | null
          status: string
          updated_at?: string
        }
        Update: {
          additional_img_srcs?: string[] | null
          address_city?: string | null
          address_full?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zipcode?: string | null
          baths?: number | null
          beds?: number | null
          building_name?: string | null
          created_at?: string
          days_on_market?: number
          description?: string | null
          listed_at?: string
          listing_contact_email?: string | null
          listing_contact_name?: string | null
          listing_contact_phone?: string | null
          listing_id?: number
          listing_source?: string
          listing_source_detail_url?: string | null
          listing_source_id?: string
          listing_start_date?: string
          listing_type?: string
          location?: unknown | null
          preview_img_src?: string | null
          price?: number | null
          price_estimate_high?: number | null
          price_estimate_low?: number | null
          ranged_price?: boolean
          square_footage?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      listings_with_geojson: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

