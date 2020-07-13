import React, { useState } from "react"
import { faWrench, faAt } from "@fortawesome/free-solid-svg-icons"
import moment from "moment"

import {
  ExperienceItemDateRange,
  ProjectExperienceItem,
  JobExperienceItem,
  EducationExperienceItem,
  ClickEvent,
} from "../../../types"

import Tab from "./Tab"
import TimelineCard from "./TimelineCard"

const formatDateRange = (period: ExperienceItemDateRange): string => {
  const fromMoment = moment(period.from)
  const toMoment = moment(period.to)
  return `${fromMoment.format("MMMM YYYY")} - ${toMoment.format("MMMM YYYY")}`
}

enum TabName {
  jobs = "jobs",
  projects = "projects",
  education = "education",
}

interface State {
  activeTab: string
}

interface Actions {
  handleTabClicked: (e: ClickEvent, name: string) => void
}

const useHook = (): [State, Actions] => {
  const [activeTab, setActiveTab] = useState<string>(TabName.jobs)

  const state: State = { activeTab }
  const actions: Actions = {
    handleTabClicked: (e, name) => setActiveTab(name),
  }

  return [state, actions]
}

interface Props {
  jobs: JobExperienceItem[]
  projects: ProjectExperienceItem[]
  education: EducationExperienceItem[]
}

const ExperienceSection: React.FC<Props> = ({ projects, jobs, education }) => {
  const [{ activeTab }, { handleTabClicked }] = useHook()
  return (
    <div className="mt-16 mb-16">
      <div className="mb-8 flex justify-between">
        <div>
          <h2>experience</h2>
        </div>
        <div className="flex">
          {Object.keys(TabName).map((tabName, i, list) => (
            <Tab
              key={tabName}
              name={tabName}
              selected={tabName === activeTab}
              onClick={handleTabClicked}
              after={
                i < list.length - 1 ? <div className="mr-2">/</div> : undefined
              }
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="bg-red-600 flex-1"></div>
        <div className="px-3" style={{ flex: 6 }}>
          {activeTab === TabName.jobs &&
            jobs.map(({ period, place, name, skills, accomplishments }, i) => (
              <TimelineCard
                key={i + name}
                title={name}
                subtitle={place}
                subtitleIcon={faAt}
                tags={skills}
                tagIcon={faWrench}
                bullets={accomplishments}
              />
            ))}
          {activeTab === TabName.projects &&
            projects.map(({ period, name, skills, description, url }) => (
              <TimelineCard
                key={name}
                title={name}
                tags={skills}
                tagIcon={faWrench}
                bullets={[description]}
                url={url}
              />
            ))}
          {activeTab === TabName.education &&
            education.map(({ period, name, place, accomplishments }) => (
              <TimelineCard
                key={name}
                title={name}
                subtitle={place}
                subtitleIcon={faAt}
                bullets={accomplishments}
              />
            ))}
        </div>
        <div className="bg-red-600 flex-1"></div>
      </div>
    </div>
  )
}

export default ExperienceSection
