
import './App.css';
import Header from './components/Header/Hearder'
import Footer from './components/Footer/Footer'
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        <div className="app-content">
          <Outlet />

        </div>
      </div>
      <Footer />
    </div>
  );
}


export default App;