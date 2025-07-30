import { NavLink, Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
// import logo from "../assets/LOGO.svg";
import { FiSearch, FiMenu } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile, CgClose } from "react-icons/cg";
import { BiLogIn } from "react-icons/bi";
import { useState, useEffect } from "react";
import Axios from "../Axios";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {

  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Synchronise le nombre d'articles du panier au refresh
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!auth || !token) return;
    Axios.get("/api/v1/cart", {
      headers: { Authorization: token },
    })
      .then((res) => {
        const items = res.data?.items || [];
        const cartSize = items.reduce((sum, item) => sum + (item.qty || 0), 0);
        if (auth.cartSize !== cartSize) {
          setAuth({ ...auth, cartSize });
        }
      })
      .catch(() => {});
    // eslint-disable-next-line
  }, []);

  return (
    <div className="navigation-bar">
      <div
        className="btnMenu"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <FiMenu />
      </div>
      <span className="logo">
        <Link to="/">E-COM</Link>
        {/* <img src={logo} alt="LOGO" /> */}
      </span>
      <div className={isOpen ? "nav-links-md" : "nav-links"}>
        <div
          className="closeBtn"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <CgClose />
        </div>
        <NavLink
          to="/"
          className="nav-link"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/"
          state={{ scrollToTop: true }}
          className="nav-link"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Trending
        </NavLink>
        <NavLink
          to="/products"
          className="nav-link"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Products
        </NavLink>
        <a
          href="#footer"
          className="nav-link"
          onClick={() => {
            setIsOpen(!isOpen);
            setTimeout(() => {
              const footer = document.getElementById('footer');
              if (footer) footer.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        >
          About
        </a>
        <NavLink
          to="/contact"
          className="nav-link"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Contact
        </NavLink>
      </div>
      <div className="nav-button">
        <div className="nav-btn">
          <div className="btnIcon">
            <Link to="/products" style={{ color: "#fff" }}>
              <FiSearch />
            </Link>
          </div>
          <div className="btnIcon">
            <Link to="/cart" style={{ color: "#fff" }}>
              <FaShoppingCart />
              <div className="navAmount">{auth?.cartSize || 0}</div>
            </Link>
          </div>
          <div className="btnIcon">
            {auth ? (
              <>
                <CgProfile color="#fff" />
                <ul className="dropdown">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem("jwt");
                        setAuth(null);
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <Link to="/login" style={{ color: "#fff", fontSize: "30px" }}>
                <BiLogIn />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
