import { funcUtils } from "@utils/hook";
import customAxios from "@utils/customAxios";
import { ICustomDesignedResponse } from "@interface/customAxios";
import { IUserFieldType } from "@interface/user/user";

const version: string = import.meta.env.VITE_APP_VERSION_API;
const apiUrl: string = `${version}`;
const BookManagementApi = {
  getBooksWithPaginate: (params: string) => {
    return customAxios.get<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/book?${params}`,
      funcUtils.AuthHeader()
    );
  },
//   createAUser: (data: IUserFieldType) => {
//     return customAxios.post<ICustomDesignedResponse, ICustomDesignedResponse>(
//       `${apiUrl}/user`,
//       data,
//       funcUtils.AuthHeader()
//     );
//   },
//   createAUserList: (data: any) => {
//     return customAxios.post<ICustomDesignedResponse, ICustomDesignedResponse>(
//       `${apiUrl}/user/bulk-create`,
//       data,
//       funcUtils.AuthHeader()
//     );
//   },
//   updateAUser: (data: IUserFieldType) => {
//     return customAxios.put<ICustomDesignedResponse, ICustomDesignedResponse>(
//       `${apiUrl}/user`,
//       data,
//       funcUtils.AuthHeader()
//     );
//   },
//   deleteAUser: (id: string) => {
//     return customAxios.delete<ICustomDesignedResponse, ICustomDesignedResponse>(
//       `${apiUrl}/user/${id}`,
//       funcUtils.AuthHeader()
//     )
//   }
};

export default BookManagementApi;
