import { Facet, SimpleFilter } from "@yext/answers-core";
export declare const getFacetFilters: (facets: Facet[]) => SimpleFilter[];
export declare const toggleFacetObject: (facets: Facet[], facetFieldId: string, optionDisplayName: string) => Facet[];
