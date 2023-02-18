import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import { userLogin } from './api/api'
import { setUser, getUser } from '@/store/userSlice'
import { connect } from 'react-redux'

function Home(props: any) {
  const { user, dispatch } = props
  
  const onLogin = async (event: any) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
  
    const params: IUserLogin = {
      username: form.get("username") as string,
      password: form.get("password") as string
    }
  
    const data = await userLogin(params)
    if (data.success) {
      localStorage.setItem("jwt", data.jwt) // Push user token to local storage
      dispatch(setUser(data.user)) // Dispatch redux
    }
  }

  return (
    <>
      <Head>
        <title>Something</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/DP.png" />
      </Head>
      <main>
        {!user ? <form onSubmit={event => onLogin(event)}>
          <input type={"text"} name="username" />
          <input type={"password"} name="password" />
          <button type="submit">Login</button>
        </form> : null}
      </main>
    </>
  )
}

function mapStateToProps(state: any) {
  return ({
    user: state.user.user
  })
}

export default connect(mapStateToProps, null)(Home)
