import { StønadskontoType } from '@navikt/fp-constants';
import { PlanForslag, SaksperiodeNy, Situasjon, Stønadskonto } from '@navikt/fp-types';
import { UttaksdagenString, getTidsperiodeString } from '@navikt/fp-utils';
import { andreAugust2022ReglerGjelder, sorterPerioder } from '@navikt/fp-uttaksplan-ny';

const ikkeDeltUttakAdopsjonFarMedmor = (
    famDato: string,
    foreldrepengerKonto: Stønadskonto,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: Stønadskonto | undefined,
    bareFarMedmorHarRett: boolean,
): PlanForslag => {
    const førsteUttaksdag = UttaksdagenString(famDato).denneEllerNeste();
    const perioder: SaksperiodeNy[] = [];

    if (erMorUfør !== true) {
        let startDatoNestePeriode = førsteUttaksdag;
        if (andreAugust2022ReglerGjelder(famDato) && !!bareFarMedmorHarRett && aktivitetsfriKvote) {
            const aktivitetsFriPeriode: SaksperiodeNy = {
                kontoType: StønadskontoType.AktivitetsfriKvote,
                fom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).fom,
                tom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).tom,
            };

            perioder.push(aktivitetsFriPeriode);
            startDatoNestePeriode = UttaksdagenString(aktivitetsFriPeriode.tom).neste();
        }
        const periode: SaksperiodeNy = {
            kontoType: foreldrepengerKonto.konto,
            fom: getTidsperiodeString(startDatoNestePeriode, foreldrepengerKonto.dager).fom,
            tom: getTidsperiodeString(startDatoNestePeriode, foreldrepengerKonto.dager).tom,
        };

        perioder.push(periode);
    } else {
        const aktivitetsFriPeriode: SaksperiodeNy = {
            kontoType: StønadskontoType.AktivitetsfriKvote,
            fom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).fom,
            tom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).tom,
        };
        perioder.push(aktivitetsFriPeriode);

        const aktivitetskravPeriode: SaksperiodeNy = {
            kontoType: StønadskontoType.Foreldrepenger,
            fom: getTidsperiodeString(UttaksdagenString(aktivitetsFriPeriode.tom).neste(), foreldrepengerKonto.dager)
                .fom,
            tom: getTidsperiodeString(UttaksdagenString(aktivitetsFriPeriode.tom).neste(), foreldrepengerKonto.dager)
                .tom,
        };
        perioder.push(aktivitetskravPeriode);
    }

    return { søker1: perioder, søker2: [] };
};

const ikkeDeltUttakAdopsjonMor = (famDato: string, foreldrepengerKonto: Stønadskonto): PlanForslag => {
    const førsteUttaksdag = UttaksdagenString(famDato).denneEllerNeste();
    const periode: SaksperiodeNy = {
        kontoType: foreldrepengerKonto.konto,
        fom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).fom,
        tom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).tom,
    };

    return { søker1: [periode], søker2: [] };
};

const ikkeDeltUttakAdopsjon = (
    famDato: string,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: Stønadskonto,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: Stønadskonto | undefined,
    bareFarMedmorHarRett: boolean,
) => {
    if (!erFarEllerMedmor) {
        return ikkeDeltUttakAdopsjonMor(famDato, foreldrepengerKonto);
    } else {
        return ikkeDeltUttakAdopsjonFarMedmor(
            famDato,
            foreldrepengerKonto,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
        );
    }
};

const ikkeDeltUttakFødselMor = (
    famDato: string,
    foreldrepengerKonto: Stønadskonto,
    foreldrePengerFørFødselKonto: Stønadskonto,
): PlanForslag => {
    const førsteUttaksdag = UttaksdagenString(famDato).denneEllerNeste();
    const perioder: SaksperiodeNy[] = [];

    if (foreldrePengerFørFødselKonto !== undefined) {
        const periodeFørFødsel: SaksperiodeNy = {
            kontoType: foreldrePengerFørFødselKonto.konto,
            fom: UttaksdagenString(førsteUttaksdag).trekkFra(15),
            tom: UttaksdagenString(førsteUttaksdag).forrige(),
        };

        perioder.push(periodeFørFødsel);
    }

    const antallDagerIForeldrepenger = getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager);

    const foreldrepengerPeriode: SaksperiodeNy = {
        kontoType: foreldrepengerKonto.konto,
        fom: antallDagerIForeldrepenger.fom,
        tom: antallDagerIForeldrepenger.tom,
    };

    perioder.push(foreldrepengerPeriode);

    return { søker1: perioder.sort(sorterPerioder), søker2: [] };
};

