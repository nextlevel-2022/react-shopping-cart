import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Routes, Route } from "react-router-dom";
import ProductListPage from './pages/ProductListPage';
import CartListPage from './pages/CartListPage';
import OrderListPage from "./pages/OrderListPage";
// import Home from './pages/Home';
import GNB from './components/GNB';
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = () => {
	return (
    <QueryClientProvider client={queryClient}>
      <GNB />
      <Routes className="App">
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<ProductListPage />} />
        <Route path="/carts" element={<CartListPage />} />
        <Route path="/orders" element={<OrderListPage />} />
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App
