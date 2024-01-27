import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import TrangChu from './components/TrangChu/TrangChu';
import KhoaHoc from './components/Khoahoc/KhoaHoc';
import LopHoc from './components/Khoahoc/LopHoc';
import DSHocVien from './components/Khoahoc/DSHocVien';
import DangNhap from './components/DangNhap/DangNhap';
import QuenMK from './components/DangNhap/QuenMK';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>

      <Routes>
        <Route path="dangnhap" element={<DangNhap />} />
        <Route path="quenmk" element={<QuenMK />} />

        <Route path="/" element={<App />}>
          <Route index element={<TrangChu />} />

          <Route path="khoahoc/:maKH" element={<KhoaHoc />} />
          <Route path="lophoc/:maKH" element={<LopHoc />} />
          <Route path="dshocvien/:maLopHoc" element={<DSHocVien />} />

        </Route>
      </Routes>

    </BrowserRouter>
  </Provider>
);

reportWebVitals();


