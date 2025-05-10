/* eslint-disable max-lines */
// import type { Connection, EarthGlobeState } from '@/types/top/utils/earthGlobe'
// import * as THREE from 'three'

// // 緯度経度線を作成する関数
// export const createLatLongLines = (radius: number, scene: THREE.Scene): THREE.Group => {
//   const linesGroup = new THREE.Group()

//   const lineMaterial = new THREE.LineBasicMaterial({
//     color: 0x4ac6ff,
//     transparent: true,
//     opacity: 0.4,
//   })

//   // 緯度線（横線）を15度間隔で作成
//   Array.from({ length: 11 }, (_, i) => -75 + i * 15).forEach((lat) => {
//     // 円を描く点を作成
//     const points = Array.from({ length: 73 }, (_, i) => i * 5).map((lon) => {
//       const phi = (90 - lat) * (Math.PI / 180)
//       const theta = lon * (Math.PI / 180)

//       const x = -radius * Math.sin(phi) * Math.cos(theta)
//       const y = radius * Math.cos(phi)
//       const z = radius * Math.sin(phi) * Math.sin(theta)

//       return new THREE.Vector3(x, y, z)
//     })

//     // 線のジオメトリを作成
//     const geometry = new THREE.BufferGeometry().setFromPoints(points)
//     const line = new THREE.Line(geometry, lineMaterial)
//     linesGroup.add(line)
//   })

//   // 経度線（縦線）を15度間隔で作成
//   Array.from({ length: 24 }, (_, i) => i * 15).forEach((lon) => {
//     // 円を描く点を作成
//     const points = Array.from({ length: 37 }, (_, i) => -90 + i * 5).map((lat) => {
//       const phi = (90 - lat) * (Math.PI / 180)
//       const theta = lon * (Math.PI / 180)

//       const x = -radius * Math.sin(phi) * Math.cos(theta)
//       const y = radius * Math.cos(phi)
//       const z = radius * Math.sin(phi) * Math.sin(theta)

//       return new THREE.Vector3(x, y, z)
//     })

//     // 線のジオメトリを作成
//     const geometry = new THREE.BufferGeometry().setFromPoints(points)
//     const line = new THREE.Line(geometry, lineMaterial)
//     linesGroup.add(line)
//   })

//   // 赤道を特別に強調（少し濃い色で）
//   const equatorPoints = Array.from({ length: 73 }, (_, i) => i * 5).map((lon) => {
//     const phi = 90 * (Math.PI / 180) // 90度（赤道）
//     const theta = lon * (Math.PI / 180)

//     const x = -radius * Math.sin(phi) * Math.cos(theta)
//     const y = radius * Math.cos(phi)
//     const z = radius * Math.sin(phi) * Math.sin(theta)

//     return new THREE.Vector3(x, y, z)
//   })

//   const equatorMaterial = new THREE.LineBasicMaterial({
//     color: 0x4affff,
//     transparent: true,
//     opacity: 0.7,
//     linewidth: 2, // ブラウザによってはサポートされないが設定しておく
//   })

//   const equatorGeometry = new THREE.BufferGeometry().setFromPoints(equatorPoints)
//   const equator = new THREE.Line(equatorGeometry, equatorMaterial)
//   linesGroup.add(equator)

//   scene.add(linesGroup)
//   return linesGroup
// }

// // 実際の地球テクスチャを使用する関数
// export const initEarthGlobe = (canvas: HTMLCanvasElement): EarthGlobeState => {
//   // レンダラーの初期化
//   const renderer = new THREE.WebGLRenderer({
//     canvas,
//     alpha: true,
//     antialias: true,
//   })
//   renderer.setPixelRatio(window.devicePixelRatio)
//   renderer.setSize(window.innerWidth, window.innerHeight)

//   // シーンの初期化
//   const scene = new THREE.Scene()

//   // カメラの初期化
//   const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
//   camera.position.z = 15
//   camera.position.y = 5

//   // テクスチャローダーを作成
//   const textureLoader = new THREE.TextureLoader()

//   // 地球テクスチャのロード - 大陸の輪郭線のみ
//   // クロスオリジンの問題を避けるためにオプションを追加
//   textureLoader.crossOrigin = 'anonymous'
//   const earthTexture = textureLoader.load(
//     '/asset/earthOutline.svg',
//     // 成功時のコールバック
//     (texture) => {
//       // テクスチャの変換を反転して正しくマッピング
//       texture.flipY = false

//       // テクスチャのラッピングを繰り返しに設定
//       texture.wrapS = THREE.RepeatWrapping
//       texture.wrapT = THREE.RepeatWrapping

//       // テクスチャのフィルタリングを改善
//       texture.minFilter = THREE.LinearFilter
//       texture.magFilter = THREE.LinearFilter

