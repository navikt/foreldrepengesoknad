import { createSelector } from 'reselect';
import { InjectedIntl } from 'react-intl';
import { selectUttaksplanAvvik } from './uttaksplanValideringSelector';
import { RegelAlvorlighet, RegelAvvik } from '../regler/uttaksplanValidering/types';
import { intlHasKey } from 'common/util/intlUtils';
import { getRegelIntlValues, trimRelaterteRegelAvvik } from '../regler/uttaksplanValidering/regelUtils';
import groupBy from 'lodash.groupby';
import { VeilederMessageType, VeilederMessage, VeiledermeldingerPerPeriode } from 'app/components/veilederInfo/types';

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

export const mapAvvikTilMessage = (avvik: RegelAvvik, intl: InjectedIntl): VeilederMessage => {
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
        avvikType: avvik.regel.avvikType
    };
};
export const selectUttaksplanVeilederinfo = (intl: InjectedIntl) =>
    createSelector([selectUttaksplanAvvik], (avvik) => {
        return trimRelaterteRegelAvvik(avvik).map((a) => mapAvvikTilMessage(a, intl));
    });

export const selectPeriodelisteMeldinger = (intl: InjectedIntl) =>
    createSelector([selectUttaksplanVeilederinfo(intl)], (veilederinfo): VeiledermeldingerPerPeriode => {
        const meldinger = veilederinfo.filter((info) => info.periodeId !== undefined);
        return groupBy(meldinger, (info) => info.periodeId);
    });
