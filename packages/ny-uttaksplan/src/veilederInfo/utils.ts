import { IntlShape } from 'react-intl';

import { VeilederMessage } from './types';

// Dummy-funksjoner for trim og mapping, tilpass etter behov
export const getUttaksplanVeilederinfo = (avvik: any[], intl: IntlShape, grupperAvvik: boolean): VeilederMessage[] => {
    // Her må du implementere mapping fra avvik til VeilederMessage
    // For nå returnerer vi bare en tom array
    return [];
};
