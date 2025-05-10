import type { User } from '@/types/marketplace'

// モックデータ（後でAPIから取得するように変更）
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'tech_enthusiast',
    displayName: '山田太郎',
    tags: ['Programming', 'AI', 'Tech Books'],
    price: 1200,
    popularity: 87,
    avatar: 'https://i.pravatar.cc/150?img=1',
    ageRange: '20代',
    occupation: 'エンジニア',
    location: '東京',
  },
  {
    id: '2',
    username: 'investment_guru',
    displayName: '鈴木一郎',
    tags: ['Investment', 'Stocks', 'Crypto'],
    price: 2500,
    popularity: 95,
    avatar: 'https://i.pravatar.cc/150?img=2',
    ageRange: '30代',
    occupation: '経営者',
    location: '大阪',
  },
  {
    id: '3',
    username: 'travel_lover',
    displayName: '田中花子',
    tags: ['Travel', 'Photography', 'Culture'],
    price: 800,
    popularity: 72,
    avatar: 'https://i.pravatar.cc/150?img=3',
    ageRange: '20代',
    occupation: 'クリエイター',
    location: '福岡',
  },
  {
    id: '4',
    username: 'fitness_coach',
    displayName: '佐藤健太',
    tags: ['Fitness', 'Nutrition', 'Health'],
    price: 1500,
    popularity: 88,
    avatar: 'https://i.pravatar.cc/150?img=4',
    ageRange: '30代',
    occupation: '医療従事者',
    location: '北海道',
  },
  {
    id: '5',
    username: 'cooking_expert',
    displayName: '小林シェフ',
    tags: ['Cooking', 'Recipes', 'Food'],
    price: 1000,
    popularity: 79,
    avatar: 'https://i.pravatar.cc/150?img=5',
    ageRange: '40代',
    occupation: 'その他',
    location: '東京',
  },
  {
    id: '6',
    username: 'fashion_stylist',
    displayName: '高橋ミカ',
    tags: ['Fashion', 'Trends', 'Styling'],
    price: 1800,
    popularity: 91,
    avatar: 'https://i.pravatar.cc/150?img=6',
    ageRange: '20代',
    occupation: 'クリエイター',
    location: '京都',
  },
  {
    id: '7',
    username: 'science_researcher',
    displayName: '木村研究員',
    tags: ['Science', 'Research', 'Technology'],
    price: 2200,
    popularity: 85,
    avatar: 'https://i.pravatar.cc/150?img=7',
    ageRange: '40代',
    occupation: '研究者',
    location: '大阪',
  },
  {
    id: '8',
    username: 'student_coder',
    displayName: '伊藤学',
    tags: ['Coding', 'Learning', 'University'],
    price: 600,
    popularity: 65,
    avatar: 'https://i.pravatar.cc/150?img=8',
    ageRange: '10代',
    occupation: '学生',
    location: '名古屋',
  },
]

// 年代カテゴリ
export const ageRanges = ['10代以下', '10代', '20代', '30代', '40代', '50代', '60代以上']

// 職業カテゴリ
export const occupations = [
  'エンジニア',
  'デザイナー',
  'マーケター',
  '経営者',
  '学生',
  '研究者',
  '医療従事者',
  '教育者',
  'クリエイター',
  'その他',
]

// 地域カテゴリ
export const locations = [
  '東京',
  '大阪',
  '名古屋',
  '福岡',
  '北海道',
  '京都',
  '神奈川',
  '千葉',
  '埼玉',
  '沖縄',
  'その他',
]

// 期間オプション
export const periodOptions = [
  { id: '1week', name: '1週間（7日間）', days: 7 },
  { id: '2week', name: '2週間（14日間）', days: 14 },
  { id: '1month', name: '1ヶ月（30日間）', days: 30 },
  { id: '3month', name: '3ヶ月（90日間）', days: 90 },
]
