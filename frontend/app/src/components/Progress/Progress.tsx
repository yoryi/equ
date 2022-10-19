import React from "react"

interface ProgressProps {
  value: number
}

const Progress: React.FC<ProgressProps> = ({ value }) => (
  <div className="progress">
    <div className={`progress-value progress-value-${value}`}></div>
  </div>
)

export default Progress
