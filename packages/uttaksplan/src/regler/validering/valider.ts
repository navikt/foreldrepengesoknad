import { IntlShape } from 'react-intl';

import { lagArbeidOgUttakFørsteSeksUkerOmråde } from './arbeidOgUttakDeFørsteSeksUkene';
import { lagFarMedmorMaksToUkerRundtFødselOmråde } from './farMedmorMaksToUkerRundtFødsel';
import { lagFarMedmorRundtFødselOmråde } from './farMedmorRundtFødsel';
import { lagSamtidigUttakOmråde } from './samtidigUttak';
import { ValideringInput, førsteBrutteValideringsregel } from './types';

export const lagValideringsområder = (intl: IntlShape) => [
    lagArbeidOgUttakFørsteSeksUkerOmråde(intl),
    lagSamtidigUttakOmråde(intl),
    lagFarMedmorRundtFødselOmråde(intl),
    lagFarMedmorMaksToUkerRundtFødselOmråde(intl),
] as const;

/**
 * Kjører hele regelkatalogen mot en gitt input og returnerer første feilmelding,
 * eller `null` om alt er gyldig.
 */
export const valider = (input: ValideringInput, intl: IntlShape): string | null => {
    for (const område of lagValideringsområder(intl)) {
        const kontekst = område.byggKontekst(input);
        if (kontekst === null) {
            continue;
        }
        const feilmelding = førsteBrutteValideringsregel(område.regler, kontekst)?.feilmelding ?? null;
        if (feilmelding !== null) {
            return feilmelding;
        }
    }
    return null;
};
