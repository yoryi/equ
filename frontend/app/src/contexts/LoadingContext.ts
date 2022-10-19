import * as React from "react"

export default React.createContext<{
  isLoading: boolean
  onLoadComplete: () => void
}>({
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onLoadComplete: () => {},
})
