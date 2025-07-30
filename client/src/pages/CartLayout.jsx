import "../styles/cartlayout.css";
import CartItems from "../components/CartItems";
import { useCallback, useEffect, useState } from "react";
import Axios from "../Axios";
import useAuth from "../../hooks/useAuth";
import TriangleLoader from "../components/TriangleLoader";
import { toast } from "react-toastify";
import EmptyImage from "../Images/empty-cart.png";

const CartLayout = () => {
  const { auth, setAuth } = useAuth();
  const [data, setData] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  // Liste des coupons disponibles
  const availableCoupons = [
    { code: "FXSTUDIO", description: "10% de réduction sur tout le site" },
    { code: "NIKE2025", description: "15% sur la collection Nike 2025" },
  ];

  const token = localStorage.getItem("jwt");
  const updateData = useCallback(async (e) => {
    setData(e);
  }, []);
  const deleteItem = async (id, qty) => {
    try {
      const response = await Axios.delete(`/api/v1/cart/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.success === true) {
        toast.success("Product removed from cart successfully");
        setData(response.data.cart);
        setAuth({ ...auth, cartSize: Math.max(0, auth.cartSize - qty) });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await Axios.get("/api/v1/cart", {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      setData({
        items: response.data?.items || [],
        totalPrice: response.data?.totalPrice || 0,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [token]);
  const handleCheckout = async () => {
    try {
      const response = await Axios.post(
        "/api/v1/payment/create-checkout-session",
        { coupon: appliedCoupon ? couponCode.toUpperCase() : "" },
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
      );
      console.log(response);

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const applyCoupon = (coupon) => {
    if (!data || data.length <= 0) return toast.error("Cart is empty.");
    console.log(coupon.toUpperCase());
    const listOfCoupons = ["FXSTUDIO", "NIKE2025"];
    if (listOfCoupons.includes(coupon.toUpperCase())) {
      setCouponCode(coupon);
      setAppliedCoupon(true);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code.");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      setLoading(false);
      return;
    }
    console.log("cart layout");
    fetchData();
  }, [fetchData]);
  if (loading) return <TriangleLoader height="500px" />;
  return (
    <div className="cartMainContainer">
      <h1 className="cHeader">Shopping Cart</h1>
      <div className="cartContainer">
        <div className="cart-container-1">
          <table className="cart-table">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Product</th>
                <th className="cart-subheader">Size</th>
                <th className="cart-subheader">Quantity</th>
                <th className="cart-subheader">Total Price</th>
              </tr>
            </thead>
            <tbody className="cart-table-tbody">
              {(data?.items || []).map((item) => {
                return (
                  <CartItems
                    key={item._id}
                    cartId={item._id}
                    data={item.productId}
                    qty={item.qty}
                    size={item.size}
                    updateData={updateData}
                    deleteItem={() => deleteItem(item._id, item.qty)}
                  />
                );
              })}
            </tbody>
          </table>
          {(!data || data.items.length <= 0) && (
            <div className="empty-cart">
              <img src={EmptyImage} alt="empty-cart" />
              <p>Looks like you haven&apos;t added any items to the cart yet.</p>
            </div>
          )}
        </div>
        <div className="cart-container-2">
          <div className="cartSummary">
<<<<<<< HEAD
            {/* Affichage des coupons disponibles */}
            <div style={{ marginBottom: "1rem", background: "#ff008c", padding: "10px", borderRadius: "8px" }}>
              <strong>Profitez de nos coupons&nbsp;:</strong>
              <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
                {availableCoupons.map((c) => (
                  <li key={c.code}>
                    <span style={{ fontWeight: 600 }}>{c.code}</span> &mdash; {c.description}
                  </li>
                ))}
              </ul>
=======
            <div style={{marginBottom: '10px', background: '#fff0fa', borderRadius: '8px', padding: '8px 12px', color: '#ff008c', fontWeight: 700, fontSize: '1rem', textAlign: 'center'}}>
              Coupons disponibles : <span style={{margin: '0 6px', background: '#ffe6f5', borderRadius: '4px', padding: '2px 6px'}}>FXSTUDIO</span> <span style={{margin: '0 6px', background: '#ffe6f5', borderRadius: '4px', padding: '2px 6px'}}>NIKE2025</span>
>>>>>>> 309d9276d5a0a910d782f185940a0033f93d6250
            </div>
            <h3 className="summaryHeader">Order Summary</h3>
            <div className="summaryInfo">
              <p>
                <span>Sub Total</span>
                <span>
                  €{" "}
                  {(data?.totalPrice - data?.totalPrice * 0.12 || 0).toFixed(2)}
                </span>
              </p>
              <p>
                <span>Tax</span>
                <span>€ {(data?.totalPrice * 0.12 || 0).toFixed(2)}</span>
              </p>
              <p>
                <span>Shipping Charge</span>
                <span>Free</span>
              </p>
              <p>
                <span>Giftcard/Discount code</span>
                {/* <span>- € 0</span> */}
              </p>
              <div className="couponInput">
                <input
                  type="text"
                  name="couponCode"
                  id="couponCode"
                  value={couponCode}
                  disabled={appliedCoupon}
                  className={appliedCoupon ? "disabled" : ""}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon Code"
                />
                <button
                  type="button"
                  disabled={appliedCoupon}
                  className={appliedCoupon ? "disabledBtn" : ""}
                  onClick={() => applyCoupon(couponCode)}
                >
                  Apply
                </button>
              </div>
              <p className="cart-total">
                <span>Total</span>
                <span>€ {(data?.totalPrice || 0).toFixed(2)}</span>
              </p>
            </div>
            <button
              onClick={() => handleCheckout()}
              type="submit"
              className={
                !data || data?.items.length <= 0 || !auth
                  ? "checkout-btn disabled"
                  : "checkout-btn"
              }
              // className="checkout-btn"
              disabled={!data || data?.items.length <= 0 || !auth}
            >
              checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
