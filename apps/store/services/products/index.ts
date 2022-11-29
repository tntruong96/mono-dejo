import { CreateProductDTO } from "@shared-types/src"
import { caxios } from "@store/utils/axios"
import React from "react"
import { createProductCategorieDTO } from "./interface"

export const ProductCategories = {
    createProductCategories: {
        fetch: (createDTO: createProductCategorieDTO) => {
            return caxios.post(`${process.env.NEXT_PUBLIC_URL_API}/product-categories/new`, createDTO)
        }
    },
    deleteProductCategories: {
        fetch: (ids: React.Key[]) => {
            return caxios.delete(`${process.env.NEXT_PUBLIC_URL_API}/product-categories/delete-all`, {data: ids})
        }
    },
    getProductCategories: {
        fetch: ()=> {
            return caxios.get(`${process.env.NEXT_PUBLIC_URL_API}/product-categories`);
        }
    }
}


export const Products = {
    createProduct: {
        fetch: (newProduct: CreateProductDTO ) => {
            return caxios.post(`${process.env.NEXT_PUBLIC_URL_API}/product/new`, newProduct);
        }
    },
    getProducts: {
        fetch: (linmit:number = 10, page: number = 1, cateogry?: string) => {
            return caxios.get(`${process.env.NEXT_PUBLIC_URL_API}/product?limit=${linmit}&page=${page}&category=${cateogry}`);
        }
    },
    deleteProduct: {
        fetch: (ids: React.Key[]) => {
            return caxios.delete(`${process.env.NEXT_PUBLIC_URL_API}/product/delete-multi`, {data: ids});
        }
    },
    getProductByCategory: {
        fetch: (categorySlug: string) => {
            return caxios.get(`${process.env.NEXT_PUBLIC_URL_API}/product/filter/${categorySlug}`)
        }
    }
}