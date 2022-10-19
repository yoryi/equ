//Hooks
import { useLayoutEffect,useRef } from "react"

type Overflow = "auto" | "visible" | "hidden"

export default function useScrollLock(
  defaultValue: boolean,
): [boolean, (value: boolean) => void] {
  const originIsScrollLocked = useRef<Overflow | null>(null)
  const isScrollLocked = useRef(defaultValue)

  useLayoutEffect(() => {
    originIsScrollLocked.current = window.getComputedStyle(document.body)
      .overflow as Overflow

    document.body.style.overflow = defaultValue ? `hidden` : `auto`

    return () => {
      document.body.style.overflow = originIsScrollLocked.current as string
    }
  }, [defaultValue])

  const setScrollLocked = (value: boolean) => {
    isScrollLocked.current = value
    document.body.style.overflow = value ? `hidden` : `auto`
  }

  return [isScrollLocked.current, setScrollLocked]
}
