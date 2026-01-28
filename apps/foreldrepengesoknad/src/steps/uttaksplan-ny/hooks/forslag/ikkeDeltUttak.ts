import {
    KontoDto,
    SøkersituasjonFp,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { UttaksdagenString, getTidsperiodeString } from '@navikt/fp-utils';

import { sorterPerioder } from './deltUttak';

const ikkeDeltUttakAdopsjonFarMedmor = (
    famDato: string,
    foreldrepengerKonto: KontoDto,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: KontoDto | undefined,
    bareFarMedmorHarRett: boolean,
    farOgFar: boolean,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    const førsteUttaksdag = UttaksdagenString.denneEllerNeste(famDato).getDato();
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
            fom: getTidsperiodeString(
                UttaksdagenString.neste(aktivitetsFriPeriode.tom).getDato(),
                foreldrepengerKonto.dager,
            ).fom,
            tom: getTidsperiodeString(
                UttaksdagenString.neste(aktivitetsFriPeriode.tom).getDato(),
                foreldrepengerKonto.dager,
            ).tom,
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
            startDatoNestePeriode = UttaksdagenString.neste(aktivitetsFriPeriode.tom).getDato();
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

    return perioder;
};

const ikkeDeltUttakAdopsjonMor = (
    famDato: string,
    foreldrepengerKonto: KontoDto,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    const førsteUttaksdag = UttaksdagenString.denneEllerNeste(famDato).getDato();
    const periode: UttakPeriode_fpoversikt = {
        forelder: 'MOR',
        kontoType: foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : foreldrepengerKonto.konto,
        morsAktivitet: foreldrepengerKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : undefined,
        fom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).fom,
        tom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).tom,
    };

    return [periode];
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
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    const førsteUttaksdag = UttaksdagenString.denneEllerNeste(famDato).getDato();
    const perioder: UttakPeriode_fpoversikt[] = [];

    if (foreldrePengerFørFødselKonto !== undefined) {
        const periodeFørFødsel: UttakPeriode_fpoversikt = {
            forelder: 'MOR',
            kontoType:
                foreldrePengerFørFødselKonto.konto === 'AKTIVITETSFRI_KVOTE'
                    ? 'FORELDREPENGER'
                    : foreldrePengerFørFødselKonto.konto,
            morsAktivitet: foreldrePengerFørFødselKonto.konto === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : undefined,
            fom: UttaksdagenString.denne(førsteUttaksdag).getDatoAntallUttaksdagerTidligere(15),
            tom: UttaksdagenString.forrige(førsteUttaksdag).getDato(),
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

    return [...perioder].sort(sorterPerioder);
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
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    const startDato = UttaksdagenString.denneEllerNeste(startdato ?? famDato).getDato();
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
                    UttaksdagenString.neste(aktivitetsFriPeriode.tom).getDato(),
                    foreldrepengerKonto.dager,
                ).fom,
                tom: getTidsperiodeString(
                    UttaksdagenString.neste(aktivitetsFriPeriode.tom).getDato(),
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
                startDatoNestePeriode = UttaksdagenString.neste(aktivitetsFriPeriode.tom).getDato();
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

    return [...perioder].sort(sorterPerioder);
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

export const ikkeDeltUttak = (
    situasjon: SøkersituasjonFp,
    famDato: string,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: KontoDto[],
    erMorUfør: boolean | undefined,
    bareFarMedmorHarRett: boolean,
    erAleneOmOmsorg: boolean,
    farOgFar: boolean,
    startdato?: string,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    const foreldrepengerKonto = tilgjengeligeStønadskontoer.find((konto) => konto.konto === 'FORELDREPENGER');
    const foreldrePengerFørFødselKonto = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === 'FORELDREPENGER_FØR_FØDSEL',
    );
    const aktivitetsfriKvote = tilgjengeligeStønadskontoer.find((konto) => konto.konto === 'AKTIVITETSFRI_KVOTE');

    if (situasjon.situasjon === 'adopsjon') {
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
