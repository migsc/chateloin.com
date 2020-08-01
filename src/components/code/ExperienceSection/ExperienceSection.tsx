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

const segmentRatioByTab: { [key: string]: number } = {
  [TabName.jobs]: 0.5,
  [TabName.projects]: 0.75,
  [TabName.education]: 0.1,
}
// const segmentRatioByTab: { [key: string]: number } = {
//   [TabName.jobs]: 1,
//   [TabName.projects]: 1,
//   [TabName.education]: 1,
// }

interface Props {
  jobs: JobExperienceItem[]
  projects: ProjectExperienceItem[]
  education: EducationExperienceItem[]
}

const ExperienceSection: React.FC<Props> = ({ projects, jobs, education }) => {
  const [{ activeTab }, { handleTabClicked }] = useHook()

  console.trace("Hello World from HelloWorld!");
  return (
    <div className="pt-8 mt-8" id="experience">
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
        <Timeline
          active={activeTab === TabName.jobs}
          events={jobs.map(
            ({ period, place, name, skills, accomplishments }, i) => ({
              key: i + name,
              period: period,
              title: name,
              subtitle: place,
              subtitleIcon: faAt,
              tags: skills,
              tagIcon: faWrench,
              bullets: accomplishments,
            })
          )}
          segmentRatio={segmentRatioByTab[activeTab]}
        />

        {/* <Timeline
          active={activeTab === TabName.projects}
          events={projects.map(
            ({ period, name, skills, description, url }) => ({
              key: name,
              period: period,
              title: name,
              tags: skills,
              tagIcon: faWrench,
              bullets: [description],
              url: url,
            })
          )}
          segmentRatio={segmentRatioByTab[activeTab]}
        />

        <Timeline
          active={activeTab === TabName.education}
          events={education.map(({ period, name, place, accomplishments }) => ({
            key: name,
            period: period,
            title: name,
            subtitle: place,
            subtitleIcon: faAt,
            bullets: accomplishments,
          }))}
          segmentRatio={segmentRatioByTab[activeTab]}
        /> */}
      </div>
    </div>
  )
}

export default ExperienceSection
