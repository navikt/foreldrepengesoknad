import { IntlShape, useIntl } from 'react-intl';

import { getFloatFromString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { valider } from '../regler';
import { UttaksperiodeValidatorer } from '../utils/UttaksperiodeValidatorer';
import { LeggTilEllerEndrePeriodeFormFormValues } from './LeggTilEllerEndrePeriodeFellesForm';

const hasValue = (v: string | number | boolean | undefined | null) => v !== '' && v !== undefined && v !== null;

export const prosentValideringGradering =
    (intl: IntlShape, samtidiguttaksprosentValue: string | undefined) => (value: string) => {
        const stillingsprosent = getFloatFromString(value);
        const samtidiguttaksprosent = getFloatFromString(samtidiguttaksprosentValue);

        if (!hasValue(value) || value.trim() === '') {
            return intl.formatMessage({ id: 'leggTilPeriodePanel.stillingsprosent.påkrevd' });
        }

        if (stillingsprosent === undefined) {
            return intl.formatMessage({
                id: 'leggTilPeriodePanel.stillingsprosent.måVæreEtTall',
            });
        }

        if (stillingsprosent <= 0) {
            return intl.formatMessage({
                id: 'leggTilPeriodePanel.stillingsprosent.måVæreStørreEnn0',
            });
        }

        if (stillingsprosent >= 100) {
            return intl.formatMessage({
                id: 'leggTilPeriodePanel.stillingsprosent.måVæreMindreEnn100',
            });
        }

        if (samtidiguttaksprosent !== undefined && stillingsprosent + samtidiguttaksprosent > 100) {
            return intl.formatMessage({
                id: 'leggTilPeriodePanel.stillingsprosent.samtidigUttak',
            });
        }

        return null;
    };

export const valideringSamtidigUttak =
    (intl: IntlShape, stillingsprosentValue: string | undefined) => (value: string) => {
        const samtidiguttaksprosent = getFloatFromString(value);
        const stillingsprosent = getFloatFromString(stillingsprosentValue);

        if (!hasValue(value) || value.trim() === '') {
            return intl.formatMessage({ id: 'leggTilPeriodePanel.samtidiguttaksprosent.påkrevd' });
        }

        if (samtidiguttaksprosent === undefined) {
            return intl.formatMessage({
                id: 'leggTilPeriodePanel.samtidiguttaksprosent.måVæreEtTall',
            });
        }

        if (samtidiguttaksprosent <= 0) {
            return intl.formatMessage({
                id: 'leggTilPeriodePanel.samtidiguttaksprosent.måVæreStørreEnn0',
            });
        }

        if (samtidiguttaksprosent > 100) {
            return intl.formatMessage({
                id: 'leggTilPeriodePanel.samtidiguttaksprosent.måVæreMindreEnn100',
            });
        }

        if (stillingsprosent !== undefined && stillingsprosent + samtidiguttaksprosent > 100) {
            return intl.formatMessage({
                id: 'leggTilPeriodePanel.stillingsprosent.samtidigUttak',
            });
        }

        return null;
    };

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

export const useFormSubmitValidator = <T extends LeggTilEllerEndrePeriodeFormFormValues>() => {
    const intl = useIntl();
    const { familiehendelsedato, familiesituasjon, foreldreInfo, uttakPerioder, termindato, erEndringssøknad } =
        useUttaksplanData();

    return (perioder: Array<{ fom: string; tom: string }>, formValues: T): string | null =>
        valider(
            {
                formValues,
                perioder,
                uttakPerioder,
                familiehendelsedato,
                familiesituasjon,
                termindato,
                foreldreInfo,
                erEndringssøknad,
            },
            intl,
        );
};

