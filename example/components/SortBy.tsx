import { SortBy } from '@yext/answers-core';
import * as React from 'react';
import { useAnswers } from '../../.';

const Sorting = () => {
  const {
    state,
    actions: { updateSortBys },
  } = useAnswers();

  const sortByOptions: {
    label: string;
    sortBys?: SortBy[];
  }[] = [
    {
      label: 'Default',
    },
    {
      label: 'Sort A-Z',
      sortBys: [
        {
          type: 'FIELD',
          field: 'name',
          direction: 'ASC',
        },
      ],
    },
    ,
    {
      label: 'Sort Z-A',
      sortBys: [
        {
          type: 'FIELD',
          field: 'name',
          direction: 'DESC',
        },
      ],
    },
  ];

  return (
    <div>
      <h3>Sorting</h3>
      {sortByOptions.map(o => (
        <div key={o.label}>
          <label>
            <input
              type="radio"
              value={o.label}
              id="sortby"
              name="sortby"
              checked={
                JSON.stringify(state.sortBys) === JSON.stringify(o.sortBys)
              }
              onChange={() => updateSortBys(o.sortBys)}
            />
            {o.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Sorting;
