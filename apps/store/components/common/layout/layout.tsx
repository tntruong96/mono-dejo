import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import Navbar from "../navbar/navbar";
import Footer from "../footer";
import Head from "next/head";
import Sidebar from "../sidebar";

interface Props {
  children: ReactElement;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>De Jo Sai Gon</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
