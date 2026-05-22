import { IntlShape } from 'react-intl';

import { ARBEID_OG_UTTAK_FØRSTE_SEKS_UKER_OMRÅDE } from './arbeidOgUttakDeFørsteSeksUkene';
import { FAR_MEDMOR_MAKS_TO_UKER_RUNDT_FØDSEL_OMRÅDE } from './farMedmorMaksToUkerRundtFødsel';
import { FAR_MEDMOR_RUNDT_FØDSEL_OMRÅDE } from './farMedmorRundtFødsel';
import { SAMTIDIG_UTTAK_OMRÅDE } from './samtidigUttak';
import { Valideringsområde, ValideringInput, førsteBrutteValideringsregel } from './types';

type Validator = (input: ValideringInput) => string | null;

const lagValidator =
    <TCtx,>(gruppe: Valideringsområde<TCtx>): Validator =>
    (input) => {
        const kontekst = gruppe.byggKontekst(input);
        if (kontekst === null) {
            return null;
        }
        return førsteBrutteValideringsregel(gruppe.regler, kontekst)?.feilmeldingId ?? null;
    };

const VALIDATORS: readonly Validator[] = [
    lagValidator(ARBEID_OG_UTTAK_FØRSTE_SEKS_UKER_OMRÅDE),
    lagValidator(SAMTIDIG_UTTAK_OMRÅDE),
    lagValidator(FAR_MEDMOR_RUNDT_FØDSEL_OMRÅDE),
    lagValidator(FAR_MEDMOR_MAKS_TO_UKER_RUNDT_FØDSEL_OMRÅDE),
];

/**
 * Kjører hele regelkatalogen mot en gitt input og returnerer første feilmelding,
 * eller `null` om alt er gyldig.
 */
export const valider = (input: ValideringInput, intl: IntlShape): string | null => {
    for (const validator of VALIDATORS) {
        const feilmeldingId = validator(input);
        if (feilmeldingId !== null) {
            return intl.formatMessage({ id: feilmeldingId });
        }
    }
    return null;
};
