import React, { useEffect } from 'react';
import { QueryParamProvider } from 'use-query-params';
import { AnswersConfig } from './AnswersConfig';
import AnswersStore from './AnswersStore';
import { initialState } from './initialState';
import { useAnswers } from './useAnswers';
import { useQueryParamManager } from './useQueryParamManager';

type Props = {
  //Insert Props Here
  children: React.ReactNode;
  config: AnswersConfig;
};

const AnswersContext: React.FC<Props> = props => {
  return (
    <QueryParamProvider>
      <AnswersStore>
        <Inner {...props} />
      </AnswersStore>
    </QueryParamProvider>
  );
};

const Inner = ({ config, children }: Props) => {
  const { runSearchOnLoad = false } = config;
  const {
    state,
    actions: { runSearch, setConfiguration, handleSearchTermChange },
  } = useAnswers();

  const queryParams = useQueryParamManager();
  useEffect(() => {
    if (!state.verticalKey) {
      setConfiguration(config, {
        ...initialState,
        lastSearchedTerm: queryParams.query || '',
        originalSearchTerm: queryParams.query || '',
        visibleSearchTerm: queryParams.query || '',
        facetFilters: queryParams.filters || [],
        sortBys: queryParams.sortBys,
      });
    }
    if (runSearchOnLoad && state.verticalKey) {
      runSearch(undefined, false);
    }

    if (state.verticalKey) {
      handleSearchTermChange();
    }
  }, [runSearchOnLoad, state.verticalKey]);

  return <>{children}</>;
};

export default AnswersContext;
