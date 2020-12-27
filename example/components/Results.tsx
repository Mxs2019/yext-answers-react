import * as React from 'react';
import { useAnswers } from '../../.';

const Results = () => {
  const {
    state: { results },
  } = useAnswers();
  return (
    <div style={{ marginTop: '1rem' }}>
      {results.map(e => (
        <div
          key={e.rawData.id}
          style={{
            padding: '0 1rem',
            marginBottom: '1rem',
            border: '1px solid lightgrey',
          }}
        >
          <h3>{e.rawData.name}</h3>
          <p>{e.rawData.id}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
