'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, Clock, Coins, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// モックデータ（後でAPIから取得するように変更）
const mockUserData = {
  username: 'tech_enthusiast',
  displayName: '山田太郎',
  tags: ['Programming', 'AI', 'Tech Books'],
  price: 1200,
  popularity: 87,
  avatar: 'https://i.pravatar.cc/300?img=1',
  bio: 'テクノロジー分野の情報収集が趣味です。特にAIと機械学習、プログラミング言語についての最新情報をフォローしています。',
  tokenInfo: {
    name: 'YAMA Token',
    description:
      'このトークンを購入すると、私のYouTube視聴履歴から得られる技術トレンドの分析と、おすすめコンテンツにアクセスできます。',
    period: 30, // 日数
    totalSupply: 100,
    sold: 42,
  },
  history: [
    {
      id: 1,
      title: '【2025年版】最新のAI開発フレームワーク比較',
      channel: 'Tech Future',
      date: '2025-04-01',
      thumbnail: 'https://i.pravatar.cc/150?img=11',
    },
    {
      id: 2,
      title: 'TypeScriptとRustで作る次世代Webアプリケーション',
      channel: 'Programming Master',
      date: '2025-04-02',
      thumbnail: 'https://i.pravatar.cc/150?img=12',
    },
    {
      id: 3,
      title: '量子コンピューティング入門：基礎から応用まで',
      channel: 'Science Lab',
      date: '2025-04-03',
      thumbnail: 'https://i.pravatar.cc/150?img=13',
    },
    {
      id: 4,
      title: 'エンジニアのためのブロックチェーン技術解説',
      channel: 'Blockchain Guide',
      date: '2025-04-05',
      thumbnail: 'https://i.pravatar.cc/150?img=14',
    },
  ],
}

export default function UserProfile({ params }: { params: { username: string } }) {
  const router = useRouter()
  const [userData, setUserData] = useState(mockUserData)

  // 本来はここでAPIからユーザーデータを取得する
  useEffect(() => {
    // 例えば：
    // async function fetchUserData() {
    //   const response = await fetch(`/api/users/${params.username}`)
    //   const data = await response.json()
    //   setUserData(data)
    // }
    // fetchUserData()

    // モックデータを使用（現在のusernameを表示するためにコピーを作成）
    setUserData({
      ...mockUserData,
      username: params.username,
    })
  }, [params.username])

  const handlePurchase = () => {
    router.push(`/purchase/${userData.username}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:shrink-0 p-6 md:p-8">
            <div className="relative w-32 h-32 mx-auto md:mx-0">
              <Image
                src={userData.avatar}
                alt={userData.displayName}
                fill
                className="rounded-full object-cover border-4 border-cyan-100"
              />
            </div>
          </div>
          <div className="p-6 md:p-8 md:flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {userData.displayName}
                </h1>
                <p className="text-gray-600">@{userData.username}</p>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="text-lg font-medium text-gray-700">{userData.popularity}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{userData.bio}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {userData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <Button
              onClick={handlePurchase}
              className="w-full md:w-auto"
            >
              <Coins className="mr-2 h-4 w-4" />
              トークンを購入（{userData.price.toLocaleString()}円）
            </Button>
          </div>
        </div>
      </div>

      <Tabs
        defaultValue="token"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="token">トークン情報</TabsTrigger>
          <TabsTrigger value="history">視聴履歴の抜粋</TabsTrigger>
        </TabsList>

        <TabsContent value="token">
          <Card>
            <CardHeader>
              <CardTitle>{userData.tokenInfo.name}</CardTitle>
              <CardDescription>このトークンで得られる価値</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">{userData.tokenInfo.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">提供期間</span>
                  </div>
                  <p className="text-lg font-medium">{userData.tokenInfo.period}日間</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Coins className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">総供給量</span>
                  </div>
                  <p className="text-lg font-medium">{userData.tokenInfo.totalSupply}トークン</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">購入済み</span>
                  </div>
                  <p className="text-lg font-medium">{userData.tokenInfo.sold}トークン</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handlePurchase}
                className="w-full"
              >
                トークンを購入する
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>最近の視聴履歴</CardTitle>
              <CardDescription>
                このユーザーが最近視聴したコンテンツから一部抜粋しています
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.history.map((item) => (
                  <div
                    key={item.id}
                    className="flex border rounded-lg overflow-hidden"
                  >
                    <div className="shrink-0 w-24 h-24 relative">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 flex-1">
                      <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{item.channel}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-500">
                トークンを購入すれば、すべての視聴履歴とその分析にアクセスできます
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <Link href="/marketplace">
          <Button
            variant="link"
            className="text-cyan-500"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            マーケットプレイスに戻る
          </Button>
        </Link>
      </div>
    </div>
  )
}
