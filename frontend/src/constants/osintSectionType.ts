export const sectionTypes = {
  BASIC: 'OSINT基礎調査',
  INTERMEDIATE: '中級調査テクニック',
  ADVANCED: '高度な分析手法',
} as const

export type SectionTypeKey = keyof typeof sectionTypes
export type SectionType = (typeof sectionTypes)[SectionTypeKey]

export const courseType = {
  ZERO_TO_HACKER: 'Zero to Hacker',
}

export type CourseTypeKey = keyof typeof courseType
export type CourseType = (typeof courseType)[CourseTypeKey]
