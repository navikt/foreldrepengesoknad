import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { getFloatFromString } from '@navikt/fp-utils';

import Tilrettelegging, {
    PeriodeMedVariasjon,
    Stilling,
    TilOgMedDatoType,
    TilretteleggingPeriode,
    Tilretteleggingstype,
    TilretteleggingstypeOptions,
} from 'app/types/Tilrettelegging';

import { getTotalStillingsprosentPåSkjæringstidspunktet } from './arbeidsforholdUtils';

const mapTilretteleggingTilPeriode = (
    tilrettelegging: Tilrettelegging,
    type: Tilretteleggingstype,
    stillingsprosent: number,
    fom: string,
    tom: string,
): TilretteleggingPeriode => {
    return {
        type,
        behovForTilretteleggingFom: tilrettelegging.behovForTilretteleggingFom,
        arbeidsforhold: tilrettelegging.arbeidsforhold,
        fom,
        tom,
        stillingsprosent,
        risikofaktorer: tilrettelegging.risikofaktorer,
        tilretteleggingstiltak: tilrettelegging.tilretteleggingstiltak,
    };
};

const getPeriodeMedHelTilretteleggingFremTilSisteSvpDag = (
    sistePeriode: TilretteleggingPeriode,
    sisteDagForSvangerskapspenger: string,
    opprinneligStillingsprosent: number,
): TilretteleggingPeriode => {
    return {
        type: Tilretteleggingstype.HEL,
        behovForTilretteleggingFom: sistePeriode.behovForTilretteleggingFom,
        fom: dayjs(sistePeriode.tom).add(1, 'd').format(ISO_DATE_FORMAT),
        tom: sisteDagForSvangerskapspenger,
        arbeidsforhold: sistePeriode.arbeidsforhold,
        risikofaktorer: sistePeriode.risikofaktorer,
        tilretteleggingstiltak: sistePeriode.tilretteleggingstiltak,
        stillingsprosent: opprinneligStillingsprosent,
    };
};

const mappedTilretteleggingMedEnPeriode = (
    tilrettelegging: Tilrettelegging,
    sisteDagForSvangerskapspenger: string,
    opprinneligstillingsprosent: number,
): TilretteleggingPeriode[] => {
    const perioder = [] as TilretteleggingPeriode[];
    const stillingsprosent =
        tilrettelegging.type === TilretteleggingstypeOptions.DELVIS
            ? getFloatFromString(tilrettelegging.enPeriodeMedTilretteleggingStillingsprosent)
            : 0;
    const fom = tilrettelegging.enPeriodeMedTilretteleggingFom!;
    const tom =
        tilrettelegging.enPeriodeMedTilretteleggingTomType === TilOgMedDatoType.VALGFRI_DATO
            ? dayjs(tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato).subtract(1, 'day').toString()!
            : sisteDagForSvangerskapspenger;
    const type =
        tilrettelegging.type === TilretteleggingstypeOptions.DELVIS && stillingsprosent && stillingsprosent > 0
            ? Tilretteleggingstype.DELVIS
            : Tilretteleggingstype.INGEN;
    const mappedPeriode = mapTilretteleggingTilPeriode(tilrettelegging, type, stillingsprosent!, fom, tom);
    perioder.push(mappedPeriode);
    if (!dayjs(mappedPeriode.tom).isSame(sisteDagForSvangerskapspenger, 'day')) {
        perioder.push(
            getPeriodeMedHelTilretteleggingFremTilSisteSvpDag(
                mappedPeriode,
                sisteDagForSvangerskapspenger,
                opprinneligstillingsprosent,
            ),
        );
    }
    return perioder;
};

