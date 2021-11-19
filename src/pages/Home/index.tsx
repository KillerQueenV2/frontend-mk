import { Layout } from "../../components/layouts"
import { Carousel } from "../../components/sections/carousel"
import { ProductList } from "../../components/sections/productList"

const Home: React.FC = () => {
  return (
    <Layout>
      <Carousel />
      <ProductList />
    </Layout>
  )
}

export default Home