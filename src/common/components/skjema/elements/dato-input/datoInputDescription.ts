import { formaterDatoTall } from 'common/util/datoUtils';
import { IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { DatepickerLimitations } from 'nav-datovelger';

export const getAvgrensningerDescriptionForInput = (
    intl: IntlShape,
    avgrensninger: DatepickerLimitations | undefined
): string | undefined => {
    if (avgrensninger) {
        let str;
        if (avgrensninger.minDate || avgrensninger.maxDate) {
            const fraTekst = avgrensninger.minDate
                ? getMessage(intl, 'datoinput.avgrensninger.beskrivelse.fraOgMed', {
                      dato: formaterDatoTall(avgrensninger.minDate),
                  })
                : undefined;
            const tilTekst = avgrensninger.maxDate
                ? getMessage(intl, 'datoinput.avgrensninger.beskrivelse.tilOgMed', {
                      dato: formaterDatoTall(avgrensninger.maxDate),
                  })
                : undefined;
            str = getMessage(intl, 'datoinput.avgrensninger.beskrivelse.fraTil', { fra: fraTekst, til: tilTekst });
        }
        if (avgrensninger.weekendsNotSelectable) {
            str = `${str} ${getMessage(intl, 'datoinput.avgrensninger.beskrivelse.ikkeHelg')}`;
        }
        if (str) {
            return str;
        }
    }
    return undefined;
};
