import { IntlShape } from 'react-intl';

import { ARBEID_OG_UTTAK_FØRSTE_SEKS_UKER_GRUPPE } from './arbeidOgUttakDeFørsteSeksUkene';
import { FAR_MEDMOR_MAKS_TO_UKER_RUNDT_FØDSEL_GRUPPE } from './farMedmorMaksToUkerRundtFødsel';
import { FAR_MEDMOR_RUNDT_FØDSEL_GRUPPE } from './farMedmorRundtFødsel';
import { SAMTIDIG_UTTAK_GRUPPE } from './samtidigUttak';
import { Regel, Regelgruppe, ValideringInput, førsteBroteRegel } from './types';

export type { Regel, Regelgruppe, ValideringInput, Periode } from './types';
export { førsteBroteRegel } from './types';

/**
 * Visning av ein regelgruppe utan eksponering av kontekst-typen — for
 * dokumentasjon (Storybook) og for å sjå alle reglane samla.
 */
export type RegelgruppeVisning = {
    id: string;
    beskrivelse: string;
    regler: ReadonlyArray<Omit<Regel<unknown>, 'erBrote'>>;
};

type Validator = (input: ValideringInput) => string | null;

const lagValidator =
    <TCtx>(gruppe: Regelgruppe<TCtx>): Validator =>
    (input) => {
        const kontekst = gruppe.byggKontekst(input);
        if (kontekst === null) {
            return null;
        }
        return førsteBroteRegel(gruppe.regler, kontekst)?.feilmeldingId ?? null;
    };

const tilVisning = (gruppe: Regelgruppe<unknown>): RegelgruppeVisning => ({
    id: gruppe.id,
    beskrivelse: gruppe.beskrivelse,
    regler: gruppe.regler.map(({ id, beskrivelse, feilmeldingId }) => ({ id, beskrivelse, feilmeldingId })),
});

/**
 * Alle valideringsreglar som blir sjekka når brukaren lagrar/legg til ein periode.
 *
 * Rekkjefølgja er viktig: første regel som er brote vinn, og rekkjefølgja er bevart
 * frå den opphavlege implementasjonen for å sikre at brukaren får same feilmelding
 * som før.
 */
export const ALLE_VALIDERINGSREGLER: readonly RegelgruppeVisning[] = [
    tilVisning(ARBEID_OG_UTTAK_FØRSTE_SEKS_UKER_GRUPPE as Regelgruppe<unknown>),
    tilVisning(SAMTIDIG_UTTAK_GRUPPE as Regelgruppe<unknown>),
    tilVisning(FAR_MEDMOR_RUNDT_FØDSEL_GRUPPE as Regelgruppe<unknown>),
    tilVisning(FAR_MEDMOR_MAKS_TO_UKER_RUNDT_FØDSEL_GRUPPE as Regelgruppe<unknown>),
];

const VALIDATORS: readonly Validator[] = [
    lagValidator(ARBEID_OG_UTTAK_FØRSTE_SEKS_UKER_GRUPPE),
    lagValidator(SAMTIDIG_UTTAK_GRUPPE),
    lagValidator(FAR_MEDMOR_RUNDT_FØDSEL_GRUPPE),
    lagValidator(FAR_MEDMOR_MAKS_TO_UKER_RUNDT_FØDSEL_GRUPPE),
];

/**
 * Køyrer heile regelkatalogen mot ein gitt input og returnerer første feilmelding,
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
