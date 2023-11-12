import { KeychainManager, STORAGE_KEYS } from 'helpers/keychain';
import { ConstantUrl, StatusCode } from './ContantBase';
import { Api_1, SetTokenToGetWay } from './GetWay';
import { ImageInfoPayload, User } from 'models';

interface SignInResult {
  Success: boolean;
  data?: User;
  errors?: any; // Thay thế any bằng kiểu dữ liệu chính xác của bạn nếu có
}

interface SignInResponse {
  status: number;
  error?: any;
  data: { data: SignInData; message?: string; status?: number };
}

interface SignInData {
  token: string;
  expired: string;
  logedInUser: User;
}

const UPLOAD_API = 'https://api-camera.okvip.dev/api/files/upload';

const catchError = error => {
  console.log('check console.log:  ' + JSON.stringify(error.response));
  throw error.response;
};

export const SignIn = async (
  username: string,
  password: string,
): Promise<SignInResult> => {
  try {
    const response: SignInResponse = await Api_1.post(ConstantUrl.login, {
      username,
      password,
    });

    if (response.status === StatusCode.OK) {
      const { status, message, data } = response.data;
      if (status === StatusCode.OK) {
        SetTokenToGetWay({ token: data.token });
        await KeychainManager.multiSet([
          [STORAGE_KEYS.token, data.token],
          [STORAGE_KEYS.account, JSON.stringify(data.logedInUser)],
        ]);

        return {
          Success: true,
          data: data.logedInUser,
        };
      } else {
        return {
          Success: false,
          errors: message,
        };
      }
    } else {
      console.error('ERROR ====> ', JSON.stringify(response.error));
      return {
        Success: false,
        errors: response.data.message,
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

export const getProgrammes = async (
  pageNumber: number,
  pageSize: number,
  textSearch: string,
  orderBy: number,
): Promise<any> => {
  try {
    const response = await Api_1.get(ConstantUrl.getProgrammes, {
      params: {
        pageNumber, pageSize, textSearch, orderBy,
      }
    });

    console.log('====> ', JSON.stringify(response.data));

    if (response.status === StatusCode.OK) {
      return response.data;
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

export const postProgrammesName = async (
  name: string,
): Promise<SignInResult> => {
  try {
    const response = await Api_1.post(ConstantUrl.postProgrammes, {
      name,
    });

    console.log('====> ', JSON.stringify(response.data));

    if (response.status === StatusCode.OK) {
      return response.data;
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

export const getProgrammes = async (
  pageNumber: number,
  pageSize: number,
  userId: string,
) => {
  try {
    const response = await Api_1.get(
      `api/users/${userId}/programmes?page=${pageNumber}&pageSize=${pageSize}&orderBy=1`,
    );
    if (response.status !== StatusCode.OK) {
      return {
        success: false,
        error: 'Server error!',
      };
    }
    const { status, message } = response.data;
    if (status === StatusCode.OK || status === StatusCode.EMPTY) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        errors: message,
      };
    }
  } catch (error) {
    console.error('ERROR ====> ', JSON.stringify(error));
    return {
      success: false,
      error,
    };
  }
};

export const createProgram = async (name: string) => {
  try {
    const response = await Api_1.post('api/programmes', { name });

    if (response.status !== StatusCode.OK) {
      return {
        success: false,
        error: 'Server error!',
      };
    }

    const { status, message } = response.data;

    if (status === StatusCode.OK) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: message,
      };
    }
  } catch (error) {
    console.error('ERROR ====> ', JSON.stringify(error));
    return {
      success: false,
      error,
    };
  }
};

export const uploadMultiFiles = async (formData: FormData) => {
  try {
    const token = await KeychainManager.getItem(STORAGE_KEYS.token);
    const res = await fetch(UPLOAD_API, {
      method: 'post',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}  `,
      },
    });

    const response = await res.json();
    if (response.status !== StatusCode.OK) {
      return {
        success: false,
        error: 'Server error!',
      };
    }

    const { status, message } = response;

    if (status === StatusCode.OK) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: message,
      };
    }
  } catch (error) {
    console.error('ERROR ====> ', JSON.stringify(error));
    return {
      success: false,
      error,
    };
  }
};

export const uploadMultiImageInfo = async (data: ImageInfoPayload[]) => {
  try {
    const response = await Api_1.post('api/imageInfos/multi', data);
    if (response.status !== StatusCode.OK) {
      return {
        success: false,
        error: 'Server error!',
      };
    }

    const { status, message } = response.data;

    if (status === StatusCode.OK) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: message,
      };
    }
  } catch (error) {
    console.error('ERROR ====> ', JSON.stringify(error));
    return {
      success: false,
      error,
    };
  }
};

export const deleteProgram = async (id: string) => {
  try {
    const response = await Api_1.delete(`api/programmes/${id}`);
    if (response.status !== StatusCode.OK) {
      return {
        success: false,
        error: 'Server error!',
      };
    }

    const { status, message } = response.data;

    if (status === StatusCode.OK) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: message,
      };
    }
  } catch (error) {
    console.error('ERROR ====> ', JSON.stringify(error));
    return {
      success: false,
      error,
    };
  }
};

export const getProgrammesWithID = async (
  id: string,
  pageNumber: number,
  pageSize: number,
) => {
  try {
    const response = await Api_1.get(
      `api/programmes/${id}/imageInfos?pageNumber=${pageNumber}&pageSize=${pageSize}&orderBy=1`,
    );
    if (response.status !== StatusCode.OK) {
      return {
        success: false,
        error: 'Server error!',
      };
    }
    const { status, message } = response.data;
    if (status === StatusCode.OK || status === StatusCode.EMPTY) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        errors: message,
      };
    }
  } catch (error) {
    console.error('ERROR ====> ', JSON.stringify(error));
    return {
      success: false,
      error,
    };
  }
};