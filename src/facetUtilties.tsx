import { Facet, SimpleFilter } from '@yext/answers-core';
import { AppliedFilter } from './initialState';

export const getFacetFilters = (facets: Facet[]): SimpleFilter[] => {
  return facets
    .map(f => {
      return [
        ...f.options
          .filter(o => o.selected)
          .map(o => {
            return o.filter;
          }),
      ];
    })
    .flat();
};

export const getFacetAppliedFilters = (facets: Facet[]): AppliedFilter[] => {
  return facets
    .map(f => {
      return [
        ...f.options
          .filter(o => o.selected)
          .map(o => {
            const filter: AppliedFilter = {
              displayName: f.displayName,
              fieldId: f.fieldId,
              source: 'FACET',
              values: [o.displayName],
            };
            return filter;
          }),
      ];
    })
    .flat();
};

export const toggleFacetObject = (
  facets: Facet[],
  facetFieldId: string,
  optionDisplayName: string
): Facet[] => {
  const updatedFacets = [...facets];
  updatedFacets.forEach(f => {
    if (f.fieldId === facetFieldId) {
      f.options.forEach(o => {
        if (o.displayName === optionDisplayName) {
          o.selected = !o.selected;
        }
      });
    } else return;
  });
  return updatedFacets;
};

export const sortFacets = (facets: Facet[]) => {
  return facets.map(f => {
    return {
      ...f,
      options: f.options.sort((a, b) => {
        if (a.selected && b.selected) return b.count - a.count;
        else if (a.selected) return -1;
        else if (b.selected) return 1;
        else return b.count - a.count;
      }),
    };
  });
};
