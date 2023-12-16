import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MoreHorizontal, Heart } from 'lucide-react'

import CardHeader from './Header'
import CardContent from './Content'
import CardFooter from './Footer'
import { addSpecialist, removeSpecialist } from '../../features/mySpecialistsSlice'
import { RootState } from '@src/app/store'
import { icons } from '../icon/Icons'
import { CardProps } from '@src/types'

export default function Card({ id, name, specialization, avatar }: CardProps) {
  const dispatch = useDispatch()
  const mySpecialists = useSelector((state: RootState) => state.mySpecialists.value)

  const isOnList = mySpecialists.some(specialist => specialist.id === id)

  const handleHeartClick = () => {
    if (isOnList) {
      dispatch(removeSpecialist(id))
    } else {
      dispatch(addSpecialist({ id, name, specialization, avatar }))
    }
  }

  return (
    <div className="card">
      <CardHeader
        buttonLeftIcon={<MoreHorizontal className="icon-hover" />}
        buttonRightIcon={
          <div title={isOnList ? 'Remove from favorites' : 'Add to favorites'}>
            {isOnList ? (
              <img src={icons.heart} onClick={handleHeartClick} />
            ) : (
              <Heart onClick={handleHeartClick} />
            )}
          </div>
        }
      />
      <CardContent id={id} avatar={avatar} name={name} specialization={specialization} />
      <CardFooter />
    </div>
  )
}
