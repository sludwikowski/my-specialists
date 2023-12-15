import React from 'react'

import { MoreHorizontal, Heart } from '../icon/Icon'
import CardHeader from './CardHeader'
import CardContent from './CardContent'
import CardFooter from './CardFooter'

export default function Card() {
  return (
    <div className="card">
      <CardHeader buttonLeftIcon={<MoreHorizontal />} buttonRightIcon={<Heart />} />
      <CardContent name="John Doe" title="Software Engineer" />
      <CardFooter />
    </div>
  )
}
