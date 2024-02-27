
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import './Sidebar.css'; 

function Sidebar() {
    return (
        <aside data-testid="ps-sidebar-root-test-id" width="250px" className="ps-sidebar-root css-14dbqr2">
            <div data-testid="ps-sidebar-container-test-id" className="ps-sidebar-container css-1hhlh5t">
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="css-1vmkajq" style={{ marginBottom: '24px', marginTop: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="css-kyhzew">P</div>
                            <p fontWeight="700" color="#0098e5" className="css-crt1ee">Pro Sidebar</p>
                        </div>
                    </div>
                    <div style={{ flex: '1 1 0%', marginBottom: '32px' }}>
                        <div style={{ padding: '0px 24px', marginBottom: '8px' }}>
                            <p fontWeight="600" className="css-1o7yz74" style={{ opacity: 0.7, letterSpacing: '0.5px' }}>General</p>
                        </div>
                        {/* Navigation Menu */}
                        <nav className="ps-menu-root css-vj11vy">
                            <ul className="css-ewdv3l">
                                {/* Menu Items */}
                                {/* You can map through your menu items and create <li> elements dynamically */}
                                {/* For example: */}
                                <li className="ps-menuitem-root ps-submenu-root css-uf9z8p">
                                    <a className="ps-menu-button" data-testid="ps-menu-button-test-id" tabIndex="0">
                                        {/* Menu Item Content */}
                                    </a>
                                    {/* Submenu Content */}
                                    <div className="ps-submenu-content css-1naa948">
                                        <ul className="css-ewdv3l">
                                            {/* Submenu Items */}
                                            {/* You can map through your submenu items and create <li> elements dynamically */}
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        {/* End of Navigation Menu */}
                    </div>
                    {/* Extra Section */}
                    <div style={{ padding: '0px 24px', marginBottom: '8px', marginTop: '32px' }}>
                        <p fontWeight="600" className="css-1o7yz74" style={{ opacity: 0.7, letterSpacing: '0.5px' }}>Extra</p>
                    </div>
                    <nav className="ps-menu-root css-vj11vy">
                        <ul className="css-ewdv3l">
                            {/* Additional Menu Items */}
                        </ul>
                    </nav>
                </div>
                {/* Sidebar Footer */}
                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
                    <div className="css-49v479">
                        {/* Sidebar Footer Content */}
                    </div>
                </div>
                {/* Sidebar Image */}
                <img data-testid="ps-sidebar-image-test-id" src="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg" alt="sidebar background" className="ps-sidebar-image css-16g65jg" />
            </div>
        </aside>
    );
}



const TCGiangVien = () => {
    const { maGV } = useParams();
    const [giangVien, setGiangVien] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:2209/api/v1/layGiangVien/${maGV}`);
    //             setGiangVien(response.data.TCGV);
    //         } catch (error) {
    //             console.error('Lỗi khi gọi API: ', error);
    //         }
    //     };

    //     fetchData();
    // }, [maGV]);

    // if (!giangVien) {
    //     return <div>Loading...</div>;
    // }
    return (
        // <Sidebar>
        //     <Menu
        //         menuItemStyles={{
        //             button: {
        //                 // the active class will be added automatically by react router
        //                 // so we can use it to style the active menu item
        //                 [`&.active`]: {
        //                     backgroundColor: '#13395e',
        //                     color: '#b6c8d9',
        //                 },
        //             },
        //         }}
        //     >
        //         <MenuItem component={<Link to="/documentation" />}> Documentation</MenuItem>
        //         <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
        //         <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
        //     </Menu>
        // </Sidebar>
        <Sidebar />
    );
};


export default TCGiangVien;


