export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://hackers-guild.tech'
    : 'http://localhost:3000'
}

export const base64UrlEncode = (str: string): string => {
  return btoa(encodeURIComponent(str)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
