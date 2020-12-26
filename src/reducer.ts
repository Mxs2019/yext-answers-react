import {
  AutoCompleteResult,
  Facet,
  provideCore,
  SortBy,
  VerticalSearchResponse,
} from '@yext/answers-core';
import { Config } from './AnswersContext';
import { InitialStateType } from './initialState';
export type Action =
  | { type: 'PREPARE_FOR_SEARCH'; searchTerm: string }
  | { type: 'ON_SEARCH_TERM_CHANGE'; searchTerm: string }
  | { type: 'SET_VERTICAL_RESPONSE'; response: VerticalSearchResponse }
  | {
      type: 'SET_AUTOCOMPLETE';
      querySuggestions: AutoCompleteResult[];
      recentSearches: { query: string }[];
    }
  | { type: 'NEXT_AUTOCOMPLETE_OPTION' }
  | { type: 'SET_ERROR'; error: any }
  | { type: 'PREVIOUS_AUTOCOMPLETE_OPTION' }
  | { type: 'APPEND_ENTITIES'; entities: any[] }
  | { type: 'SET_CONFIGURATION'; config: Config }
  | { type: 'UPDATE_SORT_BYS'; sortBys?: SortBy[] }
  | { type: 'UPDATE_FACETS'; facets: Facet[] };

const reducer = (state: InitialStateType, action: Action): InitialStateType => {
  if (
    (action.type === 'SET_CONFIGURATION' && action.config.debug) ||
    state.debug
  ) {
    console.log(action.type, action);
  }
  const { autocomplete } = state;
  switch (action.type) {
    case 'PREPARE_FOR_SEARCH':
      return {
        ...state,
        loading: true,

        lastSearchedTerm: action.searchTerm,
        visibleSearchTerm: action.searchTerm,
        originalSearchTerm: action.searchTerm,
      };
    case 'SET_CONFIGURATION':
      const { config } = action;
      const core = provideCore(config);
      return {
        ...state,
        core,
        debug: config.debug || false,
        verticalKey: config.verticalKey,
      };
    case 'ON_SEARCH_TERM_CHANGE':
      return {
        ...state,
        visibleSearchTerm: action.searchTerm,
        originalSearchTerm: action.searchTerm,
      };
    case 'SET_ERROR':
      if (state.debug) {
        console.log(action.error);
      }
      return {
        ...state,
        error: action.error,
      };
    case 'SET_VERTICAL_RESPONSE':
      const { response } = action;
      return {
        ...state,
        loading: false,
        error: false,
        verticalresults: response.verticalResults,
        hasSearched: true,
        autocomplete: {
          loading: false,
          autocompleteOptions: [],
          recentSearches: [],
          querySuggestions: [],
          selectedIndex: -1,
        },
        entities: response.verticalResults.results.map(
          (r: any) => r.rawData as any
        ),
        facets: (response.facets as any) as Facet[],
      };
    case 'SET_AUTOCOMPLETE':
      const { querySuggestions, recentSearches } = action;
      return {
        ...state,
        autocomplete: {
          loading: false,
          querySuggestions,
          selectedIndex: -1,
          recentSearches,
          autocompleteOptions: [
            ...recentSearches.map(s => {
              return {
                value: s.query,
                type: 'RECENT',
              };
            }),
            ...querySuggestions.map(s => {
              return {
                ...s,
                type: 'SUGGESTION',
              };
            }),
          ] as { value: string; type: 'RECENT' | 'SUGGESTION' }[],
        },
      };
    case 'NEXT_AUTOCOMPLETE_OPTION':
      const nextIndex = Math.min(
        autocomplete.autocompleteOptions.length - 1,
        autocomplete.selectedIndex + 1
      );
      return {
        ...state,
        autocomplete: {
          ...autocomplete,
          selectedIndex: nextIndex,
        },
        visibleSearchTerm: autocomplete.autocompleteOptions[nextIndex].value,
      };

    case 'PREVIOUS_AUTOCOMPLETE_OPTION':
      const prevIndex = Math.max(-1, autocomplete.selectedIndex - 1);

      const newVisibleSearchTerm =
        prevIndex === -1
          ? state.originalSearchTerm
          : autocomplete.autocompleteOptions[prevIndex].value;

      return {
        ...state,
        autocomplete: {
          ...autocomplete,
          selectedIndex: prevIndex,
        },
        visibleSearchTerm: newVisibleSearchTerm,
      };

    case 'APPEND_ENTITIES':
      return {
        ...state,
        entities: [...state.entities, ...action.entities],
      };
    case 'UPDATE_SORT_BYS':
      return {
        ...state,
        sortBys: action.sortBys,
      };
    case 'UPDATE_FACETS':
      const { facets } = action;
      return {
        ...state,
        facets,
      };

    default:
      return state;
  }
};

export default reducer;
