import { IProductCategory } from "@interfaces/product.interface";
import React, { useCallback, useMemo, useState } from "react";
import {
  FilterCategory,
  FilterCategoryItem,
  ProductFilterContainer,
} from "./style";

type Props = {
  categories: IProductCategory[];
  setFilter: (id: string) => void;
  choseCategory: string;
};

const ProductsFilter: React.FC<Props> = ({ categories, setFilter, choseCategory }) => {
  const [listCategory, setListCategory] =
    useState<IProductCategory[]>(categories);
    

    const handleOnClick = (slug: string) => {
      if(slug !== choseCategory)
      setFilter(slug)
      else
      setFilter('all')
    }

  // console.log(categories);
  const renderCategory = listCategory.map((category) => (
    <FilterCategoryItem
      onClick={() => handleOnClick(category.slug)}
      key={category.id}
      className={`${choseCategory === category.slug ? "active" :""}`}
    >
      {category.name}
    </FilterCategoryItem>
  ));

  return (
    <ProductFilterContainer>
      <FilterCategory className="w-full">{renderCategory}</FilterCategory>
      <div></div>
    </ProductFilterContainer>
  );
};

export default React.memo(ProductsFilter);
