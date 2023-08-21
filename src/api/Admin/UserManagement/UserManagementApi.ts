import { funcUtils } from "@utils/hook";
import customAxios from "@utils/customAxios";
import { ICustomDesignedResponse } from "@interface/customAxios";

const version: string = import.meta.env.VITE_APP_VERSION_API;
const apiUrl: string = `${version}`;
const UserManagementApi = {
  getAll: () => {
    return customAxios.get<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/user`
    );
  },
  getUsersWithPaginate: (params: string) => {
    return customAxios.get<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/user?${params}`,
      funcUtils.AuthHeader()
    );
  },
  //   fetchAccount: () => {
  //     return customAxios.get<ICustomDesignedResponse, ICustomDesignedResponse>(
  //       `${apiUrl}/auth/account`,
  //       funcUtils.AuthHeader()
  //     );
  //   },
  //   logout: () => {
  //     return customAxios.post<ICustomDesignedResponse, ICustomDesignedResponse>(
  //       `${apiUrl}/auth/logout`,
  //       funcUtils.AuthHeader()
  //     );
  //   },
};

export default UserManagementApi;
