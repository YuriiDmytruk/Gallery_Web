import React from 'react'

import ImageCard from './ImageCard'

import { getImages } from '../util/api'
import { ImageType } from '../types'

interface ImageListProps{
    userId: string,
    amount: string
}

const ImageList = async (props: ImageListProps) => {
  const images = (await getImages(props.userId, props.amount)).value as ImageType[]

  return (
    <div>
      {images.map(image => <ImageCard key={image._id} image={image}/>)}
    </div>
  )
}

export default ImageList
