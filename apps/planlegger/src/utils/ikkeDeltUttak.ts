import dayjs from 'dayjs';

import { StønadskontoType } from '@navikt/fp-constants';
import { SaksperiodeNy, Situasjon, Stønadskonto } from '@navikt/fp-types';
import { TidsperiodenString, UttaksdagenString, getTidsperiodeString } from '@navikt/fp-utils';
import {
    andreAugust2022ReglerGjelder,
    isUttaksperiode,
    sorterPerioder,
    splittSaksperiodePåDato,
    tidperiodeOverlapperDato,
} from '@navikt/fp-uttaksplan-ny';

const ikkeDeltUttakAdopsjonFarMedmor = (
    famDato: string,
    foreldrepengerKonto: Stønadskonto,
    startdatoPermisjon: string | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: Stønadskonto | undefined,
    bareFarMedmorHarRett: boolean,
    førsteUttaksdagNesteBarnsSak: string | undefined,
) => {
    const førsteUttaksdag = UttaksdagenString(startdatoPermisjon || famDato).denneEllerNeste();
    const perioder: SaksperiodeNy[] = [];

    if (erMorUfør !== true) {
        let startDatoNestePeriode = førsteUttaksdag;
        if (andreAugust2022ReglerGjelder(famDato) && !!bareFarMedmorHarRett) {
            const aktivitetsFriPeriode: SaksperiodeNy = {
                kontoType: StønadskontoType.AktivitetsfriKvote,
                fom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).fom,
                tom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).tom,
            };
            if (
                førsteUttaksdagNesteBarnsSak !== undefined &&
                tidperiodeOverlapperDato(
                    { fom: aktivitetsFriPeriode.fom, tom: aktivitetsFriPeriode.tom },
                    førsteUttaksdagNesteBarnsSak,
                )
            ) {
                const splittetPeriode = splittSaksperiodePåDato(aktivitetsFriPeriode, førsteUttaksdagNesteBarnsSak);
                splittetPeriode.forEach((sp) => perioder.push(sp));
            } else {
                perioder.push(aktivitetsFriPeriode);
            }
            startDatoNestePeriode = UttaksdagenString(aktivitetsFriPeriode.tom).neste();
        }
        const periode: SaksperiodeNy = {
            kontoType: foreldrepengerKonto.konto,
            fom: getTidsperiodeString(startDatoNestePeriode, foreldrepengerKonto.dager).fom,
            tom: getTidsperiodeString(startDatoNestePeriode, foreldrepengerKonto.dager).tom,
        };
        if (
            førsteUttaksdagNesteBarnsSak !== undefined &&
            tidperiodeOverlapperDato({ fom: periode.fom, tom: periode.tom }, førsteUttaksdagNesteBarnsSak)
        ) {
            const splittetPeriode = splittSaksperiodePåDato(periode, førsteUttaksdagNesteBarnsSak);
            splittetPeriode.forEach((sp) => perioder.push(sp));
        } else {
            perioder.push(periode);
        }
    } else {
        const aktivitetsFriPeriode: SaksperiodeNy = {
            kontoType: StønadskontoType.AktivitetsfriKvote,
            fom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).fom,
            tom: getTidsperiodeString(førsteUttaksdag, aktivitetsfriKvote!.dager).tom,
        };

        if (
            førsteUttaksdagNesteBarnsSak !== undefined &&
            tidperiodeOverlapperDato(
                { fom: aktivitetsFriPeriode.fom, tom: aktivitetsFriPeriode.tom },
                førsteUttaksdagNesteBarnsSak,
            )
        ) {
            const splittetPeriode = splittSaksperiodePåDato(aktivitetsFriPeriode, førsteUttaksdagNesteBarnsSak);
            splittetPeriode.forEach((sp) => perioder.push(sp));
        } else {
            perioder.push(aktivitetsFriPeriode);
        }

        const aktivitetskravPeriode: SaksperiodeNy = {
            kontoType: StønadskontoType.Foreldrepenger,
            fom: getTidsperiodeString(UttaksdagenString(aktivitetsFriPeriode.tom).neste(), foreldrepengerKonto.dager)
                .fom,
            tom: getTidsperiodeString(UttaksdagenString(aktivitetsFriPeriode.tom).neste(), foreldrepengerKonto.dager)
                .tom,
        };

        if (
            førsteUttaksdagNesteBarnsSak !== undefined &&
            tidperiodeOverlapperDato(
                { fom: aktivitetskravPeriode.fom, tom: aktivitetskravPeriode.tom },
                førsteUttaksdagNesteBarnsSak,
            )
        ) {
            const splittetPeriode = splittSaksperiodePåDato(aktivitetskravPeriode, førsteUttaksdagNesteBarnsSak);
            splittetPeriode.forEach((sp) => perioder.push(sp));
        } else {
            perioder.push(aktivitetskravPeriode);
        }
    }

    return perioder;
};

