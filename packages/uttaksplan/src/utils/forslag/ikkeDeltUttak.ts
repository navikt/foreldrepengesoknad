import dayjs from 'dayjs';

import { KontoDto, Situasjon, Tidsperiode, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

import { sorterUttakPerioder } from '../periodeUtils';

const ikkeDeltUttakAdopsjonFarMedmor = ({
    famDato,
    foreldrepengerKonto,
    erMorUfør,
    aktivitetsfriKvote,
    farOgFar,
}: {
    famDato: string;
    foreldrepengerKonto: KontoDto;
    erMorUfør: boolean | undefined;
    aktivitetsfriKvote: KontoDto | undefined;
    farOgFar: boolean;
}): UttakPeriode_fpoversikt[] => {
    const førsteUttaksdag = Uttaksdagen.denneEllerNeste(famDato).getDato();
    const perioder: UttakPeriode_fpoversikt[] = [];

    if (erMorUfør) {
        // Aktivitetsfri kvote (foreldrepenger uten aktivitetskrav) skal ikke brukes i det foreslåtte forslaget
        // her, siden dette er en kvote brukeren selv bør velge å bruke, ikke noe vi automatisk foreslår.
        const periode: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FORELDREPENGER',
            fom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).fom,
            tom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).tom,
            flerbarnsdager: false,
        };

        perioder.push(periode);
    } else if (farOgFar) {
        // NB: I motsetning til de andre grenene her bruker vi bevisst aktivitetsfriKvote og
        // morsAktivitet: 'IKKE_OPPGITT'. Når begge foreldrene er fedre finnes det ingen «mor» hvis
        // aktivitet kan dokumenteres, så et ordinært aktivitetskrav-basert konto (FORELDREPENGER)
        // gir ikke mening her – se VIS_AKTIVITETSKRAV_FELT i feltSynlighet.ts. Dette er trolig en egen,
        // gyldig forretningsregel og ikke del av «skal ikke foreslå aktivitetsfri kvote automatisk»-fiksen.
        const periode: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FORELDREPENGER',
            morsAktivitet: 'IKKE_OPPGITT',
            fom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).fom,
            tom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).tom,
            flerbarnsdager: false,
        };
        perioder.push(periode);
    } else {
        // Aktivitetsfri kvote (foreldrepenger uten aktivitetskrav) skal ikke brukes i det foreslåtte forslaget
        // her, siden dette er en kvote brukeren selv bør velge å bruke, ikke noe vi automatisk foreslår.
        const periode: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FORELDREPENGER',
            fom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).fom,
            tom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).tom,
            flerbarnsdager: false,
        };

        perioder.push(periode);
    }

    return perioder;
};

const ikkeDeltUttakAdopsjonMor = ({
    famDato,
    foreldrepengerKonto,
}: {
    famDato: string;
    foreldrepengerKonto: KontoDto;
}): UttakPeriode_fpoversikt[] => {
    const førsteUttaksdag = Uttaksdagen.denneEllerNeste(famDato).getDato();
    const periode: UttakPeriode_fpoversikt = {
        forelder: 'MOR',
        kontoType: 'FORELDREPENGER',
        fom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).fom,
        tom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).tom,
        flerbarnsdager: false,
    };

    return [periode];
};

const ikkeDeltUttakAdopsjon = ({
    famDato,
    erFarEllerMedmor,
    foreldrepengerKonto,
    erMorUfør,
    aktivitetsfriKvote,
    farOgFar,
}: {
    famDato: string;
    erFarEllerMedmor: boolean;
    foreldrepengerKonto: KontoDto;
    erMorUfør: boolean | undefined;
    aktivitetsfriKvote: KontoDto | undefined;
    farOgFar: boolean;
}) => {
    if (erFarEllerMedmor) {
        return ikkeDeltUttakAdopsjonFarMedmor({
            famDato,
            foreldrepengerKonto,
            erMorUfør,
            aktivitetsfriKvote,
            farOgFar,
        });
    } else {
        return ikkeDeltUttakAdopsjonMor({ famDato, foreldrepengerKonto });
    }
};

