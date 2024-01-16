import axios from "../utils/axiosUser";

const laydshv = (page, tukhoa) => {
    return axios.get(`api/v1/laydshv/${page}/${tukhoa}`);
};

// const laydsgv = () => {
//     return axios.get("api/v1/laydsgv");
// };
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

export { laydshv, laydsgv, loginadmin, deleteHV, laydskh, deleteKH, laydsLopHoc, deleteLH };