import {
  AnswersCore,
  AutoCompleteResult,
  Facet,
  SortBy,
  VerticalResults,
} from '@yext/answers-core';
type AutocompleteState = {
  autocompleteOptions: {
    value: string;
    type: 'RECENT' | 'SUGGESTION';
    key: string;
    selected?: boolean;
  }[];
  loading: boolean;
  querySuggestions: AutoCompleteResult[];
  recentSearches: {
    query: string;
  }[];
  selectedIndex: number;
};

export type InitialStateType = {
  loading: boolean;
  error: any;
  hasSearched: boolean; // Wheter or not a search has been run
  core: AnswersCore;
  verticalKey: string;
  visibleSearchTerm: string; //Visible search term in the search bar
  lastSearchedTerm: string; // last searched term (search term of the results)
  originalSearchTerm: string; // search term that might be hidden due to showing autocomplete
  verticalresults?: VerticalResults;
  results: any[];
  facets: Facet[];
  sortBys?: SortBy[];
  autocomplete: AutocompleteState;
  debug: boolean;
  facetSorter?: (facets: Facet[]) => Facet[];
};

export const initialState: InitialStateType = {
  loading: false,
  error: false,
  //@ts-ignore
  core: undefined, // Will be set by initial load
  hasSearched: false,
  verticalKey: '',
  visibleSearchTerm: '',
  lastSearchedTerm: '',
  originalSearchTerm: '',
  verticalresults: undefined,
  results: [],
  entities: [],
  facets: [],
  autocomplete: {
    querySuggestions: [],
    loading: false,
    recentSearches: [],
    autocompleteOptions: [],
    selectedIndex: -1,
  },
  debug: false,
};
