import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ProductList, Cart, Order } from '@pages';
// import ProductList from './pages/ProductList';
// import Cart from './pages/Cart';
// import Order from './pages/Order';

function App() {
  const routePaths = {
    '/': ProductList,
    '/cart': Cart,
    '/order': Order,
  };

  return (
    <>
      {/* <GNB /> */}
      <Routes>
        {Object.entries(routePaths).map(([path, Page]) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
      </Routes>
    </>
  );
}
export default App;
