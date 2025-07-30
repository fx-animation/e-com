import {  useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Star from "./Star";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import SizeModal from "./SizeModal";

// eslint-disable-next-line react-refresh/only-export-components
const Card = (data) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const toTitleCase = (word) => {
    let letterCapitalizer = (match) =>
      match.substring(0, 1).toUpperCase() + match.substring(1);
    return word.split(" ").map(letterCapitalizer).join(" ");
  };

  const handleAddToCart = async () => {
    if (!auth) {
      toast.error("Login required");
      navigate("/login");
      return;
    }
    setShowModal((prev) => !prev);
  };

  return (
    <div className="card-container">
      {showModal && (
        <SizeModal
          id={data._id}
          size={data.sizeQuantity}
          onClose={() => setShowModal((prev) => !prev)}
        />
      )}
      <div className="image-div">
        <img src={data.image} alt="image" height="240px" loading="lazy" />
      </div>
      <div className="desc" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h5 style={{ margin: 0, color: '#000', fontWeight: 900 }}>{data.brand}</h5>
        <h6 style={{ margin: 0, color: '#000', fontWeight: 900 }}>{toTitleCase(data.name)}</h6>
        <div className="star" style={{ margin: "0.3rem 0" }}>
          {<Star rating={data.ratingScore / data.ratings.length || 0} />}
        </div>
        <h4 style={{ margin: 0 }}>€ {data.price}</h4>
      </div>
      <button
        className="btn-cart"
        onClick={handleAddToCart}
      >
        <span className="add-to-cart">
          <FaShoppingCart />
        </span>
      </button>
    </div>
  );
};

const MemoizedCard = memo(Card);
export default MemoizedCard;