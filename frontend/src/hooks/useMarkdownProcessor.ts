import { useMemo } from 'react'

/**
 * マークダウンの読書時間を計算するためのフック
 *
 * @param content マークダウンコンテンツ
 * @returns 読書時間（分）
 */
export const useReadingTime = (content: string): number => {
  return useMemo(() => {
    return calculateReadingTime(content)
  }, [content])
}

/**
 * 読書時間を計算する関数（文字数から算出）
 *
 * @param content マークダウンコンテンツ
 * @returns 読書時間（分）
 */
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 300 // 平均的な読書速度（WPM）
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
