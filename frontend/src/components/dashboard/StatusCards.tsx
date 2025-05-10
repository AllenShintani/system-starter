'use client'

import Link from 'next/link'
import { Coins, BarChart3, TrendingUp, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Youtube, Music, Search } from 'lucide-react'

interface StatusCardsProps {
  currentTokenPrice: number
  priceChangePercent: number
  isYouTubeConnected: boolean
  isSpotifyConnected: boolean
  isSearchConnected: boolean
  dataConnectionsCount: number
  profileCompleteness: number
}

const StatusCards = ({
  currentTokenPrice,
  priceChangePercent,
  isYouTubeConnected,
  isSpotifyConnected,
  isSearchConnected,
  dataConnectionsCount,
  profileCompleteness,
}: StatusCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <Card className="bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-cyan-700">
            <Coins className="mr-2 h-5 w-5" />
            トークン市場価格
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-gray-900">
              {currentTokenPrice.toLocaleString()}円
            </span>
            <span
              className={`ml-2 text-sm font-medium ${
                priceChangePercent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {priceChangePercent >= 0 ? '+' : ''}
              {priceChangePercent}%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">市場決定価格 - 過去24時間</p>
        </CardContent>
        <CardFooter className="pt-0">
          <Link
            href="/marketplace"
            className="text-cyan-600 text-sm font-medium flex items-center"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            マーケット詳細
          </Link>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-cyan-700">
            <BarChart3 className="mr-2 h-5 w-5" />
            データ提供状況
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center">
                <Youtube className="h-4 w-4 mr-1 text-red-500" />
                YouTube
              </span>
              <Badge
                variant="secondary"
                className={isYouTubeConnected ? 'bg-green-100 text-green-800' : ''}
              >
                {isYouTubeConnected ? '連携済み' : '未連携'}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center">
                <Music className="h-4 w-4 mr-1 text-green-500" />
                Spotify
              </span>
              <Badge
                variant="secondary"
                className={isSpotifyConnected ? 'bg-green-100 text-green-800' : ''}
              >
                {isSpotifyConnected ? '連携済み' : '未連携'}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center">
                <Search className="h-4 w-4 mr-1 text-blue-500" />
                検索履歴
              </span>
              <Badge
                variant="secondary"
                className={isSearchConnected ? 'bg-green-100 text-green-800' : ''}
              >
                {isSearchConnected ? '連携済み' : '未連携'}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <span className="text-xs text-gray-500">更新: 2025/04/10</span>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-cyan-700">
            <TrendingUp className="mr-2 h-5 w-5" />
            情報価値スコア
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="relative w-full h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                style={{ width: `${profileCompleteness}%` }}
              />
            </div>
            <span className="ml-3 text-xl font-bold">{profileCompleteness}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {dataConnectionsCount} 種類のデータ連携済み・プロフィール完成度 {profileCompleteness}%
          </p>
        </CardContent>
        <CardFooter className="pt-0">
          <Link
            href="#"
            className="text-cyan-600 text-sm font-medium flex items-center"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            価値評価の詳細
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default StatusCards
