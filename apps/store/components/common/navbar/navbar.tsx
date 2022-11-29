import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  behaveSidebar,
  clearProfile,
  isAuth,
  selectAuth,
  selectProfile,
} from "../../../redux/store/common/commonSlice";
import { UserProfile } from "../../../redux/store/common/type";
// import Auth from "../../../services/auth";
import { useRouter } from "next/dist/client/router";
import { BurgerContainer, NavContainer, NavLink } from "./styles";
import classNames from "classnames";
import Authentication from "../authentication";
import Sidebar from "../sidebar";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Badge, Divider, Drawer } from "antd";
import useWindowDimensions from "@store/utils/hooks/useWindowDimentions";
import { getItems, getTotalItems, selectSubtotal, selectTotal } from "@store/redux/store/cart/cartSlice";
import { IItemCart } from "@store/interfaces/cart.interface";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import RowCartItem from "@store/components/cart/row-cart-item";
import { FormatCurrency } from "@store/utils/formatCurrency";
import FontawsomeIcon from "../fontawsome-icon";

const routerElement = [
  {
    title: "Le Produit",
    url: "/products",
    sub: "/all"
  },
  {
    title: "Campagne",
    url: "/campaign",
    sub:""
  }
];

function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);
  const { width, height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const profile = useSelector(selectProfile);
  // const numberItemInCart = useSelector(getTotalItems);
  // const itemInCart = useSelector(getItems);
  // const memoSelectTotal = useMemo(() => selectTotal, [])
  // const memoSelectSubTotal = useMemo(() => selectSubtotal ,[])
  // const subTotal = useSelector(memoSelectSubTotal);
  // const total = useSelector(memoSelectTotal);



  const renderNavLink = routerElement.map((route, index) => (
    <NavLink
      key={index}
      // className={`mx-5 ${router.pathname === route.url ? "active" : ""}`}
      
      className={`mx-5 ${
        router.pathname.match(/(^\/\w+)/g)?.[0] === route.url ? "active" : ""
      }`}
    >
      <Link href={route.url+ route.sub}>{route.title}</Link>
    </NavLink>
  ));

  const handleSidebar = () => {
    dispatch(behaveSidebar());
  };

  const handleCartAction = () => {
    if (width < 770) {
      router.push("/cart");
    } else {
      showDrawer();
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };


  return (
    <NavContainer
      className={classNames("shadow-md grid grid-cols-4 p-5 items-center h-16")}
    >
      <BurgerContainer
        className="block md:hidden absolute"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        <div className="nav-icon" onClick={handleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </BurgerContainer>
      <div className="col-start-2 col-span-2 md:col-start-1 md:col-auto flex justify-center">
        <span
          className="logo text-center text-2xl sm:text-3xl font-bold"
          onClick={() => router.push("/")}
        >
          De Jo Sai Gon
        </span>
      </div>
      <ol className="col-start-2 col-span-2 hidden md:flex justify-center items-center mb-0 ">
        {renderNavLink}
      </ol>
      <div className="grid md:grid-cols-3">
        <div className="col-span-3 flex justify-end items-center pr-5">
          <div className="hidden md:block">
            <Authentication profile={profile} />
          </div>
          <FontawsomeIcon className="mx-2 cursor-pointer" icon={faSearch as IconProp} />
          {/* <Badge
            count={numberItemInCart}
            color="#333"
            offset={numberItemInCart >= 10 ? [9, 0] : [2, 0]}
          >
            <FontawsomeIcon
              onClick={handleCartAction}
              className="mx-2 cursor-pointer"
              icon={faCartShopping as IconProp}
            />
          </Badge> */}
        </div>
      </div>
      {/* <Sidebar profile={profile} /> */}
      <Drawer title="Your Cart" onClose={onClose} open={visible}>
        <section>
          <div className="max-h-[400px] overflow-auto p-2">
            {/* {
              itemInCart ? itemInCart.map((item) => <RowCartItem item={item} key={item.id}></RowCartItem>) : null
            } */}
          </div>
          <div className="w-full my-5 p-2">
            <div className="flex w-full justify-between">
              <div>
                Subtotal
              </div>
              <div>
                {/* {FormatCurrency(subTotal)} */}
              </div>
            </div>
            <Divider/>
            <div className="flex w-full justify-between">
              <div className="font-bold">
                Total
              </div>
              <div>
                {/* {FormatCurrency(total)} */}
              </div>
            </div>
            <div>

            </div>
          </div>
          <div className="flex justify-around items-center">
            <div className="w-1/3">
              <button
                className="btn"
                onClick={() => {
                  router.push("/cart");
                  onClose();
                }}
              >
                View Cart
              </button>
            </div>
            <div className="w-1/3">
              <button className="btn">Check Out</button>
            </div>
          </div>
        </section>
      </Drawer>
    </NavContainer>
  );
}

export default React.memo(Navbar);
