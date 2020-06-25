export interface Tag {
  name: string
  count: number
  active?: boolean
}

export type TagMap = { [key: string]: Tag }
