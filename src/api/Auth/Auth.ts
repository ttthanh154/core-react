import { IRegisterFieldType } from "@interface/register";
import axiosCustomize from "@utils/axiosCustomize";

const version: string = import.meta.env.VITE_APP_VERSION_API;
const apiUrl: string = `${version}/user/register`;
const Auth = {
  register: (params: IRegisterFieldType) => {
    return axiosCustomize.post<any,any>(apiUrl, params);
  },
};

export default Auth;
