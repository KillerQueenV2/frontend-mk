import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ScrollToTop from './global/scrollToTop'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProductDetails from './pages/ProductDetails'
import ConfigAccount from './pages/ConfigAccount'
import Cart from './pages/Cart'
import UserPurchase from './pages/UserPurchase'
import CompletePurchase from './pages/CompletePurchase'
import UserTable from './pages/UserTable'
import SupplierTable from './pages/SupplierTable'
import ProductTable from './pages/ProductTable'
import PurchaseTable from './pages/PurchaseTable'
import PageNotFound from './pages/PageNotFound'
import { useEffect, useState } from 'react'
import verifyUser from './global/verifyUser'

export default function Routes() {
  const [token] = useState(localStorage.getItem('token'))
  const [useType, setUserType] = useState({
    type: ''
  })

  useEffect(() => {
    const getData = async () => {
      const userType = await verifyUser(token)
      setUserType(userType)
    }

    getData()
  }, [token])

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={Login} path='/login' />
        <Route component={Signup} path='/signup' />
        <Route component={ProductDetails} path='/product-details/:id' />
        <Route component={ConfigAccount} path='/config-account' />
        <Route component={Cart} path='/carrinho' exact />
        <Route component={UserPurchase} path='/meus-pedidos' exact />
        <Route component={CompletePurchase} path='/carrinho/finalizar-compra' />

        {useType.type === 'admin' && <>
          <Route component={UserTable} path='/admin/user-table' exact />
          <Route component={SupplierTable} path='/admin/supplier-table' exact />
          <Route component={ProductTable} path='/admin/product-table' exact />
          <Route component={PurchaseTable} path='/admin/purchase-table' exact />
        </>}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  )
}
