import React, { ReactElement } from "react";
import Navbar from "../navbar/index";
import Head from "next/head";

interface Props {
  children: ReactElement;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>De Jo Admin</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
