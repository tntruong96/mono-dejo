import { BlogCategories } from "@admin/services/blogs";
import { FormModal } from "@shared-components/src";
import { Form, Input, notification, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import FunctionalsButtons from "../functional-buttons";
import {
  BlogCategoriesDashboardContainer,
  BlogCategoriesDashboardTableContainer,
} from "./styles";

interface IDataTypeTable {
  id: number;
  key: React.Key;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const column: ColumnsType<IDataTypeTable> = [
  {
    title: "Category Name",
    dataIndex: "name",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
  },
];

const BlogCategoriesDashboard = () => {
  const router = useRouter();
  const [formValueCategory, setFormValueCategory] = useState({
    name: "",
  });
  const [visible, setVisible] = useState(false);
  const [dataTable, setDataTable] = useState<IDataTypeTable[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [update, setUpdate] = useState<boolean>(false);

  /* Handle Data table */

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDataTable = (arrData: IDataTypeTable[]): IDataTypeTable[] => {
    // const handledData: IDataTypeTable[] = [];

    return arrData.map((data, index) => {
      return {
        ...data,
        id: index,
        key: data.id,
        createdAt: moment(data.createdAt).format("dddd, D/M/YYYY"),
        updatedAt: moment(data.updatedAt).format("dddd, D/M/YYYY"),
      };
      // handledData.push(dataObj);
    });
    // return handledData;
  };

  useEffect(() => {
    const getBlogCategories = async () => {
      const { data } = await BlogCategories.getList.fetch();
      const handledData = handleDataTable(data);
      setDataTable(handledData);
    };
    getBlogCategories();
  }, [update]);

  /* Handle form modal */

  const openModal = () => {
    setVisible(true);
  };

  const handleCancelModal = () => {
    setVisible(false);
  };

  const handleSubmit = async (values: any) => {
    try {
      const result = await BlogCategories.create.fetch(values);
      if (result) {
        setVisible(false);
        notification.success({
          message: "New blog category was added!",
        });
        setUpdate(!update);
        // router.reload();
      }
    } catch (error) {
      throw error;
    }
  };

  /****************/

  const deleteAll = async (ids: React.Key[]) => {
    try {
      const result = await BlogCategories.deleteAll.fetch(ids);
      setUpdate(!update);
      // router.reload();
    } catch (error) {
      throw error;
    }
  };

  return (
    <BlogCategoriesDashboardContainer>
      <FunctionalsButtons
        onCreate={openModal}
        onDelete={() => {
          deleteAll(selectedRowKeys);
        }}
        disabledDelete={!selectedRowKeys.length}
      />
      <FormModal
        initialValueForm={formValueCategory}
        onCancel={handleCancelModal}
        onCreate={handleSubmit}
        title={"Add New Blog Category"}
        visible={visible}
      >
        <Form.Item
          name="name"
          label="Category Name"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </FormModal>
      <BlogCategoriesDashboardTableContainer>
        <Table
          columns={column}
          dataSource={dataTable}
          scroll={{ x: 600 }}
          rowSelection={rowSelection}
        />
      </BlogCategoriesDashboardTableContainer>
    </BlogCategoriesDashboardContainer>
  );
};

export default BlogCategoriesDashboard;
