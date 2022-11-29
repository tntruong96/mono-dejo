import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SidebarContainer,
  SidebarContent,
  SidebarMask,
} from "./styles";
import { Menu, MenuProps } from "antd";
import { useRouter } from "next/router";
import { MenuItem } from "rc-menu";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { UserProfile } from "@blog/redux/store/common/type";
import { behaveSidebar, clearProfile, isAuth, stateSidebar } from "@blog/redux/store/common/commonSlice";
import Auth from "@blog/services/auth";

type MenuItem = Required<MenuProps>["items"][number];

interface Props {
  profile: UserProfile;
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const defaultItems: MenuItem[] = [
  getItem("Le Produit", "/products"),
  getItem("Le Blog", "/blog"),
  getItem("About De Jo", "/about"),
  getItem("Login", "/login"),
  getItem("Register", "/register"),
];

const authenticatedItems: MenuItem[] = [
  getItem("Le Produit", "/products"),
  getItem("Le Blog", "/blog"),
  getItem("About De Jo", "/about"),
  getItem("Profile", "/profile"),
  getItem("Admin", "/admin"),
  getItem("Log out", "/log-out"),

]

export const Sidebar: React.FC<Props> = ({ profile }) => {
  const isOpenSidebar = useSelector(stateSidebar);
  const dispatch = useDispatch();
  const route = useRouter();

  const handleClickMenuItem: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    if(e.key !== "/log-out"){
      handleSidebar();
      route.push(e.key);
    } else {
      handleSidebar();
      onLogout()

    }

  };


  // const renderRouter = routerElement.map((e, index) => (
  //   <Menu.Item onClick={() => handleSidebar()} key={index}>
  //     <Link href={e.url} passHref>
  //       <a>{e.title}</a>
  //     </Link>
  //   </Menu.Item>
  // ));

  const handleSidebar = () => {
    dispatch(behaveSidebar());
  };

  const onLogout = async () => {
    try {
      const isLogout = await Auth.logout.fetch();
      if (isLogout) {
        dispatch(isAuth());
        dispatch(clearProfile());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isOpenSidebar) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    };
    handleScroll();

  }, [isOpenSidebar]);

  return (
    <SidebarContainer
      className={classNames(isOpenSidebar ? "" : "open", "block md:hidden")}
    >
      <SidebarMask
        className={`${isOpenSidebar ? "hidden" : "block"}`}
        onClick={handleSidebar}
      ></SidebarMask>
      <SidebarContent>
        <div className="self-end mr-2">
          <FontAwesomeIcon onClick={handleSidebar} icon={faXmark as IconProp} />
        </div>
        <Menu
          onClick={handleClickMenuItem}
          selectedKeys={[]}
          className="w-full"
          style={{ backgroundColor: "#F7F7F7" }}
          items={!profile ? defaultItems : authenticatedItems}
        ></Menu>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
