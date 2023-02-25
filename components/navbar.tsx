import React, { FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '@/styles/Navbar.module.scss'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import icon from '@/public/DP.png'
import spin from '@/public/Spinner.svg'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { convertFormValues } from '@/pages/common/utils';
import { userLogin } from '@/pages/api/api';
import { useLocalStorage } from 'usehooks-ts';

const Navbar = (props: any) => {
  const router = useRouter()
  const user = useSelector((state: any) => state.user.user)

  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useLocalStorage<string>('jwt', '')

  const handleLogin = async (event: FormEvent) => {
    setLoading(true)
    event.preventDefault()

    const values = convertFormValues(event)
    const data = await userLogin(values)

    if(data.success) {
      setToken(data.jwt)
      setTimeout(() => {
        setLoading(false)
      }, 250)
    } else {
      setLoading(false)
    }
  }

  return (
    <div className={styles['nav-container']}>
      <div className={styles['icon-holder']} onClick={() => router.push('/')}>
        <Image fill src={icon} alt='something' />
      </div>
      {!user || loading ? <form className={styles['login-form']} onSubmit={handleLogin}>
        <div className={styles['form-item']}>
          <input name='username' type={'text'} placeholder='USERNAME' required />
        </div>
        <div className={styles['form-item']}>
          <input name='password' type={show ? 'text' : 'password'} placeholder='PASSWORD' required />
          <div className={styles['password-icon']} onClick={() => setShow(!show)}>
            {!show ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        </div>
        <div className={styles['form-item']}>
          {!loading 
            ? <button className='primary'
              style={{ 
                textTransform: 'uppercase', 
                cursor: 'pointer',
                textShadow: 'rgb(255 0 0 / 50%) 2px 2px' 
              }} type={'submit'}>login</button> 
            : <Image src={spin} alt={'spinner'} height={30} width={30} />}
        </div>
      </form> : <div
        className={styles['user-action']}
      >
        <div className={styles['avatar']}>
          {user.username}
          <ul className={styles['dropdown']} >
            <li onClick={() => setToken('')}>
              logout
            </li>
            <li onClick={() => window.alert('action 1')}>
              action 1
            </li>
            <li onClick={() => window.alert('action 2')}>
              action 2
            </li>
          </ul>
        </div>
        </div>}
    </div>
  )
}

export default Navbar