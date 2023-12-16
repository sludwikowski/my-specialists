import './styles/Application.scss'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import List from './components/List'
import { setData } from './features/dataSlice'

import namesData from './db/data/names.json'
import specializationData from './db/data/specializations.json'
import avatarData from './db/data/avatars.json'
import { loadFromLocalStorage } from './features/mySpecialistsSlice'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('specialistsData'))

    const generateDataIfNeeded = () => {
      if (!storedData) {
        const data = []
        for (let i = 0; i < 5000; i++) {
          data.push({
            id: i,
            name: namesData[Math.floor(Math.random() * namesData.length)],
            specialization: specializationData[Math.floor(Math.random() * specializationData.length)],
            avatar: avatarData[Math.floor(Math.random() * avatarData.length)],
          })
        }
        localStorage.setItem('specialistsData', JSON.stringify(data))
        return data
      }
      return storedData
    }

    const data = generateDataIfNeeded()
    dispatch(setData(data))
    dispatch(loadFromLocalStorage())
  }, [dispatch])

  return <List />
}
