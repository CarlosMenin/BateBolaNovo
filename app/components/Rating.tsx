import React, { useState } from 'react';

interface RatingProps {
  initialValue: number;
  onChange: (newRating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ initialValue, onChange }) => {
  const [rating, setRating] = useState(initialValue || 0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'star filled' : 'star'}
          onClick={() => handleRatingChange(star)}
          style={{ cursor: 'pointer', color: star <= rating ? '#f0b40e' : '#ccc' }}
      
       >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
