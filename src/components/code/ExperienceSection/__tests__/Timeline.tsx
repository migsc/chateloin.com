import React from "react"
import renderer from "react-test-renderer"
import { indexOf } from "../Timeline"
import moment from "moment"

describe("Timeline indexOf", () => {
  it("indexOf works", () => {
    const mStartOfThisMonth = moment().startOf("month")
    const baseDate = mStartOfThisMonth.format("YYYY-MM-DD")
    for (let i = 0; i < 150; i++) {
      const offsetDate = mStartOfThisMonth
        .clone()
        .subtract(i, "month")
        .format("YYYY-MM-DD")
      const index = indexOf(baseDate, offsetDate)
      expect(index).toBe(i)
    }
  })
})
