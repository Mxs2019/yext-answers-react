import { AnswersCore, AutoCompleteResult, Facet, SortBy, VerticalResults } from '@yext/answers-core';
declare type AutocompleteState = {
    autocompleteOptions: {
        value: string;
        type: 'RECENT' | 'SUGGESTION';
    }[];
    loading: boolean;
    querySuggestions: AutoCompleteResult[];
    recentSearches: {
        query: string;
    }[];
    selectedIndex: number;
};
export declare type InitialStateType = {
    loading: boolean;
    error: any;
    hasSearched: boolean;
    core: AnswersCore;
    verticalKey: string;
    visibleSearchTerm: string;
    lastSearchedTerm: string;
    originalSearchTerm: string;
    verticalresults?: VerticalResults;
    entities: any[];
    facets: Facet[];
    sortBys?: SortBy[];
    autocomplete: AutocompleteState;
    debug: boolean;
};
export declare const initialState: InitialStateType;
export {};
