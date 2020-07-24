import React, { CSSProperties } from "react"
import { maxBy, minBy, moment } from "../../../utils"
import { ExperienceItemDateRange } from "../../../types"
import TimelineCard, { Props as TimelineCardProps } from "./TimelineCard"
import styles from "./Timeline.module.css"

// const dateRangeToKey = (period: ExperienceItemDateRange): string => {
//   const fromMoment = moment(period.from)
//   const toMoment = moment(period.to) // Moment will use the current date when passed undefined.
//   return `${fromMoment.format("YYYY-MM")}-${toMoment.format("YYYY-MM")}`
// }

const HEIGHT_TIMELINE_SEGMENT = 3.125 //rem

export const indexOf = (
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

interface TimelineEvent {
  props: TimelineCardProps
  isoFrom: string
  isoTo: string
  indexFrom: number
  indexTo: number
}

interface State {
  timelineEvents: TimelineEvent[]
  timelineYearMonths: string[]
  nowYearMonth: string
  firstEvent: TimelineEvent
  lastEvent: TimelineEvent
}

interface Actions {}

const useContainer = (events: TimelineCardProps[]): [State, Actions] => {
  const nowYearMonth = moment().format("YYYY-MM")

  const timelineEvents = events.map(props => ({
    props,
    isoFrom: props.period?.from ?? nowYearMonth,
    isoTo: props.period?.to ?? nowYearMonth,
    indexFrom: indexOf(nowYearMonth, props.period.from),
    indexTo: indexOf(nowYearMonth, props.period.to ?? nowYearMonth),
  }))

  const firstEvent =
    maxBy(timelineEvents, "indexFrom") ??
    timelineEvents[timelineEvents.length - 1]
  const lastEvent = minBy(timelineEvents, "indexTo") ?? timelineEvents[0]

  const timelineYearMonths = getTimelinePeriods(
    firstEvent?.isoFrom ?? nowYearMonth,
    nowYearMonth
  )

  console.log("timelinePeriods", timelineYearMonths)

  const actions: Actions = {}

  return [
    { nowYearMonth, timelineEvents, timelineYearMonths, firstEvent, lastEvent },
    actions,
  ]
}

interface Props {
  active: boolean
  events: TimelineCardProps[]
}

const Timeline: React.FC<Props> = ({ events = [], active = false }) => {
  const [
    { nowYearMonth, timelineYearMonths, timelineEvents, firstEvent, lastEvent },
  ] = useContainer(events)

  return (
    <>
      {active && (
        <div className="px-3 relative" style={{ flex: 4 }}>
          {timelineEvents.map(({ props, indexTo }) => (
            <TimelineCard
              {...props}
              style={{
                top: `${indexTo * HEIGHT_TIMELINE_SEGMENT}rem`,
              }}
            />
          ))}
        </div>
      )}
      <div className="relative" style={{ flex: 1 }}>
        <VisualizationContainer
          style={{
            height: `${
              (firstEvent.indexFrom + 1) * HEIGHT_TIMELINE_SEGMENT
            }rem`,
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
