import { FC } from 'react';
import { Images } from '../../types';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

interface ImageGalleryProps {
  imgList: Images[];
  onClick: (data: string) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ imgList, onClick }) => {
  return (
    <ul className={css.galleryList}>
      {imgList.map(imgItem => (
        <li key={imgItem.id} className={css.galleryItem}>
          <ImageCard image={imgItem} onClick={onClick} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
