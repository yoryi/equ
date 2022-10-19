import { University } from "./"

export interface UniversitiesAdminData {
  stats: {
    contacted: number
    claimed: number
    universitiesQty: number
  }
  universities: {
    id: number
    name: string
    user: null
    email: string | null
    administrator: {
      id?: number
      name: string
      email: string
      phone: string
      position: string
    } | null
    stats: {
      claimed: boolean
      contacted: boolean
    } | null
  }[]
}

export interface UniversityAdministrator {
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
}

export interface UniversityContact {
  email: string
  contacted: boolean
}

export interface UniversityAdminData extends University {
  universityStats:
    | {
        claimed: boolean
        contacted: boolean
      }
    | undefined
  universityAdministrator?: UniversityAdministrator
  email: string | null
  isVisible: boolean
}
