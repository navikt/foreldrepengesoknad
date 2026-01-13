import { PlanForslag } from 'types/PlanForslag';

import { KontoDto, Situasjon, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { UttaksdagenString, getTidsperiodeString } from '@navikt/fp-utils';

import { sorterPerioder } from './uttakUtils';

const ikkeDeltUttakAdopsjonFarMedmor = (
    famDato: string,
    foreldrepengerKonto: KontoDto,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: KontoDto | undefined,
    bareFarMedmorHarRett: boolean,
    farOgFar: boolean,
): PlanForslag => {
    const førsteUttaksdag = UttaksdagenString(famDato).denneEllerNeste();
    const perioder: UttakPeriode_fpoversikt[] = [];

    if (erMorUfør) {
        const aktivitetsFriPeriode: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FORELDREPENGER',
            morsAktivitet: 'IKKE_OPPGITT',
            fom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).fom,
            tom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).tom,
        };
        perioder.push(aktivitetsFriPeriode);

        const aktivitetskravPeriode: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FORELDREPENGER',
            fom: getTidsperiodeString(UttaksdagenString(aktivitetsFriPeriode.tom).neste(), foreldrepengerKonto.dager)
                .fom,
            tom: getTidsperiodeString(UttaksdagenString(aktivitetsFriPeriode.tom).neste(), foreldrepengerKonto.dager)
                .tom,
        };
        perioder.push(aktivitetskravPeriode);
    } else if (farOgFar) {
        const periode: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FORELDREPENGER',
            morsAktivitet: 'IKKE_OPPGITT',
            fom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).fom,
            tom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).tom,
        };
        perioder.push(periode);
    } else {
        let startDatoNestePeriode = førsteUttaksdag;
        if (!!bareFarMedmorHarRett && aktivitetsfriKvote) {
            const aktivitetsFriPeriode: UttakPeriode_fpoversikt = {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                fom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote.dager).fom,
                tom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote.dager).tom,
            };

            perioder.push(aktivitetsFriPeriode);
            startDatoNestePeriode = UttaksdagenString(aktivitetsFriPeriode.tom).neste();
        }
        const periode: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType:
                foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : foreldrepengerKonto.konto,
            morsAktivitet: foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : undefined,
            fom: getTidsperiodeString(startDatoNestePeriode, foreldrepengerKonto.dager).fom,
            tom: getTidsperiodeString(startDatoNestePeriode, foreldrepengerKonto.dager).tom,
        };

        perioder.push(periode);
    }

    return { søker1: perioder, søker2: [] };
};

const ikkeDeltUttakAdopsjonMor = (famDato: string, foreldrepengerKonto: KontoDto): PlanForslag => {
    const førsteUttaksdag = UttaksdagenString(famDato).denneEllerNeste();
    const periode: UttakPeriode_fpoversikt = {
        forelder: 'MOR',
        kontoType: foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : foreldrepengerKonto.konto,
        morsAktivitet: foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : undefined,
        fom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).fom,
        tom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).tom,
    };

    return { søker1: [periode], søker2: [] };
};

const ikkeDeltUttakAdopsjon = (
    famDato: string,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: KontoDto,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: KontoDto | undefined,
    bareFarMedmorHarRett: boolean,
    farOgFar: boolean,
) => {
    if (erFarEllerMedmor) {
        return ikkeDeltUttakAdopsjonFarMedmor(
            famDato,
            foreldrepengerKonto,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
            farOgFar,
        );
    } else {
        return ikkeDeltUttakAdopsjonMor(famDato, foreldrepengerKonto);
    }
};

const ikkeDeltUttakFødselMor = (
    famDato: string,
    foreldrepengerKonto: KontoDto,
    foreldrePengerFørFødselKonto: KontoDto,
): PlanForslag => {
    const førsteUttaksdag = UttaksdagenString(famDato).denneEllerNeste();
    const perioder: UttakPeriode_fpoversikt[] = [];

    if (foreldrePengerFørFødselKonto !== undefined) {
        const periodeFørFødsel: UttakPeriode_fpoversikt = {
            forelder: 'MOR',
            kontoType:
                foreldrePengerFørFødselKonto.konto === 'AKTIVITETSFRI_KVOTE'
                    ? 'FORELDREPENGER'
                    : foreldrePengerFørFødselKonto.konto,
            morsAktivitet: foreldrePengerFørFødselKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : undefined,
            fom: UttaksdagenString(førsteUttaksdag).trekkFra(15),
            tom: UttaksdagenString(førsteUttaksdag).forrige(),
        };

        perioder.push(periodeFørFødsel);
    }

    const antallDagerIForeldrepenger = getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager);

    const foreldrepengerPeriode: UttakPeriode_fpoversikt = {
        forelder: 'MOR',
        kontoType: foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : foreldrepengerKonto.konto,
        morsAktivitet: foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : undefined,
        fom: antallDagerIForeldrepenger.fom,
        tom: antallDagerIForeldrepenger.tom,
    };

    perioder.push(foreldrepengerPeriode);

    return { søker1: [...perioder].sort(sorterPerioder), søker2: [] };
};

