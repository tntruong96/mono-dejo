
import dynamic from "next/dynamic";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AssetModalContainer } from "./style";

import { useFormik, useFormikContext } from "formik";
import { ImageServices } from "@blog/services/images";
import { IImage } from "@shared-types/src";

const DynamicModal = dynamic(() => import("antd/lib/modal/Modal"));
const DynamicImage = dynamic(() => import("antd/lib/image"));

// type TypeSetData<T>= T extends string | number ? string | number : string[] | number[];

type TypeModal = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  title?: string;
  width?: number;
  multi?: boolean;
  // setData: React.Dispatch<React.SetStateAction<any>>;
  value?: any;
  name?: string;
  [key: string]: any;
};

const AssetModal: FC<TypeModal> = ({
  visible,
  setVisible,
  title,
  width,
  multi,
  name,
  value,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>();
  // const {width: widhtWindow} = useWindowDimensions();
  const [images, setImages] = useState<IImage[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [radioId, setRadioId] = useState<string>();
  const [itemsId, setItemsId] = useState<string[]>([]);
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    setIsVisible(visible);
    // setFieldValue(name ? name : "", value)
  }, [visible]);

  useEffect(() => {
    const getImages = async (
      page: number,
      limit: number,
      reload: boolean = false
    ) => {
      try {
        const { data } = await ImageServices.getImages.fetch({ page, limit });
        if (reload) {
          setImages(data[0]);
        } else {
          setImages([...images, ...data[0]]);
        }
        setTotal(data[1]);
      } catch (error) {
        throw error;
      }
    };

    getImages(page, 10);
    console.log(values);
    // setFieldValue()
  }, [page]);

  // const operateModal =() => {
  //   setVisible(false);
  // };

  const loadMore = () => {
    setPage(page + 1);
  };

  const handleChange = (value: any) => {
    if (multi) {
      setItemsId([...itemsId, value.target.value]);
    } else {
      // console.log(value);
      setRadioId(value.target.value);
    }
  };

  const handleOk = () => {
    !multi
      ? setFieldValue(name ? name : "", radioId)
      : setFieldValue(name ? name : "", itemsId);
    // console.log("a")
    setVisible(false);
  };

  const handleCancel = () => {
    !multi
      ? setFieldValue(name ? name : "", "")
      : setFieldValue(name ? name : "", "");
    setVisible(false);
  };

  return (
    <AssetModalContainer>
      <DynamicModal
        visible={isVisible}
        onCancel={handleCancel}
        title={title}
        width={width}
        onOk={handleOk}
      >
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center ">
          {images.length
            ? images.map((image) => (
                <div
                  key={image.id}
                  className="flex flex-col justify-center items-center md:h-[350px] mx-5"
                >
                  <div className="flex-1 flex justify-center items-center">
                    <DynamicImage
                      className="p-2"
                      width={200}
                      alt={image.name}
                      src={`${process.env.NEXT_PUBLIC_URL_WEB}/${image.path}`}
                    />
                  </div>
                  <div className="flex-initial">
                  {multi ? (
                    <input
                      type="checkbox"
                      value={image.id}
                      onChange={(e) => handleChange(e)}
                    />
                  ) : (
                    <input
                      type="radio"
                      id={image.id}
                      name="thumbnail"
                      value={image.id}
                      onChange={(e) => handleChange(e)}
                    />
                  )}
                  </div>
                </div>
              ))
            : null}
        </div>
        {total === images.length ? null : (
          <button className="btn mt-2" onClick={loadMore}>
            More Image
          </button>
        )}
      </DynamicModal>
    </AssetModalContainer>
  );
};

export default AssetModal;
