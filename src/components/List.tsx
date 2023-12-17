import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import { selectData } from '../features/dataSlice'
import { RootState, AppDispatch } from '../app/store'
import { setSearch } from '../features/searchSlice'
import Card from './Card'
import { CardProps } from '@src/types'
import Navbar from './Navbar'

export default function List() {
  const dispatch: AppDispatch = useDispatch()
  const data = useSelector((state: RootState) => selectData(state))
  const search: string = useSelector((state: RootState) => state.search.value)
  const [inputValue, setInputValue] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(100)

  const [tab, setTab] = useState<'all' | 'my'>('all')
  const mySpecialists: CardProps[] = useSelector((state: RootState) => state.mySpecialists.value)

  const debouncedDispatch = _.debounce((searchValue: string) => {
    if (searchValue.length >= 3 || searchValue === '') {
      dispatch(setSearch(searchValue))
    }
  }, 300)

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value
      setInputValue(searchValue)
      debouncedDispatch(searchValue)
    },
    [setInputValue, debouncedDispatch]
  )

  const filteredData = useMemo<CardProps[]>(() => {
    const specialists = tab === 'all' ? data : mySpecialists

    return specialists
      .filter(
        (item: CardProps) =>
          item.name.toLowerCase().startsWith(search.toLowerCase()) ||
          item.specialization.toLowerCase().startsWith(search.toLowerCase())
      )
      .sort((a: CardProps, b: CardProps) => a.specialization.localeCompare(b.specialization))
  }, [data, search, mySpecialists, tab])

  const paginatedData = useMemo(() => {
    return filteredData.slice(0, itemsPerPage)
  }, [filteredData, itemsPerPage])
  const loader = useRef<HTMLDivElement>(null)

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setItemsPerPage(prev => prev + 20)
    }
  }, [])

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(handleObserver, options)
    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => observer.disconnect()
  }, [handleObserver])

  return (
    <>
      <Navbar
        tab={tab}
        data={data}
        mySpecialists={mySpecialists}
        setTab={setTab}
        inputValue={inputValue}
        handleSearchChange={handleSearchChange}
      />
      <main>
        <section className="card-grid">
          {paginatedData.map(item => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              specialization={item.specialization}
              avatar={item.avatar}
            />
          ))}
          <div ref={loader}>{itemsPerPage < filteredData.length && <h4>Loading...</h4>}</div>
        </section>
      </main>
    </>
  )
}
