import { createSelector } from 'reselect';
import { IntlShape } from 'react-intl';
import { selectUttaksplanAvvik } from './uttaksplanValideringSelector';
import { intlHasKey } from 'common/util/intlUtils';
import groupBy from 'lodash.groupby';
import { VeilederMessageType, VeilederMessage, VeiledermeldingerPerPeriode } from 'app/components/veilederInfo/types';
import { RegelAvvik, RegelAlvorlighet } from 'shared/regler/regelTypes';
import { getRegelIntlValues, trimRelaterteRegelAvvik } from 'shared/regler/regelUtils';
import { UttaksplanAvvikType } from 'app/regler/uttaksplanValidering/types';

const getMessageTypeFromAvvik = (avvik: RegelAvvik): VeilederMessageType => {
    switch (avvik.regel.alvorlighet) {
        case RegelAlvorlighet.FEIL:
            return 'feil';
        case RegelAlvorlighet.ADVARSEL:
            return 'advarsel';
        case RegelAlvorlighet.INFO:
            return 'info';
        default:
            return 'normal';
    }
};

export const mapAvvikTilMessage = (avvik: RegelAvvik, intl: IntlShape): VeilederMessage => {
    const { info } = avvik;
    const tittelIntlKey = `${info.intlKey}.tittel`;
    const harTittel = intlHasKey(intl, tittelIntlKey);
    return {
        type: getMessageTypeFromAvvik(avvik),
        contentIntlKey: info.intlKey,
        titleIntlKey: harTittel ? tittelIntlKey : undefined,
        formatContentAsHTML: info.renderAsHtml,
        values: getRegelIntlValues(intl, info),
        periodeId: avvik.regel.skjulesIPeriode !== true ? avvik.periodeId : undefined,
        skjulesIOppsummering: avvik.regel.skjulesIOppsummering,
        avvikType: avvik.regel.avvikType as UttaksplanAvvikType
    };
};
export const selectUttaksplanVeilederinfo = (intl: IntlShape, grupperAvvik: boolean) =>
    createSelector([selectUttaksplanAvvik], (avvik) => {
        return trimRelaterteRegelAvvik(avvik, grupperAvvik).map((a) => mapAvvikTilMessage(a, intl));
    });

export const selectPeriodelisteMeldinger = (intl: IntlShape, grupperAvvik: boolean) =>
    createSelector([selectUttaksplanVeilederinfo(intl, grupperAvvik)], (veilederinfo): VeiledermeldingerPerPeriode => {
        const meldinger = veilederinfo.filter((info) => info.periodeId !== undefined);
        return groupBy(meldinger, (info) => info.periodeId);
    });
