'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Eye, Coins, CheckCircle, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// モックデータ（実際には前のページからの状態を保持する必要があります）
const mockPurchaseData = {
  tokenName: 'YAMA Token',
  tokenOwner: 'tech_enthusiast',
  displayName: '山田太郎',
  price: 1200,
  avatar: 'https://i.pravatar.cc/150?img=1',
}

export default function ThankYouPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<'use' | 'hold' | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleOptionSelect = (option: 'use' | 'hold') => {
    setSelectedOption(option)
  }

  const handleConfirm = () => {
    if (!selectedOption) return

    setIsProcessing(true)

    // 実際にはここでAPIリクエストを送信し、選択を保存
    setTimeout(() => {
      // 選択に応じて適切なページにリダイレクト
      if (selectedOption === 'use') {
        router.push(`/user/${mockPurchaseData.tokenOwner}/data`)
      } else {
        router.push('/dashboard')
      }
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900">購入完了！</h1>
          <p className="text-lg text-gray-600">
            トークンの購入が完了しました。ありがとうございます！
          </p>
        </div>

        <Card className="mb-10">
          <CardHeader>
            <CardTitle>購入情報</CardTitle>
            <CardDescription>購入したトークンの情報です</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="relative w-14 h-14 mr-4">
                <Image
                  src={mockPurchaseData.avatar}
                  alt={mockPurchaseData.displayName}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{mockPurchaseData.tokenName}</h3>
                <p className="text-gray-500">
                  {mockPurchaseData.displayName} (@{mockPurchaseData.tokenOwner})
                </p>
              </div>
              <div className="ml-auto">
                <p className="font-bold text-xl text-cyan-500">
                  {mockPurchaseData.price.toLocaleString()}円
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium text-lg text-center mb-6">
                あなたはこのトークンをどう使いますか？
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div
                  className={`border rounded-lg p-6 text-center cursor-pointer transition-all ${
                    selectedOption === 'use'
                      ? 'border-2 border-cyan-400 bg-cyan-50'
                      : 'hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleOptionSelect('use')}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-100 mb-3">
                    <Eye className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h4 className="font-bold mb-2">使用する</h4>
                  <p className="text-sm text-gray-600">
                    トークン所有者の視聴履歴データや分析情報にアクセスします
                  </p>
                </div>

                <div
                  className={`border rounded-lg p-6 text-center cursor-pointer transition-all ${
                    selectedOption === 'hold'
                      ? 'border-2 border-cyan-400 bg-cyan-50'
                      : 'hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleOptionSelect('hold')}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-100 mb-3">
                    <Coins className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h4 className="font-bold mb-2">保有する</h4>
                  <p className="text-sm text-gray-600">
                    トークンを保有し、投資または応援の意思を示します
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={handleConfirm}
                  disabled={!selectedOption || isProcessing}
                  className="px-8"
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
                      選択を確定する
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              ※この選択は後からマイページで変更することができます
            </p>
          </CardFooter>
        </Card>

        <div className="text-center">
          <Link href="/marketplace">
            <Button
              variant="link"
              className="text-cyan-500"
            >
              マーケットプレイスに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
