import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ProductList, Cart, OrderList } from '@pages';
import GNB from '@/components/GNB';

function App() {
  const routePaths = {
    '/': ProductList,
    '/cart': Cart,
    '/order': OrderList,
  };

  return (
    <>
      <GNB />
      <Routes>
        {Object.entries(routePaths).map(([path, Page]) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
      </Routes>
    </>
  );
}
export default App;
