import React from "react"

interface Props {
  key?: string
  title: string
}

const TimelineCard: React.FC<Props> = ({ title }) => <div>{title}</div>

export default TimelineCard
