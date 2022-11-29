import { MessagesEnum } from "@admin/configs/messages";
import type { ICampaign } from "@shared-types/src/index";
import { CampaignService } from "@admin/services/campaign";
import { Field, Form, Formik, useFormik } from "formik";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
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

const UpdateCampaign: NextPage = () => {
  const [showThumbnailModal, setShowThumbnailModal] = useState<boolean>(false);
  const [showItemsModal, setShowItemsModal] = useState<boolean>(false);
  const [dataCampaign, setDataCampaign] = useState<ICampaign>();
  const [isLoading, setIsLoading] = useState(true);
  const routing = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (fomrValue: FormCreate) => {
    try {
      const { status } = await CampaignService.createCampaign.fetch({
        name: fomrValue.name,
        thumbnail: fomrValue.thumbnail,
        items: JSON.stringify(fomrValue.items),
        // createdAt: '',
        // updatedAt: ''
      });

      // if(status === StatusCode.SUCCESS){
      //   message.success(MessagesEnum.CREATE_SUCCESS, 1);
      //   dispatch(savePositionTab("4"));
      //   setTimeout(() => routing.push("/admin"), 2000);
      // }
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

  useLayoutEffect(() => {
    // console.log(routing.query);
    const getDataCampaign = async () => {
      const slug: string =
        typeof routing.query.slug === "string" ? routing.query.slug : "";
      const {
        data: { campaign },
      } = await CampaignService.getCampaign.fetch(slug);
      console.log(campaign);
      // console.log(data)
      setDataCampaign(campaign);
      setIsLoading(false)
      // console.log(dataCampaign);
    };

    getDataCampaign();
  }, [routing]);


  return (
    <section className="px-2 pt-12 pb-20 w-full md:w-5/6 m-auto">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Formik
          initialValues={{ name: dataCampaign? dataCampaign.name : "", thumbnail: '', items: ''}}
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
                <Image width={500} height={500} layout="responsive" unoptimized src={`${process.env.NEXT_PUBLIC_URL_WEB}/${dataCampaign?.thumbnail.path}`}/>
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
                {/* {errors.items ? <p className="error">{errors.items}</p> : null} */}

                <DynamicAssetModal
                  visible={showItemsModal}
                  width={900}
                  setVisible={setShowItemsModal}
                  multi={true}
                  name="items"
                />
              </div>
              <div className="w-full mt-6 md:w-1/5">
                <button
                  type="submit"
                  className={`btn ${!isValid ? "cursor-not-allowed" : ""}`}
                  disabled={!isValid}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </section>
  );
};

export default UpdateCampaign;
