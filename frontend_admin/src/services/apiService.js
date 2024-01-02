import axios from "../utils/axiosUser";

const laydshv = () => {
    return axios.get("api/v1/laydshv");
};

const laydsgv = () => {
    return axios.get("api/v1/laydsgv");
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


export { laydshv, laydsgv, loginadmin };