import type { CraftAssetRatioValue, ObjectFitValue } from './image-types'
import type { CraftAsset } from '#shared/types/base'

export const sharedImageProps = {
  image: {
    type: Object as PropType<CraftAsset>,
    required: true,
  },
  lazy: {
    type: Boolean,
    default: () => true,
  },
  objectFit: {
    type: String as PropType<ObjectFitValue>,
    default: () => 'cover',
  },
  transform: {
    type: String as PropType<CraftAssetRatioValue>,
    default: () => 'auto',
  },
  animated: {
    type: Boolean,
    default: () => true,
  },
  draggable: {
    type: Boolean,
    default: () => true,
  },
}

export const captionProps = {
  caption: {
    type: String,
    default: () => '',
  },
  captionClasses: {
    type: String,
    default: () => '',
  },
}
