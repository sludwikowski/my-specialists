import './styles/Application.scss'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import List from './components/List'
import { setData } from './features/dataSlice'
import { loadFromLocalStorage } from './features/mySpecialistsSlice'
import { generateDataIfNeeded } from './db/dataGenerator'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const data = await generateDataIfNeeded()
      dispatch(setData(data))
      dispatch(loadFromLocalStorage())
    }

    fetchData()
  }, [dispatch])

  return <List />
}
