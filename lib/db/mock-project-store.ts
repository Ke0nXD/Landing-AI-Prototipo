import "server-only";

import type { GeneratedLanding } from "@/types/landing";
import { sampleLanding } from "@/lib/ai/sample";

const mockProjects = new Map<string, GeneratedLanding>([
  [sampleLanding.id, sampleLanding],
]);

export async function listMockProjects() {
  return Array.from(mockProjects.values());
}

export async function saveMockProject(project: GeneratedLanding) {
  mockProjects.set(project.id, project);
  return project;
}
