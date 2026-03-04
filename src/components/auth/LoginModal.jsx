import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { useState } from "react";

const LoginModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    dispatch(loginSuccess({ email }));
    onClose();
  };

  return (
    <>
      {/* Dark blurred backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-96 p-6 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