const ikkeDeltUttakFødselMor = ({
    famDato,
    foreldrepengerKonto,
    foreldrePengerFørFødselKonto,
    startdato,
}: {
    famDato: string;
    foreldrepengerKonto: KontoDto;
    foreldrePengerFørFødselKonto: KontoDto | undefined;
    startdato?: string;
}): UttakPeriode_fpoversikt[] => {
    const førsteUttaksdagEtterFødsel = Uttaksdagen.denneEllerNeste(famDato).getDato();
    // Når ingen startdato er valgt eksplisitt (t.d. planlegger-appen, som ikke har noe
    // eget oppstartsvalg-steg), bruker vi samme standard som før: 3 uker (15 uttaksdager)
    // før fødsel/termin.
    const standardStartdatoFørFødsel =
        Uttaksdagen.denne(førsteUttaksdagEtterFødsel).getDatoAntallUttaksdagerTidligere(15);
    const valgtStartdato = Uttaksdagen.denneEllerNeste(startdato ?? standardStartdatoFørFødsel).getDato();
    // Mor kan velge en oppstartsdato som ligger før fødselsdatoen (t.d. tre uker før termin/fødsel).
    // Da skal FORELDREPENGER_FØR_FØDSEL dekke perioden fra den valgte startdatoen og frem til fødselen.
    const starterFørFødsel = dayjs(valgtStartdato).isBefore(førsteUttaksdagEtterFødsel, 'd');

    const perioder: UttakPeriode_fpoversikt[] = [];

    if (foreldrePengerFørFødselKonto !== undefined && starterFørFødsel) {
        const periodeFørFødsel: UttakPeriode_fpoversikt = {
            forelder: 'MOR',
            kontoType: 'FORELDREPENGER_FØR_FØDSEL',
            fom: valgtStartdato,
            tom: Uttaksdagen.forrige(førsteUttaksdagEtterFødsel).getDato(),
            flerbarnsdager: false,
        };

        perioder.push(periodeFørFødsel);
    }

    const foreldrepengerFom = starterFørFødsel ? førsteUttaksdagEtterFødsel : valgtStartdato;
    const antallDagerIForeldrepenger = getTidsperiodeString(foreldrepengerFom, foreldrepengerKonto.dager);

    const foreldrepengerPeriode: UttakPeriode_fpoversikt = {
        forelder: 'MOR',
        kontoType: 'FORELDREPENGER',
        fom: antallDagerIForeldrepenger.fom,
        tom: antallDagerIForeldrepenger.tom,
        flerbarnsdager: false,
    };

    perioder.push(foreldrepengerPeriode);

    return [...perioder].sort(sorterUttakPerioder);
};

const ikkeDeltUttakFødselFarMedmor = ({
    famDato,
    foreldrepengerKonto,
    erMorUfør,
    aktivitetsfriKvote,
    erAleneOmOmsorg,
    farOgFar,
    startdato,
}: {
    famDato: string;
    foreldrepengerKonto: KontoDto;
    erMorUfør: boolean | undefined;
    aktivitetsfriKvote: KontoDto | undefined;
    erAleneOmOmsorg: boolean;
    farOgFar: boolean;
    startdato?: string;
}): UttakPeriode_fpoversikt[] => {
    const startDato = Uttaksdagen.denneEllerNeste(startdato ?? famDato).getDato();
    const perioder: UttakPeriode_fpoversikt[] = [];

    if (erMorUfør) {
        // Aktivitetsfri kvote (foreldrepenger uten aktivitetskrav) skal ikke brukes i det foreslåtte
        // forslaget her, siden dette er en kvote brukeren selv bør velge å bruke, ikke noe vi
        // automatisk foreslår.
        const aktivitetskravPeriode: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FORELDREPENGER',
            fom: getTidsperiodeString(startDato, foreldrepengerKonto.dager).fom,
            tom: getTidsperiodeString(startDato, foreldrepengerKonto.dager).tom,
            flerbarnsdager: false,
        };

        perioder.push(aktivitetskravPeriode);
    } else {
        if (farOgFar && !erAleneOmOmsorg) {
            // NB: I motsetning til de andre grenene her bruker vi bevisst aktivitetsfriKvote og
            // morsAktivitet: 'IKKE_OPPGITT'. Når begge foreldrene er fedre finnes det ingen «mor» hvis
            // aktivitet kan dokumenteres, så et ordinært aktivitetskrav-basert konto (FORELDREPENGER)
            // gir ikke mening her – se VIS_AKTIVITETSKRAV_FELT i feltSynlighet.ts. Dette er trolig en egen,
            // gyldig forretningsregel og ikke del av «skal ikke foreslå aktivitetsfri kvote automatisk»-fiksen.
            const periode: UttakPeriode_fpoversikt = {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                fom: getTidsperiodeString(startDato, aktivitetsfriKvote!.dager).fom,
                tom: getTidsperiodeString(startDato, aktivitetsfriKvote!.dager).tom,
                flerbarnsdager: false,
            };
            perioder.push(periode);
        } else {
            // Aktivitetsfri kvote (foreldrepenger uten aktivitetskrav) skal ikke brukes i det foreslåtte
            // forslaget her, siden dette er en kvote brukeren selv bør velge å bruke, ikke noe vi
            // automatisk foreslår.
            const periode: UttakPeriode_fpoversikt = {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                fom: getTidsperiodeString(startDato, foreldrepengerKonto.dager).fom,
                tom: getTidsperiodeString(startDato, foreldrepengerKonto.dager).tom,
                flerbarnsdager: false,
            };

            perioder.push(periode);
        }
    }

    return [...perioder].sort(sorterUttakPerioder);
};

