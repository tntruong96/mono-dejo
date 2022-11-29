import { MessagesEnum } from "@admin/configs/messages";
import { StatusCode } from "@shared-types/src/index";
import { savePositionTab } from "@admin/redux/store/common/commonSlice";
import { CampaignService } from "@admin/services/campaign";
import { message } from "antd";
import { Field, Form, Formik } from "formik";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { array, object, string } from "yup";

const DynamicAssetModal = dynamic(
  () => import("@shared-components/src/index").then(m => m.AssetModal)
);

type FormCreate = {
  name: string;
  thumbnail: string;
  items: string;
};

const formInitialValue: FormCreate = {
  name: "",
  thumbnail: "",
  items: "",
};

const validateSchema = object().shape({
  name: string().required(MessagesEnum.REQUIRED),
  thumbnail: string().required(MessagesEnum.REQUIRED),
  // items: array().min(1, MessagesEnum.REQUIRED),
});

const CreateCampaign: NextPage = () => {
  const [showThumbnailModal, setShowThumbnailModal] = useState<boolean>(false);
  const [showItemsModal, setShowItemsModal] = useState<boolean>(false);
  const routing = useRouter();
  const dispatch = useDispatch();

  const handleSubmit =  async (fomrValue: FormCreate) => {
    try {
      const {status} = await CampaignService.createCampaign.fetch({
        name: fomrValue.name,
        thumbnail: fomrValue.thumbnail,
        items: JSON.stringify(fomrValue.items),
        // createdAt: '',
        // updatedAt: ''
      });

      if(status === StatusCode.SUCCESS){
        message.success(MessagesEnum.CREATE_SUCCESS, 1);
        dispatch(savePositionTab("4"));
        setTimeout(() => routing.push("/"), 2000);
      }
    } catch (error) {
      throw error;
    }
    // console.log(fomrValue);
  };

  const operateThumbnailModal = () => {
    setShowThumbnailModal(!showThumbnailModal);
  };

  const operateItemsModal = () => {
    setShowItemsModal(!showItemsModal);
  };

  return (
    <section className="px-2 pt-12 pb-20 w-full md:w-5/6 m-auto">
      <Formik
        initialValues={formInitialValue}
        onSubmit={(e) => handleSubmit(e)}
        validationSchema={validateSchema}
      >
        {({ errors, touched, isValid }) => (
          <Form className="border border-spacing-1 p-8 rounded-md drop-shadow-md">
            <div className="flex flex-col my-2 w-full md:w-1/3">
              <label htmlFor="name" className="font-bold">
                Name
              </label>
              <Field id="name" className="form-input" name="name" />
              {errors.name && touched.name ? (
                <p className="error">{errors.name}</p>
              ) : null}
            </div>
            <div className="flex flex-col my-2 w-full md:w-1/4">
              <label htmlFor="thumbnail" className="font-bold">
                Thumbnail
              </label>
              {/* <Field name="name"/> */}
              <button
                type="button"
                className="btn my-2"
                onClick={operateThumbnailModal}
              >
                Choose Thumbnail
              </button>
              {errors.thumbnail ? (
                <p className="error">{errors.thumbnail}</p>
              ) : null}
              <DynamicAssetModal
                visible={showThumbnailModal}
                width={900}
                setVisible={setShowThumbnailModal}
                multi={false}
                name="thumbnail"
              />
            </div>
            <div className="flex flex-col my-2 w-full md:w-1/4">
              <label htmlFor="items" className="font-bold">
                Items
              </label>
              {/* <Field name="name"/> */}
              <button
                className="btn my-2"
                type="button"
                onClick={operateItemsModal}
              >
                Choose Items
              </button>
              {errors.items ? <p className="error">{errors.items}</p> : null}

              <DynamicAssetModal
                visible={showItemsModal}
                width={900}
                setVisible={setShowItemsModal}
                multi={true}
                name="items"
              />
            </div>
            <div className="w-full mt-6 md:w-1/5">
              <button type="submit" className={`btn ${!isValid ? "cursor-not-allowed":""}`} disabled={!isValid}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default CreateCampaign;
