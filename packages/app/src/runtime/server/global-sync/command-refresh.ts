type CommandEvent = {
  readonly type: string
  readonly location?: { readonly directory: string } | null
}

// Some plugin command updates are scoped to one location. Global updates have
// no location; refresh all active locations through the existing deduped queue.
export function commandRefreshTargets(event: CommandEvent, activeDirectories: readonly string[]): string[] {
  if (event.type !== "command.updated") return []
  if (event.location?.directory) return [event.location.directory]
  return [...activeDirectories]
}
