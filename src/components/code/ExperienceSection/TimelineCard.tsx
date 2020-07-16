import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTag,
  IconDefinition,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons"
import { ExperienceItemDateRange } from "../../../types"
import styles from "./TimelineCard.module.css"

export interface Props {
  key?: string
  period: ExperienceItemDateRange
  title: string
  subtitle?: string
  subtitleIcon?: IconDefinition
  tags?: string[]
  tagIcon?: IconDefinition
  bullets: string[]
  url?: string
}

const TimelineCard: React.FC<Props> = ({
  title,
  subtitle,
  subtitleIcon,
  tags,
  tagIcon = faTag,
  bullets,
  url,
}) => (
  <div className={styles.card}>
    <h3 className={styles.title}>{title}</h3>
    {subtitle && (
      <h4 className={styles.subtitle}>
        {subtitleIcon && (
          <FontAwesomeIcon
            className={styles.icon}
            icon={subtitleIcon}
            color={"#764ba2"}
          />
        )}
        {subtitle}
      </h4>
    )}
    <p className={styles.tags}>
      {!!tags && (
        <FontAwesomeIcon
          className={styles.icon}
          icon={tagIcon}
          color={"#764ba2"}
        />
      )}
      {tags?.join(", ")}
    </p>
    <div className={styles.bulletSection}>
      {bullets.map((text, i) => (
        <p key={i.toString()} className={styles.bullet}>
          &gt; {text}
        </p>
      ))}
    </div>
    {url && (
      <a className={styles.url} href={url} target="_blank">
        <FontAwesomeIcon
          className={styles.icon}
          icon={faExternalLinkAlt}
          color={"#764ba2"}
        />
        {url.replace("https://", "")}
      </a>
    )}
  </div>
)

export default TimelineCard
