import {
  SimpleFilter,
  SortBy,
  VerticalSearchResponse,
} from '@yext/answers-core';
import { useContext } from 'react';
import RecentSearches from 'recent-searches';
import { AnswersConfig } from './AnswersConfig';
import { AppContext } from './AnswersStore';
import { getFacetFilters, toggleFacetObject } from './facetUtilties';
import { InitialStateType } from './initialState';

const recentSearchesController = new RecentSearches();

export const useAnswers = () => {
  const { state, dispatch } = useContext(AppContext);
  const {
    lastSearchedTerm,
    visibleSearchTerm,
    facets,
    autocomplete,
    sortBys,
    verticalKey,
    results,
    core,
    facetFilters,
  } = state;

  const setConfiguration = (
    config: AnswersConfig,
    initialState: InitialStateType
  ) => {
    dispatch({
      type: 'SET_CONFIGURATION',
      config,
      initialState,
    });
  };

  const runSearch = async (
    searchTerm: string = visibleSearchTerm,
    clearFacets = true
  ) => {
    recentSearchesController.setRecentSearch(searchTerm);

    handleSearch(searchTerm, clearFacets ? undefined : facetFilters, sortBys);
  };

  const chooseAutocompleteOption = (index: number) => {
    const option = autocomplete.autocompleteOptions[index];
    if (option) {
      runSearch(option.value);
    } else {
      console.log('Index does not exist');
    }
  };

  const handleSearch = async (
    searchTerm: string,
    facetFilters?: SimpleFilter[],
    sortBys?: SortBy[]
  ) => {
    dispatch({
      type: 'PREPARE_FOR_SEARCH',
      searchTerm: searchTerm,
    });

    try {
      const res: VerticalSearchResponse = await core.verticalSearch({
        query: searchTerm,
        context: {},
        verticalKey,
        retrieveFacets: true,
        sortBys,
        facetFilters,
      });
      dispatch({
        type: 'SET_VERTICAL_RESPONSE',
        response: res,
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        error,
      });
    }
  };

  const handleSearchTermChange = async (
    searchTerm: string = visibleSearchTerm
  ) => {
    dispatch({
      type: 'ON_SEARCH_TERM_CHANGE',
      searchTerm,
    });
    const res = await core.verticalAutoComplete({
      input: searchTerm,
      verticalKey,
    });
    dispatch({
      type: 'SET_AUTOCOMPLETE',
      querySuggestions: res.results,
      recentSearches: recentSearchesController.getRecentSearches(searchTerm),
    });
  };

  const updateSortBys = async (
    sortBys: SortBy[] | undefined,
    updateSearchResults = true
  ) => {
    dispatch({
      type: 'UPDATE_SORT_BYS',
      sortBys,
    });

    if (updateSearchResults) {
      handleSearch(lastSearchedTerm, getFacetFilters(facets), sortBys);
    }
  };

  const toggleFacet = async (
    facetFieldId: string,
    optionDisplayName: string,
    updateSearchResults = true
  ) => {
    const updatedFacets = toggleFacetObject(
      state.facets,
      facetFieldId,
      optionDisplayName
    );

    dispatch({
      type: 'UPDATE_FACETS',
      facets: updatedFacets,
    });

    console.log(facetFilters);
    let removed = false;
    const updatedFacetFilters = facetFilters.filter(f => {
      if (f.fieldId === facetFieldId && f.comparedValue === optionDisplayName) {
        removed = true;
        return false;
      } else {
        return true;
      }
    });

    if (!removed) {
      updatedFacetFilters.push({
        fieldId: facetFieldId,
        comparator: '$eq',
        comparedValue: optionDisplayName,
      });
    }

    console.log(updatedFacetFilters);

    if (updateSearchResults) {
      handleSearch(lastSearchedTerm, updatedFacetFilters, sortBys);
    }
  };

  const loadMore = async () => {
    const res = await core.verticalSearch({
      query: lastSearchedTerm,
      context: {},
      verticalKey,
      retrieveFacets: true,
      facetFilters: getFacetFilters(facets),
      offset: results.length,
    });

    dispatch({
      type: 'APPEND_RESULTS',
      results: res.verticalResults.results,
    });
  };

  const nextAutocompleteOption = () => {
    dispatch({ type: 'NEXT_AUTOCOMPLETE_OPTION' });
  };

  const prevAutocompleteOption = () => {
    dispatch({ type: 'PREVIOUS_AUTOCOMPLETE_OPTION' });
  };

  const clearSearch = () => {
    dispatch({ type: 'ON_SEARCH_TERM_CHANGE', searchTerm: '' });
    dispatch({
      type: 'UPDATE_FACETS',
      facets: facets.map(f => {
        return {
          ...f,
          options: f.options.map(o => {
            return {
              ...o,
              selected: false,
            };
          }),
        };
      }),
    });
    dispatch({ type: 'UPDATE_SORT_BYS', sortBys: undefined });
    handleSearch('', undefined, undefined);
  };

  return {
    state,
    actions: {
      runSearch,
      handleSearchTermChange,
      chooseAutocompleteOption,
      toggleFacet,
      loadMore,
      updateSortBys,
      setConfiguration,
      nextAutocompleteOption,
      prevAutocompleteOption,
      clearSearch,
    },
  };
};
