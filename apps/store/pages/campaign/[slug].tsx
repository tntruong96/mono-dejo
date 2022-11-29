import { NextPage } from "next";
import React from "react";
import styles from "../../styles/modules/Campaign.module.scss";

const DynamicImage = dynamic(() => import("antd/lib/image"));

type PageProps = {
  campaign: ICampaign;
};

const CampaignDetailPage: NextPage<PageProps> = ({ campaign }) => {
  console.log(campaign);
  const moduleClassName = useModuleClassNames(styles);

  // const setHeightAndWidth = () => {
  //   campaign.items.length ?? campaign.items.map(item => {
      
  //   })
  // }

  const renderCampaignItems = campaign.items.length ? (
    campaign.items.map((item) => (
      <div className="md:flex-auto">
        <DynamicImage
          src={`${process.env.NEXT_PUBLIC_URL_WEB}/${item.path}`}
          preview={{ maskClassName: moduleClassName("mask-custom") }}
          rootClassName={moduleClassName("cursor")}
        />
      </div>
    ))
  ) : (
    <div>No Items</div>
  );
  return (
    <article className="w-full">
      <section className="w-full">
        <Image
          width={2000}
          height={700}
          objectFit="fill"
          
          layout="responsive"
          src={`${process.env.NEXT_PUBLIC_URL_WEB}/${campaign.thumbnail.path}`}
        />
      </section>
      <section className="w-full flex justify-center sm:justify-around flex-wrap my-5 px-16">{renderCampaignItems}</section>
    </article>
  );
};

export default CampaignDetailPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { ICampaign } from "@store/interfaces/campaign";
import { CampaignService } from "@store/services/campaign";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useModuleClassNames } from "@store/utils/hooks/useStyle";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = typeof ctx.query.slug === "string" ? ctx.query.slug : "";
  const {
    data: { campaign },
  } = await CampaignService.getCampaign.fetch(slug); // your fetch function here

  return {
    props: {
      campaign,
    },
  };
};