const ikkeDeltUttakAdopsjonMor = (
    famDato: string,
    foreldrepengerKonto: Stønadskonto,
    startdatoPermisjon: string | undefined,
    førsteUttaksdagNesteBarnsSak: string | undefined,
) => {
    const førsteUttaksdag = UttaksdagenString(startdatoPermisjon || famDato).denneEllerNeste();
    const periode: SaksperiodeNy = {
        kontoType: foreldrepengerKonto.konto,
        fom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).fom,
        tom: getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager).tom,
    };
    if (
        førsteUttaksdagNesteBarnsSak !== undefined &&
        tidperiodeOverlapperDato({ fom: periode.fom, tom: periode.tom }, førsteUttaksdagNesteBarnsSak)
    ) {
        return splittSaksperiodePåDato(periode, førsteUttaksdagNesteBarnsSak);
    }
    return [periode];
};

const ikkeDeltUttakAdopsjon = (
    famDato: string,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: Stønadskonto,
    startdatoPermisjon: string | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: Stønadskonto | undefined,
    bareFarMedmorHarRett: boolean,
    førsteUttaksdagNesteBarnsSak: string | undefined,
) => {
    if (!erFarEllerMedmor) {
        return ikkeDeltUttakAdopsjonMor(famDato, foreldrepengerKonto, startdatoPermisjon, førsteUttaksdagNesteBarnsSak);
    } else {
        return ikkeDeltUttakAdopsjonFarMedmor(
            famDato,
            foreldrepengerKonto,
            startdatoPermisjon,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
            førsteUttaksdagNesteBarnsSak,
        );
    }
};

