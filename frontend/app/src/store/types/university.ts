export interface UniversityProfile {
  id: number
  name: string
  city: string
  state: string
  avatar: string | null
  score: number
  email: string | null
  website: string
}

export interface University {
  id: number
  name: string
  description: string
  mission: string
  website: string | null
  avatar: string | null
  cover: string | null
  about: AboutUniversity
  admissions: {
    stats: UniversityAdmissionStats
    acceptanceRate: number
    graduationRate: number
    standardizedTests: UniversityStandardizedTests
  }
  demographics: {
    studentBody: DemographicsStudentBody
    socioEconomicDiversity: number
    raceAndEthnicity: DemographicsRaceAndEthnicity
  }
  academicOfferings: {
    salary: {
      min: number
      max: number
    }
    majorsOffered: string[]
  }
  isFollowed: boolean
}

export enum InstitutionType {
  G = `public`,
  GCI = `public`,
  GCO = `public`,
  GCW = `public`,
  GDI = `public`,
  GF = `public`,
  GP = `public`,
  GS = `public`,
  GSL = `public`,
  GSR = `public`,
  GT = `public`,
  P = `private`,
  PN = `private`,
  PP = `private`,
  PR = `religious`,
}

export enum StudentBody {
  CE = `coEducation`,
  OM = `onlyMen`,
  UM = `onlyMen`,
  OW = `onlyWomen`,
  UW = `onlyWomen`,
  PM = `primarilyMale`,
  PW = `primarilyWomen`,
}

export enum CampusSetting {
  Rural = `Rural`,
  Small = `Small`,
  Suburban = `Subrb`,
  Urban = `Urban`,
}

export interface AboutUniversity {
  size: number
  institutionType: keyof typeof InstitutionType
  mainStudentBody: keyof typeof StudentBody
  onCampusHousing: boolean
  campusSetting: CampusSetting | null
  location: Location
}

export interface Location {
  street: string
  zip: string
  city: string
  stateCode: string
  countryCode: string
  lat: number
  lng: number
}

export interface UniversityAdmissionStats {
  applications: number | null
  accepted: number | null
  enrolled: number | null
  freshmanClassSize: number | null
}

export interface UniversityStandardizedTests {
  averageSAT: number | null
  averageACT: number | null
  averageGPA: number | null
  scoreACT: [number | null, number | null, number | null] | []
  scoreSAT: [number | null, number | null, number | null] | []
}

export interface DemographicsStudentBody {
  male: number
  female: number
  outUSA: number
  nonresAlien: number | null
}

export interface DemographicsRaceAndEthnicity {
  white: number
  nonResident: number
  hispanic: number
  asian: number
  black: number
  multiRace: number
  unknown: number
  hawaiian: number
  native: number
}

export interface UniversityAccountSettings {
  name: string | null
  city: string | null
}
