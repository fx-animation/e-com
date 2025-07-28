import  { useRef, useState } from "react";
import MultiSelectBox from "./MultiSelectBox";
import { toast } from "react-toastify";
import Axios from "../Axios";
import useAuth from "../../hooks/useAuth";

const SizeModal = ({ id, size, onClose }) => {
  const { auth, setAuth } = useAuth();
  const modelRef = useRef();
  const closeModal = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };
  const sizeOptions = size.map((item) => ({
    value: item.size,
    label: item.size,
  }));
  const [sizeSelected, setSizeSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const requestData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (sizeSelected === "") {
        toast.error("Please select a valid size");
        setLoading(false);
        return;
      }
      const token = localStorage.getItem("jwt");
      console.log("Size Selected: ", Number(sizeSelected.value));
      const response = await Axios.post(
        "/api/v1/cart/add",
        {
          productId: id,
          qty: 1,
          size: Number(sizeSelected.value),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(response?.data?.message);
      setAuth({ ...auth, cartSize: auth.cartSize + 1 });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={modelRef}
      onClick={closeModal}
      style={{
        background: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(1.5px)",
        boxShadow: "20px 20px 30px rgba(0, 0, 0, 0.06)",
      }}
      className="modal"
    >
      <div className="modal-container">
        <div className="modal-div">
          <h4>Choose Your Perfect Fit Size:</h4>
        </div>
        <div className="modal-div">
          <div className="select-main-box">
            <MultiSelectBox
              multiple={false}
              options={sizeOptions}
              value={sizeSelected}
              onChange={(e) => setSizeSelected(e)}
            />
          </div>
        </div>
        <div className="modal-div">
          <div className="filter-modal-btn">
            <button
              className="btn-filter "
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </button>
            <button
              className="btn-filter"
              disabled={loading}
              onClick={async () => {
                await requestData();
                onClose();
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import PropTypes from "prop-types";

SizeModal.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SizeModal;
