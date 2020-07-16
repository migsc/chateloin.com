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
import Timeline from "./Timeline"
import TimelineCard from "./TimelineCard"

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
      {activeTab === TabName.jobs && (
        <Timeline>
          {jobs.map(({ period, place, name, skills, accomplishments }, i) => (
            <TimelineCard
              key={i + name}
              period={period}
              title={name}
              subtitle={place}
              subtitleIcon={faAt}
              tags={skills}
              tagIcon={faWrench}
              bullets={accomplishments}
            />
          ))}
        </Timeline>
      )}

      {activeTab === TabName.projects && (
        <Timeline>
          {projects.map(({ period, name, skills, description, url }) => (
            <TimelineCard
              key={name}
              period={period}
              title={name}
              tags={skills}
              tagIcon={faWrench}
              bullets={[description]}
              url={url}
            />
          ))}
        </Timeline>
      )}

      {activeTab === TabName.education && (
        <Timeline>
          {education.map(({ period, name, place, accomplishments }) => (
            <TimelineCard
              key={name}
              period={period}
              title={name}
              subtitle={place}
              subtitleIcon={faAt}
              bullets={accomplishments}
            />
          ))}
          }
        </Timeline>
      )}
    </div>
  )
}

export default ExperienceSection
