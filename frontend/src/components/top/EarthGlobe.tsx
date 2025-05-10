// import type React from 'react'
// import { useEffect, useRef } from 'react'
// import styles from '@/styles/components/top/EarthGlobe.module.css'
// import {
//   initEarthGlobe,
//   handleResize,
//   disposeEarthGlobe,
//   animate,
// } from '@/components/top/utils/earthGlobe'
// import type { EarthGlobeState } from '@/types/top/utils/earthGlobe'

// const EarthGlobe: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null)
//   const stateRef = useRef<EarthGlobeState | null>(null)

//   useEffect(() => {
//     if (!canvasRef.current) return

//     // 初期化
//     stateRef.current = initEarthGlobe(canvasRef.current)

//     // アニメーションループを開始
//     const animationLoop = () => {
//       if (stateRef.current) {
//         animate(stateRef.current)
//         stateRef.current.animationFrameId = requestAnimationFrame(animationLoop)
//       }
//     }
//     const frameId = requestAnimationFrame(animationLoop)
//     if (stateRef.current) {
//       stateRef.current.animationFrameId = frameId
//     }

//     // リサイズイベント
//     const handleWindowResize = () => {
//       if (stateRef.current) {
//         handleResize(stateRef.current)
//       }
//     }
//     window.addEventListener('resize', handleWindowResize)
//     handleWindowResize()

//     // クリーンアップ
//     return () => {
//       if (stateRef.current) {
//         disposeEarthGlobe(stateRef.current)
//       }
//       window.removeEventListener('resize', handleWindowResize)
//     }
//   }, [])

//   return (
//     <div className={styles.canvasContainer}>
//       <canvas ref={canvasRef} />
//     </div>
//   )
// }

// export default EarthGlobe
