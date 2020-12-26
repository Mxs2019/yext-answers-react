# Yext Answers: React

This is a UI library for building search experiences on top of Yext Answers in React.
This is a headless library that manages `state` and a set of `actions` that manipulate
that state. This library is headless and leaves the entire UI up to you. The example
app shows a basic example of using this library.

> For now this library only supports vertical search

## Table of Contents

- [Installation](#Installation)
- [Getting Started](#Getting-Started)
- [Example](#Example)
- [Documentation](#Documentation)
  - [State](#State)
  - [Actions](#Actions)

## Installation

Install this library with npm or yarn.

```
npm install yext-answers-react
```

OR

```
yarn add yext-answers-react
```

## Getting Started

In order to start using this library, you will need to wrap your app in the `<AnswersContext>` component and then add the hook `useAnswers` to a child component. The `<AnswersContext>` component requires three props `config`, `core`, and `verticalKey`.

| Prop          | Type          | Required |
| ------------- | ------------- | -------- |
| `config`      | `object`      | No       |
| `core`        | `AnswersCore` | Yes      |
| `verticalKey` | `string`      | Yes      |

The config has the following optional propertiers

| Prop              | Type      | Default |
| ----------------- | --------- | ------- |
| `runSearchOnLoad` | `boolean` | `false` |

After wrapping the app in the `<AnswersContext>` then use
the hook `useAnswers` to access `state` and `actions`

## Example

Here is a basic example app that has a search bar and a set of results.

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { provideCore } from '@yext/answers-core';
import { AnswersContext, useAnswers, Config } from '../.';

const config: Config = {
  apiKey: '7bce922a5847aff36dc33345921ba700',
  experienceKey: 'dtc_demo',
  experienceVersion: 'PRODUCTION',
  locale: 'en',
  verticalKey: 'products',
  runSearchOnLoad: true,
  debug: true,
};

const App = () => {
  const { state, actions } = useAnswers();
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          actions.runSearch();
        }}
      >
        <input
          value={state.visibleSearchTerm}
          onChange={e => actions.handleSearchTermChange(e.target.value)}
        />
      </form>
      {state.loading && <div>Loading...</div>}
      {state.error && <div>Newtork Error</div>}
      <div>
        {state.entities.map(e => (
          <ul key={e.id}>
            <li>{e.name}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(
  <AnswersContext config={config}>
    <App />
  </AnswersContext>,
  document.getElementById('root')
);
```

## Documentation

### State

State can be read directly from the `useAnswers` hook. For example:

```ts
import { useAnswers } from 'yext-answers-react';
const { state } = useAnswers();
console.log(state.visibleSearchTerm);
```

State is global and show be used to render the search components.State is readonly.

**Global State**

| Property             | Type                | Description                                                                                                                                                                                |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `loading`            | `boolean`           | Whether or not a search is currently loading                                                                                                                                               |
| `error`              | `boolean`           | Truthy if a search has failed. Generally this is due to a network error or a bad API Key                                                                                                   |
| `hasSearched`        | `boolean`           | Whether or not a search has ever been run. This is helpful for describing the intial state                                                                                                 |
| `core`               | `answersCore`       | A reference to core to make API calls. Generally this should never be used.                                                                                                                |
| `verticalKey`        | `string`            | The `verticalKey` of the search                                                                                                                                                            |
| `visibleSearchTerm`  | `string`            | The search term that is currently visible in the search bar. Generally this should be set to the `value` of the input                                                                      |
| `lastSearchedTerm`   | `string`            | The last search term used to run a search. This will only update when a search runs.                                                                                                       |
| `originalSearchTerm` | `string`            | The `visibleSearchTerm` will update when a user cycles between autocomplete options. The `originalSearchTerm` is the search term the user entered **before** cycling through autocomplete. |
| `verticalresults`    | `VerticalResults`   | The full response from the vertical search API                                                                                                                                             |
| `entities`           | `any[]`             | Just the entities returned from the vertical search                                                                                                                                        |
| `facets`             | `Facet[]`           | A set of facets returned from the vertical search                                                                                                                                          |
| `sortBys`            | `SortBy[]`          | The currently set sort bys                                                                                                                                                                 |
| `autocomplete`       | `AutocompleteState` | Autocomplete object (see below)                                                                                                                                                            |
| `debug`              | `boolean`           | Whether or not debug mode is turned on                                                                                                                                                     |

---

**`AutocompleteType`**
| Property | Type | Description |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `loading` | `boolean` | Whether or not autcomplete is loading. This is usually not shown in a UI since autocomplete is very fast |
| `autocompleteOptions` | `{ value: string; type: string }` | A list of all autocomplete options. This list includes both recent searches and query sugggestions. Recent searches have a `type` of `RECENT` while suggestions have a type of `SUGGESTION`. This list should be used to populate the autocomplete menu. This list will automatically update as the `visibleSearchTerm` changes |
| `querySuggestions` | `AutocompleteResult[]` | A list of just the query suggestions |
| `recentSearches` | `{ query: string }[]` | A list of just the users recent searches that match the `visibleSearchTerm` |
| `selectedIndex` | `number` | The index of the selected autocomplete option. By default this is `-1` which means no autocomplete is selected. As a user cycles through autocomplete (see `NEXT_AUTOCOMPLETE_OPTION` below) this index will change. This index should be used to highlight the row in the autocomplete |

### Actions

State can not be edited directly. Instead you should run an action to update state. For example:

```ts
import { useAnswers } from 'yext-answers-react';
const { actions } = useAnswers();
action.runSearch();
```

| Action                                                                                     | Description                                                                                                                                     |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `handleSearchTermChange(searchTerm?: string)`                                              | Used to update the search term. Usually this is bound to the `onChange` prop of the `input`.                                                    |
| `runSearch(searchTerm?: string)`                                                           | Used to run a search. Usually this is bound to the `onSubmit` prop of the `form`.                                                               |
| `toggleFacet(facetFieldId: string, optionDisplayName: string, updateSearchResults = true)` | Used to toggle a facet on or off. This will update the facet immediatly in the state and then asynchronously update the search results.         |
| `updateSortBys(sortBys: SortBy[]), updateSearchResults = true`                             | Used to update the sort bys. By default this will automatically run a new search.                                                               |
| `loadMore()`                                                                               | This will load more results                                                                                                                     |
| `setConfiguration(config: Config)`                                                         | Usually only set on load. This will automatically be set via the `<AnswersContext />`. This can however be updated in the middle of a sessions. |

### Todos

- Add analytics
