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
    <div className="rating" style={{ textAlign: 'center', fontSize: '24px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'star filled' : 'star'}
          onClick={() => handleRatingChange(star)}
          style={{
            cursor: 'pointer',
            color: star <= rating ? '#f0b40e' : '#ccc',
            fontSize: '1.0em', // Adjust the size of the stars
            margin: '0 5px', // Add some space between stars
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
