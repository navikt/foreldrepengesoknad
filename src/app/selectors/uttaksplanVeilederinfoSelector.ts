import { createSelector } from 'reselect';
import { VeilederMessage, VeilederMessageType } from '../components/veileder-info/VeilederInfo';
import { InjectedIntl } from 'react-intl';
import { selectUttaksplanAvvik } from './uttaksplanValideringSelector';
import { RegelAlvorlighet, RegelAvvik } from '../regler/uttaksplanValidering/types';
import { intlHasKey } from 'common/util/intlUtils';
import { getRegelIntlValues, trimRelaterteRegelAvvik } from '../regler/uttaksplanValidering/regelUtils';

const getMessageTypeFromAvvik = (avvik: RegelAvvik): VeilederMessageType => {
    switch (avvik.alvorlighet) {
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

const mapAvvikTilMessage = (avvik: RegelAvvik, intl: InjectedIntl): VeilederMessage => {
    const { info } = avvik;
    const tittelIntlKey = `${info.intlKey}.tittel`;
    const harTittel = intlHasKey(intl, tittelIntlKey);
    return {
        type: getMessageTypeFromAvvik(avvik),
        contentIntlKey: info.intlKey,
        titleIntlKey: harTittel ? tittelIntlKey : undefined,
        formatContentAsHTML: info.renderAsHtml,
        values: getRegelIntlValues(intl, info)
    };
};
export const selectUttaksplanVeilederinfo = (intl: InjectedIntl) =>
    createSelector([selectUttaksplanAvvik], (avvik) => {
        return trimRelaterteRegelAvvik(avvik).map((a) => mapAvvikTilMessage(a, intl));
    });
