import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CartPage from './pages/CartPage/CartPage';
import GNB from './pages/NavPage/GNB';
import OrderListDetailPage from './pages/OrderListPage/OrderListDetailPage/OrderListDetailPage';
import OrderListPage from './pages/OrderListPage/OrderListPage';
import ProductDetailPage from './pages/ProductListPage/ProductDetailPage/ProductDetailPage';
import ProductListPage from './pages/ProductListPage/ProductListPage';

export const routePaths = {
  '/': ProductListPage,
  '/products/:id': ProductDetailPage,
  '/cart': CartPage,
  '/orders': OrderListPage,
  '/orders/:id': OrderListDetailPage,
}

function App() {
  return (
    <>
      <BrowserRouter>
        <GNB />
          <Routes>
            {Object.entries(routePaths).map(([path, Elem]) => (
              <Route key={path} path={path} element={<Elem />}/>
            ))}
          </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App;
