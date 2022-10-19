//Types
import { Hardship } from "./"

export enum Visibility {
  Visible = 1,
  Private,
  Hidden,
}

export interface PrivacyAndSecuritySettings {
  nameAndPhoto: {
    universities: Visibility
    students: Visibility
    public: boolean
  }
  beat: {
    universities: Visibility
    students: Visibility
    public: boolean
  }
  transcript: {
    universities: Visibility
    students: Visibility
    public: boolean
  }
  extracurriculars: {
    universities: Visibility
    students: Visibility
    public: boolean
  }
  professional: {
    universities: Visibility
    students: Visibility
    public: boolean
  }
  service: {
    universities: Visibility
    students: Visibility
    public: boolean
  }
  recognition: {
    universities: Visibility
    students: Visibility
    public: boolean
  }
  id?: number
}

export interface NotificationsSettings {
  id?: number
  emailAccountActivity?: boolean
  emailNewsForYou: boolean
  browserMessages?: boolean
  browserFollowsAndConnections?: boolean
  emailFollowActivity?: boolean
  emailFollowerDigest?: boolean
}

export interface UpdateStudentAccountSettingsPayload {
  firstName: string
  lastName: string
  email: string
  school: number
  graduation: number
  birthday: Date
  gender?: number
  race?: number
  ethnicity?: number
  hardship?: number
}

export interface UpdateStudentAccountSettingsByAdminPayload {
  id: number
  firstName: string
  lastName: string
  email: string
  school: any
  graduation: number
  birthday: Date
  hardship: Hardship[] | null
}

export interface UpdateUniversityAccountSettingsPayload {
  name: string
  city: string
  established: number
}

export interface UpdateStudentPrivateAvatarPayload {
  privateAvatar: number
}

export interface CroppedImage {
  blob: Blob
  filename: string
}

export interface PageAdministrator {
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
}
