import { StepID } from './SøknadStep';

export enum AppRoute {
    'INTRO' = '/velkommen',
    'SØKNAD' = '/soknad',
    'SENDT' = '/sendt',
}

export interface SøknadRoute {
    path: AppRoute | string;
    step?: StepID;
    subStep?: string;
}
