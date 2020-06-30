import React, { useState, useEffect } from "react"
import { SoftSkill } from "../../types"

const SoftSkillListItem: React.FC<SoftSkill> = ({ name, description }) => (
  <p className="mb-4" key={name}>
    <span className="font-bold">{name}</span> <br /> {description}
  </p>
)

export default SoftSkillListItem
