import dayjs from 'dayjs';

import { KontoDto, PeriodeDto_fpoversikt, Situasjon, Tidsperiode } from '@navikt/fp-types';
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
}): PeriodeDto_fpoversikt[] => {
    const førsteUttaksdag = Uttaksdagen.denneEllerNeste(famDato).getDato();
    const perioder: PeriodeDto_fpoversikt[] = [];

    if (erMorUfør) {
        // Aktivitetsfri kvote (foreldrepenger uten aktivitetskrav) skal ikke brukes i det foreslåtte forslaget
        // her, siden dette er en kvote brukeren selv bør velge å bruke, ikke noe vi automatisk foreslår.
        const tidsperiode = getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager);
        perioder.push({
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            søker: { forelder: 'FAR_MEDMOR', kontoType: 'FORELDREPENGER', flerbarnsdager: false },
        });
    } else if (farOgFar) {
        // NB: I motsetning til de andre grenene her bruker vi bevisst aktivitetsfriKvote og
        // morsAktivitet: 'IKKE_OPPGITT'. Når begge foreldrene er fedre finnes det ingen «mor» hvis
        // aktivitet kan dokumenteres, så et ordinært aktivitetskrav-basert konto (FORELDREPENGER)
        // gir ikke mening her – se VIS_AKTIVITETSKRAV_FELT i feltSynlighet.ts. Dette er trolig en egen,
        // gyldig forretningsregel og ikke del av «skal ikke foreslå aktivitetsfri kvote automatisk»-fiksen.
        const tidsperiode = getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager);
        perioder.push({
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            søker: {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                flerbarnsdager: false,
            },
        });
    } else {
        // Aktivitetsfri kvote (foreldrepenger uten aktivitetskrav) skal ikke brukes i det foreslåtte forslaget
        // her, siden dette er en kvote brukeren selv bør velge å bruke, ikke noe vi automatisk foreslår.
        const tidsperiode = getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager);
        perioder.push({
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            søker: { forelder: 'FAR_MEDMOR', kontoType: 'FORELDREPENGER', flerbarnsdager: false },
        });
    }

    return perioder;
};

const ikkeDeltUttakAdopsjonMor = ({
    famDato,
    foreldrepengerKonto,
}: {
    famDato: string;
    foreldrepengerKonto: KontoDto;
}): PeriodeDto_fpoversikt[] => {
    const førsteUttaksdag = Uttaksdagen.denneEllerNeste(famDato).getDato();
    const tidsperiode = getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager);

    return [
        {
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER', flerbarnsdager: false },
        },
    ];
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
}): PeriodeDto_fpoversikt[] => {
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

    const perioder: PeriodeDto_fpoversikt[] = [];

    if (foreldrePengerFørFødselKonto !== undefined && starterFørFødsel) {
        perioder.push({
            fom: valgtStartdato,
            tom: Uttaksdagen.forrige(førsteUttaksdagEtterFødsel).getDato(),
            søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
        });
    }

    const foreldrepengerFom = starterFørFødsel ? førsteUttaksdagEtterFødsel : valgtStartdato;
    const antallDagerIForeldrepenger = getTidsperiodeString(foreldrepengerFom, foreldrepengerKonto.dager);

    perioder.push({
        fom: antallDagerIForeldrepenger.fom,
        tom: antallDagerIForeldrepenger.tom,
        søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER', flerbarnsdager: false },
    });

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
}): PeriodeDto_fpoversikt[] => {
    const startDato = Uttaksdagen.denneEllerNeste(startdato ?? famDato).getDato();
    const perioder: PeriodeDto_fpoversikt[] = [];

    if (erMorUfør) {
        // Aktivitetsfri kvote (foreldrepenger uten aktivitetskrav) skal ikke brukes i det foreslåtte
        // forslaget her, siden dette er en kvote brukeren selv bør velge å bruke, ikke noe vi
        // automatisk foreslår.
        const tidsperiode = getTidsperiodeString(startDato, foreldrepengerKonto.dager);
        perioder.push({
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            søker: { forelder: 'FAR_MEDMOR', kontoType: 'FORELDREPENGER', flerbarnsdager: false },
        });
    } else {
        if (farOgFar && !erAleneOmOmsorg) {
            // NB: I motsetning til de andre grenene her bruker vi bevisst aktivitetsfriKvote og
            // morsAktivitet: 'IKKE_OPPGITT'. Når begge foreldrene er fedre finnes det ingen «mor» hvis
            // aktivitet kan dokumenteres, så et ordinært aktivitetskrav-basert konto (FORELDREPENGER)
            // gir ikke mening her – se VIS_AKTIVITETSKRAV_FELT i feltSynlighet.ts. Dette er trolig en egen,
            // gyldig forretningsregel og ikke del av «skal ikke foreslå aktivitetsfri kvote automatisk»-fiksen.
            const tidsperiode = getTidsperiodeString(startDato, aktivitetsfriKvote!.dager);
            perioder.push({
                fom: tidsperiode.fom,
                tom: tidsperiode.tom,
                søker: {
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FORELDREPENGER',
                    morsAktivitet: 'IKKE_OPPGITT',
                    flerbarnsdager: false,
                },
            });
        } else {
            // Aktivitetsfri kvote (foreldrepenger uten aktivitetskrav) skal ikke brukes i det foreslåtte
            // forslaget her, siden dette er en kvote brukeren selv bør velge å bruke, ikke noe vi
            // automatisk foreslår.
            const tidsperiode = getTidsperiodeString(startDato, foreldrepengerKonto.dager);
            perioder.push({
                fom: tidsperiode.fom,
                tom: tidsperiode.tom,
                søker: { forelder: 'FAR_MEDMOR', kontoType: 'FORELDREPENGER', flerbarnsdager: false },
            });
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
}: IkkeDeltUttakParams): PeriodeDto_fpoversikt[] => {
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
