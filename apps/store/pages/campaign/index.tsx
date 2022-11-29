import React from 'react';

type PageProps = {
    campaigns: ICampaign[]
}

const CampaignPage: NextPage<PageProps> = ({campaigns}) => {
    const router = useRouter();

    const navigateToDetail = (slug: string) => {
        router.push(`campaign/${slug}`)
    }

    const mapCampaigns = campaigns.length ? campaigns.map(campaign => (
        <div key={campaign.id} className='flex flex-col items-center justify-center cursor-pointer my-5' onClick={() => navigateToDetail(campaign.slug)}>
            <div className='flex-1'>
                <Image alt={campaign.name}  className='transition duration-1000 ease-in-out hover:scale-110'   height={600} width={1200}  src={`${process.env.NEXT_PUBLIC_URL_WEB}/${campaign.thumbnail.path}`}/>
            </div>
            <div className='flex-1'>
                <h3>{campaign.name}</h3>
            </div>
        </div>
    )) : null;

    console.log(campaigns);
    return (
        <div className='p-10'>
            {
                mapCampaigns
            }
        </div>
    );
};

export default CampaignPage;


import { GetServerSideProps, NextPage } from 'next'
import { CampaignService } from '@store/services/campaign';
import { ICampaign } from '@store/interfaces/campaign';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data: {campaigns} } = await  CampaignService.getCampaigns.fetch(1, 10);

    return {
        props: {
            campaigns
        }
    }
}