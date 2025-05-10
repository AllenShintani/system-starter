'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Camera as CameraIcon,
  Lock as LockIcon,
  User,
  TrendingUp as TrendingUpIcon,
  Package as PackageIcon,
  Calendar as CalendarIcon,
  Users as UsersIcon,
} from 'lucide-react'
import type { UserProfile, StatsData } from '@/types/profile'

interface ProfileSidebarProps {
  profile: UserProfile
  statsData: StatsData
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProfileSidebar = ({ profile, statsData, onAvatarUpload }: ProfileSidebarProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4 group">
            <Avatar className="h-28 w-28 border-2 border-cyan-200">
              {profile.avatar ? (
                <AvatarImage
                  src={profile.avatar}
                  alt={profile.displayName}
                />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white text-2xl">
                  {profile.displayName.substring(0, 2)}
                </AvatarFallback>
              )}
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-cyan-500 p-2 rounded-full cursor-pointer hover:bg-cyan-600 transition"
            >
              <CameraIcon className="h-4 w-4 text-white" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAvatarUpload}
            />
          </div>

          <h3 className="text-xl font-semibold">{profile.displayName}</h3>
          <p className="text-gray-500 mb-4">
            {profile.ageRange} • {profile.location}
          </p>

          {/* 匿名レベル表示 */}
          <div className="mb-4">
            {profile.anonymityLevel === 'anonymous' && (
              <Badge
                variant="outline"
                className="flex gap-1 items-center"
              >
                <LockIcon className="h-3 w-3" /> 匿名公開モード
              </Badge>
            )}
            {profile.anonymityLevel === 'public' && (
              <Badge
                variant="outline"
                className="flex gap-1 items-center"
              >
                <User className="h-3 w-3" /> 公開モード
              </Badge>
            )}
          </div>

          {/* 自動反映データ */}
          <div className="w-full mt-4 space-y-3">
            <StatCard
              icon={<PackageIcon className="h-4 w-4 text-cyan-500" />}
              title="提供データ"
              value={`${statsData.connectedServices.length}種類`}
            >
              <div className="flex flex-wrap gap-1">
                {statsData.connectedServices.map((service) => (
                  <Badge
                    key={service}
                    variant="secondary"
                    className="text-xs"
                  >
                    {service}
                  </Badge>
                ))}
              </div>
            </StatCard>

            <StatCard
              icon={<CalendarIcon className="h-4 w-4 text-cyan-500" />}
              title="データ提供日数"
              value={`${statsData.dataDays}日`}
            />

            <StatCard
              icon={<TrendingUpIcon className="h-4 w-4 text-cyan-500" />}
              title="現在の価格"
              value={`${statsData.currentPrice.toLocaleString()}円`}
              subvalue={`+${statsData.priceIncrease}%`}
              subvalueColor="text-green-500"
              showProgressBar
              progressPercent={Math.min(statsData.priceIncrease * 2, 100)}
            />

            <StatCard
              icon={<UsersIcon className="h-4 w-4 text-cyan-500" />}
              title="トークン購入数"
              value={`${statsData.tokensPurchased}人`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string
  subvalue?: string
  subvalueColor?: string
  showProgressBar?: boolean
  progressPercent?: number
  children?: React.ReactNode
}

const StatCard = ({
  icon,
  title,
  value,
  subvalue,
  subvalueColor = '',
  showProgressBar = false,
  progressPercent = 0,
  children,
}: StatCardProps) => {
  return (
    <Card className="bg-gray-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium">{title}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-semibold">{value}</span>
            {subvalue && <span className={`text-xs ${subvalueColor} ml-1`}>{subvalue}</span>}
          </div>
        </div>

        {showProgressBar && (
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {children}
      </CardContent>
    </Card>
  )
}

export default ProfileSidebar
