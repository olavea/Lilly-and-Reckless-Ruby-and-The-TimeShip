import React from "react"
import { Link } from "gatsby"
import { addDays, eachDayOfInterval, format } from "date-fns"

import useBlockstack from "../store/useBlockstack"
import useEntries from "../store/useEntries"

import AppTemplate from "../templates/app"
import Entry from "../components/Entry"

const AppPage = () => {
  const [{ isPending }] = useBlockstack()
  const [{ entriesByDate = {} }, { changeEntry }] = useEntries()
  const today = new Date()
  const range = eachDayOfInterval({
    start: addDays(today, -1),
    end: addDays(today, 30),
  }).map((date) => {
    const dateString = format(date, "yyyy-MM-dd")
    const entry = entriesByDate[dateString] || {}

    return {
      entry: {
        ...entry,
        date: dateString,
      },
      predictions: [], // Need to add logic
    }
  })

  const navItems = [
    {
      label: "Profile",
      disabled: isPending,
      variant: "outlined",
      component: Link,
      to: "/profile",
    },
  ]

  return (
    <AppTemplate navItems={navItems}>
      {range.map(({ entry, predictions }) => {
        return (
          <Entry
            key={entry.date}
            entry={entry}
            predictions={predictions}
            handleEntryChange={changeEntry}
          ></Entry>
        )
      })}
    </AppTemplate>
  )
}

export default AppPage
