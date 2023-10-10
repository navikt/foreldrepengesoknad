import { isISODateString } from '@navikt/ds-datepicker';
import { SkjemaelementFeil, intlUtils } from '@navikt/fp-common';
import Tilrettelegging, {
    PeriodeMedVariasjon,
    TilOgMedDatoType,
    TilretteleggingPeriode,
    Tilretteleggingstype,
    TilretteleggingstypeOptions,
} from 'app/types/Tilrettelegging';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { dagenFør, tiMånederSidenDato } from './dateUtils';
import { hasValue } from './validationUtils';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

export const getValgtTilrettelegging = (
    allTilretteleggingOptions: Tilrettelegging[],
    valgtTilrettelegging: string[],
    søker: Søker,
    arbeidsforhold: Arbeidsforhold[],
    termindato: Date,
    intl: IntlShape,
) => {
    const selectedTilrettelegging = allTilretteleggingOptions.filter((o) =>
        valgtTilrettelegging.find((t) => t === o.id)
    );
    return selectedTilrettelegging;
};

export const validateTilrettelagtArbeidFom =
    (intl: IntlShape, sisteDagForSvangerskapspenger: Date, termindato: Date, erBarnetFødt: boolean) =>
    (fom: string): SkjemaelementFeil => {
        if (!hasValue(fom)) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.mangler');
        }
        if (!isISODateString(fom)) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.gyldigDato');
        }

        if (dayjs(fom).isBefore(tiMånederSidenDato(termindato), 'd')) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.tiMndSidenTermin');
        }
        if (dayjs(fom).isAfter(dagenFør(sisteDagForSvangerskapspenger), 'd')) {
            return erBarnetFødt
                ? intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.måVæreMerEnnTreUkerFørFødsel')
                : intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.måVæreMerEnnTreUkerFørTermin');
        }
        if (dayjs(fom).isAfter(dagenFør(termindato), 'd')) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.etterTermin');
        }
        return undefined;
    };

export const validateTilrettelagtArbeidType =
    (intl: IntlShape) =>
    (type: TilretteleggingstypeOptions): SkjemaelementFeil => {
        if (!hasValue(type)) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidType.mangler');
        }
        return undefined;
    };

export const validateTilretteleggingPeriodetype =
    (intl: IntlShape) =>
    (type: TilretteleggingstypeOptions): SkjemaelementFeil => {
        if (!hasValue(type)) {
            return intlUtils(intl, 'valideringsfeil.tilretteleggingPeriodeType.mangler');
        }
        return undefined;
    };

export const sorterPerioderMedVariasjon = (p1: PeriodeMedVariasjon, p2: PeriodeMedVariasjon) => {
    return dayjs(p1.fom).isBefore(p2.fom, 'day') ? -1 : 1;
};

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
        vedlegg: tilrettelegging.vedlegg.map((v) => v.id),
        fom,
        tom,
        stillingsprosent,
        risikofaktorer: tilrettelegging.risikofaktorer,
        tilretteleggingstiltak: tilrettelegging.tilretteleggingstiltak,
    };
};

const mappedTilretteleggingMedEnPeriode = (
    tilrettelegging: Tilrettelegging,
    sisteDagForSvangerskapspenger: Date,
): TilretteleggingPeriode => {
    const stillingsprosent =
        tilrettelegging.type === TilretteleggingstypeOptions.DELVIS
            ? parseInt(tilrettelegging.enPeriodeMedTilretteleggingStillingsprosent!, 10)
            : 0;
    const fom = tilrettelegging.enPeriodeMedTilretteleggingFom!;
    const tom =
        tilrettelegging.enPeriodeMedTilretteleggingTomType === TilOgMedDatoType.VALGFRI_DATO
            ? tilrettelegging.enPeriodeMedTilretteleggingTom!
            : dateToISOString(sisteDagForSvangerskapspenger);
    const type =
        tilrettelegging.type === TilretteleggingstypeOptions.DELVIS
            ? Tilretteleggingstype.DELVIS
            : Tilretteleggingstype.INGEN;
    return mapTilretteleggingTilPeriode(tilrettelegging, type, stillingsprosent, fom, tom);
};

const mappedTilretteleggingMedFlerePerioder = (
    tilrettelegging: Tilrettelegging,
    sisteDagForSvangerskapspenger: Date,
): TilretteleggingPeriode[] => {
    const allePerioder = tilrettelegging.variertePerioder!.map((periode) => {
        const stillingsprosent = parseInt(periode.stillingsprosent, 10);
        let type =
            periode.type === TilretteleggingstypeOptions.DELVIS
                ? Tilretteleggingstype.DELVIS
                : Tilretteleggingstype.INGEN;
        if (stillingsprosent === 0) {
            type = Tilretteleggingstype.INGEN;
        } else if (stillingsprosent === tilrettelegging.arbeidsforhold.opprinneligstillingsprosent) {
            type = Tilretteleggingstype.HEL;
        }
        const tom =
            periode.tomType === TilOgMedDatoType.TRE_UKER_FØR_TERMIN
                ? dateToISOString(sisteDagForSvangerskapspenger)
                : periode.tom!;
        return mapTilretteleggingTilPeriode(tilrettelegging, type, stillingsprosent, periode.fom, tom);
    });
    return allePerioder;
};

export const sorterTilretteleggingsperioder = (p1: TilretteleggingPeriode, p2: TilretteleggingPeriode) => {
    return dayjs(p1.fom).isBefore(p2.fom, 'day') ? -1 : 1;
};

export const mapTilretteleggingTilPerioder = (
    tilrettelegging: Tilrettelegging[],
    sisteDagForSvangerskapspenger: Date,
): TilretteleggingPeriode[] => {
    const tilretteleggingMedEnPeriode = tilrettelegging.filter(
        (t) => !t.variertePerioder || t.variertePerioder.length === 0,
    );
    const tilretteleggingMedVariertePerioder = tilrettelegging.filter(
        (t) => t.variertePerioder && t.variertePerioder.length > 0,
    );
    const mappedTilretteleggingerMedEnPeriode = tilretteleggingMedEnPeriode.map((t) => {
        return mappedTilretteleggingMedEnPeriode(t, sisteDagForSvangerskapspenger);
    });
    const mappedTilretteleggingAvFlerePerioder = tilretteleggingMedVariertePerioder.map((t) => {
        return mappedTilretteleggingMedFlerePerioder(t, sisteDagForSvangerskapspenger);
    });
    const allePerioder = [
        ...mappedTilretteleggingerMedEnPeriode.flat(1),
        ...mappedTilretteleggingAvFlerePerioder.flat(1),
    ];
    const sortertePerioder = allePerioder.sort(sorterTilretteleggingsperioder);
    return sortertePerioder;
};
