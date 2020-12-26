import React, { useEffect } from 'react';
import AnswersStore from './AnswersStore';
import { useAnswersStore } from './useAnswersStore';

export type Config = {
  apiKey: string;
  experienceKey: string;
  experienceVersion: string;
  locale: string;
  verticalKey: string;
  runSearchOnLoad?: boolean;
  debug?: boolean;
};

type Props = {
  //Insert Props Here
  children: React.ReactNode;
  config: Config;
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
    actions: { runSearch, setConfiguration },
  } = useAnswersStore();
  useEffect(() => {
    if (!state.verticalKey) {
      setConfiguration(config);
    }
    if (runSearchOnLoad && state.verticalKey) {
      runSearch();
    }
  }, [runSearchOnLoad, state.verticalKey]);

  return <>{children}</>;
};

export default AnswersContext;
