import Navbar from "./navbar"
import Footer from "./footer"

interface props {
  children: React.ReactNode
}

export default function Layout({ children }: props) {
  return (
    <>
      <Navbar />
        <main>{children}</main>
      <Footer />
    </>
  )
}