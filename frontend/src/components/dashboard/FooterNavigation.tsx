import Link from 'next/link'
import { Button } from '@/components/ui/button'

const FooterNavigation = () => {
  return (
    <div className="flex justify-center mt-10">
      <Link href="/marketplace">
        <Button
          variant="outline"
          className="mx-2 border-cyan-200 text-cyan-600 hover:bg-cyan-50"
        >
          マーケットプレイスを見る
        </Button>
      </Link>
      <Link href="/user/profile/edit">
        <Button
          variant="outline"
          className="mx-2 border-cyan-200 text-cyan-600 hover:bg-cyan-50"
        >
          自分のプロフィールを確認
        </Button>
      </Link>
    </div>
  )
}

export default FooterNavigation
