import React from "react"

import { ClickEvent } from "../../../types"
import styles from "./Tab.module.css"

interface Props {
  name: string
  selected: boolean
  onClick: (event: ClickEvent, name: string) => void
}

const Tab: React.FC<Props> = ({ name, selected, onClick }) => {
  return (
    <button
      className={`mr-2 ${selected ? styles.tabActive : ""}`}
      onClick={e => onClick(e, name)}
    >
      {name}
    </button>
  )
}

export default Tab
