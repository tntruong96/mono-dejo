import Link from "next/link";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import {
  behaveSidebar,
  selectProfile,
} from "../../../redux/store/common/commonSlice";
import { BurgerContainer, NavContainer, NavLink } from "./styles";
import classNames from "classnames";
import { useRouter } from "next/router";
import {useWindowDimensions} from '@shared-utils/src'

function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);
  const { width, height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  // const profile: UserProfile = useSelector(selectProfile);
  // const numberItemInCart = useSelector(getTotalItems);
  // const itemInCart: IItemCart[] = useSelector(getItems);
  // const memoSelectTotal = useMemo(() => selectTotal, [])
  // const memoSelectSubTotal = useMemo(() => selectSubtotal ,[])
  // const subTotal = useSelector(memoSelectSubTotal);
  // const total = useSelector(memoSelectTotal);


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
          De Jo's Blogs
        </span>
      </div>
      {/* <ol className="col-start-2 col-span-2 hidden md:flex justify-center items-center mb-0 ">
        {renderNavLink}
      </ol> */}
      {/* <div className="grid md:grid-cols-3">
        <div className="col-span-3 flex justify-end items-center pr-5">
          <div className="hidden md:block">
            <Authentication profile={profile} />
          </div>
          <FontawsomeIcon className="mx-2 cursor-pointer" icon={faSearch as IconProp} />
          <Badge
            count={numberItemInCart}
            color="#333"
            offset={numberItemInCart >= 10 ? [9, 0] : [2, 0]}
          >
            <FontawsomeIcon
              onClick={handleCartAction}
              className="mx-2 cursor-pointer"
              icon={faCartShopping as IconProp}
            />
          </Badge>
        </div>
      </div> */}
      {/* <Sidebar profile={profile} /> */}
      {/* <Drawer title="Your Cart" onClose={onClose} visible={visible}>
        <section>
          <div className="max-h-[400px] overflow-auto p-2">
            {
              itemInCart ? itemInCart.map((item) => <RowCartItem item={item} key={item.id}></RowCartItem>) : null
            }
          </div>
          <div className="w-full my-5 p-2">
            <div className="flex w-full justify-between">
              <div>
                Subtotal
              </div>
              <div>
                {FormatCurrency(subTotal)}
              </div>
            </div>
            <Divider/>
            <div className="flex w-full justify-between">
              <div className="font-bold">
                Total
              </div>
              <div>
                {FormatCurrency(total)}
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
      </Drawer> */}
    </NavContainer>
  );
}

export default React.memo(Navbar);
