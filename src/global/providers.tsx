import { ProductsProvider } from "../providers/products"
import { SearchProvider } from "../providers/saerch"

const GlobalProvider: React.FC = ({ children }) => {
  return (
    <ProductsProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </ProductsProvider>
  )
}

export default GlobalProvider
