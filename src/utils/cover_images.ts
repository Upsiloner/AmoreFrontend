import bg1 from '@/assets/User/cover_image1.jpg'
import bg2 from '@/assets/User/cover_image2.jpg'
import bg3 from '@/assets/User/cover_image3.jpg'
import bg4 from '@/assets/User/cover_image4.jpg'
import bg5 from '@/assets/User/cover_image5.jpg'
import bg6 from '@/assets/User/cover_image6.jpg'
import bg7 from '@/assets/User/cover_image7.jpg'
import bg8 from '@/assets/User/cover_image8.jpg'
import bg9 from '@/assets/User/cover_image9.jpg'
import bg10 from '@/assets/User/cover_image10.jpg'

export const coverImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10]

/**
 * 随机获取一张图片
 */
export function getCoverImage() {
  const index = Math.floor(Math.random() * coverImages.length)
  return coverImages[index]
}