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
import DoiMK from './components/TrangCaNhan/DoiMK';
import TCGiangVien from './components/GiangVien/TrangChuGV';
import TrangLopHocGV from './components/GiangVien/TrangLopHocGV';
import ThemThongBao from './components/GiangVien/ThemThongBao';
import ThongBaoLopHocChiTiet from './components/GiangVien/ThongBaoLopHocChiTiet';
import NguoiDung from './components/GiangVien/NguoiDung';
import ChinhSua from './components/GiangVien/ChinhSua';
import CamNhanHocVien from './components/CamNhan/CamNhan';
import TrangLopHocHV from './components/TrangCaNhan/TrangLopHocHV';
import ThongBaoLopHocChiTietHV from './components/TrangCaNhan/ThongBaoLopHocHV';
import FilePreview from './components/GiangVien/FilePreview';
import LichThi from './components/LichThi/LichThi';
import DangKyThi from './components/TrangCaNhan/DangKyThi';
import ThongTinTSTuDoDangKyThi from './components/LichThi/ThongTinTSTuDo';
import TraCuuChungChi from './components/TraCuuDiem/TraCuuChungChi';
import ThanhToan from './components/ThanhToan/ThanhToan';
import LichDay from './components/GiangVien/LichDay';
import NhapDiem from './components/GiangVien/NhapDiem';

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
          <Route path="thongtingiangvien/:maGV" element={<GiangVien />} />
          <Route path="tatcakhoahoc" element={<TatCaKhoaHoc />} />
          <Route path="tracuudiemthi" element={<TraCuuDiemThi />} />
          <Route path="tracuuchungchi" element={<TraCuuChungChi />} />
          <Route path="trangcanhan" element={<TrangCaNhan />} />
          <Route path="chinhsuahoso" element={<ChinhSuaHoSo />} />
          <Route path="doimk" element={<DoiMK />} />
          <Route path="camnhan" element={<CamNhanHocVien />} />
          <Route path="/lophoccuaban/:maLopHoc" element={<TrangLopHocHV />} />
          <Route path="/thongbao/:maTB" element={<ThongBaoLopHocChiTietHV />} />
          <Route path="thongbaolichthi" element={<LichThi />} />
          <Route path="dangkythi/:maCaThi" element={<DangKyThi />} />
          <Route path="dangkythitudo/:maCaThi" element={<ThongTinTSTuDoDangKyThi />} />
          <Route path="thanhtoan" element={<ThanhToan />} />

        </Route>
        <Route path="giangvien" element={<TCGiangVien />} />
        <Route path="/lophocgv/:maLopHoc" element={<TrangLopHocGV />} />
        <Route path="themthongbao/:maLopHoc" element={<ThemThongBao />} />
        <Route path="chitietthongbao/:maTB" element={<ThongBaoLopHocChiTiet />} />
        <Route path="chinhsua" element={<ChinhSua />} />
        <Route path="lichday" element={<LichDay />} />
        <Route path="moinguoi/:maLopHoc" element={<NguoiDung />} />
        <Route path="nhapdiem/:maLopHoc" element={<NhapDiem />} />
        <Route path="preview/:tenFile" element={<FilePreview />} />

      </Routes>

    </BrowserRouter>
  </Provider>
);

reportWebVitals();


