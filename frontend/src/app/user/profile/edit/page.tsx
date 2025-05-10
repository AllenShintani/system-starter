'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import ProfileSidebar from '@/components/user/profile/ProfileSidebar'
import BasicInfoTab from '@/components/user/profile/BasicInfoTab'
import DataSettingsTab from '@/components/user/profile/DataSettingsTab'
import type { UserProfile, StatsData } from '@/types/profile'

const ProfilePage = () => {
  // ユーザープロフィールのステート
  const [profile, setProfile] = useState<UserProfile>({
    displayName: 'ユーザー名',
    age: '25',
    ageRange: '20代',
    location: '東京',
    anonymityLevel: 'anonymous', // anonymous, public
    interests: ['プログラミング', 'ビジネス', '投資'],
    occupation: ['エンジニア'],
    bio: 'プロフィールの説明文をここに入力してください。',
    avatar: '', // プロフィール画像URL
  })

  // 提供データ情報（自動反映系）
  const [statsData] = useState<StatsData>({
    connectedServices: ['YouTube', 'Google検索'],
    dataDays: 120,
    currentPrice: 1350,
    priceIncrease: 15.2, // %
    tokensPurchased: 28,
  })

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

  // 入力変更ハンドラー
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  // 匿名レベル変更ハンドラー
  const handleAnonymityChange = (value: string) => {
    setProfile((prev) => ({ ...prev, anonymityLevel: value as 'anonymous' | 'public' }))
  }

  // 年代選択ハンドラー
  const handleAgeRangeChange = (value: string) => {
    setProfile((prev) => ({ ...prev, ageRange: value }))
  }

  // タグ追加ハンドラー
  const addTag = (category: 'interests' | 'occupation', tag: string) => {
    if (!profile[category].includes(tag)) {
      setProfile((prev) => ({
        ...prev,
        [category]: [...prev[category], tag],
      }))
    }
  }

  // タグ削除ハンドラー
  const removeTag = (category: 'interests' | 'occupation', tag: string) => {
    setProfile((prev) => ({
      ...prev,
      [category]: prev[category].filter((t) => t !== tag),
    }))
  }

  // プロフィール更新ハンドラー
  const handleProfileUpdate = () => {
    // TODO: プロフィール更新APIの呼び出し
    // 開発時にのみコンソールログを表示
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('プロフィール更新:', profile)
    }
    alert('プロフィールが更新されました')
  }

  // アバター画像アップロードハンドラー
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // TODO: 画像アップロードAPIの呼び出し
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfile((prev) => ({ ...prev, avatar: e.target!.result as string }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Bio変更用のハンドラー（DataSettingsTabで使用）
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfile((prev) => ({ ...prev, bio: e.target.value }))
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-cyan-600">マイプロフィール</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* サイドバー - プロフィール概要 */}
        <div className="md:col-span-1">
          <ProfileSidebar
            profile={profile}
            statsData={statsData}
            onAvatarUpload={handleAvatarUpload}
          />
        </div>

        {/* メインコンテンツ - プロフィール編集 */}
        <div className="md:col-span-2">
          <Tabs
            defaultValue="personal"
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">基本情報</TabsTrigger>
              <TabsTrigger value="data">データと公開設定</TabsTrigger>
            </TabsList>

            {/* 基本情報タブ */}
            <TabsContent value="personal">
              <BasicInfoTab
                profile={profile}
                occupationCategories={occupationCategories}
                interestCategories={interestCategories}
                onInputChange={handleInputChange}
                onAgeRangeChange={handleAgeRangeChange}
                addTag={addTag}
                removeTag={removeTag}
              />
            </TabsContent>

            {/* データと公開設定タブ */}
            <TabsContent value="data">
              <DataSettingsTab
                profile={profile}
                statsData={statsData}
                onAnonymityChange={handleAnonymityChange}
                onBioChange={handleBioChange}
              />
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleProfileUpdate}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              保存する
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
