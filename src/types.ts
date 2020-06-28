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
