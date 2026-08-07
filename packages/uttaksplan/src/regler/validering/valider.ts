import { IntlShape } from 'react-intl';

import { lagArbeidOgUttakFørsteSeksUkerOmråde } from './arbeidOgUttakDeFørsteSeksUkene';
import { lagFarMedmorMaksToUkerRundtFødselOmråde } from './farMedmorMaksToUkerRundtFødsel';
import { lagFarMedmorRundtFødselOmråde } from './farMedmorRundtFødsel';
import { lagSamtidigUttakOmråde } from './samtidigUttak';
import { ValideringInput, Valideringsområde, førsteBrutteValideringsregel } from './types';

export const lagValideringsområder = (intl: IntlShape) =>
    [
        lagArbeidOgUttakFørsteSeksUkerOmråde(intl),
        lagSamtidigUttakOmråde(intl),
        lagFarMedmorRundtFødselOmråde(intl),
        lagFarMedmorMaksToUkerRundtFødselOmråde(intl),
    ] as const;

const validerOmråde = <TCtx>(område: Valideringsområde<TCtx>, input: ValideringInput): string | null => {
    const kontekst = område.byggKontekst(input);
    if (kontekst === null) {
        return null;
    }

    return førsteBrutteValideringsregel(område.regler, kontekst)?.feilmelding ?? null;
};

/**
 * Kjører hele regelkatalogen mot en gitt input og returnerer første feilmelding,
 * eller `null` om alt er gyldig.
 */
export const valider = (input: ValideringInput, intl: IntlShape): string | null => {
    const [
        arbeidOgUttakFørsteSeksUkerOmråde,
        samtidigUttakOmråde,
        farMedmorRundtFødselOmråde,
        farMedmorMaksToUkerRundtFødselOmråde,
    ] = lagValideringsområder(intl);

    for (const feilmelding of [
        validerOmråde(arbeidOgUttakFørsteSeksUkerOmråde, input),
        validerOmråde(samtidigUttakOmråde, input),
        validerOmråde(farMedmorRundtFødselOmråde, input),
        validerOmråde(farMedmorMaksToUkerRundtFødselOmråde, input),
    ]) {
        if (feilmelding !== null) {
            return feilmelding;
        }
    }
    return null;
};
