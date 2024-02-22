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
import DangNhap from './components/DangNhap/DangNhap';
import QuenMK from './components/DangNhap/QuenMK';
import LienHe from './components/LienHe/LienHe';
import GiangVien from './components/GiangVien/GiangVien';
import TatCaKhoaHoc from './components/Khoahoc/TatCaKhoaHoc';
import TraCuuDiemThi from './components/TraCuuDiem/TraCuuDiemThi';
import TrangCaNhan from './components/TrangCaNhan/TrangCaNhan';
import ChinhSuaHoSo from './components/TrangCaNhan/ChinhSuaHoSo';
import DoiMK from './components/TrangCaNhan/ModalDoiMK';

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
          <Route path="lienhe" element={<LienHe />} />
          <Route path="giangvien/:maGV" element={<GiangVien />} />
          <Route path="tatcakhoahoc" element={<TatCaKhoaHoc />} />
          <Route path="tracuudiemthi" element={<TraCuuDiemThi />} />
          <Route path="trangcanhan" element={<TrangCaNhan />} />
          <Route path="chinhsuahoso" element={<ChinhSuaHoSo />} />
          <Route path="doimk" element={<DoiMK />} />
        </Route>
      </Routes>

    </BrowserRouter>
  </Provider>
);

reportWebVitals();


