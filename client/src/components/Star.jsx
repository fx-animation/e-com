
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";

const Star = ({ rating, onRate }) => {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(rating);
  const displayRating = hovered !== null ? hovered : selected;
  const fullStars = Math.floor(displayRating);

  const handleClick = (i) => {
    setSelected(i + 1);
    if (onRate) onRate(i + 1);
  };

  return (
    <span style={{ cursor: "pointer", display: "inline-flex" }}>
      {Array(5).fill().map((_, i) => {
        if (i < fullStars) {
          return (
            <FaStar
              key={i}
              color="#ff008c"
              onMouseEnter={() => setHovered(i + 1)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleClick(i)}
              style={{ transition: "color 0.2s" }}
              data-testid={`star-${i+1}`}
            />
          );
        } else if (i === fullStars && displayRating % 1 !== 0) {
          return (
            <FaStarHalfAlt
              key={i}
              color="#ff008c"
              onMouseEnter={() => setHovered(i + 1)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleClick(i)}
              style={{ transition: "color 0.2s" }}
              data-testid={`star-${i+1}`}
            />
          );
        } else {
          return (
            <FaRegStar
              key={i}
              color="#ff008c"
              onMouseEnter={() => setHovered(i + 1)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleClick(i)}
              style={{ transition: "color 0.2s" }}
              data-testid={`star-${i+1}`}
            />
          );
        }
      })}
    </span>
  );
};
Star.propTypes = {
  rating: PropTypes.number.isRequired,
  onRate: PropTypes.func,
};

export default Star;
