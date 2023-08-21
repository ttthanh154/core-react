import { funcUtils } from "@utils/hook";
import { ILoginFieldType, IRegisterFieldType } from "@interface/register";
import customAxios from "@utils/customAxios";
import { ICustomDesignedResponse } from "@interface/customAxios";

const version: string = import.meta.env.VITE_APP_VERSION_API;
const apiUrl: string = `${version}`;
const AuthApi = {
  register: (params: IRegisterFieldType) => {
    return customAxios.post<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/user/register`,
      params
    );
  },
  login: (params: ILoginFieldType) => {
    return customAxios.post<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/auth/login`,
      params
    );
  },
  fetchAccount: () => {
    return customAxios.get<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/auth/account`,
      funcUtils.AuthHeader()
    );
  },
  logout: () => {
    return customAxios.post<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/auth/logout`,
      funcUtils.AuthHeader()
    );
  },
};

export default AuthApi;
