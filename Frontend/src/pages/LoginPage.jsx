import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://url-shorter-app.onrender.com/api/v1/user/login", formData, {
        withCredentials: true,
      });

      console.log("Login success:", res.data);

      // Redirect to Home page without reload
      navigate("/home"); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email or Username"
            type="text"
            name="identifier"
            placeholder="Enter Email or Username"
            value={formData.identifier}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button text={loading ? "Logging in..." : "Login"} disabled={loading} />
        </form>

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-600">Register</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
