// 公開ルート（HP関連）
export const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/policy',
  '/data-deletion',
  '/privacy-policy',
  '/terms',
]

// HACKER_USER用のサインイン関連ルート
export const SIGNIN_ROUTES_FOR_HACKER_USER = [
  '/signIn',
  '/signup',
  '/signup/email',
  '/pre-register',
  '/pre-register/email',
  '/pre-register/success',
  '/passwordReset',
  '/auth/verify-email',
  '/auth/verify-email',
  '/auth/action',
  '/auth/reset-password',
]

// todo: client配下全てをまとめて対象にするようにする
// todo: 提出直前にサインアップできて、サインアップ後にすぐに提出できるように
// todo: なぜ/client/home/のパスを入れないと/signIn/にリダイレクトするのか確認する。

// CLIENT_USER用のサインイン関連ルート
export const SIGNIN_ROUTES_FOR_CLIENT_USER = [
  '/client/signIn',
  '/client/signup',
  '/passwordReset',
  '/client/signup/email',
  '/auth/reset-password',
]
