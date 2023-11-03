export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      housing_preferences: {
        Row: {
          age_max: number | null
          age_min: number | null
          alcohol_preference: number | null
          budget_max: number | null
          budget_min: number | null
          cat_preference: number | null
          cleanliness_preference: number | null
          dog_preference: number | null
          home_social_inclination: number | null
          noise_sensitivity: number | null
          personal_cleanliness: number | null
          prefered_gender: string | null
          private_preferences: boolean | null
          profile_id: string
          sleeping_habits: number | null
          smoking_preference: number | null
          social_battery: number | null
          updated_at: string
        }
        Insert: {
          age_max?: number | null
          age_min?: number | null
          alcohol_preference?: number | null
          budget_max?: number | null
          budget_min?: number | null
          cat_preference?: number | null
          cleanliness_preference?: number | null
          dog_preference?: number | null
          home_social_inclination?: number | null
          noise_sensitivity?: number | null
          personal_cleanliness?: number | null
          prefered_gender?: string | null
          private_preferences?: boolean | null
          profile_id: string
          sleeping_habits?: number | null
          smoking_preference?: number | null
          social_battery?: number | null
          updated_at?: string
        }
        Update: {
          age_max?: number | null
          age_min?: number | null
          alcohol_preference?: number | null
          budget_max?: number | null
          budget_min?: number | null
          cat_preference?: number | null
          cleanliness_preference?: number | null
          dog_preference?: number | null
          home_social_inclination?: number | null
          noise_sensitivity?: number | null
          personal_cleanliness?: number | null
          prefered_gender?: string | null
          private_preferences?: boolean | null
          profile_id?: string
          sleeping_habits?: number | null
          smoking_preference?: number | null
          social_battery?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'housing_preferences_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['profile_id']
          },
        ]
      }
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
          description: string | null
          listed_at: string
          listing_contact_email: string | null
          listing_contact_name: string | null
          listing_contact_phone: string | null
          listing_id: number
          listing_source: string
          listing_source_detail_url: string | null
          listing_source_id: string
          listing_start_date: string | null
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
          description?: string | null
          listed_at?: string
          listing_contact_email?: string | null
          listing_contact_name?: string | null
          listing_contact_phone?: string | null
          listing_id?: number
          listing_source: string
          listing_source_detail_url?: string | null
          listing_source_id: string
          listing_start_date?: string | null
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
          description?: string | null
          listed_at?: string
          listing_contact_email?: string | null
          listing_contact_name?: string | null
          listing_contact_phone?: string | null
          listing_id?: number
          listing_source?: string
          listing_source_detail_url?: string | null
          listing_source_id?: string
          listing_start_date?: string | null
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
      profile_listing_interests: {
        Row: {
          active: boolean
          listing_id: number
          profile_id: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          listing_id: number
          profile_id: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          listing_id?: number
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_listing_interests_listing_id_fkey'
            columns: ['listing_id']
            referencedRelation: 'listings'
            referencedColumns: ['listing_id']
          },
          {
            foreignKeyName: 'profile_listing_interests_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['profile_id']
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          facebook_profile: string | null
          full_name: string | null
          instagram_profile: string | null
          profile_id: string
          pronouns: string | null
          school_id: number | null
          snapchat_profile: string | null
          tictok_profile: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          facebook_profile?: string | null
          full_name?: string | null
          instagram_profile?: string | null
          profile_id: string
          pronouns?: string | null
          school_id?: number | null
          snapchat_profile?: string | null
          tictok_profile?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          facebook_profile?: string | null
          full_name?: string | null
          instagram_profile?: string | null
          profile_id?: string
          pronouns?: string | null
          school_id?: number | null
          snapchat_profile?: string | null
          tictok_profile?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profiles_school_id_fkey'
            columns: ['school_id']
            referencedRelation: 'schools'
            referencedColumns: ['school_id']
          },
        ]
      }
      schools: {
        Row: {
          address_city: string | null
          address_full: string | null
          address_state: string | null
          address_street: string | null
          address_zipcode: string | null
          description: string | null
          location: unknown | null
          logo_img_src: string | null
          school_id: number
          school_name: string
          search_area_lower: unknown | null
          search_area_upper: unknown | null
          slug: string
        }
        Insert: {
          address_city?: string | null
          address_full?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zipcode?: string | null
          description?: string | null
          location?: unknown | null
          logo_img_src?: string | null
          school_id?: number
          school_name: string
          search_area_lower?: unknown | null
          search_area_upper?: unknown | null
          slug: string
        }
        Update: {
          address_city?: string | null
          address_full?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zipcode?: string | null
          description?: string | null
          location?: unknown | null
          logo_img_src?: string | null
          school_id?: number
          school_name?: string
          search_area_lower?: unknown | null
          search_area_upper?: unknown | null
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      listing_favorited_by: {
        Args: {
          current_profile_id?: string
          selected_listing_id?: number
        }
        Returns: {
          profile_id: string
          full_name: string
          avatar_url: string
        }[]
      }
      listings_with_geojson: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      school_with_geojson: {
        Args: {
          selected_school_slug: string
        }
        Returns: Json
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
