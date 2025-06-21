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
  from: string
  to?: string | undefined
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

export type ExperienceItem =
  | ProjectExperienceItem
  | JobExperienceItem
  | EducationExperienceItem

// Handy types I keep forgetting

export type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>
export type Children = JSX.Element[] | JSX.Element | string
