import { SortBy } from '@yext/answers-core';
import { Config } from './AnswersContext';
export declare const useAnswersStore: () => {
    state: import("./initialState").InitialStateType;
    actions: {
        runSearch: (searchTerm?: string) => Promise<void>;
        handleSearchTermChange: (searchTerm?: string) => Promise<void>;
        toggleFacet: (facetFieldId: string, optionDisplayName: string, updateSearchResults?: boolean) => Promise<void>;
        loadMore: () => Promise<void>;
        updateSortBys: (sortBys: SortBy[] | undefined, updateSearchResults?: boolean) => Promise<void>;
        setConfiguration: (config: Config) => void;
        nextAutocompleteOption: () => void;
        prevAutocompleteOption: () => void;
    };
};
