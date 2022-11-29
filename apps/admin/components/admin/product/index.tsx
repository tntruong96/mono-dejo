import { Products } from "@admin/services/products";
import { FormatCurrency } from "@shared-utils/src/index";
import { Table } from "antd";
import { TableRowSelection, ColumnsType } from "antd/lib/table/interface";
import type { IProduct } from "@shared-types/src/index";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FunctionalsButtons from "../functional-buttons";
import { ProductDashboardContainer } from "./styles";

interface TypeDataTable {
  index: number;
  key: string;
  name: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  price: string;
}

const column: ColumnsType<TypeDataTable> = [
    {
        title:"",
        dataIndex:"index"
    },
    {
        title:"Product's Name",
        dataIndex:"name"
    },
    {
        title:"Price",
        dataIndex:"price"
    },
    {
        title:"Created At",
        dataIndex:"createdAt"
    },
    {
        title:"Updated At",
        dataIndex:"updatedAt"
    },
    

]

const ProductDashboard = () => {
  const route = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sourceDataTable, setSourceDataTable] = useState<TypeDataTable[]>([]);
  const [update, setUpdate] = useState<boolean>(false);

  const onCreate = () => {
    route.push("/create-product");
  };

  const onDelete = async () => {
    console.log(selectedRowKeys);
    try {
      const {data} = await Products.deleteProduct.fetch(selectedRowKeys);
      setUpdate(!update);
    } catch (error) {
        throw error;
    }
  };

  const rowSelection: TableRowSelection<TypeDataTable> = {
    onChange(selectedRowKeys: React.Key[]) {
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
  };

 

  useEffect(() => {
    const handleTableData = async () => {
      const {data: {items, total}} = await Products.getProducts.fetch(undefined, undefined, '');
      console.log(items);
      const handledData = items && items.map( (item: IProduct, index: number) => {
        return  {
          ...item,
          index,
          key: item.id,
          price: FormatCurrency(item.price),
          createdAt: moment(item.createdAt).format("dddd, DD/MM/YYYY"),
          updatedAt: moment(item.updatedAt).format("dddd, DD/MM/YYYY"),
        }
        // return obj;
      })
      setSourceDataTable(handledData)
      // console.log(handledData);
    }
    handleTableData();
  }, [update])

  return (
    <ProductDashboardContainer>
      <FunctionalsButtons
        onCreate={onCreate}
        onDelete={onDelete}
        disabledDelete={!selectedRowKeys}
      />
      <Table
        rowSelection={rowSelection}
        columns={column}
        dataSource={sourceDataTable}
        className="py-4"
        scroll={{ x: 500 }}
      />
    </ProductDashboardContainer>
  );
};

export default ProductDashboard;
