import { useState } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Familiesituasjon } from '@navikt/fp-types';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { valider } from '../regler/validering/valider';
import { UttaksperiodeValidatorer } from '../utils/UttaksperiodeValidatorer';
import { LeggTilEllerEndrePeriodeFormFormValues } from './LeggTilEllerEndrePeriodeFellesForm';

export { lagStillingsprosentValidator as prosentValideringGradering } from '../regler/felt/stillingsprosent';
export { lagSamtidigUttaksprosentValidator as valideringSamtidigUttak } from '../regler/felt/samtidigUttaksprosent';

export const kanMisteDagerVedEndringTilFerie = (
    perioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) => {
    return (
        UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(
            perioder,
            familiehendelsedato,
        ) ||
        UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato(
            perioder,
            familiehendelsedato,
        )
    );
};

/**
 * Mor søker før fødsel (familiesituasjon er «termin», dvs. barnet er ikke
 * født ennå) og har valgt å endre én eller flere perioder i uke 7 etter
 * termin til ferie. Dersom barnet blir født etter termin, forskyves de
 * seks lovpålagte ukene med mødrekvote, og ferien kan da bli avslått.
 */
export const kanMisteDagerVedFerieIUke7EtterTermin = (
    perioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
) =>
    familiesituasjon === 'termin' &&
    UttaksperiodeValidatorer.erNoenPerioderIUke7EtterFamiliehendelsesdato(perioder, familiehendelsedato);

export const useFormSubmitValidator = <T extends LeggTilEllerEndrePeriodeFormFormValues>() => {
    const intl = useIntl();
    const { familiehendelsedato, familiesituasjon, foreldreInfo, perioder, termindato, erEndringssøknad } =
        useUttaksplanData();

    return (valgtePerioder: Array<{ fom: string; tom: string }>, formValues: T): string | null =>
        valider(
            {
                formValues,
                perioder: valgtePerioder,
                uttakPerioder: perioder,
                familiehendelsedato,
                familiesituasjon,
                termindato,
                foreldreInfo,
                erEndringssøknad,
            },
            intl,
        );
};

/**
 * Etter første innsendingsforsøk valideres skjemaet på nytt ved hver endring, slik at
 * feilmeldingen forsvinner eller oppdateres med en gang brukeren retter opp verdiene.
 */
export const useSubmitFeilmelding = <T extends LeggTilEllerEndrePeriodeFormFormValues>(
    formMethods: UseFormReturn<T>,
    valgtePerioder: Array<{ fom: string; tom: string }>,
    skalValideres = true,
) => {
    const formSubmitValidator = useFormSubmitValidator<T>();
    const [harForsøktÅSende, setHarForsøktÅSende] = useState(false);

    useWatch({ control: formMethods.control });

    const finnFeilmelding = () => formSubmitValidator(valgtePerioder, formMethods.getValues()) ?? undefined;

    return {
        feilmelding: harForsøktÅSende && skalValideres ? finnFeilmelding() : undefined,
        validerVedInnsending: () => {
            setHarForsøktÅSende(true);
            return finnFeilmelding();
        },
    };
};