//       // グローブマテリアルを更新
//       globeMaterial.map = texture
//       globeMaterial.needsUpdate = true
//       globeMaterial.color = new THREE.Color(0xadd8e6)
//     },
//     // 進行中のコールバック
//     undefined,
//     // エラー時のコールバック
//     (err) => {
//       console.error('テクスチャの読み込みに失敗しました:', err)
//     }
//   )

//   // パフォーマンスのために低ポリゴン数の地球ジオメトリを使用
//   const globeGeometry = new THREE.SphereGeometry(5, 32, 32)

//   // 地球のマテリアルを改善 - より深い青色で海を表現
//   const globeMaterial = new THREE.MeshPhongMaterial({
//     map: earthTexture,
//     transparent: true,
//     opacity: 1,
//     color: 0x1a4d7c, // 深い青色で海を表現
//     specular: 0x333333, // 反射光の色
//     shininess: 5, // 反射の強さ
//   })

//   const globe = new THREE.Mesh(globeGeometry, globeMaterial)
//   // 地球の回転を調整して緯度経度を正しく合わせる
//   globe.rotation.y = Math.PI
//   scene.add(globe)

//   // 緯度経度線を追加
//   const latLongLines = createLatLongLines(5.02, scene)

//   // 軽量化した大気効果の作成
//   const atmosphereGeometry = new THREE.SphereGeometry(5.3, 32, 32)
//   const atmosphereMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//       time: { value: 0 },
//       glowColor: { value: new THREE.Color(0x0077ff) }, // より深い青色の光
//     },
//     vertexShader: `
//       varying vec3 vNormal;
//       varying vec3 vPosition;

//       void main() {
//         vNormal = normalize(normalMatrix * normal);
//         vPosition = position;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }
//     `,
//     fragmentShader: `
//       uniform float time;
//       uniform vec3 glowColor;
//       varying vec3 vNormal;
//       varying vec3 vPosition;

//       void main() {
//         float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
//         // 時間によって変化する微妙な効果を追加
//         float pulse = (sin(time * 0.5) * 0.1 + 0.9);
//         vec3 atmosphere = glowColor * intensity * pulse;
//         // 地球の端で光を強調
//         float edge = smoothstep(0.65, 0.7, intensity);
//         gl_FragColor = vec4(atmosphere, intensity * 0.4 + edge * 0.2);
//       }
//     `,
//     transparent: true,
//     side: THREE.BackSide,
//     blending: THREE.AdditiveBlending,
//   })

//   const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
//   scene.add(atmosphere)

//   // 改良されたライティング
//   // 環境光 - 全体に弱い光を与える
//   const ambientLight = new THREE.AmbientLight(0xaaccff, 0.3)
//   scene.add(ambientLight)

//   // メインの方向光 - 太陽のような効果
//   const mainLight = new THREE.DirectionalLight(0xffffff, 1.0)
//   mainLight.position.set(5, 3, 5)
//   scene.add(mainLight)

//   // 補助の方向光 - 反対側から弱い光を当てる
//   const fillLight = new THREE.DirectionalLight(0x9999ff, 0.3)
//   fillLight.position.set(-5, -2, -5)
//   scene.add(fillLight)

//   // マーカーの作成
//   const markers = createMarkerMeshes(scene)

//   // 初期コネクションの作成
//   const connections: Connection[] = []
//   Array.from({ length: 15 }).map(() => {
//     connections.push(createConnection(markers))
//     return null
//   })

//   return {
//     renderer,
//     scene,
//     camera,
//     globe,
//     atmosphere,
//     markers,
//     latLongLines,
//     connections,
//     animationFrameId: null,
//     frameCount: 0,
//   }
// }

// // マーカーの位置を地理座標に基づいて計算する関数
// export const latLongToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
//   // 緯度経度をラジアンに変換
//   const phi = (90 - lat) * (Math.PI / 180)
//   const theta = (lon + 180) * (Math.PI / 180)

//   // 球面座標から直交座標に変換
//   const x = -radius * Math.sin(phi) * Math.cos(theta)
//   const y = radius * Math.cos(phi)
//   const z = radius * Math.sin(phi) * Math.sin(theta)

//   return new THREE.Vector3(x, y, z)
// }

// // 実際の都市の位置にマーカーを配置
// export const createMarkerMeshes = (scene: THREE.Scene) => {
//   const markers = new THREE.Group()

//   // 主要都市の位置データ（緯度、経度）
//   const cities = [
//     { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
//     { name: 'New York', lat: 40.7128, lon: -74.006 },
//     { name: 'London', lat: 51.5074, lon: -0.1278 },
//     { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
//     { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },
//     { name: 'Cape Town', lat: -33.9249, lon: 18.4241 },
//     { name: 'Moscow', lat: 55.7558, lon: 37.6173 },
//     { name: 'Beijing', lat: 39.9042, lon: 116.4074 },
//     { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
//     { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
//     { name: 'Paris', lat: 48.8566, lon: 2.3522 },
//     { name: 'Mumbai', lat: 19.076, lon: 72.8777 },
//     { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
//     { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
//     // 必要に応じて追加
//   ]

