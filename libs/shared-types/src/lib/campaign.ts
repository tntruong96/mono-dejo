import { IImage } from "./image";

export interface ICampainDTO{
    name: string,
    thumbnail: string,
    items: string,
    // createdAt: string,
    // updatedAt: string
}

export interface ICampaign {
    id: string,
    name: string,
    thumbnail: IImage,
    items: IImage[],
    createdAt: string,
    updatedAt: string,
    slug: string
}