import React from "react"

export interface Tag {
  name: string
  count: number
  active?: boolean
}

export type TagMap = { [key: string]: Tag }

export interface HardSkill {
  name: string
  tags: string[]
}

export interface SoftSkill {
  name: string
  description: string
}

export interface ExperienceItemDateRange {
  from: string | Date
  to: string | Date
}

export interface ProjectExperienceItem {
  period: ExperienceItemDateRange
  name: string
  skills: string[]
  description: string
  url: string
}

export interface JobExperienceItem {
  period: ExperienceItemDateRange
  place: string
  name: string
  skills: string[]
  accomplishments: string[]
}

export interface EducationExperienceItem {
  period: ExperienceItemDateRange
  name: string
  place: string
  accomplishments: string[]
}

export type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>
