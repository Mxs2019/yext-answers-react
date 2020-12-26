import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { AnswersContext, useAnswers } from '../.';
import { Config } from '../dist/AnswersContext';

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
