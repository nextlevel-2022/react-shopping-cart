import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "@styles/theme";
import GlobalStyle from "@styles/global";
import { CartPage, ListPage, ProductDetail, OrderListPage } from "@pages/";
import Navigation from "@components/navigation";

const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme} />
      <GlobalStyle />
      <Navigation />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orderList" element={<OrderListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
