import * as React from 'react';
import { useAnswers } from '../../.';

const AppliedFilters = () => {
  const {
    state: { appliedFilters },
    actions: { toggleFacet },
  } = useAnswers();

  return (
    <div>
      {appliedFilters.map(f => (
        <div key={f.fieldId}>
          {f.displayName}:
          {f.source === 'FACET' &&
            f.values.map(v => (
              <button key={v} onClick={() => toggleFacet(f.fieldId, v)}>
                {v} x
              </button>
            ))}
          {f.source === 'NLP' && f.values.join(', ')}
        </div>
      ))}
    </div>
  );
};

export default AppliedFilters;
