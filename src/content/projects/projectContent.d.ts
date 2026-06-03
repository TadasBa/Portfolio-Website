import type { ProjectEntry } from "../../types/content";

export type ProjectContentEntry = Omit<ProjectEntry, "gallery" | "links">;

export const projectContent: ProjectContentEntry[];