const ikkeDeltUttakFødselFarMedmor = (
    famDato: string,
    foreldrepengerKonto: KontoDto,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: KontoDto | undefined,
    bareFarMedmorHarRett: boolean,
    erAleneOmOmsorg: boolean,
    farOgFar: boolean,
    startdato?: string,
): PlanForslag => {
    const startDato = UttaksdagenString(startdato ?? famDato).denneEllerNeste();
    const perioder: UttakPeriode_fpoversikt[] = [];

    if (erMorUfør) {
        if (erAleneOmOmsorg) {
            const aktivitetskravPeriode: UttakPeriode_fpoversikt = {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                fom: getTidsperiodeString(startDato, foreldrepengerKonto.dager).fom,
                tom: getTidsperiodeString(startDato, foreldrepengerKonto.dager).tom,
            };

            perioder.push(aktivitetskravPeriode);
        } else {
            const aktivitetsFriPeriode: UttakPeriode_fpoversikt = {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                fom: getTidsperiodeString(startDato, aktivitetsfriKvote!.dager).fom,
                tom: getTidsperiodeString(startDato, aktivitetsfriKvote!.dager).tom,
            };

            perioder.push(aktivitetsFriPeriode);

            const aktivitetskravPeriode: UttakPeriode_fpoversikt = {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                fom: getTidsperiodeString(
                    UttaksdagenString(aktivitetsFriPeriode.tom).neste(),
                    foreldrepengerKonto.dager,
                ).fom,
                tom: getTidsperiodeString(
                    UttaksdagenString(aktivitetsFriPeriode.tom).neste(),
                    foreldrepengerKonto.dager,
                ).tom,
            };

            perioder.push(aktivitetskravPeriode);
        }
    } else {
        if (farOgFar) {
            const periode: UttakPeriode_fpoversikt = {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                fom: getTidsperiodeString(startDato, aktivitetsfriKvote!.dager).fom,
                tom: getTidsperiodeString(startDato, aktivitetsfriKvote!.dager).tom,
            };
            perioder.push(periode);
        } else {
            let startDatoNestePeriode = startDato;
            if (bareFarMedmorHarRett && !erAleneOmOmsorg && aktivitetsfriKvote) {
                const aktivitetsFriPeriode: UttakPeriode_fpoversikt = {
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FORELDREPENGER',
                    morsAktivitet: 'IKKE_OPPGITT',
                    fom: getTidsperiodeString(startDato, aktivitetsfriKvote.dager).fom,
                    tom: getTidsperiodeString(startDato, aktivitetsfriKvote.dager).tom,
                };

                perioder.push(aktivitetsFriPeriode);
                startDatoNestePeriode = UttaksdagenString(aktivitetsFriPeriode.tom).neste();
            }

            const periode: UttakPeriode_fpoversikt = {
                forelder: 'FAR_MEDMOR',
                kontoType:
                    foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : foreldrepengerKonto.konto,
                morsAktivitet: foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : undefined,
                fom: getTidsperiodeString(startDatoNestePeriode, foreldrepengerKonto.dager).fom,
                tom: getTidsperiodeString(startDatoNestePeriode, foreldrepengerKonto.dager).tom,
            };

            perioder.push(periode);
        }
    }

    return { søker1: [...perioder].sort(sorterPerioder), søker2: [] };
};

const ikkeDeltUttakFødsel = (
    famDato: string,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: KontoDto,
    foreldrePengerFørFødselKonto: KontoDto | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: KontoDto | undefined,
    bareFarMedmorHarRett: boolean,
    erAleneOmOmsorg: boolean,
    farOgFar: boolean,
    startdato?: string,
) => {
    if (erFarEllerMedmor) {
        return ikkeDeltUttakFødselFarMedmor(
            famDato,
            foreldrepengerKonto,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
            erAleneOmOmsorg,
            farOgFar,
            startdato,
        );
    } else {
        return ikkeDeltUttakFødselMor(famDato, foreldrepengerKonto, foreldrePengerFørFødselKonto!);
    }
};

interface IkkeDeltUttakProps {
    situasjon: Situasjon;
    famDato: string;
    erFarEllerMedmor: boolean;
    tilgjengeligeStønadskontoer: KontoDto[];
    erMorUfør: boolean | undefined;
    bareFarMedmorHarRett: boolean;
    erAleneOmOmsorg: boolean;
    farOgFar: boolean;
    startdato?: string;
}

export const ikkeDeltUttak = ({
    situasjon,
    famDato,
    erFarEllerMedmor,
    tilgjengeligeStønadskontoer,
    erMorUfør,
    bareFarMedmorHarRett,
    erAleneOmOmsorg,
    startdato,
    farOgFar,
}: IkkeDeltUttakProps): PlanForslag => {
    const foreldrepengerKonto = tilgjengeligeStønadskontoer.find((konto) => konto.konto === 'FORELDREPENGER');
    const foreldrePengerFørFødselKonto = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === 'FORELDREPENGER_FØR_FØDSEL',
    );
    const aktivitetsfriKvote = tilgjengeligeStønadskontoer.find((konto) => konto.konto === 'AKTIVITETSFRI_KVOTE');

    if (situasjon === 'adopsjon') {
        return ikkeDeltUttakAdopsjon(
            famDato,
            erFarEllerMedmor,
            foreldrepengerKonto!,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
            farOgFar,
        );
    }
    return ikkeDeltUttakFødsel(
        famDato,
        erFarEllerMedmor,
        foreldrepengerKonto!,
        foreldrePengerFørFødselKonto,
        erMorUfør,
        aktivitetsfriKvote,
        bareFarMedmorHarRett,
        erAleneOmOmsorg,
        farOgFar,
        startdato,
    );
};
