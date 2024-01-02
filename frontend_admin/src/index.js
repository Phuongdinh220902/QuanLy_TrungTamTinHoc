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

        </Route>
      </Routes>

    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
