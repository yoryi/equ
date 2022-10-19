//Hooks
import { useLayoutEffect,useState } from "react"

function useUserSelectBlocked(
  defaultValue: boolean,
): [boolean, (value: boolean) => void] {
  const [isUserSelectBlocked, setUserSelectBlocked] = useState(defaultValue)

  useLayoutEffect(() => {
    document.body.style.userSelect = defaultValue ? `none` : `auto`
    document.body.style.webkitUserSelect = defaultValue ? `none` : `auto`

    return () => {
      document.body.style.userSelect = ``
    }
  }, [defaultValue])

  const handleUserSelectChange = (value: boolean) => {
    document.body.style.userSelect = value ? `none` : `auto`
    document.body.style.webkitUserSelect = defaultValue ? `none` : `auto`
    setUserSelectBlocked(value)
  }

  return [isUserSelectBlocked, handleUserSelectChange]
}

export default useUserSelectBlocked
