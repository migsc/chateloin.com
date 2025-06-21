import React from "react"
import renderer from "react-test-renderer"
import Tab from "../Tab"

describe("Tab", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Tab name={"Tab"} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
