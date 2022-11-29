import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faEye, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ICampaign, IImage } from "@shared-types/src/index";
import { CampaignService } from "@admin/services/campaign";
import { convertDate } from "@shared-utils/src/index";
import { message, notification, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Modal from "antd/lib/modal/Modal";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import FunctionalsButtons from "../functional-buttons";
import { CampaignContainer } from "./style";
import { TableRowSelection } from "antd/lib/table/interface";
import { StatusCode } from "@shared-types/src/index";
import { MessagesEnum } from "@admin/configs/messages";


// const DynamicTable = dynamic(() => import("antd/es/table"));
const DynamicImage = dynamic(() => import("antd/lib/image"), { ssr: false });
const DynamicPrviewGrooup = dynamic(
  () => import("antd/lib/image/PreviewGroup"),
  { ssr: false }
);

type TypeDataTable = {
  key: string;
  index: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: ReactElement;
  items: ReactElement;
};

const column: ColumnsType<TypeDataTable> = [
  {
    title: "Index",
    align: "center",
    dataIndex: "index",
    width: 50
  },
  {
    title: "",
    align: "center",
    render(value, record, index) {
      return (
        <Link passHref href={`/update-campaign?slug=${value.name}`}>
          <a>
            <FontAwesomeIcon icon={faEdit as IconProp} />
          </a>
        </Link>
      );
    },
  },
  {
    title: "Thumbnail",
    align: "center",
    dataIndex: "thumbnail",
    width: 150,
  },
  {
    title: "Name",
    align: "center",
    dataIndex: "name",
    width: 200
  },
  {
    title: "Items",
    dataIndex: "items",
    align: "center"
  },
  {
    title: "Created Date",
    align: "center",
    dataIndex: "createdAt",
  },
  {
    title: "Updated Date",
    align: "center",
    dataIndex: "updatedAt",
  },
];

const Campaign = () => {
  const route = useRouter();
  const [dataTable, setDataTable] = useState<TypeDataTable[]>();
  const [total, setTotal] = useState();
  const [itemsPreview, setItemsPreview] = useState<IImage[]>([]);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [update, setUpdate] = useState<boolean>(false);




  const handleOnCreate = () => {
    route.push("/create-campaign");
  };

  const handleOnDelete = async () => {
    try {
      const {status} = await CampaignService.deleteCampaign.fetch(selectedRowKeys)
      if(status === StatusCode.OK){
        // message.success(MessagesEnum.DELETE_SUCCESS ,2)
        notification.success({
          message: "Success",
          description: MessagesEnum.DELETE_SUCCESS,
          duration: 1
        })
        setUpdate(!update);
      }
      // console.log(respone)
    } catch (error) {
        throw error;
    }
  };

  const rowSelection: TableRowSelection<TypeDataTable> = {
    onChange(selectedRowKeys, selectedRows, info) {
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
  };

  useEffect(() => {
    const handleDataTable = (campaigns: ICampaign[]) => {
      console.log(campaigns);
      const dataTable: TypeDataTable[] = campaigns.length
        ? campaigns.map((campaign, index) => ({
            key: campaign.id,
            index: index + 1,
            name: campaign.name,
            thumbnail: (
              <DynamicImage
                src={`${process.env.NEXT_PUBLIC_URL_WEB}/${campaign.thumbnail.path}`}
                alt={campaign.thumbnail.name}
              />
            ),
            createdAt: convertDate(campaign.createdAt),
            updatedAt: convertDate(campaign.updatedAt),
            items: (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setItemsPreview(campaign.items);
                  setVisibleModal(!visibleModal);
                }}
              >
                <FontAwesomeIcon icon={faEye as IconProp} />
              </div>
            ),
          }))
        : [];
      // console.log(dataTable);
      setDataTable(dataTable);
    };

    const getCampaignData = async () => {
      try {
        const {
          data: { campaigns, total },
        } = await CampaignService.getCampaigns.fetch();
        handleDataTable(campaigns);
        // setUpdate(false);
      } catch (error) {
        throw error;
      }
    };

    getCampaignData();
  }, [update]);

  useEffect(() => {
    console.log(itemsPreview);
  }, [itemsPreview]);

  const handleModal = () => {
    setVisibleModal(!visibleModal);
  };

  return (
    <CampaignContainer>
      <FunctionalsButtons
        onCreate={handleOnCreate}
        onDelete={handleOnDelete}
        disabledDelete={!selectedRowKeys.length}
      />
      <Table rowSelection={rowSelection} dataSource={dataTable} columns={column} scroll={{ x: 500 }} className="py-4"/>
      <Modal width={700} open={visibleModal} onCancel={handleModal} footer={null}>
        <div className="p-5 flex flex-wrap">
          {itemsPreview.map((item) => (
            <div className="mx-2">
              <DynamicImage
                // preview={{visible:false}}
                height={200}
                src={`${process.env.NEXT_PUBLIC_URL_WEB}/${item.path}`}
              />
            </div>
          ))}
        </div>
      </Modal>
    </CampaignContainer>
  );
};

export default Campaign;
