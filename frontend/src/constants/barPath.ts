/**
 * このファイルにlayout.tsxで適応するデザインをパスごとに分けている
 */

export const isPathWithSidebar = (pathname: string): boolean => {
  // 動的パスのチェック
  return (
    pathname.startsWith('/osint/') ||
    pathname.startsWith('/sections/') ||
    pathname.startsWith('/profile/') ||
    pathname.startsWith('/settings/') ||
    pathname.startsWith('/description/') ||
    pathname.startsWith('/user/profile/edit/') ||
    pathname.startsWith('/notifications/')
  )
}

export const isPathWithBottomNav = (pathname: string | null) => {
  if (!pathname) return false
  return ['/client/home/', '/client/profile/', '/client/notification/'].some(
    (path) => pathname === path,
  )
}

export const isPathWithAppBar = (pathname: string | null) => {
  if (!pathname) return false
  return [
    '/client/home/',
    '/top/',
    '/signIn/',
    '/signup/',
    '/client/signIn/',
    '/client/signup/',
    '/client/notification/',
    '/client/profile/',
    '/client/request/create/payments/',
    '/client/request/create/',
  ].some((path) => pathname === path)
}
