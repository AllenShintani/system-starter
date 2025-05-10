// types/analytics.ts
export interface GtagFunction {
  (command: 'js', date: Date): void
  (command: 'config', targetId: string, config?: object): void
  (command: string, ...args: unknown[]): void
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: GtagFunction
    clarity: (method: string, ...args: unknown[]) => void
  }
}
