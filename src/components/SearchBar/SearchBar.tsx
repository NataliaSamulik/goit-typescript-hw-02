import { FC, ChangeEvent } from 'react';
import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('The search field is empty');

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (evt: ChangeEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const form = evt.target;
    const query: string = form.query.value;
    if (query.trim() === '') {
      notify();
      form.reset();
    }
    onSearch(query.trim());
  };

  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
