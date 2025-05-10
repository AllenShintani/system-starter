'use client'

import type { ChangeEvent } from 'react'
import { Shield, Lock, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface AccessRightsSettingProps {
  tokenDescription: string
  accessLevel: string
  setAccessLevel: (value: string) => void
  setTokenDescription: (value: string) => void
  handleUpdateAccessSettings: () => void
  tags: string[]
  profileCompleteness: number
}

const AccessRightsSetting = ({
  tokenDescription,
  accessLevel,
  setAccessLevel,
  setTokenDescription,
  handleUpdateAccessSettings,
  tags,
  profileCompleteness,
}: AccessRightsSettingProps) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Shield className="mr-2 h-5 w-5 text-cyan-500" />
        情報アクセス権設定
      </h2>
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">公開形式の設定</label>
            <p className="text-xs text-gray-500 mb-3">
              あなたのトークンをどのような形で公開するか選択してください。公開するとトークンの市場価値が高まります。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  accessLevel === 'anonymous' ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200'
                }`}
                onClick={() => setAccessLevel('anonymous')}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">匿名公開</h3>
                  <Lock className="h-4 w-4 text-gray-500" />
                </div>
                <p className="text-xs text-gray-600">
                  個人を特定できない形でデータを公開。タグと分析情報のみが表示されます。
                </p>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  accessLevel === 'public' ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200'
                }`}
                onClick={() => setAccessLevel('public')}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">公開</h3>
                  <User className="h-4 w-4 text-cyan-500" />
                </div>
                <p className="text-xs text-gray-600">
                  あなたのプロフィールと詳細なデータを実名で公開。トークンの市場価値が最大化します。
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-700">プロフィール完成度</div>
                <div className="text-sm font-medium text-gray-700">{profileCompleteness}%</div>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <div
                  className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  style={{ width: `${profileCompleteness}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                プロフィールの完成度が高いほど、トークンの市場価値が向上します
              </p>
            </div>
          </div>

          {accessLevel === 'public' && (
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                データ共有のメッセージ
              </label>
              <Textarea
                value={tokenDescription}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setTokenDescription(e.target.value)
                }
                placeholder="トークン購入者に向けたメッセージや、あなたのデータの特徴を入力してください"
                rows={3}
                className="border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400"
              />
              <p className="text-xs text-gray-500 mt-1">
                あなたのデータの魅力やユニークな価値を伝えることで、トークンの市場価値を高められます
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleUpdateAccessSettings}
              disabled={(accessLevel === 'public' && !tokenDescription) || tags.length < 3}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              <Shield className="mr-2 h-4 w-4" />
              アクセス設定を更新する
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccessRightsSetting
