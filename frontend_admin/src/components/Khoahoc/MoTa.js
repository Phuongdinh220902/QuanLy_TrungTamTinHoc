import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const MoTa = (props) => {
    const { maKH } = useParams();

    const [moTaKhoaHoc, setMoTaKhoaHoc] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2209/api/v1/layMoTaKH/${maKH}`);
                setMoTaKhoaHoc(response.data.ND);
            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };

        fetchData();
    }, [maKH]);

    return (
        <>
            <div className="container-fluid app__content">
                <h2 className="text-center">Mô Tả Khoá Học</h2>

                <div className="listDV">
                    <div className="table-container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="table-item">STT</th>
                                    <th className="table-item">Tiêu Đề</th>
                                    <th className="table-item"> </th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {moTaKhoaHoc.map((item, index) => (
                                    <tr key={index} className="tableRow">
                                        <td className="table-item col-right">{index + 1}</td>
                                        <td className="">{item.tieude}</td>

                                        <td className="table-item">
                                            <Link to={`/chinhsuamota/${maKH}`}>
                                                <button className="btn btn-warning mx-2">
                                                    Cập nhật
                                                </button>
                                            </Link>

                                            <button className="btn btn-danger">
                                                Xoá
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {moTaKhoaHoc.length === 0 && (
                                    <tr className="tablenone">
                                        <td className="tablenone" colSpan="4">Không có mô tả khoá học!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MoTa;
