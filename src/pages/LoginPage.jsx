import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    // ✅ Mock login success
    dispatch(
      loginSuccess({
        email,
      })
    );

    navigate("/checkout");
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-md">
      <h1 className="text-xl font-semibold mb-4">Login</h1>

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
  );
};

export default LoginPage;
