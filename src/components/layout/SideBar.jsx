import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Sidebar = ({ onClose }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-6">
          Menu
        </h2>

        <nav className="flex flex-col gap-4">
          {isAuth && user?.role === "ADMIN" ? (
            <>
              <Link to="/admin" onClick={onClose} className="text-green-600 font-semibold">
                Admin Panel
              </Link>
              <Link to="/admin/products" onClick={onClose}>Manage Products</Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={onClose}>Home</Link>
              <Link to="/cart" onClick={onClose}>Cart</Link>
              <Link to="/orders" onClick={onClose}>My Orders</Link>
            </>
          )}

          {!isAuth && (
            <Link to="/login" onClick={onClose}>
              Login
            </Link>
          )}

          {isAuth && (
            <button
              onClick={() => {
                dispatch(logout());
                onClose();
              }}
              className="text-left"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
