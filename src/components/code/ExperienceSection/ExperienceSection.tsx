import React, { useState } from "react"

import {
  ProjectExperienceItem,
  JobExperienceItem,
  EducationExperienceItem,
  ClickEvent,
} from "../../../types"

import Tab from "./Tab"

enum TabName {
  projects = "projects",
  jobs = "jobs",
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
  projects: ProjectExperienceItem[]
  jobs: JobExperienceItem[]
  education: EducationExperienceItem[]
}

const ExperienceSection: React.FC<Props> = ({ projects, jobs, education }) => {
  const [{ activeTab }, { handleTabClicked }] = useHook()
  return (
    <div className="mt-16 mb-16">
      <h2 className="mb-8">experience</h2>
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
    </div>
  )
}

export default ExperienceSection
