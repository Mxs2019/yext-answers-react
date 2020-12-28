import * as React from 'react';
import { useAnswers } from '../../.';
import AppliedFilters from './AppliedFilters';

const Results = () => {
  const {
    state: { results, verticalresults, appliedFilters },
    actions: { loadMore, clearSearch },
  } = useAnswers();

  if (!verticalresults) return null;
  return (
    <div>
      <div>
        Showing {results.length} of {verticalresults.resultsCount} results
      </div>
      <AppliedFilters />
      <button onClick={() => clearSearch()}>Clear Search</button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
          margin: '1rem 0',
        }}
      >
        {results.map(e => (
          <div
            key={e.rawData.id}
            style={{
              padding: '0 1rem',
              border: '1px solid lightgrey',
            }}
          >
            <h3>{e.rawData.name}</h3>
            <p>{e.rawData.id}</p>
          </div>
        ))}
      </div>
      {verticalresults.resultsCount > results.length && (
        <button onClick={() => loadMore()}>Load More</button>
      )}
    </div>
  );
};

export default Results;
