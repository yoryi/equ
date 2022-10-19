export interface APIError {
  errors: {
    [key: string]: string
  } | null
  message: string | null
}
