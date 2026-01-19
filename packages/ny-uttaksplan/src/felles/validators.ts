import dayjs from 'dayjs';
import { IntlShape, useIntl } from 'react-intl';

import { Familiesituasjon } from '@navikt/fp-types';
import { UttaksdagenString, getFloatFromString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
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
            return 'Stillingsprosent og samtidig uttak kan ikke utgjøre mer enn 100 % sammenlagt';
        }

        return undefined;
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
            return 'Stillingsprosent og samtidig uttak kan ikke utgjøre mer enn 100 % sammenlagt';
        }

        return undefined;
    };

export const kanMisteDagerVedEndringTilFerie = (
    perioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) => {
    return (
        erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(perioder, familiehendelsedato) ||
        erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato(perioder, familiehendelsedato)
    );
};

export const useFormSubmitValidator = <T extends LeggTilEllerEndrePeriodeFormFormValues>() => {
    const intl = useIntl();
    const { familiehendelsedato, familiesituasjon } = useUttaksplanData();

    return (perioder: Array<{ fom: string; tom: string }>, formValues: T) => {
        const r = erKombinasjonAvArbeidOgForeldrepengerDe6FørsteUkeneForMor<T>(
            intl,
            perioder,
            familiehendelsedato,
            familiesituasjon,
            formValues,
        );
        if (r) {
            return r;
        }
        return null;
    };
};

const erKombinasjonAvArbeidOgForeldrepengerDe6FørsteUkeneForMor = <T extends LeggTilEllerEndrePeriodeFormFormValues>(
    intl: IntlShape,
    perioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    formValues: T,
) => {
    if (familiesituasjon === 'adopsjon') {
        return null;
    }

    if (
        formValues.skalDuKombinereArbeidOgUttakMor &&
        (formValues.kontoTypeMor === 'MØDREKVOTE' ||
            formValues.kontoTypeMor === 'FELLESPERIODE' ||
            formValues.kontoTypeMor === 'FORELDREPENGER') &&
        erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(perioder, familiehendelsedato)
    ) {
        return intl.formatMessage({ id: 'endreTidsPeriodeModal.kanIkkeKombinere' });
    }

    if (
        formValues.skalDuKombinereArbeidOgUttakFarMedmor &&
        formValues.kontoTypeFarMedmor === 'MØDREKVOTE' &&
        erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(perioder, familiehendelsedato)
    ) {
        return intl.formatMessage({ id: 'endreTidsPeriodeModal.kanIkkeKombinere' });
    }

    return null;
};

const erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) => {
    const førsteDag = UttaksdagenString(familiehendelsedato).denneEllerNeste();
    const sisteDag = UttaksdagenString(familiehendelsedato).leggTil(30);

    return valgtePerioder.some((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);
        return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
    });
};

const erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) => {
    const førsteDag = UttaksdagenString(familiehendelsedato).trekkFra(15);
    const sisteDag = UttaksdagenString(familiehendelsedato).forrige();

    return valgtePerioder.some((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);

        return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
    });
};
