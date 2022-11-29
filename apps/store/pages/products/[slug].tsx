import { NextPage } from "next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import ProductsFilter from "@store/components/products/products-filter";
import ProductsList from "@store/components/products/products-list";
import { IProduct, IProductCategory } from "@store/interfaces/product.interface";
import {
  ProductCategories,
  Products as productService,
} from "@store/services/products/index";
import { Empty } from "antd";
import { useRouter } from "next/router";

type TypeProduct = {
  items: IProduct[];
  total: number;
};

type Props = {
  products: TypeProduct;
  categories: IProductCategory[];
};

const Products: NextPage<Props> = ({
  products: { items, total },
  categories,
}) => {
  const route = useRouter();
  const [listUnitProduct, setListUnitProduct] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState(2);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [totalItem, setTotalItem] = useState(total);


  const fetchMoreProduct = async () => {
    try {
      const {
        data: { items, total },
      } = await productService.getProducts.fetch(2, page, filterCategory);
      setListUnitProduct([...listUnitProduct, ...items]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  // const filterProduct = (items: IProduct[]) => {
  //   const filteredItem = items.filter(
  //     (item) => item.category.id === filterCategory
  //   );
  //   setListFilteredUnitProduct(filteredItem);
  // };

  const setFilterProduct = (slug: string) => {
    setFilterCategory(slug);
    setPage(2);
    setTotalItem(total)
    route.push(`/products/${slug}`);
  };


  useEffect(() => {
    setListUnitProduct(items);
    setTotalItem(total);
    if (typeof route.query.slug === "string")
       route.query.slug === "all" ? setFilterCategory('') : setFilterCategory(route.query.slug);
  }, [route.query.slug, items]);

  useEffect(() => {
    setHasMore(listUnitProduct && listUnitProduct.length < totalItem ? true : false);
  }, [listUnitProduct, totalItem]);

  return (
    <section className="p-2">
      <ProductsFilter
        setFilter={setFilterProduct}
        categories={categories}
        choseCategory={filterCategory}
      />
      {listUnitProduct && listUnitProduct.length ? (
        <ProductsList
          infiniteScroll={true}
          hasMore={hasMore}
          fetchMore={fetchMoreProduct}
          products={listUnitProduct}
          total={total}
        />
      ) : (
        <div className="h-screen flex justify-center items-center">
          <Empty />
        </div>
      )}
    </section>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;
  const slug: string =
    typeof params?.slug === "string" && params?.slug !== "all"
      ? params?.slug
      : "";

  const { data: products } = await productService.getProducts.fetch(
    2,
    undefined,
    slug
  );

  // console.log(products)
  const {
    data: [categories, categoryTotal],
  } = await ProductCategories.getProductCategories.fetch();
  return {
    props: {
      products,
      categories,
    },
  };
};
