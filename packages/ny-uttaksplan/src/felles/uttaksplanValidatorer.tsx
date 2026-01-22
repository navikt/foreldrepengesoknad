import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import { IntlShape, useIntl } from 'react-intl';

import { Familiesituasjon, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { UttaksdagenString, getFloatFromString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { ForeldreInfo } from '../types/ForeldreInfo';
import { erVanligUttakPeriode } from '../types/UttaksplanPeriode';
import { UttakPeriodeBuilder } from '../utils/UttakPeriodeBuilder';
import { LeggTilEllerEndrePeriodeFormFormValues } from './LeggTilEllerEndrePeriodeFellesForm';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(minMax);

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
            return intl.formatMessage({
                id: 'leggTilPeriodePanel.stillingsprosent.samtidigUttak',
            });
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
    const { familiehendelsedato, familiesituasjon, foreldreInfo, uttakPerioder } = useUttaksplanData();

    return (perioder: Array<{ fom: string; tom: string }>, formValues: T): string | null => {
        const feilmeldingArbeidDeFørste6Ukene = erKombinasjonAvArbeidOgForeldrepengerDe6FørsteUkene<T>(
            intl,
            perioder,
            familiehendelsedato,
            familiesituasjon,
            formValues,
        );
        if (feilmeldingArbeidDeFørste6Ukene) {
            return feilmeldingArbeidDeFørste6Ukene;
        }

        return harFarMedmorValgtMerEnnToUkerTotaltIIntervallet2UkerFørOg6UkerEtterFamiliehendelsedato<T>(
            intl,
            uttakPerioder,
            perioder,
            familiehendelsedato,
            familiesituasjon,
            foreldreInfo,
            formValues,
        );
    };
};

const erKombinasjonAvArbeidOgForeldrepengerDe6FørsteUkene = <T extends LeggTilEllerEndrePeriodeFormFormValues>(
    intl: IntlShape,
    perioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    formValues: T,
): string | null => {
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

const harFarMedmorValgtMerEnnToUkerTotaltIIntervallet2UkerFørOg6UkerEtterFamiliehendelsedato = <
    T extends LeggTilEllerEndrePeriodeFormFormValues,
>(
    intl: IntlShape,
    uttakPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    nyePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    foreldreInfo: ForeldreInfo,
    formValues: T,
): string | null => {
    if (familiesituasjon === 'adopsjon') {
        return null;
    }

    const harBeggeRett = foreldreInfo.rettighetType === 'BEGGE_RETT';

    if (harBeggeRett && (formValues.forelder === 'BEGGE' || formValues.forelder === 'FAR_MEDMOR')) {
        const førsteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(10);
        const sisteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30);

        const nyePerioderInnenforIntervallet = nyePerioder.filter((periode) => {
            const fom = dayjs(periode.fom);
            const tom = dayjs(periode.tom);

            return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
        });

        if (nyePerioderInnenforIntervallet.length > 0) {
            const stillingsprosentFaktor =
                formValues.stillingsprosentFarMedmor !== undefined
                    ? Number.parseFloat(formValues.stillingsprosentFarMedmor) / 100
                    : 1;

            const dagerNyePerioder =
                nyePerioderInnenforIntervallet.reduce((sum, periode) => {
                    return sum + finnDagerInnenforIntervall(periode.fom, periode.tom, førsteDag, sisteDag);
                }, 0) * stillingsprosentFaktor;

            const uttaksperioderUtenomBortsettFraEndredePerioder = new UttakPeriodeBuilder(uttakPerioder)
                .fjernUttakPerioder(nyePerioder)
                .getUttakPerioder();

            const dagerEksisterendePerioder = uttaksperioderUtenomBortsettFraEndredePerioder
                .filter((periode) => {
                    return erVanligUttakPeriode(periode) && periode.forelder === 'FAR_MEDMOR';
                })
                .reduce((sum, periode) => {
                    const dager = finnDagerInnenforIntervall(periode.fom, periode.tom, førsteDag, sisteDag);

                    const stillingsprosent =
                        erVanligUttakPeriode(periode) && periode.gradering?.arbeidstidprosent !== undefined
                            ? periode.gradering?.arbeidstidprosent
                            : 100;

                    return sum + dager * (stillingsprosent / 100);
                }, 0);

            const totaltAntallDager = Math.floor(dagerNyePerioder + dagerEksisterendePerioder);

            if (totaltAntallDager > 10) {
                return intl.formatMessage({
                    id: 'LeggTilEllerEndrePeriodeForm.FarMedmor.MerEnnToUkerRundtFamiliehendelse',
                });
            }
        }
    }

    return null;
};

const finnDagerInnenforIntervall = (fom: string, tom: string, førsteDag: string, sisteDag: string): number => {
    const start = dayjs.max(dayjs(fom), dayjs(førsteDag));
    const slutt = dayjs.min(dayjs(tom), dayjs(sisteDag));

    if (slutt.isBefore(start, 'day')) {
        return 0;
    }

    let dager = 0;
    let current = start.clone();

    while (!current.isAfter(slutt, 'day')) {
        const weekday = current.day();
        if (weekday !== 0 && weekday !== 6) {
            dager += 1;
        }
        current = current.add(1, 'day');
    }

    return dager;
};

const erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) => {
    const førsteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDato();
    const sisteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30);

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
    const førsteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(15);
    const sisteDag = UttaksdagenString.forrige(familiehendelsedato).getDato();

    return valgtePerioder.some((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);

        return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
    });
};
