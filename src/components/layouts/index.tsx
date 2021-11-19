import { Header } from "../sections/header"
import { Sidebar } from "../sections/sidebar"
import { Main } from '../sections/main'
import { Footer } from "../sections/footer"

interface PropsLayout {
  children: React.ReactNode
}

export function Layout(props: PropsLayout) {
  return (
    <>
      <Header />
      <Sidebar />
      <Main>
        {props.children}
      </Main>
      <Footer />
    </>
  )
}