const ikkeDeltUttakFødselMor = (
    famDato: string,
    foreldrepengerKonto: Stønadskonto,
    startdatoPermisjon: string | undefined,
    foreldrePengerFørFødselKonto: Stønadskonto,
) => {
    const førsteUttaksdag = UttaksdagenString(famDato).denneEllerNeste();
    const perioder: SaksperiodeNy[] = [];
    const skalHaForeldrePengerFørFødsel = dayjs(startdatoPermisjon).isBefore(dayjs(famDato), 'd');

    if (foreldrePengerFørFødselKonto !== undefined && skalHaForeldrePengerFørFødsel && startdatoPermisjon) {
        const dagerFørFødsel = UttaksdagenString(startdatoPermisjon).getUttaksdagerFremTilDato(førsteUttaksdag);
        const merEnnTreUkerPermisjonFørFødsel = dagerFørFødsel > 15;
        const startdatoFpFørFødsel = UttaksdagenString(førsteUttaksdag).trekkFra(
            merEnnTreUkerPermisjonFørFødsel ? 15 : dagerFørFødsel,
        );

        if (merEnnTreUkerPermisjonFørFødsel) {
            const ekstraPeriodeFørFødsel: SaksperiodeNy = {
                kontoType: StønadskontoType.Foreldrepenger,
                fom: getTidsperiodeString(startdatoPermisjon, dagerFørFødsel - 15).fom,
                tom: getTidsperiodeString(startdatoPermisjon, dagerFørFødsel - 15).tom,
            };

            perioder.push(ekstraPeriodeFørFødsel);
        }

        const periodeFørFødsel: SaksperiodeNy = {
            kontoType: foreldrePengerFørFødselKonto.konto,
            fom: startdatoFpFørFødsel,
            tom: UttaksdagenString(førsteUttaksdag).forrige(),
        };

        perioder.push(periodeFørFødsel);
    } else {
        const periodeFørFødsel: SaksperiodeNy = {
            kontoType: StønadskontoType.ForeldrepengerFørFødsel,
            fom: UttaksdagenString(førsteUttaksdag).trekkFra(15),
            tom: UttaksdagenString(førsteUttaksdag).forrige(),
        };

        perioder.push(periodeFørFødsel);
    }

    const ekstraPermisjonFørFødsel = perioder.find(
        (p) => isUttaksperiode(p) && p.kontoType === StønadskontoType.Foreldrepenger,
    );

    const antallDagerIForeldrepenger = ekstraPermisjonFørFødsel
        ? getTidsperiodeString(
              førsteUttaksdag,
              foreldrepengerKonto.dager -
                  TidsperiodenString({
                      fom: ekstraPermisjonFørFødsel.fom,
                      tom: ekstraPermisjonFørFødsel.tom,
                  }).getAntallUttaksdager(),
          )
        : getTidsperiodeString(førsteUttaksdag, foreldrepengerKonto.dager);

    const foreldrepengerPeriode: SaksperiodeNy = {
        kontoType: foreldrepengerKonto.konto,
        fom: antallDagerIForeldrepenger.fom,
        tom: antallDagerIForeldrepenger.tom,
    };

    perioder.push(foreldrepengerPeriode);

    return perioder.sort(sorterPerioder);
};

const ikkeDeltUttakFødselFarMedmor = (
    famDato: string,
    foreldrepengerKonto: Stønadskonto,
    startdatoPermisjon: string | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: Stønadskonto | undefined,
    bareFarMedmorHarRett: boolean,
) => {
    const startDato = UttaksdagenString(startdatoPermisjon || famDato).denneEllerNeste();
    const perioder: SaksperiodeNy[] = [];

    if (erMorUfør !== true) {
        let startDatoNestePeriode = startDato;
        if (andreAugust2022ReglerGjelder(famDato) && !!bareFarMedmorHarRett) {
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
        const aktivitetsFriPeriode: SaksperiodeNy = {
            kontoType: StønadskontoType.AktivitetsfriKvote,
            fom: getTidsperiodeString(startDato, aktivitetsfriKvote!.dager).fom,
            tom: getTidsperiodeString(startDato, aktivitetsfriKvote!.dager).tom,
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

    return perioder.sort(sorterPerioder);
};

const ikkeDeltUttakFødsel = (
    famDato: string,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: Stønadskonto,
    startdatoPermisjon: string | undefined,
    foreldrePengerFørFødselKonto: Stønadskonto | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: Stønadskonto | undefined,
    bareFarMedmorHarRett: boolean,
) => {
    if (!erFarEllerMedmor) {
        return ikkeDeltUttakFødselMor(famDato, foreldrepengerKonto, startdatoPermisjon, foreldrePengerFørFødselKonto!);
    } else {
        return ikkeDeltUttakFødselFarMedmor(
            famDato,
            foreldrepengerKonto,
            startdatoPermisjon,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
        );
    }
};

export const ikkeDeltUttak = (
    situasjon: Situasjon,
    famDato: string,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: Stønadskonto[],
    startdatoPermisjon: string | undefined,
    erMorUfør: boolean | undefined,
    bareFarMedmorHarRett: boolean,
    førsteUttaksdagNesteBarnsSak: string | undefined,
) => {
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
            startdatoPermisjon,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
            førsteUttaksdagNesteBarnsSak,
        );
    }

    if (situasjon === 'fødsel') {
        return ikkeDeltUttakFødsel(
            famDato,
            erFarEllerMedmor,
            foreldrepengerKonto!,
            startdatoPermisjon,
            foreldrePengerFørFødselKonto,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
        );
    }

    return [];
};
