import React from 'react';
export declare type Config = {
    apiKey: string;
    experienceKey: string;
    experienceVersion: string;
    locale: string;
    verticalKey: string;
    runSearchOnLoad?: boolean;
    debug?: boolean;
};
declare type Props = {
    children: React.ReactNode;
    config: Config;
};
declare const AnswersContext: React.FC<Props>;
export default AnswersContext;
