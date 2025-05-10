'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Coins, User, CreditCard, ArrowRight, Clock, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// モックデータ（後でAPIから取得するように変更）
const mockTokenData = {
  id: 'tech_enthusiast',
  name: 'YAMA Token',
  description:
    'このトークンを購入すると、私のYouTube視聴履歴から得られる技術トレンドの分析と、おすすめコンテンツにアクセスできます。',
  price: 1200,
  period: 30, // 日数
  owner: {
    username: 'tech_enthusiast',
    displayName: '山田太郎',
    avatar: 'https://i.pravatar.cc/150?img=1',
    tags: ['Programming', 'AI', 'Tech Books'],
  },
}

export default function PurchasePage({ params }: { params: { tokenId: string } }) {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  // 本来はここでAPIからトークンデータを取得する
  const tokenData = { ...mockTokenData, id: params.tokenId }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // 実際の支払い処理はここに実装（Stripeなど）
    // このモックでは単に遅延後に完了ページに遷移
    setTimeout(() => {
      router.push('/thankyou')
    }, 1500)
  }

  const formatCardNumber = (value: string) => {
    // カード番号を4桁ごとにスペースで区切る
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''

    // 4文字ごとに分割して配列にする
    const parts = match
      ? Array.from({ length: Math.ceil(match.length / 4) }, (_, index) =>
          match.substring(index * 4, index * 4 + 4)
        )
      : []

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    setCardNumber(formattedValue)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-cyan-500 text-center">トークン購入</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* 左側：トークン情報 */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>購入情報</CardTitle>
                <CardDescription>トークンの詳細情報です</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 mr-3">
                    <Image
                      src={tokenData.owner.avatar}
                      alt={tokenData.owner.displayName}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{tokenData.owner.displayName}</h3>
                    <p className="text-sm text-gray-500">@{tokenData.owner.username}</p>
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-2">{tokenData.name}</h3>
                <p className="text-gray-700 text-sm mb-4">{tokenData.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tokenData.owner.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm">提供期間</span>
                  </div>
                  <span className="font-medium">{tokenData.period}日間</span>
                </div>

                <div className="bg-cyan-50 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Coins className="h-5 w-5 text-cyan-500 mr-2" />
                    <span className="text-sm">価格</span>
                  </div>
                  <span className="font-bold text-lg">{tokenData.price.toLocaleString()}円</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右側：支払いフォーム */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>お支払い情報</CardTitle>
                <CardDescription>安全なお支払いが可能です</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">カード名義</label>
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-2" />
                        <Input
                          required
                          placeholder="TARO YAMADA"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">カード番号</label>
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                        <Input
                          required
                          placeholder="4242 4242 4242 4242"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">有効期限</label>
                        <Input
                          required
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">セキュリティコード</label>
                        <Input
                          required
                          placeholder="123"
                          type="password"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          maxLength={3}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">トークン価格</span>
                        <span>{tokenData.price.toLocaleString()}円</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>合計</span>
                        <span>{tokenData.price.toLocaleString()}円</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          処理中...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          今すぐ購入する
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="flex items-center text-sm text-gray-500">
                  <Shield className="h-4 w-4 mr-2" />
                  安全な決済システムを使用しています
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Link href={`/user/${tokenData.owner.username}`}>
            <Button
              variant="link"
              className="text-cyan-500"
            >
              ユーザープロフィールに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
