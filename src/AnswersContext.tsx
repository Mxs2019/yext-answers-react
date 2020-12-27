import React, { useEffect } from 'react';
import { AnswersConfig } from './AnswersConfig';
import AnswersStore from './AnswersStore';
import { useAnswersStore } from './useAnswersStore';

type Props = {
  //Insert Props Here
  children: React.ReactNode;
  config: AnswersConfig;
};

const AnswersContext: React.FC<Props> = props => {
  return (
    <AnswersStore>
      <Inner {...props} />
    </AnswersStore>
  );
};

const Inner = ({ config, children }: Props) => {
  const { runSearchOnLoad = false } = config;
  const {
    state,
    actions: { runSearch, setConfiguration, handleSearchTermChange },
  } = useAnswersStore();
  useEffect(() => {
    if (!state.verticalKey) {
      setConfiguration(config);
    }
    if (runSearchOnLoad && state.verticalKey) {
      runSearch();
    }

    if (state.verticalKey) {
      handleSearchTermChange('');
    }
  }, [runSearchOnLoad, state.verticalKey]);

  return <>{children}</>;
};

export default AnswersContext;
