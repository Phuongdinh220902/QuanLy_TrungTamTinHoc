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
import GiangVien from './components/GiangVien/GiangVien';
import User from './components/User/User';
import DangNhap from './components/DangNhap/DangNhap';
import KhoaHoc from './components/Khoahoc/KhoaHoc';
import LopHoc from './components/Khoahoc/LopHoc';
import DSHocVien from './components/Khoahoc/DSHocVien';
import AnhGioiThieu from './components/AnhGioiThieu/AnhGioiThieu';
import ThemChiTiet from './components/Khoahoc/ModalThem';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>

      <Routes>
        <Route index element={<DangNhap />} />

        <Route path="/" element={<App />}>
          <Route index path="user" element={<User />} />

          <Route path="giangvien" element={<GiangVien />} />
          <Route path="khoahoc" element={<KhoaHoc />} />
          <Route path="anhgioithieu" element={<AnhGioiThieu />} />
          <Route path="lophoc/:maKH" element={<LopHoc />} />
          <Route path="dshocvien/:maLopHoc" element={<DSHocVien />} />
          <Route path="themchitiet/:maKH" element={<ThemChiTiet />} />
        </Route>
      </Routes>

    </BrowserRouter>
  </Provider>
);

reportWebVitals();


