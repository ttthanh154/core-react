import { funcUtils } from "@utils/hook";
import customAxios from "@utils/customAxios";
import { ICustomDesignedResponse } from "@interface/customAxios";
import { IBookFields } from "@interface/book";

const version: string = import.meta.env.VITE_APP_VERSION_API;
const apiUrl: string = `${version}`;
const BookManagementApi = {
  getWithPaginate: (params: string | null) => {
    return customAxios.get<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/book?${params}`,
      // funcUtils.AuthHeader()
    );
  },
  getOne: (id: string | null) => {
    return customAxios.get<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/book/${id}`,
      // funcUtils.AuthHeader()
    );
  },
  create: (data: IBookFields) => {
    return customAxios.post<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/book`,
      data,
      funcUtils.AuthHeader()
    );
  },
  // createList: (data: any) => {
  //   return customAxios.post<ICustomDesignedResponse, ICustomDesignedResponse>(
  //     `${apiUrl}/book/bulk-create`,
  //     data,
  //     funcUtils.AuthHeader()
  //   );
  // },
  update: ( data: IBookFields) => {
    return customAxios.put<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/book/${data._id}`,
      data,
      funcUtils.AuthHeader()
    );
  },
  delete: (id: string) => {
    return customAxios.delete<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/book/${id}`,
      funcUtils.AuthHeader()
    );
  },
  getCategory: () => {
    return customAxios.get<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/database/category`,
      // funcUtils.AuthHeader()
    );
  },
  uploadImage: (fileImg:any) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg',fileImg);
    return customAxios.post<any,any>(
      `${apiUrl}/file/upload`,
      bodyFormData
      ,
      funcUtils.UploadFile()
    )
  }
};

export default BookManagementApi;
