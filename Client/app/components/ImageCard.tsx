import React from 'react'

import { ImageType } from '../types'

interface ImageCardProps{
  image: ImageType,
}

const ImageCard = (props: ImageCardProps) => {
  return (
    <div>
      {props.image._id}
    </div>
  )
}

export default ImageCard
