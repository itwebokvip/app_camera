import { KeychainManager, STORAGE_KEYS } from 'helpers/keychain';
import { ConstantUrl, StatusCode } from './ContantBase';
import { Api_1, SetTokenToGetWay } from './GetWay';

interface SignInResult {
  Success: boolean;
  errors?: any;
}

interface SignInResponse {
  status: number;
  error?: any;
  data: { data: SignInData; message?: string; status?: number };
}

interface SignInData {
  token: string;
  expired: string;
}

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
      const { status, message } = response.data;
      if (status === StatusCode.OK) {
        SetTokenToGetWay({ token: response.data.data.token });
        await KeychainManager.setItem(
          STORAGE_KEYS.token,
          response.data.data.token,
        );

        return {
          Success: true,
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