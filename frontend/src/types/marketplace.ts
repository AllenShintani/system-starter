// マーケットプレイス関連の型定義
export interface User {
  id: string
  username: string
  displayName: string
  tags: string[]
  price: number
  popularity: number
  avatar: string
  ageRange: string
  occupation: string
  location: string
}
export type SortOption = 'popularity' | 'price-asc' | 'price-desc'

export interface PeriodOption {
  id: string
  name: string
  days: number
}
