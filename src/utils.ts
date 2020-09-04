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

export const getSkillsByTags = (skills: HardSkill[]): TagToSkillsMap => {
  let map: TagToSkillsMap = {}

  skills.forEach(skill => {
    skill.tags.forEach(tagName => {
      if (!map[tagName]) {
        map[tagName] = {
          name: tagName,
          active: false,
          count: 1,
          skills: [skill],
        }
      } else {
        map[tagName] = {
          ...map[tagName],
          count: map[tagName].count + 1,
          skills: [...map[tagName].skills, skill],
        }
      }
    })
  })

  return map
}

export const getViewportWidth = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

export const getViewportHeight = () =>
  Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

export const startsWithHash = str => str?.indexOf("#") === 0
export const startsWithForwardSlash = str => str?.indexOf("#") === 0