//   // より目立つマーカーデザイン
//   const markerGeometry = new THREE.SphereGeometry(0.07, 16, 16)
//   const markerMaterial = new THREE.MeshPhongMaterial({
//     color: 0x4affff,
//     emissive: 0x00aaaa,
//     specular: 0xffffff,
//     shininess: 100,
//   })

//   // 都市の位置にマーカーを配置
//   cities.forEach((city) => {
//     const position = latLongToVector3(city.lat, city.lon, 5.05) // 地球の半径よりわずかに大きく

//     const marker = new THREE.Mesh(markerGeometry, markerMaterial)
//     marker.position.copy(position)
//     markers.add(marker)

//     // 改良されたパルスエフェクト
//     const pulseGeometry = new THREE.RingGeometry(0.12, 0.25, 32)
//     const pulseMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         time: { value: 0 },
//         baseColor: { value: new THREE.Color(0x4affff) },
//       },
//       vertexShader: `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         uniform float time;
//         uniform vec3 baseColor;
//         varying vec2 vUv;

//         void main() {
//           // より複雑なパルスアニメーション
//           float wave1 = sin(time * 2.0 - length(vUv) * 4.0) * 0.5 + 0.5;
//           float wave2 = sin(time * 3.0 + length(vUv) * 3.0) * 0.5 + 0.5;
//           float alpha = mix(wave1, wave2, 0.5);
//           // 色も少し変化させる
//           vec3 color = mix(baseColor, baseColor * 1.2, wave1 * 0.3);
//           gl_FragColor = vec4(color, alpha * 0.4);
//         }
//       `,
//       transparent: true,
//       side: THREE.DoubleSide,
//       blending: THREE.AdditiveBlending,
//     })

//     const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial)
//     pulse.position.copy(position)
//     // 地球中心を向くように調整
//     pulse.lookAt(new THREE.Vector3(0, 0, 0))
//     markers.add(pulse)
//   })

//   scene.add(markers)
//   return markers
// }

// // 既存の関数はそのまま維持
// export const createConnection = (markers: THREE.Group): Connection => {
//   const markersList = markers.children.filter(
//     (child): child is THREE.Mesh =>
//       child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry
//   )

//   // 球体メッシュのみがマーカーとして扱われるよう修正
//   const start = markersList[Math.floor(Math.random() * markersList.length)]

//   // 同じマーカーを避けるためのランダム選択（再帰的な方法を使用）
//   const selectDifferentMarker = (currentMarker: THREE.Mesh): THREE.Mesh => {
//     const candidate = markersList[Math.floor(Math.random() * markersList.length)]
//     return candidate !== currentMarker || markersList.length <= 1
//       ? candidate
//       : selectDifferentMarker(currentMarker)
//   }

//   const end = selectDifferentMarker(start)

//   return {
//     start: start.position.clone(),
//     end: end.position.clone(),
//     progress: 0,
//     speed: 0.005 + Math.random() * 0.015,
//     active: Math.random() > 0.3,
//   }
// }

// export const animate = (state: EarthGlobeState) => {
//   const { renderer, scene, camera, globe, atmosphere, markers, latLongLines } = state

//   if (!renderer || !scene || !camera || !globe || !atmosphere || !markers || !latLongLines) {
//     return
//   }

//   globe.rotation.y += 0.001
//   atmosphere.rotation.y += 0.001

//   // マーカーと緯度経度線は地球と同じ回転を持つように
//   markers.rotation.copy(globe.rotation)
//   latLongLines.rotation.copy(globe.rotation)

//   // カメラは固定位置
//   camera.position.set(0, 0, 15)
//   camera.lookAt(scene.position)

//   renderer.render(scene, camera)

//   // フレームカウンターを更新
//   state.frameCount = (state.frameCount + 1) % 60
// }

// export const handleResize = (state: EarthGlobeState) => {
//   const { camera, renderer } = state
//   if (!camera || !renderer) return

//   const width = window.innerWidth
//   const height = window.innerHeight

//   camera.aspect = width / height
//   camera.updateProjectionMatrix()

//   renderer.setSize(width, height)
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// }

// export const disposeEarthGlobe = (state: EarthGlobeState) => {
//   const { scene, renderer, animationFrameId } = state

//   if (animationFrameId !== null) {
//     cancelAnimationFrame(animationFrameId)
//   }

//   if (scene) {
//     scene.traverse((object) => {
//       if (object instanceof THREE.Mesh) {
//         if (object.geometry) {
//           object.geometry.dispose()
//         }
//         if (object.material instanceof THREE.Material) {
//           object.material.dispose()
//         }
//       }
//     })
//   }

//   if (renderer) {
//     renderer.dispose()
//   }
// }
