import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CartPage from './pages/CartPage/CartPage';
import OrderListPage from './pages/OrderListPage/OrderListPage';
import ProductListPage from './pages/ProductListPage/ProductListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListPage />}/>
        <Route path="/cart" element={<CartPage />}/>
        <Route path="/orderList" element={<OrderListPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
