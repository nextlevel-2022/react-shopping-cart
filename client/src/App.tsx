import { Route, Routes } from "react-router-dom";
import {
  ProductListPage,
  ProductDetailPage,
  CartListPage,
  OrderPayPage,
  OrderListPage,
  OrderDetailPage,
} from "./pages";
import { GlobalNavigationBar, Main } from "./components";

function App() {
  return (
    <>
      <GlobalNavigationBar />
      <Main>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/prduct/:id" element={<ProductDetailPage />} />
          <Route path="/cartList" element={<CartListPage />} />
          <Route path="/orderPay" element={<OrderPayPage />} />
          <Route path="/orderList" element={<OrderListPage />} />
          <Route path="/orderDetail" element={<OrderDetailPage />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
