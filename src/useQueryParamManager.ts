import { useEffect } from 'react';
import { JsonParam, StringParam, useQueryParams } from 'use-query-params';
import { getFacetFilters } from './facetUtilties';
import { useAnswers } from './useAnswers';

export const useQueryParamManager = () => {
  const { state } = useAnswers();
  const [queryParams, setQueryParams] = useQueryParams({
    query: StringParam,
    filters: JsonParam,
    sortBys: JsonParam,
  });

  const facetFilters = getFacetFilters(state.facets);
  useEffect(() => {
    setQueryParams({
      query: state.lastSearchedTerm || undefined,
      filters: facetFilters.length > 0 ? facetFilters : undefined,
      sortBys: state.sortBys || undefined,
    });
  }, [state.lastSearchedTerm, facetFilters]);

  return queryParams;
};
