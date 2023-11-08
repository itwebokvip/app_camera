import Axios, { AxiosInstance } from "axios";

interface AxiosConfig {
    headers: {
        post: {
            "content-type": string;
        };
        put: {
            "content-type": string;
        };
        "content-type": string;
    };
}

const createAxiosInstance = (baseURL: string): AxiosInstance => {
    const config: AxiosConfig = {
        headers: {
            post: {
                "content-type": "application/json",
            },
            put: {
                "content-type": "application/json",
            },
            "content-type": "application/json",
        },
    };

    return Axios.create({
        baseURL,
        ...config,
    });
};

export const Api_1 = createAxiosInstance('https://api-camera.okvip.dev/');

export const SetTokenToGetWay = ({ token }: { token: string }) => {
    Api_1.defaults.headers.common.Authorization = `Bearer ${token}`;
};