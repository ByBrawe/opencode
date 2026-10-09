import { expect, test } from "bun:test"
import { commandRefreshTargets } from "./command-refresh"

test("native command updates refresh the selected Desktop location", () => {
  expect(commandRefreshTargets(
    { type: "command.updated", location: { directory: "C:\\work\\repo" } },
    ["C:\\work\\repo", "C:\\work\\elsewhere"],
  )).toEqual(["C:\\work\\repo"])
})

test("global plugin command updates refresh active Desktop locations", () => {
  const active = ["C:\\work\\repo", "/home/dev/project"]
  expect(commandRefreshTargets({ type: "command.updated" }, active)).toEqual(active)
  expect(commandRefreshTargets({ type: "command.updated", location: null }, active)).toEqual(active)
})

test("unrelated events must not re-fetch native command catalogs", () => {
  expect(commandRefreshTargets({ type: "config.updated" }, ["/work"])).toEqual([])
  expect(commandRefreshTargets({ type: "session.execution.succeeded", location: { directory: "/work" } }, ["/work"])).toEqual([])
})
