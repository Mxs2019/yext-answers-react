import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { AnswersConfig, AnswersContext, useAnswers } from '../.';
import Facets from './components/Facets';
import Results from './components/Results';
import SearchBar from './components/SearchBar';

const config: AnswersConfig = {
  apiKey: '7bce922a5847aff36dc33345921ba700',
  experienceKey: 'dtc_demo',
  experienceVersion: 'PRODUCTION',
  locale: 'en',
  verticalKey: 'products',
  runSearchOnLoad: true,
  debug: true,
};

const App = () => {
  const { state } = useAnswers();
  return (
    <div>
      <SearchBar />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '24rem' }}>
          <Facets />
        </div>
        <div style={{ flexGrow: 1 }}>
          {state.loading && <div>Loading...</div>}
          {state.error && <div>Network Error</div>}
          <Results />
        </div>
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
