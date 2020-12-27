import { Facet } from '@yext/answers-core';
export type AnswersConfig = {
  apiKey: string;
  experienceKey: string;
  experienceVersion: string;
  locale: string;
  verticalKey: string;
  runSearchOnLoad?: boolean;
  facetSorter?: (facets: Facet[]) => Facet[];
  debug?: boolean;
};
