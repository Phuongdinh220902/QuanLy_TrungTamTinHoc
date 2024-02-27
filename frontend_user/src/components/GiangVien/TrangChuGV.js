// import React, { useState } from 'react';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import { Link } from 'react-router-dom';

// const TCGiangVien = () => {
//     const [collapsed, setCollapsed] = useState(false);
//     const [classes, setClasses] = useState([]);

//     const handleToggleSidebar = () => {
//         setCollapsed(!collapsed);
//     };

//     return (
//         <div>
//             <header style={{ backgroundColor: 'lightblue', padding: '10px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
//                 <button onClick={handleToggleSidebar} style={{ marginRight: '10px' }}>
//                     {collapsed ? 'Expand' : 'Collapse'}
//                 </button>
//             </header>

//             <div style={{ marginRight: '0', marginLeft: 'auto' }}>
//                 <Sidebar collapsed={collapsed}>
//                     <Menu>
//                         <Menu>
//                             <SubMenu defaultOpen label="Charts">
//                                 <MenuItem> Pie charts</MenuItem>
//                                 <MenuItem> Line charts</MenuItem>
//                                 <MenuItem> Bar charts</MenuItem>
//                             </SubMenu>
//                             <SubMenu label="Maps">
//                                 <MenuItem> Google maps</MenuItem>
//                                 <MenuItem> Open street maps</MenuItem>
//                             </SubMenu>
//                             <SubMenu label="Theme">
//                                 <MenuItem> Dark</MenuItem>
//                                 <MenuItem> Light</MenuItem>
//                             </SubMenu>
//                         </Menu>
//                     </Menu>
//                 </Sidebar>
//             </div>
//         </div>
//     );
// };

// export default TCGiangVien;

import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faHouseChimney,
    faGraduationCap,
    faRightFromBracket,
    faBars,
    faGears,
    faBoxOpen
} from "@fortawesome/free-solid-svg-icons";
const TCGiangVien = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [classes, setClasses] = useState([]);
    const [data, setData] = useState([]); // State để lưu trữ dữ liệu từ API

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        fetchData(); // Gọi hàm lấy dữ liệu từ API khi component được render
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:2209/api/v1/layLopHocGV'); // Thay YOUR_API_ENDPOINT bằng endpoint của API của bạn
            setData(response.data.KH); // Lưu trữ dữ liệu từ API vào state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <header style={{ backgroundColor: 'white', padding: '15px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', borderBottom: '1px solid #ccc', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', height: '70px' }}>
                <FontAwesomeIcon icon={faBars} onClick={handleToggleSidebar} style={{ marginRight: '10px', cursor: 'pointer' }} />

            </header>


            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', minHeight: '100vh' }}>
                {/* Sidebar */}
                <Sidebar collapsed={collapsed}>
                    <Menu>
                        <MenuItem >
                            <FontAwesomeIcon icon={faHouseChimney} style={{ marginRight: '10px' }} />
                            Màn hình chính
                        </MenuItem>
                        <SubMenu defaultOpen label={<span><FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} />Lớp học</span>}>
                            {data.map((item, index) => (
                                <MenuItem key={index}>{item.tenKHGV}</MenuItem>
                            ))}
                        </SubMenu>
                        <MenuItem >
                            <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: '10px' }} />
                            Lớp học đã lưu trữ
                        </MenuItem>
                        <MenuItem >
                            <FontAwesomeIcon icon={faGears} style={{ marginRight: '10px' }} />
                            Cài đặt
                        </MenuItem>
                        <MenuItem >
                            <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '10px' }} />
                            Thoát
                        </MenuItem>
                    </Menu>
                </Sidebar>

                {/* Content */}
                <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridGap: '20px' }}>
                    {data.map((item, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', textAlign: 'center', height: '250px' }}>
                            <h3>{item.tenKHGV}</h3>
                            <p>{item.tenGV}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default TCGiangVien;
