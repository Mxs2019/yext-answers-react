import { SortBy, VerticalSearchResponse } from '@yext/answers-core';
import { useContext } from 'react';
import RecentSearches from 'recent-searches';
import { Config } from './AnswersContext';
import { AppContext } from './AnswersStore';
import { getFacetFilters, toggleFacetObject } from './facetUtilties';

const recentSearchesController = new RecentSearches();

export const useAnswersStore = () => {
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
  } = state;

  const setConfiguration = (config: Config) => {
    dispatch({
      type: 'SET_CONFIGURATION',
      config,
    });
  };

  const runSearch = async (searchTerm: string = visibleSearchTerm) => {
    recentSearchesController.setRecentSearch(searchTerm);

    dispatch({
      type: 'PREPARE_FOR_SEARCH',
      searchTerm,
    });

    try {
      const res = await core.verticalSearch({
        query: searchTerm,
        context: {},
        verticalKey,
        retrieveFacets: true,
        // facetFilters: getFacetFilters(facets),
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

  const chooseAutocompleteOption = (index: number) => {
    const option = autocomplete.autocompleteOptions[index];
    if (option) {
      runSearch(option.value);
    } else {
      console.log('Index does not exist');
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
      dispatch({
        type: 'PREPARE_FOR_SEARCH',
        searchTerm: lastSearchedTerm,
      });

      const res: VerticalSearchResponse = await core.verticalSearch({
        query: lastSearchedTerm,
        context: {},
        verticalKey,
        retrieveFacets: true,
        sortBys,
        facetFilters: getFacetFilters(facets),
      });
      dispatch({
        type: 'SET_VERTICAL_RESPONSE',
        response: res,
      });
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

    if (updateSearchResults) {
      dispatch({
        type: 'PREPARE_FOR_SEARCH',
        searchTerm: lastSearchedTerm,
      });
      const res = await core.verticalSearch({
        query: lastSearchedTerm,
        context: {},
        verticalKey,
        retrieveFacets: true,
        sortBys,
        facetFilters: getFacetFilters(updatedFacets),
      });
      dispatch({
        type: 'SET_VERTICAL_RESPONSE',
        response: res,
      });
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
    },
  };
};
