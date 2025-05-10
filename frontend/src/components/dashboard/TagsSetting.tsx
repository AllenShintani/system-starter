'use client'

import { Tag, Briefcase, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// 選択可能な職業カテゴリ
const occupationCategories = [
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

// 選択可能な興味関心カテゴリ
const interestCategories = [
  'テクノロジー',
  'ビジネス',
  '投資',
  '音楽',
  '映画',
  '読書',
  '旅行',
  'スポーツ',
  '料理',
  'ファッション',
  'アート',
  '健康',
  '教育',
  '環境問題',
  '社会貢献',
]

interface TagsSettingProps {
  interests: string[]
  occupations: string[]
  handleAddTag: (category: 'interests' | 'occupations', tag: string) => void
  handleRemoveTag: (category: 'interests' | 'occupations', tag: string) => void
}

const TagsSetting = ({
  interests,
  occupations,
  handleAddTag,
  handleRemoveTag,
}: TagsSettingProps) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Tag className="mr-2 h-5 w-5 text-cyan-500" />
        タグ設定（専門性のアピール）
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        あなたの専門分野や関心領域をタグで表現することで、トークンの市場価値が向上します。
      </p>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-3 flex items-center">
              <Briefcase className="mr-2 h-4 w-4 text-cyan-500" />
              職業カテゴリ（{occupations.length}/3）
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {occupations.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-3 py-1 bg-cyan-100 text-cyan-800 hover:bg-cyan-200 cursor-pointer"
                  onClick={() => handleRemoveTag('occupations', tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {occupationCategories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className={`cursor-pointer hover:bg-gray-100 ${
                    occupations.includes(category) ? 'opacity-50' : ''
                  }`}
                  onClick={() =>
                    occupations.length < 3 &&
                    !occupations.includes(category) &&
                    handleAddTag('occupations', category)
                  }
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-3 flex items-center">
              <Heart className="mr-2 h-4 w-4 text-cyan-500" />
              興味関心カテゴリ（{interests.length}/5）
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {interests.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-3 py-1 bg-cyan-100 text-cyan-800 hover:bg-cyan-200 cursor-pointer"
                  onClick={() => handleRemoveTag('interests', tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {interestCategories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className={`cursor-pointer hover:bg-gray-100 ${
                    interests.includes(category) ? 'opacity-50' : ''
                  }`}
                  onClick={() =>
                    interests.length < 5 &&
                    !interests.includes(category) &&
                    handleAddTag('interests', category)
                  }
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TagsSetting
