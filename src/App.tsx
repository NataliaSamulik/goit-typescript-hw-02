import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { fetchImagesWithKeyword } from './images-api';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';

import { Images } from './types';


function App() {
  const [images, setImages] = useState<Images[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [select, setSelect] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const notify = () => toast('Sorry, nothing was found for your request');

  useEffect(() => {
    async function fatchImages() {
      if(search==''){
        return
      }
      if (total === 1) {
        try {
          setLoading(true);
          setImages([]);
          setError(false);
          
          const data = await fetchImagesWithKeyword(search, total);
          if (data.results.length === 0) {
            notify();
            return;
          }
          setImages(data.results);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
        return;
      }
      try {
        setLoading(true);
        const data = await fetchImagesWithKeyword(search, total);
        setImages(prevImages => [...prevImages, ...data.results]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fatchImages();
  }, [search, total]);

  const handleSearchSubmit = (query: string) : void => {
    if(query == ''){
      setImages([])
    }
    setSearch(query);
    setTotal(1);
  };

  const handleMoreClick = () => {
    setTotal((total: number): number => total + 1);
  };

  const onSelectChange = (url: string) : void => {
    setSelect(url);
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setSelect('');
    setModalOpen(false);
  };

  return (
    <>
      <SearchBar onSearch={handleSearchSubmit} />
      <Toaster />
      {images.length > 0 && (
        <ImageGallery imgList={images} onClick={onSelectChange} />
      )}

      {loading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && <LoadMoreBtn onClick={handleMoreClick} />}
      <ImageModal isOpen={modalOpen} url={select} onClose={onCloseModal} />
    </>
  );
}

export default App;
