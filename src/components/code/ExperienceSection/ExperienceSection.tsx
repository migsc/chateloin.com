import React, { useState } from "react"

import {
  ProjectExperienceItem,
  JobExperienceItem,
  EducationExperienceItem,
  ClickEvent,
} from "../../../types"

import Tab from "./Tab"

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
  const [activeTab, setActiveTab] = useState<string>(TabName.projects)

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
            <>
              <Tab
                key={tabName}
                name={tabName}
                selected={tabName === activeTab}
                onClick={handleTabClicked}
              />
              {i < list.length - 1 && <div className="mr-2">/</div>}
            </>
          ))}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="bg-red-600 flex-1"></div>
        <div className="bg-blue-600" style={{ flex: 6 }}>
          {activeTab === TabName.jobs &&
            jobs.map(({ period, place, name, skills, accomplishments }) => (
              <div>{name}</div>
            ))}
          {activeTab === TabName.projects &&
            projects.map(({ period, name, skills, description, url }) => (
              <div>{name}</div>
            ))}
          {activeTab === TabName.education &&
            education.map(({ period, name, place, accomplishments }) => (
              <div>{name}</div>
            ))}
        </div>
        <div className="bg-red-600 flex-1"></div>
      </div>
    </div>
  )
}

export default ExperienceSection
