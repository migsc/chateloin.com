import moment from "moment"
import { TagMap } from "./types"

const getTagMapFromTagNames = (tags: string[]): TagMap =>
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

export { getTagMapFromTagNames, moment }
export {
  intersection, //https://lodash.com/docs/4.17.15#intersection
  intersectionBy, //https://lodash.com/docs/4.17.15#intersectionBy
  mapValues, //https://lodash.com/docs/4.17.15#intersectionBy
  without, //https://lodash.com/docs/4.17.15#without
  minBy, //https://lodash.com/docs/4.17.15#minBy
  maxBy, //https://lodash.com/docs/4.17.15#maxBy
} from "lodash"
