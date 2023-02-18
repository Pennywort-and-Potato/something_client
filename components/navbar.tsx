import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '@/store/userSlice'

type Props = {}

const Navbar = (props: Props) => {
  const { user } = useSelector(getUser)
  return (
    <div>
      {user ? <h2>Hello {user.username}</h2> : "Navbar"}
    </div>
  )
}

export default Navbar