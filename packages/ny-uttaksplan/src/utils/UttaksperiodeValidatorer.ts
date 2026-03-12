import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants/src/dates';
import { TidsperiodenString, UttaksdagenString } from '@navikt/fp-utils';

dayjs.extend(minMax);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;

type Periode = { fom: string; tom: string };

export const UttaksperiodeValidatorer = {
    erFørFørsteSeksUker(periode: Periode, familiehendelsesdato: string) {
        const førsteUttaksdagEtterSeksUker =
            UttaksdagenString.denneEllerNeste(familiehendelsesdato).getDatoAntallUttaksdagerSenere(
                ANTALL_UTTAKSDAGER_SEKS_UKER,
            );

        return TidsperiodenString.forPeriode(periode).erFomFørDato(førsteUttaksdagEtterSeksUker);
    },

    erNoenPerioderFørFamiliehendelsesdato: (periode: Periode[], familiehendelsedato: string) =>
        periode.some((p) => dayjs(p.fom).isBefore(familiehendelsedato)),

    erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(perioder: Periode[], familiehendelsedato: string) {
        const førsteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDato();
        const sisteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30);

        return perioder.some((periode) => {
            const fom = dayjs(periode.fom);
            const tom = dayjs(periode.tom);
            return tom.isSameOrAfter(førsteDag, 'day') && fom.isBefore(sisteDag, 'day');
        });
    },

    erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato(perioder: Periode[], familiehendelsedato: string) {
        const førsteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(15);
        const sisteDag = UttaksdagenString.forrige(familiehendelsedato).getDato();

        return perioder.some((periode) => {
            const fom = dayjs(periode.fom);
            const tom = dayjs(periode.tom);

            return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
        });
    },

    erNoenPerioderIMellomToUkerFørFamiliehendelsesdatoEllerEtterSeksUkerFamiliehendelsedato(
        perioder: Periode[],
        familiehendelsedato: string,
    ) {
        return perioder.some((periode) =>
            UttaksperiodeValidatorer.erPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
                periode,
                familiehendelsedato,
                undefined,
            ),
        );
    },

    erPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
        periode: Periode,
        familiehendelsesdato: string,
        termindato: string | undefined,
    ) {
        return (
            starterTidsperiodeEtter2UkerFørFødsel(periode.fom, familiehendelsesdato, termindato) &&
            this.erFørFørsteSeksUker(periode, familiehendelsesdato)
        );
    },

    erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(perioder: Periode[], familiehendelsedato: string) {
        return perioder.some((p) =>
            dayjs(p.fom).isBefore(
                UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30),
            ),
        );
    },

    erNoenPerioderFørSeksUkerEtterFamiliehendelsesdatoOgNoenEtter(perioder: Periode[], familiehendelsedato: string) {
        return (
            UttaksperiodeValidatorer.erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
                perioder,
                familiehendelsedato,
            ) &&
            UttaksperiodeValidatorer.erNoenPerioderLikEllerEtter6UkerEtterFamiliehendelse(perioder, familiehendelsedato)
        );
    },

    erNoenPerioderLikEllerEtterFamiliehendelsesdato(perioder: Periode[], familiehendelsedato: string) {
        return perioder.some((p) => dayjs(p.tom).isSameOrAfter(familiehendelsedato));
    },

    erNoenPerioderLikEllerEtter6UkerEtterFamiliehendelse(perioder: Periode[], familiehendelsedato: string) {
        return perioder.some((p) =>
            dayjs(p.tom).isSameOrAfter(
                UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30),
            ),
        );
    },

    erNoenPerioderFørOgNoenLikEllerEtterFamiliehendelsesdato(perioder: Periode[], familiehendelsedato: string) {
        return (
            UttaksperiodeValidatorer.erNoenPerioderFørFamiliehendelsesdato(perioder, familiehendelsedato) &&
            UttaksperiodeValidatorer.erNoenPerioderLikEllerEtterFamiliehendelsesdato(perioder, familiehendelsedato)
        );
    },

    erNoenPerioderFørTreUkerFørFamDatoEllerEtterLikFamDato(perioder: Periode[], familiehendelsedato: string) {
        const førsteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(15);
        const sisteDag = UttaksdagenString.forrige(familiehendelsedato).getDato();

        return perioder.some((p) => dayjs(p.tom).isAfter(sisteDag) || dayjs(p.fom).isBefore(førsteDag));
    },

    erNoenPerioderFørToUkerFørFamiliehendelsesdato(perioder: Periode[], familiehendelsedato: string) {
        return perioder.some((periode) =>
            dayjs(periode.fom).isBefore(
                UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(10),
            ),
        );
    },

    erNoenPerioderMerEnn60DagerFørFamiliehendelsesdato(perioder: Periode[], familiehendelsedato: string) {
        return perioder.some((periode) =>
            dayjs(periode.fom).isBefore(
                UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(60),
            ),
        );
    },

    erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgSeksUkerEtterFamDato(
        valgtePerioder: Array<{ fom: string; tom: string }>,
        familiehendelsedato: string,
    ) {
        return (
            UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato(
                valgtePerioder,
                familiehendelsedato,
            ) ||
            UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(
                valgtePerioder,
                familiehendelsedato,
            )
        );
    },
};

const starterTidsperiodeEtter2UkerFørFødsel = (
    fom: string,
    familiehendelsesdato: string,
    termindato: string | undefined,
): boolean => {
    const førsteUttaksdagToUkerFørFødsel = getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato);
    return dayjs(fom).isSameOrAfter(førsteUttaksdagToUkerFørFødsel, 'day');
};

const getFørsteUttaksdag2UkerFørFødsel = (familiehendelsesdato: string, termindato: string | undefined): string => {
    const terminEllerFamHendelsesdatoMinusToUker =
        termindato === undefined
            ? dayjs(familiehendelsesdato).subtract(14, 'day')
            : dayjs(termindato).subtract(14, 'day');
    const datoÅRegneFra = dayjs.min(terminEllerFamHendelsesdatoMinusToUker, dayjs(familiehendelsesdato));
    return UttaksdagenString.denneEllerNeste(datoÅRegneFra.format(ISO_DATE_FORMAT)).getDato();
};
