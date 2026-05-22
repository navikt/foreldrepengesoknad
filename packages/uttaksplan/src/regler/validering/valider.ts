import { IntlShape } from 'react-intl';

import { ARBEID_OG_UTTAK_FØRSTE_SEKS_UKER_GRUPPE } from './arbeidOgUttakDeFørsteSeksUkene';
import { FAR_MEDMOR_MAKS_TO_UKER_RUNDT_FØDSEL_GRUPPE } from './farMedmorMaksToUkerRundtFødsel';
import { FAR_MEDMOR_RUNDT_FØDSEL_GRUPPE } from './farMedmorRundtFødsel';
import { SAMTIDIG_UTTAK_GRUPPE } from './samtidigUttak';
import { Regelgruppe, ValideringInput, førsteBrutteRegel } from './types';

type Validator = (input: ValideringInput) => string | null;

const lagValidator =
    <TCtx>(gruppe: Regelgruppe<TCtx>): Validator =>
    (input) => {
        const kontekst = gruppe.byggKontekst(input);
        if (kontekst === null) {
            return null;
        }
        return førsteBrutteRegel(gruppe.regler, kontekst)?.feilmeldingId ?? null;
    };

const GRUPPER = [
    ARBEID_OG_UTTAK_FØRSTE_SEKS_UKER_GRUPPE,
    SAMTIDIG_UTTAK_GRUPPE,
    FAR_MEDMOR_RUNDT_FØDSEL_GRUPPE,
    FAR_MEDMOR_MAKS_TO_UKER_RUNDT_FØDSEL_GRUPPE,
] as const;

const VALIDATORS: readonly Validator[] = GRUPPER.map((gruppe) =>
    lagValidator(gruppe as Regelgruppe<unknown>),
);

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
