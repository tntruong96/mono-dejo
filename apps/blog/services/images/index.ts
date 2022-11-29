
import { caxios } from "@blog/services/axios";
import { IOptions } from "@shared-types/src";
import axios from "axios";


export const ImageServices = {
  deleteImages: {
    fetch: (bodyData: any) => {
      return axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/image/delete`, {
        data: bodyData,
      });
    },
  },
  uploadMultiImages: {
    fetch: (body: any) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/image/multi`,
        body,
        {
          method: "POST",
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
    },
  },
  getImages: {
    fetch: (option: IOptions) => {
      return caxios.get(`${process.env.NEXT_PUBLIC_URL_API}/image?limit=${option.limit}&page=${option.page}`)
    }
  }
};
