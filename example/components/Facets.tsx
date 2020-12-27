import * as React from 'react';
import { useAnswers } from '../../.';

const Facets = () => {
  const {
    state: { facets },
    actions: { toggleFacet },
  } = useAnswers();

  return (
    <div>
      {facets.map(f => (
        <div key={f.fieldId}>
          <h4>
            {f.displayName} ({f.options.filter(o => o.selected).length})
          </h4>
          <div>
            {f.options.map(o => (
              <div key={f.fieldId + o.displayName}>
                <label>
                  <input
                    name={o.displayName}
                    type="checkbox"
                    checked={o.selected}
                    onChange={() => toggleFacet(f.fieldId, o.displayName)}
                  />
                  {o.displayName} ({o.count})
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Facets;
