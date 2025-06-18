import { IntlShape } from 'react-intl';

import { RegelAvvik } from '../types/regelTypes';
import { intlHasKey } from '../utils/intlUtils';
import { trimRelaterteRegelAvvik } from '../validering/utils/utils';
import { VeilederMessage } from './types';

const mapAvvikTilMessage = (avvik: RegelAvvik, intl: IntlShape): VeilederMessage => {
    const { info } = avvik;
    const tittelIntlKey = `${info.intlKey}.tittel`;
    const harTittel = intlHasKey(intl, tittelIntlKey);
    return {
        type: avvik.regel.alvorlighet,
        contentIntlKey: info.intlKey,
        titleIntlKey: harTittel ? tittelIntlKey : undefined,
        formatContentAsHTML: info.renderAsHtml,
        values: getRegelIntlValues(intl, info),
        periodeId: avvik.regel.skjulesIPeriode !== true ? avvik.periodeId : undefined,
        skjulesIOppsummering: avvik.regel.skjulesIOppsummering,
        avvikType: avvik.regel.avvikType as UttaksplanAvvikType,
    };
};
// Dummy-funksjoner for trim og mapping, tilpass etter behov
export const getUttaksplanVeilederinfo = (
    avvik: RegelAvvik[],
    intl: IntlShape,
    grupperAvvik: boolean,
): VeilederMessage[] => {
    // Her må du implementere mapping fra avvik til VeilederMessage
    // For nå returnerer vi bare en tom array
    return trimRelaterteRegelAvvik(avvik, grupperAvvik).map((a) => mapAvvikTilMessage(a, intl));
};
