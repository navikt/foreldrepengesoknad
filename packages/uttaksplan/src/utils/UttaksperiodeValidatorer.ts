import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { Tidsperioden, Uttaksdagen } from '@navikt/fp-utils';

import {
    ANTALL_UTTAKSDAGER_SEKS_UKER,
    ANTALL_UTTAKSDAGER_SYV_UKER,
    ANTALL_UTTAKSDAGER_TOLV_UKER,
    ANTALL_UTTAKSDAGER_TO_UKER,
    ANTALL_UTTAKSDAGER_TRE_UKER,
} from './uttaksdagerKonstanter';

dayjs.extend(minMax);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

type Periode = { fom: string; tom: string };

export const UttaksperiodeValidatorer = {
    erFørFørsteSeksUker(periode: Periode, familiehendelsesdato: string) {
        const førsteUttaksdagEtterSeksUker =
            Uttaksdagen.denneEllerNeste(familiehendelsesdato).getDatoAntallUttaksdagerSenere(
                ANTALL_UTTAKSDAGER_SEKS_UKER,
            );

        return Tidsperioden.forPeriode(periode).erFomFørDato(førsteUttaksdagEtterSeksUker);
    },

    erNoenPerioderFørFamiliehendelsesdato: (periode: Periode[], familiehendelsedato: string) =>
        periode.some((p) => dayjs(p.fom).isBefore(familiehendelsedato)),

    erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(perioder: Periode[], familiehendelsedato: string) {
        const førsteDag = Uttaksdagen.denneEllerNeste(familiehendelsedato).getDato();
        const sisteDag =
            Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(
                ANTALL_UTTAKSDAGER_SEKS_UKER,
            );

        return perioder.some((periode) => {
            const fom = dayjs(periode.fom);
            const tom = dayjs(periode.tom);
            return tom.isSameOrAfter(førsteDag, 'day') && fom.isBefore(sisteDag, 'day');
        });
    },

    /**
     * Uke 7 etter familiehendelsedato — uken rett etter den lovpålagte
     * seksukersperioden. Brukt til å varsle om at ferie/opphold lagt inn
     * her kan bli avslått dersom fødselen skjer etter termin, siden de
     * seks lovpålagte ukene da forskyves og kan overlappe med perioden.
     */
    erNoenPerioderIUke7EtterFamiliehendelsesdato(perioder: Periode[], familiehendelsedato: string) {
        const førsteDag =
            Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(
                ANTALL_UTTAKSDAGER_SEKS_UKER,
            );
        const sisteDag =
            Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(
                ANTALL_UTTAKSDAGER_SYV_UKER,
            );

        return perioder.some((periode) => {
            const fom = dayjs(periode.fom);
            const tom = dayjs(periode.tom);
            return tom.isSameOrAfter(førsteDag, 'day') && fom.isBefore(sisteDag, 'day');
        });
    },

    erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato(perioder: Periode[], familiehendelsedato: string) {
        const førsteDag =
            Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(
                ANTALL_UTTAKSDAGER_TRE_UKER,
            );
        const sisteDag = Uttaksdagen.forrige(familiehendelsedato).getDato();

        return perioder.some((periode) => {
            const fom = dayjs(periode.fom);
            const tom = dayjs(periode.tom);

            return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
        });
    },

    erNoenPerioderIMellomToUkerFørFamiliehendelsesdatoEllerEtterSeksUkerFamiliehendelsedato(
        perioder: Periode[],
        familiehendelsedato: string,
        termindato: string | undefined,
    ) {
        return perioder.some((periode) =>
            UttaksperiodeValidatorer.erPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
                periode,
                familiehendelsedato,
                termindato,
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
                Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(
                    ANTALL_UTTAKSDAGER_SEKS_UKER,
                ),
            ),
        );
    },

    erNoenPerioderLikEllerEtterFamiliehendelsesdato(perioder: Periode[], familiehendelsedato: string) {
        return perioder.some((p) => dayjs(p.tom).isSameOrAfter(familiehendelsedato));
    },

    erNoenPerioderLikEllerEtter6UkerEtterFamiliehendelsedato(perioder: Periode[], familiehendelsedato: string) {
        return perioder.some((p) =>
            dayjs(p.tom).isSameOrAfter(
                Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(
                    ANTALL_UTTAKSDAGER_SEKS_UKER,
                ),
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
        const førsteDag =
            Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(
                ANTALL_UTTAKSDAGER_TRE_UKER,
            );
        const sisteDag = Uttaksdagen.forrige(familiehendelsedato).getDato();

        return perioder.some((p) => dayjs(p.tom).isAfter(sisteDag) || dayjs(p.fom).isBefore(førsteDag));
    },

    erNoenPerioderFørToUkerFørFamiliehendelsesdato(
        perioder: Periode[],
        familiehendelsedato: string,
        termindato?: string,
    ) {
        const førsteUttaksdagToUkerFørFødsel = getFørsteUttaksdag2UkerFørFødsel(familiehendelsedato, termindato);
        return perioder.some((periode) => dayjs(periode.fom).isBefore(førsteUttaksdagToUkerFørFødsel, 'day'));
    },

    erNoenPerioderMerEnnTolvUkerFørFamiliehendelsesdato(perioder: Periode[], familiehendelsedato: string) {
        return perioder.some((periode) =>
            dayjs(periode.fom).isBefore(
                Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(
                    ANTALL_UTTAKSDAGER_TOLV_UKER,
                ),
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
    const tidligsteDato =
        termindato === undefined
            ? familiehendelsesdato
            : dayjs.min(dayjs(familiehendelsesdato), dayjs(termindato)).format(ISO_DATE_FORMAT);
    return Uttaksdagen.denneEllerNeste(tidligsteDato).getDatoAntallUttaksdagerTidligere(ANTALL_UTTAKSDAGER_TO_UKER);
};
