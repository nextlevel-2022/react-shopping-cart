import { Route, Routes } from "react-router-dom";
import {
  ProductListPage,
  ProductDetailPage,
  CartListPage,
  OrderPayPage,
  OrderListPage,
  OrderDetailPage,
} from "./pages";
import { Headers } from "./components";

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/prductDetail" element={<ProductDetailPage />} />
        <Route path="/cartList" element={<CartListPage />} />
        <Route path="/orderPay" element={<OrderPayPage />} />
        <Route path="/orderList" element={<OrderListPage />} />
        <Route path="/orderDetail" element={<OrderDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
