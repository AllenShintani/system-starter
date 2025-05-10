// types/global.d.ts
interface Window {
  dataLayer: unknown[]
  clarity: (method: string, ...args: unknown[]) => void
}