const mappedTilretteleggingMedVarierendePerioder = (
    tilrettelegging: Tilrettelegging,
    sisteDagForSvangerskapspenger: string,
    opprinneligStillingsprosent: number,
): TilretteleggingPeriode[] => {
    const allePerioder = tilrettelegging.varierendePerioder!.map((periode) => {
        const stillingsprosent = getFloatFromString(periode.stillingsprosent);
        let type =
            periode.type === TilretteleggingstypeOptions.DELVIS
                ? Tilretteleggingstype.DELVIS
                : Tilretteleggingstype.INGEN;
        if (stillingsprosent === 0) {
            type = Tilretteleggingstype.INGEN;
        } else if (opprinneligStillingsprosent === 0 && stillingsprosent === 100) {
            type = Tilretteleggingstype.HEL;
        } else if (stillingsprosent === opprinneligStillingsprosent) {
            type = Tilretteleggingstype.HEL;
        }
        const tom =
            periode.tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP ? sisteDagForSvangerskapspenger : periode.tom!;
        return mapTilretteleggingTilPeriode(tilrettelegging, type, stillingsprosent!, periode.fom, tom);
    });
    const sistePeriode = allePerioder[allePerioder.length - 1];
    if (!dayjs(sistePeriode.tom).isSame(sisteDagForSvangerskapspenger, 'day')) {
        allePerioder.push(
            getPeriodeMedHelTilretteleggingFremTilSisteSvpDag(
                sistePeriode,
                sisteDagForSvangerskapspenger,
                opprinneligStillingsprosent,
            ),
        );
    }
    return allePerioder;
};

const sorterTilretteleggingsperioder = (
    p1: TilretteleggingPeriode | PeriodeMedVariasjon,
    p2: TilretteleggingPeriode | PeriodeMedVariasjon,
) => {
    if (dayjs(p1.fom).isBefore(p2.fom, 'day')) {
        return -1;
    }
    if (dayjs(p1.fom).isSame(p2.fom, 'day')) {
        return dayjs(p1.tom).isBefore(p2.tom, 'day') ? -1 : 1;
    }
    return 1;
};

export const mapTilretteleggingTilPerioder = (
    tilrettelegging: Tilrettelegging[],
    sisteDagForSvangerskapspenger: string,
): TilretteleggingPeriode[] => {
    const tilretteleggingMedEnPeriode = tilrettelegging.filter(
        (t) => !t.varierendePerioder || t.varierendePerioder.length === 0,
    );
    const tilretteleggingMedVarierendePerioder = tilrettelegging.filter(
        (t) => t.varierendePerioder && t.varierendePerioder.length > 0,
    );
    const mappedTilretteleggingerMedEnPeriode = tilretteleggingMedEnPeriode.map((t) => {
        const opprinneligStillingsprosent = getTotalStillingsprosentPåSkjæringstidspunktet(
            t.arbeidsforhold.stillinger,
            t.enPeriodeMedTilretteleggingFom,
        );
        return mappedTilretteleggingMedEnPeriode(t, sisteDagForSvangerskapspenger, opprinneligStillingsprosent);
    });
    const mappedTilretteleggingAvFlerePerioder = tilretteleggingMedVarierendePerioder.map((t) => {
        const opprinneligStillingsprosent = getOpprinneligStillingsprosent(
            t.varierendePerioder,
            t.arbeidsforhold.stillinger,
        );
        return mappedTilretteleggingMedVarierendePerioder(
            t,
            sisteDagForSvangerskapspenger,
            opprinneligStillingsprosent,
        );
    });
    const allePerioder = [
        ...mappedTilretteleggingerMedEnPeriode.flat(1),
        ...mappedTilretteleggingAvFlerePerioder.flat(1),
    ];
    return [...allePerioder].sort(sorterTilretteleggingsperioder);
};

export const getOpprinneligStillingsprosent = (
    allePerioder: PeriodeMedVariasjon[] | undefined,
    stillinger: Stilling[],
) => {
    const sorterePerioder = allePerioder ? [...allePerioder].sort(sorterTilretteleggingsperioder) : undefined;
    const førstePeriodeFom = sorterePerioder && sorterePerioder.length > 0 ? sorterePerioder[0].fom : undefined;
    return førstePeriodeFom ? getTotalStillingsprosentPåSkjæringstidspunktet(stillinger, førstePeriodeFom) : 100;
};
