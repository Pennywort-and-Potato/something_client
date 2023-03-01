import React from 'react';
import styles from '@/styles/Navbar.module.scss'


import icon from '@/public/DP.png'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UserActions from './UserActions'

const Navbar = (props: any) => {
  const router = useRouter()

  return (
    <div className={styles['nav-container']}>
      <div className={styles['icon-holder']} onClick={() => router.push('/')}>
        <Image fill src={icon} alt='something' />
      </div>
      <UserActions />
    </div>
  )
}

export default Navbar