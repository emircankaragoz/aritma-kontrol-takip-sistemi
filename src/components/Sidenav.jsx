import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useProSidebar,
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
} from "react-pro-sidebar";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import {
  RiContrastDrop2Line,
  RiToolsFill,
  Ri24HoursLine,
  RiCheckLine,
  RiDashboardLine,
  RiSettings2Line,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { SlFolder, SlUser, SlHome } from "react-icons/sl";
import { GiAbstract050 } from "react-icons/gi";
import LOGO from "../img/ekoten.png";
import { signOut } from "next-auth/react";
import { UserService } from "@/services";

export default function Sidenav({ session }) {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const { collapseSidebar } = useProSidebar();
  const [sessionUser, setSessionUser] = useState([]);

  // create a instance for get user datas
  const userService = new UserService();

  // get session employee ID
  const employeeId = session.user.employeeId;

  async function getSessionUserHandler() {
    if (session) {
      await userService
        .getSessionUser(employeeId)
        .then((result) => setSessionUser(result));
    }
  }

  useEffect(() => {
    getSessionUserHandler();
  }, []);

  if (typeof document === "undefined") {
    React.useLayoutEffect = React.useEffect;
  }

  const menuIconClick = () => {
    if (menuCollapse) {
      setMenuCollapse(false);
      collapseSidebar();
    } else {
      setMenuCollapse(true);
      collapseSidebar();
    }
  };

  function handleSignOut() {
    signOut();
  }

  if (sessionUser.length == 0) {
    return <div></div>;
  }

  return (
    <main >
      <div
        style={{
          display: "flex",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <Sidebar
          backgroundColor="#F8F9FA"
        >
          <section className="mb-4">
            <div className="logotext mt-3">
              {/* Icon change using menucollapse state */}
              <p className="text-dark text-center">
                {menuCollapse ? (
                  <GiAbstract050 />
                ) : (
                  <Image src={LOGO} width={60} alt="Ekoten Logo" />
                )}
              </p>
              <div className="text-dark fs-5 fw-semibold text-center text-muted">
                {!menuCollapse ? (
                  <span>Arıtma Kontrol Takip Sistemi</span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="closemenu text-muted" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </section>
          <Menu backgroundColor="#F8F9FA">
            <MenuItem
              component={<Link href="/" />}
              active={true}
              icon={<SlHome />}
            >
              Anasayfa
            </MenuItem>
            <section>
              {sessionUser.role.roleName === "admin" ? (
                <SubMenu
                  icon={<SlUser />}
                  label={`@${session.user.employeeId}`}
                >
                  <MenuItem
                    component={<Link href={`/panel`} />}
                    icon={<RiDashboardLine />}
                  >
                    Panel
                  </MenuItem>
                  <MenuItem
                    component={
                      <Link href={`/kullanici/${session.user.employeeId}`} />
                    }
                    icon={<RiSettings2Line />}
                  >
                    Hesap
                  </MenuItem>
                  <MenuItem
                    onClick={handleSignOut}
                    icon={<RiLogoutCircleLine />}
                  >
                    Çıkış
                  </MenuItem>
                </SubMenu>
              ) : (
                <SubMenu
                  icon={<SlUser />}
                  label={`@${session.user.employeeId}`}
                >
                  <MenuItem
                    component={
                      <Link href={`/kullanici/${session.user.employeeId}`} />
                    }
                    icon={<RiSettings2Line />}
                  >
                    Hesap
                  </MenuItem>
                  <MenuItem
                    onClick={handleSignOut}
                    icon={<RiLogoutCircleLine />}
                  >
                    Çıkış
                  </MenuItem>
                </SubMenu>
              )}
            </section>
            <SubMenu icon={<SlFolder />} label="Arıtma">
              <SubMenu icon={<RiToolsFill />} label="Analiz">
                <MenuItem
                  component={<Link href="/aritma/analiz/saatlik" />}
                  icon={<RiCheckLine />}
                >
                  Saatlik
                </MenuItem>
                <MenuItem
                  component={<Link href="/aritma/analiz/gunluk" />}
                  icon={<Ri24HoursLine />}
                >
                  Günlük
                </MenuItem>
              </SubMenu>
              <MenuItem
                component={<Link href="/aritma/kullanim" />}
                icon={<RiContrastDrop2Line />}
              >
                Madde Kullanım
              </MenuItem>
            </SubMenu>
            <MenuItem component={<Link href="/su" />} icon={<SlFolder />}>
              Su
            </MenuItem>
            <MenuItem component={<Link href="/tuz" />} icon={<SlFolder />}>
              Tuz
            </MenuItem>
            <MenuItem
              component={<Link href="/sabitler-limitler" />}
              icon={<SlFolder />}
            >
              Sabitler ve Limitler
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <style jsx>{`
        .closemenu {
          color: rgb(161, 161, 161);
          position: absolute;
          right: 0;
          z-index: 9999;
          line-height: 20px;
          border-radius: 50%;
          font-weight: bold;
          font-size: 22px;
          top: 55px;
          cursor: pointer;
        }

        #header .sidebar {
          width: 100%;
          min-width: 100%;
          height: 100vh;
          }

        .logotext p {
          font-size: 20px;
          padding: 0 20px;
          color: rgba(252, 252, 252, 0.521);
          font-weight: bold;
        }

        .sidebar {
          minHeigh
        }

        @media only screen and (max-width: 720px) {
          html {
            overflow: hidden;
          }
        }
      `}</style>
    </main>
  );
}
