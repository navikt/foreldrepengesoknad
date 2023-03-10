import { VeiledermeldingerPerPeriode, VeilederMessage } from './types';
import { IntlShape } from 'react-intl';
import { RegelAvvik } from '../utils/types/regelTypes';
import { intlHasKey } from 'app/intl/utils';
import { getRegelIntlValues, trimRelaterteRegelAvvik } from '../utils/regelUtils';
import { UttaksplanAvvikType } from '../utils/types/UttaksplanAvvikType';
import { groupBy } from 'lodash';

export const veilederMessageAvsnitt = (
    førsteTekst: VeilederMessage[],
    andreTekst: VeilederMessage[],
    visInfoOmPrematuruker: boolean
): VeilederMessage[] => {
    return visInfoOmPrematuruker === false ? førsteTekst : førsteTekst.concat(andreTekst);
};

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

export const getUttaksplanVeilederinfo = (
    avvik: RegelAvvik[],
    intl: IntlShape,
    grupperAvvik: boolean
): VeilederMessage[] => {
    return trimRelaterteRegelAvvik(avvik, grupperAvvik).map((a) => mapAvvikTilMessage(a, intl));
};

export const getPeriodelisteMeldinger = (veilederinfo: VeilederMessage[]): VeiledermeldingerPerPeriode => {
    const meldinger = veilederinfo.filter((info) => info.periodeId !== undefined);
    return groupBy(meldinger, (info) => info.periodeId);
};
