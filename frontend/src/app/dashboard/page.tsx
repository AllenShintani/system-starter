'use client'

import { useState } from 'react'
import StatusCards from '@/components/dashboard/StatusCards'
import TagsSetting from '@/components/dashboard/TagsSetting'
import AccessRightsSetting from '@/components/dashboard/AccessRightsSetting'
import DataConnections from '@/components/dashboard/DataConnections'
import FooterNavigation from '@/components/dashboard/FooterNavigation'

export default function Dashboard() {
  const [isYouTubeConnected, setIsYouTubeConnected] = useState(false)
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false)
  const [isSearchConnected, setIsSearchConnected] = useState(false)
  const [interests, setInterests] = useState<string[]>([])
  const [occupations, setOccupations] = useState<string[]>([])
  const [tokenDescription, setTokenDescription] = useState<string>('')
  const [accessLevel, setAccessLevel] = useState<string>('anonymous') // anonymous, public
  const [profileCompleteness, setProfileCompleteness] = useState<number>(35) // percentage of profile completed

  const handleConnectYouTube = () => {
    // Todo: 実際にはGoogle OAuthを使った連携処理を行う
    setIsYouTubeConnected(true)
  }

  const handleConnectSpotify = () => {
    // Todo: 実際にはSpotify OAuthを使った連携処理を行う
    setIsSpotifyConnected(true)
  }

  const handleConnectSearch = () => {
    // Todo: 実際にはGoogle検索履歴連携処理を行う
    setIsSearchConnected(true)
  }

  const handleAddTag = (category: 'interests' | 'occupations', tag: string) => {
    if (category === 'interests' && interests.length < 5) {
      setInterests([...interests, tag])
    } else if (category === 'occupations' && occupations.length < 3) {
      setOccupations([...occupations, tag])
    }
  }

  const handleRemoveTag = (category: 'interests' | 'occupations', tag: string) => {
    if (category === 'interests') {
      setInterests(interests.filter((t) => t !== tag))
    } else if (category === 'occupations') {
      setOccupations(occupations.filter((t) => t !== tag))
    }
  }

  const handleUpdateAccessSettings = () => {
    // アクセス権設定のロジックを実装
    const message =
      accessLevel === 'public'
        ? '公開モードで情報アクセス権の設定が完了しました！'
        : '匿名モードで情報アクセス権の設定が完了しました！'
    alert(message)

    // プロフィール完成度を更新 - タグ数などから計算
    const tagsScore = (interests.length / 5) * 30 + (occupations.length / 3) * 20
    const accessScore = accessLevel === 'public' ? 15 : 5
    const connectionsScore = dataConnectionsCount * 10

    setProfileCompleteness(Math.min(Math.round(tagsScore + accessScore + connectionsScore), 100))
  }

  // トークンの現在価格と変動率（モック）- 市場価格に基づく
  const currentTokenPrice = 1250
  const priceChangePercent = 3.2
  const dataConnectionsCount = [isYouTubeConnected, isSpotifyConnected, isSearchConnected].filter(
    Boolean
  ).length

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-cyan-500">ダッシュボード</h1>
      <p className="text-gray-600 mb-8">あなたのデータを管理し、価値を最大化しましょう</p>
      <StatusCards
        currentTokenPrice={currentTokenPrice}
        priceChangePercent={priceChangePercent}
        isYouTubeConnected={isYouTubeConnected}
        isSpotifyConnected={isSpotifyConnected}
        isSearchConnected={isSearchConnected}
        dataConnectionsCount={dataConnectionsCount}
        profileCompleteness={profileCompleteness}
      />

      <DataConnections
        isYouTubeConnected={isYouTubeConnected}
        isSpotifyConnected={isSpotifyConnected}
        isSearchConnected={isSearchConnected}
        handleConnectYouTube={handleConnectYouTube}
        handleConnectSpotify={handleConnectSpotify}
        handleConnectSearch={handleConnectSearch}
      />

      <TagsSetting
        interests={interests}
        occupations={occupations}
        handleAddTag={handleAddTag}
        handleRemoveTag={handleRemoveTag}
      />

      <AccessRightsSetting
        tokenDescription={tokenDescription}
        accessLevel={accessLevel}
        setAccessLevel={setAccessLevel}
        setTokenDescription={setTokenDescription}
        handleUpdateAccessSettings={handleUpdateAccessSettings}
        tags={[...interests, ...occupations]}
        profileCompleteness={profileCompleteness}
      />

      {/* フッターナビゲーション */}
      <FooterNavigation />
    </div>
  )
}
