/* eslint-disable react-refresh/only-export-components */
import { AiFillDelete, AiFillHeart } from "react-icons/ai";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { memo, useEffect, useRef, useState, useCallback } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Axios from "../Axios";
import PropTypes from "prop-types";

const CartItems = ({ cartId, data, qty, size, deleteItem, updateData }) => {
  const [currentQty, setCurrentQty] = useState(qty > 0 ? qty : 1);
  const [debounceQty, setDebounceQty] = useState(null);
  const { auth, setAuth } = useAuth();
  const firstUpdate = useRef(true);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      // Ne jamais envoyer qty < 1 ou > stock au backend
      const maxQty = data.stock || 99;
      if (currentQty < 1) {
        setCurrentQty(1);
        toast.info("Pour supprimer l'article, utilisez le bouton supprimer.");
        return;
      }
      if (currentQty > maxQty) {
        setCurrentQty(maxQty);
        toast.info("Stock maximum atteint.");
        return;
      }
      setDebounceQty(currentQty);
    }, 450);
    return () => {
      clearTimeout(handler);
    };
  }, [currentQty, data.stock]);
  // import { useCallback } from "react"; // Moved to top-level imports

  const changeQty = useCallback(async () => {
    try {
      const response = await Axios.put(
        `/api/v1/cart/update/${cartId}`,
        {
          qty: debounceQty,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      );
      console.log(response.data);
      updateData(response.data.cart);
      toast.success("Quantity updated successfully");
      // Synchronise le compteur panier avec le backend
      const totalQty = Array.isArray(response.data.cart.items)
        ? response.data.cart.items.reduce((sum, item) => sum + item.qty, 0)
        : 0;
      setAuth({ ...auth, cartSize: totalQty });
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [cartId, debounceQty, updateData, auth, setAuth]);

  useEffect(() => {
    if (debounceQty !== null && debounceQty !== qty) {
      changeQty();
    }
  }, [debounceQty, changeQty, qty]);
  return (
    <tr>
      <td>
        <div className="cart-product-cont">
          <div className="cart-image-cont">
            <Link
              to={`/product/${data.slug}`}
              style={{ textDecoration: "none" }}
            >
              <img src={data.image} alt="cart-img" />
            </Link>
          </div>
          <div className="cart-name-cont">
            <p style={{ textAlign: "left" }}>
              {data.brand} {data.name}
            </p>
            <div className="cart-name-cont-btn">
              <button onClick={deleteItem}>
                <AiFillDelete /> delete item
              </button>
              <button>
                <AiFillHeart /> move to favorite
              </button>
            </div>
          </div>
        </div>
        <div className="cart-mobile-info">
          <p>Size: {size}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <button
              style={{ background: "none", border: "none", display: "flex", alignItems: "center", fontSize: "18px" }}
              onClick={() => {
                if (currentQty > 1) {
                  setCurrentQty((prev) => prev - 1);
                } else {
                  setCurrentQty(1);
                  toast.info("Pour supprimer l'article, utilisez le bouton supprimer.");
                }
              }}
            >
              <HiMinusCircle />
            </button>
            <span>{currentQty}</span>
            <button
              style={{ background: "none", border: "none", display: "flex", alignItems: "center", fontSize: "18px" }}
              onClick={() => {
                const maxQty = data.stock || 99;
                if (currentQty < maxQty) {
                  setCurrentQty((prev) => prev + 1);
                }
                // Ne rien faire si stock max atteint
              }}
            >
              <HiPlusCircle />
            </button>
          </div>
          <p>Price: € {data.price}/item</p>
        </div>
      </td>
      <td className="cart-subheader">
        <p>{size}</p>
      </td>
      <td className="td-qty cart-subheader">
        <div>
          <button
            onClick={() => {
              if (currentQty > 1) {
                setCurrentQty((prev) => prev - 1);
              } else {
                setCurrentQty(1);
                toast.info("Pour supprimer l'article, utilisez le bouton supprimer.");
              }
            }}
          >
            <HiMinusCircle />
          </button>
          <p>{currentQty}</p>
          <button
            onClick={() => {
              const maxQty = data.stock || 99;
              if (currentQty < maxQty) {
                setCurrentQty((prev) => prev + 1);
              } else {
                toast.info("Stock maximum atteint.");
              }
            }}
          >
            <HiPlusCircle />
          </button>
        </div>
      </td>
      <td className="cart-subheader">
        <p>€ {currentQty * data.price}</p>
      </td>
    </tr>
  );
};
CartItems.propTypes = {
  cartId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  data: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number, // Add stock prop validation
  }).isRequired,
  qty: PropTypes.number.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  deleteItem: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
};

export default memo(CartItems);
