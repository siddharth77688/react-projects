import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { useState } from "react";
import { registerAPI } from "../../services/authAPI";

const SignupModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await registerAPI({ name, email, password });
      dispatch(loginSuccess({
        user: data.user,
        token: data.token,
      }));
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-3">
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded mb-3"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password (min 6 chars)"
            className="w-full border p-2 rounded mb-3"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-2 rounded mb-4"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SignupModal;
