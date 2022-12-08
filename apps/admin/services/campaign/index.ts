import { ICampainDTO } from "@shared-types/src";
import axios from "axios"
import React from "react";

export const CampaignService = {
    createCampaign: {
        fetch: async (dataDto: ICampainDTO) => {
            return await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/campaign`, dataDto)
        }
    },
    getCampaigns: {
        fetch: async (page:number=1, limit: number = 10) => {
            return await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/campaign?page=${page}&limit=${limit}`);
        }
    },
    deleteCampaign: {
        fetch: async (ids: string[] | React.Key[]) => {
            return await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/campaign`, {data: ids})
        }
    },
    updateCampaign: {
        fetch: async (id: string, dataDto:ICampainDTO ) => {
            return await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/campaign?id=${id}`, dataDto)
        }
    },
    getCampaign: {
        fetch: async (slug: string) => {
            return await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/campaign/single/${slug}`);
        }
    }
}