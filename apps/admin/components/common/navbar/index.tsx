import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  behaveSidebar,
  clearProfile,
  isAuth,
  selectAuth,
  selectProfile,
} from "@admin/redux/store/common/commonSlice";
import { useRouter } from "next/dist/client/router";
import { BurgerContainer, NavContainer, NavLink } from "./styles";
import classNames from "classnames";
// import Authentication from "../authentication";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Badge, Divider, Drawer } from "antd";
import { getItems, getTotalItems, selectSubtotal, selectTotal } from "@admin/redux/store/cart/cartSlice";
import type { IItemCart, UserProfile } from "@shared-types/src/index";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import RowCartItem from "@admin/components/cart/row-cart-item";
import { useWindowDimensions } from "@shared-utils/src";
import Authentication from "../authentication";
import Sidebar from "../sidebar";


function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);
  const { width, height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const profile: UserProfile = useSelector(selectProfile);
  const numberItemInCart = useSelector(getTotalItems);
  const itemInCart: IItemCart[] = useSelector(getItems);
  const memoSelectTotal = useMemo(() => selectTotal, [])
  const memoSelectSubTotal = useMemo(() => selectSubtotal ,[])
  const subTotal = useSelector(memoSelectSubTotal);
  const total = useSelector(memoSelectTotal);


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

      <div className="grid col-start-4 md:grid-cols-3">
        <div className="col-span-3 flex justify-end items-center pr-5">
          <div className="hidden md:block">
            <Authentication profile={profile} />
          </div>
        </div>
      </div>
      <Sidebar profile={profile} />
    </NavContainer>
  );
}

export default React.memo(Navbar);
