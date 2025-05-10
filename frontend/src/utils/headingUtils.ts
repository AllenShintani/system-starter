/**
 * 見出しテキストから安全なID値を生成する関数
 * 日本語を含めた多言語対応
 */
export const generateSafeId = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '')
}
