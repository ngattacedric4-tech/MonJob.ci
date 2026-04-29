export type AppRole = "candidate" | "recruiter";
export type OpportunityType = "job" | "internship" | "training";
export type JobStatus = "draft" | "pending_review" | "published" | "archived";
export type ApplicationStatus =
  | "submitted"
  | "reviewing"
  | "interview"
  | "accepted"
  | "rejected"
  | "withdrawn";
export type SourceKind = "partner_site" | "institution" | "social" | "chariow" | "direct";

export type Profile = {
  id: string;
  role: AppRole;
  full_name: string | null;
  phone: string | null;
  city: string | null;
  headline: string | null;
  bio: string | null;
  skills: string[];
  avatar_url: string | null;
  cv_path: string | null;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
};

export type Job = {
  id: string;
  created_by: string | null;
  title: string;
  slug: string;
  description: string;
  type: OpportunityType;
  sector_slug: string;
  sector_label: string;
  source_kind: SourceKind;
  source_name: string;
  organization_name: string | null;
  location_city: string | null;
  external_url: string | null;
  status: JobStatus;
  is_verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
  is_premium: boolean;
  published_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Application = {
  id: string;
  job_id: string;
  candidate_id: string;
  status: ApplicationStatus;
  cover_letter: string | null;
  resume_path: string | null;
  applied_at: string;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          role?: AppRole;
          full_name?: string | null;
          phone?: string | null;
          city?: string | null;
          headline?: string | null;
          bio?: string | null;
          skills?: string[];
          avatar_url?: string | null;
          cv_path?: string | null;
          is_staff?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Profile>;
        Relationships: [];
      };
      jobs: {
        Row: Job;
        Insert: {
          id?: string;
          created_by?: string | null;
          title: string;
          slug: string;
          description: string;
          type: OpportunityType;
          sector_slug: string;
          sector_label: string;
          source_kind: SourceKind;
          source_name: string;
          organization_name?: string | null;
          location_city?: string | null;
          external_url?: string | null;
          status?: JobStatus;
          is_verified?: boolean;
          verified_at?: string | null;
          verified_by?: string | null;
          is_premium?: boolean;
          published_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Job>;
        Relationships: [
          {
            foreignKeyName: "jobs_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "jobs_verified_by_fkey";
            columns: ["verified_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      applications: {
        Row: Application;
        Insert: {
          id?: string;
          job_id: string;
          candidate_id: string;
          status?: ApplicationStatus;
          cover_letter?: string | null;
          resume_path?: string | null;
          applied_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Application>;
        Relationships: [
          {
            foreignKeyName: "applications_candidate_id_fkey";
            columns: ["candidate_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_candidate: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_recruiter: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_staff: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      app_role: AppRole;
      opportunity_type: OpportunityType;
      job_status: JobStatus;
      application_status: ApplicationStatus;
      source_kind: SourceKind;
    };
    CompositeTypes: Record<string, never>;
  };
};

export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type JobInsert = Database["public"]["Tables"]["jobs"]["Insert"];
export type JobUpdate = Database["public"]["Tables"]["jobs"]["Update"];
export type ApplicationInsert = Database["public"]["Tables"]["applications"]["Insert"];
export type ApplicationUpdate = Database["public"]["Tables"]["applications"]["Update"];
