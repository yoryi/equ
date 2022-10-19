export enum FilterType {
  SEARCH = `SEARCH`,
  FOLLOWED = `FOLLOWED`,
}

export enum MatchLevel {
  GOOD_EXCELLENT = `GOOD_EXCELLENT`,
  AVERAGE_POOR = `AVERAGE_POOR`,
}

export const mockedSchoolType = [
  { id: 1, name: `All` },
  { id: 2, name: `Public` },
  { id: 3, name: `Private` },
  { id: 4, name: `Religiously affiliated` },
]

export const mockedLocation = [
  { id: 1, name: `In-state` },
  { id: 2, name: `Out-of-state` },
]

export const mockedLocationBased = [
  { id: 1, name: `In-state` },
  { id: 2, name: `Out-of-state` },
]

export const mockedTestsTaken = [
  { id: 1, name: `0` },
  { id: 2, name: `1-3` },
  { id: 3, name: `4 or more` },
]

export const mockedGpaOverall = [
  { id: 1, name: `Less than 1` },
  { id: 2, name: `1-3` },
  { id: 3, name: `3-4` },
  { id: 4, name: `4` },
]

export const mockedActivities = [
  { id: 6, name: `Sport + Spirit` },
  { id: 5, name: `Academic + Art` },
  { id: 2, name: `Jobs` },
  { id: 1, name: `Internship` },
  { id: 4, name: `Service` },
]

export const mockedAthleticDivision = [
  { id: 1, name: `NCAA DIVISION I` },
  { id: 2, name: `NCAA DIVISION II` },
  { id: 3, name: `NCAA DIVISION III` },
]

export const mockedAdmissionsGender = [
  { id: 1, name: `Co-ed (all sexes)` },
  { id: 2, name: `All-male` },
  { id: 3, name: `All-female` },
]
