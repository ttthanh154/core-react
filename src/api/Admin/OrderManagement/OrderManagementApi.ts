import { funcUtils } from "@utils/hook";
import customAxios from "@utils/customAxios";
import { ICustomDesignedResponse } from "@interface/customAxios";

const version: string = import.meta.env.VITE_APP_VERSION_API;
const apiUrl: string = `${version}`;
const OrderManagementApi = {
  getWithPaginate: (params: string | null) => {
    return customAxios.get<ICustomDesignedResponse, ICustomDesignedResponse>(
      `${apiUrl}/order?${params}`,
      // funcUtils.AuthHeader()
    );
  },
};

export default OrderManagementApi;
