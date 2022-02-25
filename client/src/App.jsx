import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Routes, Route } from "react-router-dom";
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import OrderList from './pages/OrderList';
// import Home from './pages/Home';
import GNB from './components/GNB';

const queryClient = new QueryClient();

const App = () => {
	return (
    <QueryClientProvider client={queryClient}>
      <GNB />
      <Routes className="App">
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<ProductList />} />
          <Route path="/carts" element={<Cart />} />
          <Route path="/orders" element={<OrderList />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App
