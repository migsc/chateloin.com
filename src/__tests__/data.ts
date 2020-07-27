import dataJson from "../data.json"
import { ExperienceItem } from "../types"

describe("data.json", () => {
  it("all experience event dates are valid", () => {
    const {
      projects: projectEvents,
      jobs: jobEvents,
      education: educationEvents,
    } = dataJson.pages.code.experience

    const events: ExperienceItem[] = [
      ...projectEvents,
      ...jobEvents,
      ...educationEvents,
    ]

    for (const event of events) {
      try {
        expect(
          event.period.from.localeCompare(event.period.to as string)
        ).toBeLessThan(0)
      } catch (err) {
        console.log(`
        Event period is not valid ${JSON.stringify(event?.period)}
            See event with name ${event?.name}
        `)
      }
    }
  })
})
