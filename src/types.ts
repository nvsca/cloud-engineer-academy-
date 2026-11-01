export type Resource = { title: string; url: string; language: 'PT-BR' | 'EN'; access: 'Gratuito' | 'Freemium' | 'Pago'; why: string; costNote?: string };
export type Lesson = { id: string; title: string; description: string; minutes: number; resources: Resource[]; practice: string; check: string[] };
export type Project = { title: string; architecture: string; deliverables: string[]; acceptance: string[] };
export type Module = { id: string; number: number; title: string; stage: string; level: 'Fundamentos' | 'Intermediário' | 'Avançado'; description: string; objective: string; prerequisites: string[]; skills: string[]; hours: number; lessons: Lesson[]; resources: Resource[]; lab: string[]; review: string[]; project: Project; mastery: string[]; certifications: string[]; tags: string[] };
export type Progress = { done: string[]; projectDone: string[]; hoursByDay: Record<string, number>; weeklyAvailability: number; projectUrls: Record<string, string>; xp: number; updatedAt: string };
