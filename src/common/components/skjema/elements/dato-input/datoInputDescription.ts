import { formaterDatoTall } from 'common/util/datoUtils';
import { IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { DatovelgerAvgrensninger } from 'nav-datovelger';

export const getAvgrensningerDescriptionForInput = (
    intl: IntlShape,
    avgrensninger: DatovelgerAvgrensninger | undefined
): string | undefined => {
    if (avgrensninger) {
        let str;
        if (avgrensninger.minDato || avgrensninger.maksDato) {
            const fraTekst = avgrensninger.minDato
                ? getMessage(intl, 'datoinput.avgrensninger.beskrivelse.fraOgMed', {
                      dato: formaterDatoTall(avgrensninger.minDato),
                  })
                : undefined;
            const tilTekst = avgrensninger.maksDato
                ? getMessage(intl, 'datoinput.avgrensninger.beskrivelse.tilOgMed', {
                      dato: formaterDatoTall(avgrensninger.maksDato),
                  })
                : undefined;
            str = getMessage(intl, 'datoinput.avgrensninger.beskrivelse.fraTil', { fra: fraTekst, til: tilTekst });
        }
        if (avgrensninger.helgedagerIkkeTillatt) {
            str = `${str} ${getMessage(intl, 'datoinput.avgrensninger.beskrivelse.ikkeHelg')}`;
        }
        if (str) {
            return str;
        }
    }
    return undefined;
};
