import { IProduct } from "@store/interfaces/product.interface";
import React, { memo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../products-card";
import { ProductsListContainer } from "./style";

type Props = {
  products: IProduct[];
  total?: number;
  fetchMore?: () => void;
  hasMore?: boolean;
  infiniteScroll: boolean
};


const ProductsList: React.FC<Props> = ({ products, hasMore=false, fetchMore= () => {}, infiniteScroll }) => {
  const renderProductList = products.map((product, index) => (
    <ProductCard key={product.id} product={product}></ProductCard>
  ));
  return infiniteScroll ? (
    <InfiniteScroll
      dataLength={products.length}
      hasMore={hasMore}
      next={fetchMore}
      loader={<div>Loading</div>}
    >
      <ProductsListContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
        {renderProductList}
      </ProductsListContainer>
    </InfiniteScroll>
  ): (
    <ProductsListContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
        {renderProductList}
      </ProductsListContainer>
  );
};

export default memo(ProductsList);
