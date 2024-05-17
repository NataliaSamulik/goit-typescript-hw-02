import ReactModal from 'react-modal';
import css from './ImageModal.module.css';
import { FC } from 'react';

ReactModal.setAppElement('#root');

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, onClose, url }) => {
  return (
    <ReactModal
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
        content: {
          width: '75%',
          outline: 'none',
          overflow: 'hidden',
          padding: 0,
        },
      }}
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      preventScroll={true}
      bodyOpenClassName={css.BodyOpen}
    >
      <img
        style={{
          objectFit: 'cover',
          objectPosition: 'inherit',
          width: '100%',
          height: '100%',
        }}
        src={url}
      />
    </ReactModal>
  );
};

export default ImageModal;
