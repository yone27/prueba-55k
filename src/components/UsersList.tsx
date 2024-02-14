import React from 'react'
import { SortBy, type User } from '../types.d'

interface Props {
  users: User[]
  showColors: boolean
  handleDelete: (email: any) => void
  changeSorting: (sort: SortBy) => void
}

const UsersList: React.FC<Props> = ({
  users,
  showColors,
  handleDelete,
  changeSorting
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Foto</th>
          <th onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
          <th onClick={() => changeSorting(SortBy.LAST)}>Apellido</th>
          <th onClick={() => changeSorting(SortBy.COUNTRY)}>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className={`${showColors && 'table-colors'}`}>
        {users.map((user) => (
          <tr key={user.email}>
            <td>
              <img src={user.picture.medium} alt={user.name.first} />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => handleDelete(user.email)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersList
