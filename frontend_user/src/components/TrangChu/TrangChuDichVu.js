
import logoImage4 from '../../images/tien-ich-ho-tro-icon.png';
import logoImage5 from '../../images/tra-cuu-chung-chi.png';
import logoImage6 from '../../images/tra-cuu-diem-thi.png';
import logo from '../../images/lich-thi-CCTHQG-icon.png';
import { Link } from "react-router-dom";
const DichVu = () => {

    return (
        <>
            <div className="dich-vu-container" style={{ 'paddingTop': '20px', 'paddingBottom': '30px' }}>
                <div className="container">
                    <div className="section-title" style={{ "marginBottom": "40px" }}>
                        <h2 className="tieu-de-muc">
                            <img src={logoImage4} alt="" />&nbsp;
                            Hỗ trợ</h2>
                    </div>

                    <div className="tien-ich lazy visible">
                        <div className="col-sm-6 col-md-6 canh-le">
                            <div className="tien-ich-mo-ta">
                                <Link to='tracuudiemthi'>
                                    <img className="img-responsive hidden-xs"
                                        src={logoImage6} alt="" />
                                </Link>
                                <h3>
                                    <img className="visible-xs"
                                        src={logoImage6}
                                        alt="" /> <Link to='tracuudiemthi'>
                                        Tra cứu kết quả thi
                                    </Link>
                                </h3>
                                <p>Học viên có thể tra cứu điểm thi và tải Chứng nhận hoàn thành khóa học sau ngày thi 2 tuần.</p>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="col-sm-6 col-md-6 canh-le">
                            <div className="tien-ich-mo-ta">
                                <Link to='tracuuchungchi'>
                                    <img className="img-responsive hidden-xs"
                                        src={logoImage5} alt="" />
                                </Link>
                                <h3>
                                    <img className="visible-xs"
                                        src={logoImage5}
                                    />
                                    <Link to='tracuuchungchi'>
                                        Tra cứu chứng chỉ
                                    </Link>
                                </h3>
                                <p>Hỗ trợ học viên tra cứu Chứng chỉ được<br />Trung Tâm cấp sau ngày thi 1,5 tháng.</p>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div >

            <div style={{ textAlign: 'center', backgroundColor: '#0082c8', color: '#fff', marginTop: "10px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-10 col-md-offset-1" style={{ padding: "0 30px" }}>
                            <div className="lich-thi lazy visible">
                                <a style={{ color: "#fff" }}>
                                    <Link to={`thongbaolichthi`}>
                                        <h4 className="tieu-de">
                                            <img src={logo} alt="" /> Lịch thi</h4>
                                        <h2 className="thong-bao-thi" style={{ color: 'white' }}>Chứng chỉ tin học Quốc gia</h2>
                                        <p style={{ color: 'white' }}>Dành cho thí sinh tự do</p>
                                    </Link>

                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default DichVu;
