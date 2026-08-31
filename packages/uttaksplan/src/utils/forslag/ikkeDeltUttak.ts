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
            kontoType:
                foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : foreldrepengerKonto.konto,
            morsAktivitet: foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : undefined,
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
        kontoType: foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : foreldrepengerKonto.konto,
        morsAktivitet: foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : undefined,
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
}: {
    famDato: string;
    foreldrepengerKonto: KontoDto;
    foreldrePengerFørFødselKonto: KontoDto;
}): UttakPeriode_fpoversikt[] => {
    const førsteUttaksdag = Uttaksdagen.denneEllerNeste(famDato).getDato();
    const perioder: UttakPeriode_fpoversikt[] = [];

    if (foreldrePengerFørFødselKonto !== undefined) {
        const periodeFørFødsel: UttakPeriode_fpoversikt = {
            forelder: 'MOR',
            kontoType:
                foreldrePengerFørFødselKonto.konto === 'AKTIVITETSFRI_KVOTE'
                    ? 'FORELDREPENGER'
                    : foreldrePengerFørFødselKonto.konto,
            morsAktivitet: foreldrePengerFørFødselKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : undefined,
            fom: Uttaksdagen.denne(førsteUttaksdag).getDatoAntallUttaksdagerTidligere(15),
            tom: Uttaksdagen.forrige(førsteUttaksdag).getDato(),
            flerbarnsdager: false,
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
                kontoType:
                    foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : foreldrepengerKonto.konto,
                morsAktivitet: foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : undefined,
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
            foreldrePengerFørFødselKonto: foreldrePengerFørFødselKonto!,
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
