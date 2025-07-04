export enum AuthorStatus {
    active = "active",
    inactive = "inactive"
}

export interface Author {
    id: string | number
    name: string
    email: string
    status: AuthorStatus
    article_count: number
    is_active: number
    created_at: string
    profession?: string
    about?: string
    profile_photo_url?: string
  }
  
export interface AuthorsState {
    items: Author[]
    profile: Author | null
    isLoading: boolean
    error: string | null
    totalCount: number
    currentPage: number
    totalPages: number
    perPage: number
  }

  export interface AuthorDashboardLayoutProps {
    children: React.ReactNode
  }

  export interface ProfileViewProps {
    profile: Author | null
    isLoading?: boolean
  }

  export interface ProfileEditFormProps {
    profile: Author | null
    onSave: () => void
    onCancel: () => void  // Added this prop
  }