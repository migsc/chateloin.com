import React, { useState, useEffect } from "react"
import { HardSkill } from "../../types"

const HardSkillSearchResult: React.FC<HardSkill> = ({ name, tags }) => (
  <p className="mb-4" key={name}>
    <span className="font-bold">{name}</span> <br /> {tags.join(", ")}
  </p>
)

export default HardSkillSearchResult