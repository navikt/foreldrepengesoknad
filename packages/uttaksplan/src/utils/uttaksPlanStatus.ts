import {
    AvslåttPeriode,
    InfoPeriode,
    Oppholdsperiode,
    Overføringsperiode,
    Periode,
    Periodetype,
    UttakAnnenPartEØSInfoPeriode,
    UttakAnnenPartInfoPeriode,
    Uttaksperiode,
    isAvslåttPeriode,
    isInfoPeriode,
    isOppholdsperiode,
    isOverføringsperiode,
    isUttaksperiode,
    isUttaksperiodeAnnenpartEøs,
} from '@navikt/fp-common';
import { PeriodeInfoType } from '@navikt/fp-constants';
import { KontoBeregningDto, KontoDto } from '@navikt/fp-types';
import { getFloatFromString } from '@navikt/fp-utils';

import { Perioden } from './Perioden';
import { getStønadskontoFromOppholdsårsak } from './periodeUtils';

export const finnAntallDagerÅTrekke = (periode: Periode): number => {
    if (isUttaksperiodeAnnenpartEøs(periode)) {
        return periode.trekkdager;
    }
    const dager = Perioden(periode).getAntallUttaksdager();
    if (isUttaksperiode(periode)) {
        const periodeErGradert = periode.stillingsprosent !== undefined;
        const periodeErSamtidigUttak = periode.samtidigUttakProsent !== undefined;

        if ((periodeErGradert && periodeErSamtidigUttak) || periodeErGradert) {
            const graderingsProsent = (100 - getFloatFromString(periode.stillingsprosent)!) / 100;

            return dager * graderingsProsent;
        } else if (periodeErSamtidigUttak) {
            return dager * (getFloatFromString(periode.samtidigUttakProsent)! / 100);
        } else {
            return dager;
        }
    }
    return dager;
};

export const getAllePerioderMedUttaksinfoFraUttaksplan = (perioder: Periode[]): Uttaksperiode[] => {
    return [
        ...perioder.filter(isUttaksperiode),
        ...getUttakFraOppholdsperioder(perioder.filter(isOppholdsperiode)),
        ...getUttakFraOverføringsperioder(perioder.filter(isOverføringsperiode)),
        ...getUttakFraInfoperioder(perioder.filter(isInfoPeriode)),
        ...getUttakFraAvslåttePerioder(perioder.filter(isAvslåttPeriode)),
    ];
};

export const beregnGjenståendeUttaksdager = (
    tilgjengeligeStønadskontoer: KontoBeregningDto,
    uttaksplan: Periode[],
    beregnDagerBrukt: boolean,
): KontoDto[] => {
    const alleUttakIUttaksplan = getAllePerioderMedUttaksinfoFraUttaksplan(uttaksplan);
    return tilgjengeligeStønadskontoer.kontoer.map((konto) => {
        let antallDager = beregnDagerBrukt ? 0 : konto.dager;
        const gjeldendeUttaksplanPerioder = alleUttakIUttaksplan.filter((p) => p.konto === konto.konto);
        const uttaksplanPerioderNorge = gjeldendeUttaksplanPerioder
            .filter((p) => !isUttaksperiodeAnnenpartEøs(p))
            .filter((p) => p.type === Periodetype.Uttak || p.type === Periodetype.Overføring || isAvslåttPeriode(p));
        const uttaksplanPerioderEøs = gjeldendeUttaksplanPerioder.filter((p) => isUttaksperiodeAnnenpartEøs(p));

        const antallDagerForbruktTotalt =
            Math.min(summerAntallDagerForbrukt(uttaksplanPerioderEøs), konto.dager) + // OBS: Kan være mer en tilgjengelig konto
            summerAntallDagerForbrukt(uttaksplanPerioderNorge);
        antallDager = beregnDagerBrukt
            ? antallDager + antallDagerForbruktTotalt
            : antallDager - antallDagerForbruktTotalt;
        antallDager = beregnDagerBrukt ? Math.floor(antallDager) : Math.ceil(antallDager);

        return {
            konto: konto.konto,
            dager: antallDager,
        };
    });
};

const summerAntallDagerForbrukt = (perioder: Periode[]): number => {
    return perioder.flatMap((p) => finnAntallDagerÅTrekke(p)).reduce((sum, dager) => sum + dager, 0);
};

export const beregnBrukteUttaksdager = (
    tilgjengeligeStønadskontoer: KontoBeregningDto,
    uttaksplan: Periode[],
): KontoDto[] => {
    return beregnGjenståendeUttaksdager(tilgjengeligeStønadskontoer, uttaksplan, true);
};

const getUttakFraOppholdsperioder = (oppholdsperioder: Oppholdsperiode[]): Uttaksperiode[] => {
    if (oppholdsperioder.length === 0) {
        return [];
    }
    return oppholdsperioder.map(
        (opphold: Oppholdsperiode): Uttaksperiode => ({
            id: opphold.id,
            tidsperiode: opphold.tidsperiode,
            type: Periodetype.Uttak,
            konto: getStønadskontoFromOppholdsårsak(opphold.årsak),
            forelder: opphold.forelder,
        }),
    );
};
const getUttakFraOverføringsperioder = (overføringer: Overføringsperiode[]): Uttaksperiode[] => {
    if (overføringer.length === 0) {
        return [];
    }
    return overføringer.map(
        (overføring): Uttaksperiode => ({
            id: overføring.id,
            tidsperiode: overføring.tidsperiode,
            type: Periodetype.Uttak,
            konto: overføring.konto,
            forelder: overføring.forelder,
        }),
    );
};

const getUttakFraInfoperioder = (perioder: InfoPeriode[]): Uttaksperiode[] => {
    if (perioder.length === 0) {
        return [];
    }
    const oppholdAnnenPart: Array<UttakAnnenPartInfoPeriode | UttakAnnenPartEØSInfoPeriode> = [];
    perioder
        .filter((periode) => isAvslåttPeriode(periode) === false)
        .forEach((periode) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison -- to forskjellige enums med samme innhold
            if (periode.infotype === PeriodeInfoType.uttakAnnenPart) {
                oppholdAnnenPart.push(periode);
            }
        });
    return oppholdAnnenPart.map((periode): Uttaksperiode => {
        const { type, årsak, ...rest } = periode;
        return {
            type: Periodetype.Uttak,
            konto: getStønadskontoFromOppholdsårsak(periode.årsak),
            ...rest,
        };
    });
};

const getUttakFraAvslåttePerioder = (perioder: AvslåttPeriode[]): Uttaksperiode[] => {
    if (perioder.length === 0) {
        return [];
    }

    return perioder
        .filter((p) => p.avslåttPeriodeType === Periodetype.Uttak || p.avslåttPeriodeType === Periodetype.Utsettelse)
        .map(
            (periode): Uttaksperiode => ({
                type: Periodetype.Uttak,
                konto: periode.kontoType!,
                tidsperiode: periode.tidsperiode,
                id: periode.id,
                forelder: periode.forelder,
            }),
        );
};
