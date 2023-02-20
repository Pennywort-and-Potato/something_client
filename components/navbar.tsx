import React, { useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const Navbar = (props: Props) => {
  const { user } = useSelector((state: any) => state.user)
  return (
    <div>
      {user ? <h2>Hello {user.username}</h2> : "Navbar"}
    </div>
  )
}

export default Navbar