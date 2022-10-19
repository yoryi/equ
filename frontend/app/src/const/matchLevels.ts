export interface MatchLevel {
  name: string
  min: number
  max: number
  color: "green" | "yellow" | "red"
}

export const MATCH_LEVELS: MatchLevel[] = [
  { name: `poorMatch`, min: 55, max: 73, color: `red` },
  { name: `averageMatch`, min: 73, max: 85, color: `red` },
  { name: `goodMatch`, min: 85, max: 93, color: `green` },
  { name: `excellentMatch`, min: 93, max: 100.1, color: `green` },
]
