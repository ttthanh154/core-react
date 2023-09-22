import { funcUtils } from "@utils/hook";
import customAxios from "@utils/customAxios";
import { ICustomDesignedResponse } from "@interface/customAxios";
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
  getWithPaginate: (params: string) => {
    return customAxios.get<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/user?${params}`,
      funcUtils.AuthHeader()
    );
  },
  create: (data: IUserFieldType) => {
    return customAxios.post<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/user`,
      data,
      funcUtils.AuthHeader()
    );
  },
  createList: (data: any) => {
    return customAxios.post<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/user/bulk-create`,
      data,
      funcUtils.AuthHeader()
    );
  },
  update: (data: IUserFieldType) => {
    return customAxios.put<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/user`,
      data,
      funcUtils.AuthHeader()
    );
  },
  delete: (id: string) => {
    return customAxios.delete<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/user/${id}`,
      funcUtils.AuthHeader()
    )
  }
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