const ikkeDeltUttakFødsel = ({
    famDato,
    erFarEllerMedmor,
    foreldrepengerKonto,
    foreldrePengerFørFødselKonto,
    erMorUfør,
    aktivitetsfriKvote,
    erAleneOmOmsorg,
    farOgFar,
    startdato,
}: {
    famDato: string;
    erFarEllerMedmor: boolean;
    foreldrepengerKonto: KontoDto;
    foreldrePengerFørFødselKonto: KontoDto | undefined;
    erMorUfør: boolean | undefined;
    aktivitetsfriKvote: KontoDto | undefined;
    erAleneOmOmsorg: boolean;
    farOgFar: boolean;
    startdato?: string;
}) => {
    if (erFarEllerMedmor) {
        return ikkeDeltUttakFødselFarMedmor({
            famDato,
            foreldrepengerKonto,
            erMorUfør,
            aktivitetsfriKvote,
            erAleneOmOmsorg,
            farOgFar,
            startdato,
        });
    } else {
        return ikkeDeltUttakFødselMor({
            famDato,
            foreldrepengerKonto,
            foreldrePengerFørFødselKonto,
            startdato,
        });
    }
};

interface IkkeDeltUttakParams {
    situasjon: Situasjon;
    famDato: string;
    erFarEllerMedmor: boolean;
    tilgjengeligeStønadskvoter: KontoDto[];
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
    tilgjengeligeStønadskvoter,
    erMorUfør,
    erAleneOmOmsorg,
    startdato,
    farOgFar,
}: IkkeDeltUttakParams): UttakPeriode_fpoversikt[] => {
    const foreldrepengerKonto = tilgjengeligeStønadskvoter.find((konto) => konto.konto === 'FORELDREPENGER');
    const foreldrePengerFørFødselKonto = tilgjengeligeStønadskvoter.find(
        (konto) => konto.konto === 'FORELDREPENGER_FØR_FØDSEL',
    );
    const aktivitetsfriKvote = tilgjengeligeStønadskvoter.find((konto) => konto.konto === 'AKTIVITETSFRI_KVOTE');

    if (situasjon === 'adopsjon') {
        return ikkeDeltUttakAdopsjon({
            famDato,
            erFarEllerMedmor,
            foreldrepengerKonto: foreldrepengerKonto!,
            erMorUfør,
            aktivitetsfriKvote,
            farOgFar,
        });
    }
    return ikkeDeltUttakFødsel({
        famDato,
        erFarEllerMedmor,
        foreldrepengerKonto: foreldrepengerKonto!,
        foreldrePengerFørFødselKonto,
        erMorUfør,
        aktivitetsfriKvote,
        erAleneOmOmsorg,
        farOgFar,
        startdato,
    });
};

const getTidsperiodeString = (fom: string, uttaksdager: number): Tidsperiode => {
    return {
        fom,
        tom: Uttaksdagen.denne(fom).getDatoAntallUttaksdagerSenere(uttaksdager - 1),
    };
};
