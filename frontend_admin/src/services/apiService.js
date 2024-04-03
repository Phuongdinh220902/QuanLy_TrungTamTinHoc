import axios from "../utils/axiosUser";

const laydshv = (page, tukhoa) => {
    return axios.get(`api/v1/laydshv/${page}/${tukhoa}`);
};


const laydsgv = (page, tukhoa) => {
    return axios.get(`api/v1/laydsgv/${page}/${tukhoa}`);
};

const loginadmin = async (formdata) => {
    try {
        const response = await axios.post("/api/v1/loginadmin", formdata);
        const { check, token } = response.data;

        if (check === "1" && token) {
            // Lưu token vào localStorage hoặc cookie để sử dụng sau này
            localStorage.setItem("token", token);
        }

        return response;
    } catch (error) {
        throw error;
    }
};

const deleteHV = (maHV) => {
    return axios.post(`api/v1/deleteHV/${maHV}`);
};

const laydskh = (page, tukhoa) => {
    return axios.get(`api/v1/laydskh/${page}/${tukhoa}`);
};

const deleteKH = (maKH) => {
    return axios.post(`api/v1/deleteKH/${maKH}`);
};

const laydsLopHoc = (maKH, page, tukhoa) => {
    return axios.get(`api/v1/laydsLopHoc/${maKH}/${page}/${tukhoa}`);
};

const deleteLH = (maLopHoc) => {
    return axios.post(`api/v1/deleteLH/${maLopHoc}`);
};

const laydsHocVien = (maLopHoc, page, tukhoa) => {
    return axios.get(`api/v1/laydsHocVien/${maLopHoc}/${page}/${tukhoa}`);
};

const deleteHVLopHoc = (maDSHV) => {
    return axios.post(`api/v1/deleteHVLopHoc/${maDSHV}`);
};

const layHinhAnhGioiThieu = (page) => {
    return axios.get(`api/v1/layHinhAnhGioiThieu/${page}`);
};

const deleteMoTa = (maND) => {
    return axios.post(`api/v1/deleteMoTa/${maND}`);
};


const layLichThi = (page, tukhoa) => {
    return axios.get(`api/v1/layLichThi/${page}/${tukhoa}`);
};

const laydsCaThi = (maLichThi, page, tukhoa) => {
    return axios.get(`api/v1/laydsCaThi/${maLichThi}/${page}/${tukhoa}`);
};

const deleteLichThi = (maLichThi) => {
    return axios.post(`api/v1/deleteLichThi/${maLichThi}`);
};

const deleteCaThi = (maCaThi) => {
    return axios.post(`api/v1/deleteCaThi/${maCaThi}`);
};

const laydsThiSinh = (maCaThi, page, tukhoa) => {
    return axios.get(`api/v1/laydsThiSinh/${maCaThi}/${page}/${tukhoa}`);
};

const deleteThiSinhDK = (maDSDK) => {
    return axios.post(`api/v1/deleteThiSinhDK/${maDSDK}`);
};

const laydsCamNhan = (maLopHoc, page, tukhoa) => {
    return axios.get(`api/v1/laydsCamNhan/${maLopHoc}/${page}/${tukhoa}`);
};

export {
    laydshv, laydsgv, loginadmin, deleteHV, laydskh, deleteKH, laydsLopHoc, deleteLH, laydsHocVien, deleteHVLopHoc,
    layHinhAnhGioiThieu, deleteMoTa, layLichThi, laydsCaThi, deleteLichThi, deleteCaThi, laydsThiSinh, deleteThiSinhDK,
    laydsCamNhan
};