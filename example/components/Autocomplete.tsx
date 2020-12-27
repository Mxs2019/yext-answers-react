import * as React from 'react';
import { useAnswers } from '../../.';

type Props = {
  //Insert Props Here
  inputFocused?: boolean;
};

const Autocomplete = ({ inputFocused }: Props) => {
  const {
    state: { autocomplete },
    actions: { chooseAutocompleteOption },
  } = useAnswers();

  const { autocompleteOptions } = autocomplete;

  return (
    <div>
      {autocompleteOptions.length > 0 && inputFocused && (
        <div style={{ position: 'relative' }}>
          {autocompleteOptions && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                border: '1px solid lightgrey',
              }}
            >
              {autocompleteOptions.map((a, i) => (
                <div
                  key={a.key}
                  style={{
                    backgroundColor: a.selected ? '#EEE' : '#FFF',
                    cursor: 'pointer',
                    padding: '0.5rem',
                  }}
                  onMouseDown={() => chooseAutocompleteOption(i)}
                >
                  {a.value}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
