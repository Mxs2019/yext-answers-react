import * as React from 'react';
import { useRef, useState } from 'react';
import { useAnswers } from '../../.';
import Autocomplete from './Autocomplete';

const SearchBar = () => {
  const {
    state: { visibleSearchTerm },
    actions: {
      handleSearchTermChange,
      nextAutocompleteOption,
      prevAutocompleteOption,
      runSearch,
    },
  } = useAnswers();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          runSearch();
        }}
        style={{ display: 'block' }}
      >
        <input
          placeholder="Search..."
          style={{
            display: 'block',
            padding: '0.5rem',
            width: '99%',
            border: '1px solid lightgrey',
          }}
          value={visibleSearchTerm}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              nextAutocompleteOption();
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              prevAutocompleteOption();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              if (inputRef.current !== null) {
                inputRef.current.blur();
              }
            }
          }}
          ref={inputRef}
          onChange={e => handleSearchTermChange(e.target.value)}
        />
      </form>
      <Autocomplete inputFocused={isFocused} />
    </div>
  );
};

export default SearchBar;
