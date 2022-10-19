//Hooks
import { useContext } from "react"

//Contexts
import LoadingContext from "../contexts/LoadingContext"

export default function useLoader() {
  const { onLoadComplete } = useContext(LoadingContext)

  return { onLoadComplete }
}
