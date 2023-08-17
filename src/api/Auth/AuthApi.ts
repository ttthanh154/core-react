import { funcUtils } from "@utils/hook";
import { ICustomDesignedResponse } from "@interface/axiosCustomize";
import { ILoginFieldType, IRegisterFieldType } from "@interface/register";
import axiosCustomize from "@utils/axiosCustomize";

const version: string = import.meta.env.VITE_APP_VERSION_API;
const apiUrl: string = `${version}`;
const AuthApi = {
  register: (params: IRegisterFieldType) => {
    return axiosCustomize.post<
      ICustomDesignedResponse,
      ICustomDesignedResponse
    >(`${apiUrl}/user/register`, params);
  },
  login: (params: ILoginFieldType) => {
    return axiosCustomize.post<
      ICustomDesignedResponse,
      ICustomDesignedResponse
    >(`${apiUrl}/auth/login`, params);
  },
  fetchAccount: () => {
    return axiosCustomize.get<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/auth/account`,
      funcUtils.AuthHeader()
    );
  },
  logout: () => {
    return axiosCustomize.post<
      ICustomDesignedResponse,
      ICustomDesignedResponse
    >(`${apiUrl}/auth/logout`, funcUtils.AuthHeader());
  },
};

export default AuthApi;
