import { funcUtils } from "@utils/hook";
import customAxios from "@utils/customAxios";
import { ICustomDesignedResponse } from "@interface/customAxios";
import { IUserDataType } from "@interface/user";
import { IUserFieldType } from "@interface/user/user";

const version: string = import.meta.env.VITE_APP_VERSION_API;
const apiUrl: string = `${version}`;
const UserManagementApi = {
  getAll: () => {
    return customAxios.get<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/user`,
      funcUtils.AuthHeader()
    );
  },
  getUsersWithPaginate: (params: string) => {
    return customAxios.get<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/user?${params}`,
      funcUtils.AuthHeader()
    );
  },
  createAUser: (data: IUserFieldType) => {
    return customAxios.post<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/user`,
      data,
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
