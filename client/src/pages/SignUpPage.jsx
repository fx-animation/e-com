import { Link, useNavigate } from "react-router-dom";
import loginImage from "../Images/abc4.png";
import "../styles/auth.css";
import { useState } from "react";
import Axios from "../Axios";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "user",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation côté client
    if (!user.name || user.name.length < 3) {
      toast.error("Name must be at least 3 characters.", { position: "bottom-right" });
      return;
    }
    const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,})$/;
    if (!user.email || !emailRegex.test(user.email)) {
      toast.error("Please enter a valid email address.", { position: "bottom-right" });
      return;
    }
    if (!user.password || user.password.length < 6) {
      toast.error("Password must be at least 6 characters.", { position: "bottom-right" });
      return;
    }
    try {
      const response = await Axios.post("/api/v1/register", user);
      console.log(response);
      if (response.data.success === true) {
        toast.success("Account created successfully ", {
          position: "bottom-right",
        });
        navigate("/login");
      } else {
        toast.error(response.data.message, {
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "bottom-right",
      });
    }
  };
  return (
    <div className="login-page">
      <div className="login-div div1">
        <div className="login-box">
          <h1 className="login-heading">Sign up</h1>
          <h2 className="login-subheading">
            Already have an account?{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "#ff008c",
                pointerEvents: "cursor",
              }}
              to="/login"
            >
              Log in
            </Link>
          </h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-div">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>
            <div className="input-div">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>
            <div className="input-div">
              <label htmlFor="password">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  name="password"
                  placeholder="Enter your password"
                  style={{ paddingRight: "40px" }}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#6286A0"
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
            </div>
            <button
              className="login-button"
              type="submit"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
      <div className="login-div div2">
        <img className="login-image-r" src={loginImage} alt="image" />
      </div>
    </div>
  );
};

export default SignUpPage;
