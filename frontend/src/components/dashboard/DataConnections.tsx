'use client'

import { ExternalLink, Youtube, Music, Search, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockYouTubeHistory, mockSpotifyHistory, mockSearchHistory } from '@/constants/mockData'

interface DataConnectionsProps {
  isYouTubeConnected: boolean
  isSpotifyConnected: boolean
  isSearchConnected: boolean
  handleConnectYouTube: () => void
  handleConnectSpotify: () => void
  handleConnectSearch: () => void
}

const DataConnections = ({
  isYouTubeConnected,
  isSpotifyConnected,
  isSearchConnected,
  handleConnectYouTube,
  handleConnectSpotify,
  handleConnectSearch,
}: DataConnectionsProps) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <ExternalLink className="mr-2 h-5 w-5 text-cyan-500" />
        データ連携（トークン価値向上）
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        複数のサービスと連携することで、あなたの情報の価値が高まり、トークンの市場価格が上昇します。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* YouTube連携 */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
            <CardTitle className="flex items-center text-gray-800">
              <Youtube className="mr-2 h-5 w-5 text-red-600" />
              YouTube
            </CardTitle>
            <CardDescription>視聴履歴の連携で市場価値が+25%向上</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {!isYouTubeConnected ? (
              <div className="flex flex-col items-center justify-center py-6">
                <Button
                  onClick={handleConnectYouTube}
                  className="bg-red-500 hover:bg-red-600"
                >
                  YouTubeと連携する
                </Button>
                <p className="mt-3 text-xs text-gray-500 text-center">
                  興味・関心を表す重要なデータです。連携するとトークン価値が大幅に向上します
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">最近の視聴履歴</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                  >
                    <RefreshCw className="mr-1 h-3 w-3" />
                    更新
                  </Button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {mockYouTubeHistory.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-100 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                    >
                      <h4 className="text-sm font-medium text-gray-800 truncate">{item.title}</h4>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{item.channel}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 text-xs text-cyan-500 p-0"
                >
                  すべての履歴を見る
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Spotify連携 */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
            <CardTitle className="flex items-center text-gray-800">
              <Music className="mr-2 h-5 w-5 text-green-600" />
              Spotify
            </CardTitle>
            <CardDescription>音楽嗜好の連携で市場価値が+15%向上</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {!isSpotifyConnected ? (
              <div className="flex flex-col items-center justify-center py-6">
                <Button
                  onClick={handleConnectSpotify}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Spotifyと連携する
                </Button>
                <p className="mt-3 text-xs text-gray-500 text-center">
                  音楽の嗜好は個性や感性を表す貴重なデータです
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">最近の再生履歴</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                  >
                    <RefreshCw className="mr-1 h-3 w-3" />
                    更新
                  </Button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {mockSpotifyHistory.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-100 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                    >
                      <h4 className="text-sm font-medium text-gray-800 truncate">{item.title}</h4>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{item.artist}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 text-xs text-cyan-500 p-0"
                >
                  すべての履歴を見る
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 検索履歴連携 */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="flex items-center text-gray-800">
              <Search className="mr-2 h-5 w-5 text-blue-600" />
              検索履歴
            </CardTitle>
            <CardDescription>検索履歴の連携で市場価値が+20%向上</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {!isSearchConnected ? (
              <div className="flex flex-col items-center justify-center py-6">
                <Button
                  onClick={handleConnectSearch}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  検索履歴を連携する
                </Button>
                <p className="mt-3 text-xs text-gray-500 text-center">
                  検索履歴は知的好奇心や専門性を示す重要なデータです
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">最近の検索履歴</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                  >
                    <RefreshCw className="mr-1 h-3 w-3" />
                    更新
                  </Button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {mockSearchHistory.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-100 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                    >
                      <h4 className="text-sm font-medium text-gray-800 truncate">
                        &ldquo;{item.query}&rdquo;
                      </h4>
                      <div className="flex justify-end text-xs text-gray-500 mt-1">
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 text-xs text-cyan-500 p-0"
                >
                  すべての履歴を見る
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DataConnections