const ikkeDeltUttakFødselFarMedmor = (
    famDato: string,
    foreldrepengerKonto: Stønadskonto,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: Stønadskonto | undefined,
    bareFarMedmorHarRett: boolean,
    erAleneOmOmsorg: boolean,
    startdato?: string,
): PlanForslag => {
    const startDato = UttaksdagenString(startdato ?? famDato).denneEllerNeste();
    const perioder: SaksperiodeNy[] = [];

    if (erMorUfør !== true) {
        let startDatoNestePeriode = startDato;
        if (andreAugust2022ReglerGjelder(famDato) && bareFarMedmorHarRett && !erAleneOmOmsorg && aktivitetsfriKvote) {
            const aktivitetsFriPeriode: SaksperiodeNy = {
                kontoType: StønadskontoType.AktivitetsfriKvote,
                fom: getTidsperiodeString(startDato, aktivitetsfriKvote!.dager).fom,
                tom: getTidsperiodeString(startDato, aktivitetsfriKvote!.dager).tom,
            };

            perioder.push(aktivitetsFriPeriode);
            startDatoNestePeriode = UttaksdagenString(aktivitetsFriPeriode.tom).neste();
        }

        const periode: SaksperiodeNy = {
            kontoType: foreldrepengerKonto.konto,
            fom: getTidsperiodeString(startDatoNestePeriode, foreldrepengerKonto.dager).fom,
            tom: getTidsperiodeString(startDatoNestePeriode, foreldrepengerKonto.dager).tom,
        };

        perioder.push(periode);
    } else {
        if (!erAleneOmOmsorg) {
            const aktivitetsFriPeriode: SaksperiodeNy = {
                kontoType: StønadskontoType.AktivitetsfriKvote,
                fom: getTidsperiodeString(startDato, aktivitetsfriKvote!.dager).fom,
                tom: getTidsperiodeString(startDato, aktivitetsfriKvote!.dager).tom,
            };

            perioder.push(aktivitetsFriPeriode);

            const aktivitetskravPeriode: SaksperiodeNy = {
                kontoType: StønadskontoType.Foreldrepenger,
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
        } else {
            const aktivitetskravPeriode: SaksperiodeNy = {
                kontoType: StønadskontoType.Foreldrepenger,
                fom: getTidsperiodeString(startDato, foreldrepengerKonto.dager).fom,
                tom: getTidsperiodeString(startDato, foreldrepengerKonto.dager).tom,
            };

            perioder.push(aktivitetskravPeriode);
        }
    }

    return { søker1: perioder.sort(sorterPerioder), søker2: [] };
};

const ikkeDeltUttakFødsel = (
    famDato: string,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: Stønadskonto,
    foreldrePengerFørFødselKonto: Stønadskonto | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: Stønadskonto | undefined,
    bareFarMedmorHarRett: boolean,
    erAleneOmOmsorg: boolean,
    startdato?: string,
) => {
    if (!erFarEllerMedmor) {
        return ikkeDeltUttakFødselMor(famDato, foreldrepengerKonto, foreldrePengerFørFødselKonto!);
    } else {
        return ikkeDeltUttakFødselFarMedmor(
            famDato,
            foreldrepengerKonto,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
            erAleneOmOmsorg,
            startdato,
        );
    }
};

interface IkkeDeltUttakProps {
    situasjon: Situasjon;
    famDato: string;
    erFarEllerMedmor: boolean;
    tilgjengeligeStønadskontoer: Stønadskonto[];
    erMorUfør: boolean | undefined;
    bareFarMedmorHarRett: boolean;
    erAleneOmOmsorg: boolean;
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
}: IkkeDeltUttakProps): PlanForslag => {
    const foreldrepengerKonto = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Foreldrepenger,
    );
    const foreldrePengerFørFødselKonto = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.ForeldrepengerFørFødsel,
    );
    const aktivitetsfriKvote = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.AktivitetsfriKvote,
    );

    if (situasjon === 'adopsjon') {
        return ikkeDeltUttakAdopsjon(
            famDato,
            erFarEllerMedmor,
            foreldrepengerKonto!,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
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
        startdato,
    );
};
