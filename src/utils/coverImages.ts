const modules = import.meta.glob('@/assets/Auth/*.jpg', { eager: true })

// 提取出路径对应的图片 URL
export const coverImages = Object.values(modules).map((m: any) => m.default)

export function getCoverImage() {
  const index = Math.floor(Math.random() * coverImages.length)
  return coverImages[index]
}
