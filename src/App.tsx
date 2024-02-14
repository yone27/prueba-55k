import { useEffect, useMemo, useRef, useState } from 'react'
import { SortBy, type User } from './types.d'
import UsersList from './components/UsersList'
import './App.css'

function App() {
  const [users, setusers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterByCountry, setFilterByCountry] = useState<string | null>(null)
  const InitialState = useRef<User[]>()

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const handleDelete = (email: string) => {
    const newUsers = users.filter((user) => user.email !== email)
    setusers(newUsers)
  }

  const toggleSortByCountry = () => {
    const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSorting)
    console.log(sorting)
  }

  const handleChangeSort = (sort: SortBy) => {
    console.log(sort)
    setSorting(sort)
  }

  const handleResetState = () => {
    if (InitialState.current !== null && InitialState.current !== undefined) {
      setusers(InitialState.current)
    }
  }

  const filteredUsers = useMemo(() => {
    console.log('filteredUsers')
    return typeof filterByCountry === 'string' && filterByCountry.length > 0
      ? users.filter((user) =>
          user.location.country
            .toLocaleLowerCase()
            .includes(filterByCountry?.toLocaleLowerCase())
        )
      : users
  }, [users, filterByCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers
    if (sorting === SortBy.COUNTRY) {
      return [...filteredUsers].sort((a, b) =>
        a.location.country
          .toLocaleLowerCase()
          .localeCompare(b.location.country.toLocaleLowerCase())
      )
    }

    if (sorting === SortBy.NAME) {
      return [...filteredUsers].sort((a, b) =>
        a.name.first
          .toLocaleLowerCase()
          .localeCompare(b.name.first.toLocaleLowerCase())
      )
    }

    if (sorting === SortBy.LAST) {
      return [...filteredUsers].sort((a, b) =>
        a.name.last
          .toLocaleLowerCase()
          .localeCompare(b.name.last.toLocaleLowerCase())
      )
    }
  }, [filteredUsers, sorting])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=20')
      .then((res) => res.json())
      .then((data) => {
        setusers(data.results as User[])
        InitialState.current = data.results
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>Ordenar por pais</button>
        <button onClick={handleResetState}>Restablecer estado</button>
        <input
          type='text'
          onChange={(e) => setFilterByCountry(e.target.value)}
          placeholder='filtra por pais'
        />
      </header>
      <main>
        <UsersList
          users={sortedUsers}
          showColors={showColors}
          changeSorting={handleChangeSort}
          handleDelete={handleDelete}
        />
      </main>
    </div>
  )
}

export default App
