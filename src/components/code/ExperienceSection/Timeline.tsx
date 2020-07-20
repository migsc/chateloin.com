import React, { CSSProperties } from "react"
import { maxBy, minBy, moment, max, min } from "../../../utils"
import { ExperienceItemDateRange } from "../../../types"
import { Props as TimelineCardProps } from "./TimelineCard"
import styles from "./Timeline.module.css"

// const dateRangeToKey = (period: ExperienceItemDateRange): string => {
//   const fromMoment = moment(period.from)
//   const toMoment = moment(period.to) // Moment will use the current date when passed undefined.
//   return `${fromMoment.format("YYYY-MM")}-${toMoment.format("YYYY-MM")}`
// }

const HEIGHT_TIMELINE_SEGMENT = 3.125 //rem

const indexOf = (
  yearMonthBase: string | Date,
  yearMonth: string | Date
): number => {
  return moment(yearMonthBase).diff(yearMonth, "months")
}

const getTimelinePeriods = (
  minYearMonth: string,
  maxYearMonth: string
): string[] => {
  let timelinePeriods = [minYearMonth]

  while (timelinePeriods[0] !== maxYearMonth) {
    timelinePeriods = [
      moment(timelinePeriods[0]).add(1, "month").format("YYYY-MM"),
      ...timelinePeriods,
    ]
  }

  return timelinePeriods
}

interface PeriodMap {
  [key: string]: TimelineCardElement[]
}

interface TimelineCardElement extends React.ReactElement {
  props: TimelineCardProps
}

interface TimelineEvent {
  cardElement: TimelineCardElement
  isoFrom: string
  isoTo: string
  indexFrom: number
  indexTo: number
}

interface State {
  timelineEvents: TimelineEvent[]
  timelineYearMonths: string[]
  nowYearMonth: string
}

interface Actions {}

const useContainer = (children: TimelineCardElement): [State, Actions] => {
  const nowYearMonth = moment().format("YYYY-MM")
  const cardElements = [children].flat()

  const timelineEvents = cardElements.map(cardElement => ({
    cardElement,
    isoFrom: cardElement?.props.period?.from ?? nowYearMonth,
    isoTo: cardElement?.props.period?.to ?? nowYearMonth,
    indexFrom: indexOf(nowYearMonth, cardElement?.props.period.from),
    indexTo: indexOf(
      nowYearMonth,
      cardElement?.props.period.to ?? nowYearMonth
    ),
  }))

  const firstEvent = maxBy(timelineEvents, "indexFrom")
  const lastEvent = minBy(timelineEvents, "indexTo")

  const timelineYearMonths = getTimelinePeriods(
    firstEvent?.isoFrom ?? nowYearMonth,
    nowYearMonth
  )

  console.log("timelinePeriods", timelineYearMonths)

  const actions: Actions = {}

  return [
    { nowYearMonth, timelineEvents, timelineYearMonths, lastEvent },
    actions,
  ]
}

interface Props {
  active: boolean
}

const Timeline: React.FC<Props> = ({ children, active = false }) => {
  const [
    { nowYearMonth, timelineYearMonths, timelineEvents, lastEvent },
  ] = useContainer(children as TimelineCardElement)
  return (
    <>
      {active && (
        <div className="px-3" style={{ flex: 4 }}>
          {children}
        </div>
      )}
      <div className="relative" style={{ flex: 1 }}>
        <VisualizationContainer
          style={{
            height: `${(lastEvent.indexFrom + 1) * HEIGHT_TIMELINE_SEGMENT}rem`,
          }}
        >
          {timelineEvents.map(({ indexFrom, indexTo }) => (
            <>
              <LineRounded
                color="pink"
                colorIndex={4}
                style={{
                  top: `${HEIGHT_TIMELINE_SEGMENT * indexTo}rem`,
                  height: `${
                    HEIGHT_TIMELINE_SEGMENT * (indexFrom - indexTo)
                  }rem`,
                }}
              />
              <Circle
                color="pink"
                style={{ top: `${HEIGHT_TIMELINE_SEGMENT * indexTo}rem` }}
              />
            </>
          ))}
        </VisualizationContainer>
      </div>
    </>
  )
}

export default Timeline

interface VisualizationContainerProps {
  style: CSSProperties
}
const VisualizationContainer: React.FC<VisualizationContainerProps> = ({
  style,
  children,
}) => (
  <div className={styles.VisualizationContainer} style={style}>
    <div className={`${styles.visualizationGuideLine}`} />
    {children}
  </div>
)

interface CircleProps {
  style: CSSProperties
  color: string
  colorIndex?: number | string
}
const Circle: React.FC<CircleProps> = ({ style, color, colorIndex = 5 }) => (
  <div
    className={`${styles.Circle} bg-${color}-${colorIndex}00`}
    style={style}
  />
)

interface LineRounded {
  style: CSSProperties
  color: string
  colorIndex?: number | string
}
const LineRounded: React.FC<LineRounded> = ({
  style,
  color,
  colorIndex = 5,
}) => (
  <div
    className={`${styles.LineRounded} bg-${color}-${colorIndex}00`}
    style={style}
  />
)
