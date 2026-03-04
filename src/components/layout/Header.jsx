import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../auth/LoginModal";
import Sidebar from "./SideBar";

import { selectCartQuantity } from "../../features/cart/cartSelectors";
import { setSearchQuery } from "../../features/products/productSlice";
import { selectSearchQuery } from "../../features/products/productSelectors";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  // 1. Get authentication status from Redux
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const [openSidebar, setOpenSidebar] = useState(false);

  const dispatch = useDispatch();
  const cartQuantity = useSelector(selectCartQuantity);
  const searchQuery = useSelector(selectSearchQuery);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <div className="h-16 flex items-center gap-6">
          <button
            onClick={() => setOpenSidebar(true)}
            className="text-xl cursor-pointer"
          >
            ☰
          </button>

          <div className="text-xl font-bold text-blue-600 cursor-pointer">
            \Mobik/ 
          </div>

          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                dispatch(setSearchQuery(e.target.value))
              }
              placeholder="Search for products, brands and more"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-6">
            {/* Add the check here */}
            {!isAuthenticated && (
              <button
                onClick={() => setShowLogin(true)}
                className="cursor-pointer"
              >
                Login
              </button>
            )}


            <Link to="/cart" className="relative cursor-pointer">
              Cart
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
                {cartQuantity}
              </span>
            </Link>
          </div>
        </div>
      </Container>
      {/* ADD THE MODAL LOGIC HERE */}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
      {openSidebar && (
        <Sidebar onClose={() => setOpenSidebar(false)} />
      )}

    </header>
  );
};

export default Header;
