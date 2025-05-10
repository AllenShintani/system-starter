export interface UserProfile {
  displayName: string
  age: string
  ageRange: string
  location: string
  anonymityLevel: 'anonymous' | 'public'
  interests: string[]
  occupation: string[]
  bio: string
  avatar: string
}

export interface StatsData {
  connectedServices: string[]
  dataDays: number
  currentPrice: number
  priceIncrease: number
  tokensPurchased: number
}
