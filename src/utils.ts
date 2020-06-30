import { TagMap } from "./types"

export {
  intersection, //https://lodash.com/docs/4.17.15#intersection
  intersectionBy, //https://lodash.com/docs/4.17.15#intersectionBy
  mapValues, //https://lodash.com/docs/4.17.15#intersectionBy
  without, //https://lodash.com/docs/4.17.15#without
} from "lodash"

export const getTagMapFromTagNames = (tags: string[]): TagMap =>
  tags.reduce(
    (map: TagMap, tagName: string) => ({
      ...map,
      [tagName]: {
        name: tagName,
        active: false,
        count: map[tagName] ? map[tagName].count + 1 : 1,
      },
    }),
    {}
  )
