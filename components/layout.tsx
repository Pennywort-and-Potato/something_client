import Navbar from "./navbar"
import Footer from "./footer"
import { Akshar } from '@next/font/google'

const akshar = Akshar({
  weight: '400',
  subsets: ['latin'],
})


interface props {
  children: React.ReactNode
}


export default function Layout({ children }: props) {
  const classString = 'main-layout' + ' ' + akshar.className
  return (
    <div className={classString}>
      <Navbar />
        <main>
        {children}
        </main>
      <Footer />
    </div>
  )
}