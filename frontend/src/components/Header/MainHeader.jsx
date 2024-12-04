import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { FiLogIn, FiMonitor } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useGetMainLogoQuery } from "../../Redux/logo/logoApi";
import { userLogout } from "../../Redux/user/userSlice";
import SearchBox from "./SearchBox";
import { BsSearch } from "react-icons/bs";
import SearchSidebar from "./SearchSidebar/SearchSidebar";

export default function MainHeader() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const carts = useSelector((state) => state.cart.carts);
  const { loggedUser } = useSelector((state) => state.user);
  const { data: logo } = useGetMainLogoQuery();
  const [searchSidebar, setSearchSidebar] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        !e.target.closest(".profileDropdownBtn") &&
        !e.target.closest(".user_info")
      ) {
        setProfileDropdown(false);
      }
    });
  }, []);

  const image =
    !loggedUser?.data?.image ||
    loggedUser?.data?.image === "" ||
    loggedUser?.data?.image === null
      ? "/images/demo_user.jpg"
      : `${import.meta.env.VITE_BACKEND_URL}/user/${loggedUser?.data?.image}`;

  return (
    <header
      className={`absolute top-0 z-40 w-full bg-black/5 py-2 ${pathname == "/" ? "text-white" : "text-black"}`}
    >
      <div className="container">
        <div className="flex items-center justify-between gap-2">
          <div>
            <Link to="/">
              <img
                src={
                  logo?.data[0]?.logo === ""
                    ? "/images/logo/logo.png"
                    : `${import.meta.env.VITE_BACKEND_URL}/logo/${
                        logo?.data[0]?.logo
                      }`
                }
                alt="logo"
                className="w-48"
                loading="lazy"
              />
            </Link>
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setSearchSidebar(!searchSidebar)}
              className="pr-2"
            >
              <BsSearch className="text-lg" />
            </button>

            <SearchSidebar
              searchSidebar={searchSidebar}
              setSearchSidebar={setSearchSidebar}
            />
          </div>

          <nav className="hidden lg:block">
            <ul className="flex items-center font-medium">
              {/* All Collection Dropdown */}
              <li className="group relative">
                <NavLink
                  to="#"
                  className="block px-3 duration-200 hover:text-primary"
                >
                  All Collection
                </NavLink>
                {/* Dropdown */}
                <div className="absolute left-0 hidden w-max space-y-2 border-t bg-white text-black shadow-lg group-hover:block">
                  <NavLink
                    to="/collection/men"
                    className="block px-4 py-2 duration-200 hover:bg-gray-200 hover:text-primary"
                  >
                    Men
                  </NavLink>
                  <NavLink
                    to="/collection/women"
                    className="block px-4 py-2 duration-200 hover:bg-gray-200 hover:text-primary"
                  >
                    Women
                  </NavLink>
                  <NavLink
                    to="/collection/kids"
                    className="block px-4 py-2 duration-200 hover:bg-gray-200 hover:text-primary"
                  >
                    Kids
                  </NavLink>
                  <NavLink
                    to="/collection/accessories"
                    className="block px-4 py-2 duration-200 hover:bg-gray-200 hover:text-primary"
                  >
                    Accessories
                  </NavLink>
                </div>
              </li>

              {/* <li>
                <NavLink
                  to="/shops"
                  className="block px-3 duration-200 hover:text-primary"
                >
                  Shop
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/elevating-desk-series"
                  className="block px-3 duration-200 hover:text-primary"
                >
                  Elevating Desk Series
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/grid-line-items"
                  className="block px-3 duration-200 hover:text-primary"
                >
                  Line Collection
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://www.youtube.com/@eManagerit"
                  target="_blank"
                  className="block px-3 duration-200 hover:text-primary"
                >
                  Videos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  className="block px-3 duration-200 hover:text-primary"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className="block px-3 duration-200 hover:text-primary"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          <div>
            <button
              onClick={() => setShowSearchBox(false)}
              className={`fixed left-0 top-0 z-10 h-screen w-full bg-black/50 duration-500 ${showSearchBox ? "block" : "hidden"}`}
            ></button>

            <div
              className={`fixed left-0 top-0 z-20 flex h-40 w-full items-center justify-center bg-white transition-all duration-500 ${showSearchBox ? "translate-y-0" : "translate-y-[-100%]"}`}
            >
              <div className="relative w-full max-w-lg rounded-lg p-4">
                <SearchBox
                  setSearch={() => setShowSearchBox(false)}
                  setMobileMenu={setSearchSidebar}
                />
              </div>
              <button
                onClick={() => setShowSearchBox(false)}
                className="text-2xl text-red-500"
              >
                <AiOutlineClose />
              </button>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex lg:gap-6">
            {loggedUser?.success ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="profileDropdownBtn"
                >
                  <img
                    src={image}
                    alt="user"
                    className="h-7 w-7 rounded-full border border-base-100"
                  />
                </button>

                {profileDropdown && (
                  <ul className="absolute right-0 top-[130%] z-50 w-max min-w-[220px] overflow-hidden rounded bg-base-100 text-[15px] text-neutral shadow-lg">
                    <li className="user_info border-b px-2 py-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={image}
                          alt="user"
                          className="h-9 w-9 rounded-full border border-base-100"
                        />
                        <div>
                          <h1 className="text-[17px]">
                            {loggedUser?.data?.name}
                          </h1>
                          <p className="text-sm text-neutral-content">
                            {loggedUser?.data?.phone}
                          </p>
                        </div>
                      </div>
                    </li>

                    {(loggedUser?.data?.role === "admin" ||
                      loggedUser?.data?.role === "superAdmin") && (
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="flex w-full items-center gap-1 px-3 py-1.5 duration-200 hover:bg-gray-200"
                        >
                          <RxDashboard className="text-lg" />
                          Dashboard
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link
                        to="/account/profile"
                        className="flex w-full items-center gap-1 px-3 py-1.5 duration-200 hover:bg-gray-200"
                      >
                        <FiMonitor className="text-lg" />
                        View Profile
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/account/wishlist"
                        className="flex w-full items-center gap-1 px-3 py-1.5 duration-200 hover:bg-gray-200"
                      >
                        <AiOutlineHeart className="text-xl" />
                        My Wishlist
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/account/orders"
                        className="flex w-full items-center gap-1 px-3 py-1.5 duration-200 hover:bg-gray-200"
                      >
                        <IoBagCheckOutline className="text-xl" />
                        My Order List
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={() => dispatch(userLogout())}
                        className="flex w-full items-center gap-1 border-t px-3 py-1.5 text-red-500 duration-200 hover:bg-gray-200"
                      >
                        <BiLogOutCircle className="text-base" />
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-neutral duration-300 hover:text-primary"
              >
                <FiLogIn className="text-xl sm:text-[17px]" />
                <h1 className="hidden font-medium sm:block">Login</h1>
              </Link>
            )}

            <BsSearch
              className="cursor-pointer text-xl hover:text-primary"
              onClick={() => setShowSearchBox(true)}
            />

            <Link
              to="/cart"
              className="flex items-center gap-2 duration-300 hover:text-primary lg:gap-3"
            >
              <div className="relative">
                <RiShoppingCartLine className="text-xl lg:text-2xl" />
                <div className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-base-100">
                  <span className="mt-px">{carts?.length || 0}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
