import React from "react";
import home from "@store/public/images/home.jpg";
import home_1 from "@store/public/images/home-1.jpg";
import home_2 from "@store/public/images/home-2.jpg";

import Image from "next/image";
import { useRouter } from "next/router";
import { NextPage } from "next";

const Index: NextPage = () => {
    const useRoute = useRouter();
  return (
    <section>
      <div className="relative w-full h-screen cursor-pointer">
        <Image layout="fill" objectFit="cover" src={home} alt="" />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="relative w-full h-[700px] cursor-pointer">
          <Image src={home_1} alt="" layout="fill" objectFit="cover" />
          <span className="absolute font-medium bottom-5 right-2">NEW</span>
        </div>
        <div className="relative w-full h-[700px] cursor-pointer" onClick={() => useRoute.push('/products')}>
          <Image layout="fill" objectFit="cover" src={home_2} alt="" />
          <span className="absolute font-medium bottom-5 left-2">ALL</span>
        </div>
      </div>
    </section>
  );
};

export default Index;
