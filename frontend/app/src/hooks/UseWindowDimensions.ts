import { useEffect,useState } from "react"

function getWindowDimensions() {
  return {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener(`resize`, handleResize)
    return () => window.removeEventListener(`resize`, handleResize)
  }, [])

  return windowDimensions
}
