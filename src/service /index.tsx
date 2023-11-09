import { ConstantUrl, StatusCode } from './ContantBase';
import { Api_1, SetTokenToGetWay } from './GetWay';

interface SignInResult {
    Success: boolean;
    errors?: any; // Thay thế any bằng kiểu dữ liệu chính xác của bạn nếu có
}

interface SignInResponse {
    status: number;
    error?: any;
    data: { data: SignInData; }
}

interface SignInData {
    token: string;
    expired: string;
}

const catchError = (error) => {
    console.log('check console.log:  ' + JSON.stringify(error.response));
    throw error.response;
};

export const SignIn = async (
    username: string,
    password: string
): Promise<SignInResult> => {
    try {
        const response: SignInResponse = await Api_1.post(ConstantUrl.login, {
            username,
            password,
        });

        console.log('====> ', JSON.stringify(response.data.data.token));

        if (response.status === StatusCode.OK) {
            SetTokenToGetWay({ token: response.data.data.token });
            return {
                Success: true,
            };
        } else {
            console.error('ERROR ====> ', JSON.stringify(response.error));
            return {
                Success: false,
                errors: response.error,
            };
        }
    } catch (error) {
        console.error('ERROR ====> ', JSON.stringify(error));
        return {
            Success: false,
            errors: error,
        };
    }
};

export const UploadImage = async (
    size: number,
    location: string,
    path: string,
    shootTime: string,
): Promise<SignInResult> => {
    try {
        const response = await Api_1.post(ConstantUrl.postImage, {
            size,
            location,
            path,
            shootTime,
        });

        console.log('====> ', JSON.stringify(response));

        if (response.status === StatusCode.OK) {
            return {
                Success: true,
            };
        } else {
            console.error('ERROR ====> ', JSON.stringify(response));
            return {
                Success: false,
                errors: response,
            };
        }
    } catch (error) {
        console.error('ERROR ====> ', JSON.stringify(error));
        return {
            Success: false,
            errors: error,
        };
    }
};

