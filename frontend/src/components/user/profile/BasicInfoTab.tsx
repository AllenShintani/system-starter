'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { UserProfile } from '@/types/profile'

interface BasicInfoTabProps {
  profile: UserProfile
  occupationCategories: string[]
  interestCategories: string[]
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onAgeRangeChange: (value: string) => void
  addTag: (category: 'interests' | 'occupation', tag: string) => void
  removeTag: (category: 'interests' | 'occupation', tag: string) => void
}

const BasicInfoTab = ({
  profile,
  occupationCategories,
  interestCategories,
  onInputChange,
  onAgeRangeChange,
  addTag,
  removeTag,
}: BasicInfoTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>個人情報の編集</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">表示名</Label>
            <Input
              id="displayName"
              name="displayName"
              value={profile.displayName}
              onChange={onInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ageRange">年代</Label>
            <Select
              value={profile.ageRange}
              onValueChange={onAgeRangeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="年代を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10代以下">10代以下</SelectItem>
                <SelectItem value="10代">10代</SelectItem>
                <SelectItem value="20代">20代</SelectItem>
                <SelectItem value="30代">30代</SelectItem>
                <SelectItem value="40代">40代</SelectItem>
                <SelectItem value="50代">50代</SelectItem>
                <SelectItem value="60代以上">60代以上</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">年齢</Label>
            <Input
              id="age"
              name="age"
              type="number"
              min="1"
              max="120"
              value={profile.age}
              onChange={onInputChange}
              placeholder="具体的な年齢"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">所在地（国または都市）</Label>
          <Input
            id="location"
            name="location"
            value={profile.location}
            onChange={onInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">自己紹介</Label>
          <Textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={onInputChange}
            rows={4}
          />
        </div>

        {/* 職業カテゴリ */}
        <div className="space-y-2">
          <Label>職業カテゴリ（{profile.occupation.length}/3）</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {profile.occupation.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-gray-200"
                onClick={() => removeTag('occupation', tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {occupationCategories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className={`cursor-pointer hover:bg-gray-100 ${
                  profile.occupation.includes(category) ? 'opacity-50' : ''
                }`}
                onClick={() =>
                  profile.occupation.length < 3 &&
                  !profile.occupation.includes(category) &&
                  addTag('occupation', category)
                }
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* 興味関心カテゴリ */}
        <div className="space-y-2">
          <Label>興味関心カテゴリ（{profile.interests.length}/5）</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {profile.interests.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-gray-200"
                onClick={() => removeTag('interests', tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {interestCategories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className={`cursor-pointer hover:bg-gray-100 ${
                  profile.interests.includes(category) ? 'opacity-50' : ''
                }`}
                onClick={() =>
                  profile.interests.length < 5 &&
                  !profile.interests.includes(category) &&
                  addTag('interests', category)
                }
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BasicInfoTab
