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

const laydskh1 = (tukhoa1) => {
    return axios.get(`api/v1/laydskh1/${tukhoa1}`);
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

const dangnhapnguoidung = async (formdata) => {
    try {
        const response = await axios.post("/api/v1/dangnhapnguoidung", formdata);
        const { token } = response.data;

        if (response.status == 200 && token) {
            // Lưu token vào localStorage hoặc cookie để sử dụng sau này
            localStorage.setItem("token", token);
        }

        return response;
    } catch (error) {
        throw error;
    }
};


export { laydshv, laydsgv, loginadmin, deleteHV, laydskh1, deleteKH, laydsLopHoc, deleteLH, laydsHocVien, dangnhapnguoidung };