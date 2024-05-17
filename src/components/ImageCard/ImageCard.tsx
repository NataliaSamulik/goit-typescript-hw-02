import { FC } from 'react';
import css from './ImageCard.module.css';

interface ImageCardProps {
  image: {
    urls: {
      regular: string;
      small: string;
    };
    alt_description: string;
  };
  onClick: (data: string) => void;
}

const ImageCard: FC<ImageCardProps> = ({ image, onClick }) => {
  const selectImage = () => {
    onClick(image.urls.regular);
  };
  return (
    <div className={css.card}>
      <img
        className={css.image}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={selectImage}
      />
    </div>
  );
};

export default ImageCard;
