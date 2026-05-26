import { IntlShape } from 'react-intl';

import { lagArbeidOgUttakFørsteSeksUkerOmråde } from './arbeidOgUttakDeFørsteSeksUkene';
import { lagFarMedmorMaksToUkerRundtFødselOmråde } from './farMedmorMaksToUkerRundtFødsel';
import { lagFarMedmorRundtFødselOmråde } from './farMedmorRundtFødsel';
import { lagSamtidigUttakOmråde } from './samtidigUttak';
import { ValideringInput, Valideringsområde, førsteBrutteValideringsregel } from './types';

/**
 * Kjører hele regelkatalogen mot en gitt input og returnerer første feilmelding,
 * eller `null` om alt er gyldig.
 */
export const valider = (input: ValideringInput, intl: IntlShape): string | null => {
    const validators: readonly Validator[] = [
        lagValidator(lagArbeidOgUttakFørsteSeksUkerOmråde(intl)),
        lagValidator(lagSamtidigUttakOmråde(intl)),
        lagValidator(lagFarMedmorRundtFødselOmråde(intl)),
        lagValidator(lagFarMedmorMaksToUkerRundtFødselOmråde(intl)),
    ];
    for (const validator of validators) {
        const feilmelding = validator(input);
        if (feilmelding !== null) {
            return feilmelding;
        }
    }
    return null;
};

type Validator = (input: ValideringInput) => string | null;

const lagValidator =
    <TCtx>(gruppe: Valideringsområde<TCtx>): Validator =>
    (input) => {
        const kontekst = gruppe.byggKontekst(input);
        if (kontekst === null) {
            return null;
        }
        return førsteBrutteValideringsregel(gruppe.regler, kontekst)?.feilmelding ?? null;
    };
