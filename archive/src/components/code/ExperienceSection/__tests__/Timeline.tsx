import React from "react"
import renderer from "react-test-renderer"
import { indexOf } from "../Timeline"
import moment from "moment"

describe("Timeline indexOf", () => {
  it("indexOf works", () => {
    const mStartOfThisMonth = moment().startOf("month")
    const baseDate = mStartOfThisMonth.format("YYYY-MM")
    const nMonthsToTest = mStartOfThisMonth.diff(moment("2008-01-01"), "month")

    for (let i = 0; i <= nMonthsToTest; i++) {
      const offsetDate = mStartOfThisMonth
        .clone()
        .subtract(i, "month")
        .format("YYYY-MM")
      expect(indexOf(baseDate, offsetDate)).toBe(i)
    }
  })
})
