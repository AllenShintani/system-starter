export const sectionTypes = {
  ZERO_TO_HACKER: 'Zero to Hacker',
} as const

export type SectionTypeKey = keyof typeof sectionTypes
export type SectionType = (typeof sectionTypes)[SectionTypeKey]

export const courseType = {
  ZERO_TO_HACKER: 'Zero to Hacker',
}

export type CourseTypeKey = keyof typeof courseType
export type CourseType = (typeof courseType)[CourseTypeKey]
