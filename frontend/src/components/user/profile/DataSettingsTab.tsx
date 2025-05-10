'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Lock as LockIcon,
  User,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
} from 'lucide-react'
import type { UserProfile, StatsData } from '@/types/profile'

interface DataSettingsTabProps {
  profile: UserProfile
  statsData: StatsData
  onAnonymityChange: (value: string) => void
  onBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const DataSettingsTab = ({
  profile,
  statsData,
  onAnonymityChange,
  onBioChange,
}: DataSettingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>データ提供と公開レベルの設定</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 匿名レベル設定 */}
        <div className="space-y-2">
          <Label>公開形式の設定</Label>
          <p className="text-sm text-gray-500 mb-4">
            あなたのトークンをどのような形で公開するか選択してください。公開するとトークンの市場価値が高まります。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`border rounded-lg cursor-pointer hover:shadow-md transition p-4 ${
                profile.anonymityLevel === 'anonymous'
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-gray-200'
              }`}
              onClick={() => onAnonymityChange('anonymous')}
            >
              <div className="flex flex-col items-center text-center">
                <LockIcon className="h-8 w-8 mb-2 text-gray-600" />
                <h3 className="font-medium">匿名公開</h3>
                <p className="text-xs text-gray-500 mt-1">
                  個人を特定できない形でデータを公開。タグと分析情報のみが表示されます。
                </p>
              </div>
            </div>

            <div
              className={`border rounded-lg cursor-pointer hover:shadow-md transition p-4 ${
                profile.anonymityLevel === 'public'
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-gray-200'
              }`}
              onClick={() => onAnonymityChange('public')}
            >
              <div className="flex flex-col items-center text-center">
                <User className="h-8 w-8 mb-2 text-cyan-500" />
                <h3 className="font-medium">公開</h3>
                <p className="text-xs text-gray-500 mt-1">
                  あなたのプロフィールと詳細なデータを実名で公開。トークンの市場価値が最大化します。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 公開時のみ表示するデータ共有メッセージ */}
        {profile.anonymityLevel === 'public' && (
          <div className="mt-6 space-y-2">
            <Label>データ共有のメッセージ（公開時のみ）</Label>
            <Textarea
              value={profile.bio}
              onChange={onBioChange}
              placeholder="トークン購入者に向けたメッセージや、あなたのデータの特徴を入力してください"
              rows={3}
              className="border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              あなたのデータの魅力やユニークな価値を伝えることで、トークンの市場価値を高められます
            </p>
          </div>
        )}

        {/* データ提供設定 */}
        <div className="mt-8 space-y-2">
          <Label>データ提供設定</Label>
          <p className="text-sm text-gray-500 mb-4">現在提供中のデータソース</p>

          <div className="space-y-4">
            <ConnectedServiceItem
              name="YouTube"
              isConnected={statsData.connectedServices.includes('YouTube')}
            />

            <ConnectedServiceItem
              name="Google検索"
              isConnected={statsData.connectedServices.includes('Google検索')}
            />

            <div className="flex items-center mb-2">
              <Badge
                variant="outline"
                className="mr-2"
              >
                追加サービス
              </Badge>
              <span className="text-sm text-gray-500">
                より多くのデータソースを接続することでトークンの価値が高まります
              </span>
            </div>

            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                className="text-cyan-600 border-cyan-300 hover:bg-cyan-50"
              >
                + データソースを追加する
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ConnectedServiceItemProps {
  name: string
  isConnected: boolean
}

const ConnectedServiceItem = ({ name, isConnected }: ConnectedServiceItemProps) => {
  return (
    <div className="flex justify-between items-center p-3 border rounded-md">
      <div className="flex items-center">
        <span className="font-medium">{name}</span>
      </div>
      {isConnected ? (
        <Badge className="bg-green-100 text-green-800 border-0 flex items-center gap-1">
          <CheckCircleIcon className="h-3 w-3" /> 接続中
        </Badge>
      ) : (
        <Badge
          variant="outline"
          className="text-gray-500 flex items-center gap-1"
        >
          <XCircleIcon className="h-3 w-3" /> 未接続
        </Badge>
      )}
    </div>
  )
}

export default DataSettingsTab
