import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import dayjs, { Dayjs } from 'dayjs';
import { IntlShape } from 'react-intl';
import {
    Arbeidsforholdstype,
    DelvisTilrettelegging,
    IngenTilrettelegging,
    PeriodeMedVariasjon,
    Stilling,
    TilOgMedDatoType,
    TilretteleggingPeriode,
    Tilretteleggingstype,
} from 'types/Tilrettelegging';

import { ISO_DATE_FORMAT, TIDENES_MORGEN } from '@navikt/fp-constants';
import { EGEN_NÆRING_ID } from '@navikt/fp-steg-egen-naering';
import {
    Arbeidsforhold,
    ArbeidsforholdOgInntekt,
    ArbeidsforholdOgInntektSvp,
    FRILANS_ID,
    Frilans,
    NæringDto,
} from '@navikt/fp-types';
import { getFloatFromString } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import {
    getAktiveArbeidsforhold,
    getTotalStillingsprosentPåSkjæringstidspunktet,
    getUnikeArbeidsforhold,
    søkerHarKunEtAktivtArbeid,
} from './arbeidsforholdUtils';

const lagPeriodeMedHelTilretteleggingFremTilSisteSvpDag = (
    tom: string | Dayjs,
    sisteDagForSvangerskapspenger: string,
    opprinneligStillingsprosent: number,
): TilretteleggingPeriode => ({
    type: Tilretteleggingstype.HEL,
    fom: dayjs(tom).add(1, 'd').format(ISO_DATE_FORMAT),
    tom: sisteDagForSvangerskapspenger,
    stillingsprosent: opprinneligStillingsprosent,
});

const finnTilretteleggingstype = (stillingsprosent: number, opprinneligStillingsprosent: number) => {
    if (stillingsprosent === 0) {
        return Tilretteleggingstype.INGEN;
    } else if (opprinneligStillingsprosent === 0 && stillingsprosent === 100) {
        return Tilretteleggingstype.HEL;
    } else if (stillingsprosent === opprinneligStillingsprosent) {
        return Tilretteleggingstype.HEL;
    }
    return Tilretteleggingstype.DELVIS;
};

const sorterTilretteleggingsperioder = (p1: PeriodeMedVariasjon, p2: PeriodeMedVariasjon) => {
    if (dayjs(p1.fom).isBefore(p2.fom, 'day')) {
        return -1;
    }
    if (dayjs(p1.fom).isSame(p2.fom, 'day')) {
        return dayjs(p1.tom).isBefore(p2.tom, 'day') ? -1 : 1;
    }
    return 1;
};

export const mapEnTilretteleggingPeriode = (
    tilrettelegging: DelvisTilrettelegging | IngenTilrettelegging,
    sisteDagForSvangerskapspenger: string,
    stillinger: Stilling[],
): TilretteleggingPeriode[] => {
    const opprinneligStillingsprosent = getTotalStillingsprosentPåSkjæringstidspunktet(
        stillinger,
        tilrettelegging.enPeriodeMedTilretteleggingFom,
    );

    const perioder = new Array<TilretteleggingPeriode>();

    const stillingsprosent =
        tilrettelegging.type === Tilretteleggingstype.DELVIS
            ? getFloatFromString(tilrettelegging.enPeriodeMedTilretteleggingStillingsprosent)
            : 0;

    const fom = notEmpty(tilrettelegging.enPeriodeMedTilretteleggingFom);

    const tom =
        tilrettelegging.enPeriodeMedTilretteleggingTomType === TilOgMedDatoType.VALGFRI_DATO
            ? dayjs(tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato)
                  .subtract(1, 'day')
                  .format(ISO_DATE_FORMAT)
            : sisteDagForSvangerskapspenger;

    const type =
        tilrettelegging.type === Tilretteleggingstype.DELVIS && stillingsprosent && stillingsprosent > 0
            ? Tilretteleggingstype.DELVIS
            : Tilretteleggingstype.INGEN;

    perioder.push({
        type,
        fom,
        tom,
        stillingsprosent,
    });

    if (!dayjs(tom).isSame(sisteDagForSvangerskapspenger, 'day')) {
        perioder.push(
            lagPeriodeMedHelTilretteleggingFremTilSisteSvpDag(
                tom,
                sisteDagForSvangerskapspenger,
                opprinneligStillingsprosent,
            ),
        );
    }

    return perioder;
};

export const mapFlereTilretteleggingPerioder = (
    tilretteleggingerPerioder: PeriodeMedVariasjon[],
    sisteDagForSvangerskapspenger: string,
    stillinger: Stilling[],
): TilretteleggingPeriode[] => {
    const opprinneligStillingsprosent = getOpprinneligStillingsprosent(tilretteleggingerPerioder, stillinger);

    const allePerioder = tilretteleggingerPerioder.map<TilretteleggingPeriode>((periode) => {
        const stillingsprosent = notEmpty(getFloatFromString(periode.stillingsprosent));
        const type = finnTilretteleggingstype(stillingsprosent, opprinneligStillingsprosent);

        const tom =
            periode.tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP
                ? sisteDagForSvangerskapspenger
                : notEmpty(periode.tom);

        return {
            type,
            fom: periode.fom,
            tom,
            stillingsprosent,
        };
    });

    const sisteTom = allePerioder
        .map((p) => dayjs(p.tom))
        .reduce((siste, dato) => (dayjs(siste).isBefore(dato) ? dato : siste), dayjs(TIDENES_MORGEN));

    if (!sisteTom.isSame(sisteDagForSvangerskapspenger, 'day')) {
        allePerioder.push(
            lagPeriodeMedHelTilretteleggingFremTilSisteSvpDag(
                sisteTom,
                sisteDagForSvangerskapspenger,
                opprinneligStillingsprosent,
            ),
        );
    }

    return allePerioder;
};

export const getOpprinneligStillingsprosent = (
    allePerioder: PeriodeMedVariasjon[] | undefined,
    stillinger: Stilling[],
) => {
    const sorterePerioder = allePerioder ? [...allePerioder].sort(sorterTilretteleggingsperioder) : undefined;
    const førstePeriodeFom = sorterePerioder && sorterePerioder.length > 0 ? sorterePerioder[0].fom : undefined;
    return førstePeriodeFom ? getTotalStillingsprosentPåSkjæringstidspunktet(stillinger, førstePeriodeFom) : 100;
};

export const getTilretteleggingId = (
    arbeidsforhold: Arbeidsforhold[],
    termindato: string,
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntekt,
    valgteArbeidsforhold?: string[],
    isSisteTilrettelegging = false,
) => {
    if (valgteArbeidsforhold) {
        return isSisteTilrettelegging ? valgteArbeidsforhold.at(-1)! : valgteArbeidsforhold[0];
    } else if (arbeidsforholdOgInntekt.harJobbetSomFrilans) {
        return FRILANS_ID;
    } else if (arbeidsforholdOgInntekt.harJobbetSomSelvstendigNæringsdrivende) {
        return EGEN_NÆRING_ID;
    }

    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);
    return aktiveArbeidsforhold[0]?.arbeidsgiverId;
};

export const getNesteTilretteleggingId = (
    currentTilretteleggingId?: string,
    valgteArbeidsforhold?: string[],
): string | undefined => {
    if (!valgteArbeidsforhold || valgteArbeidsforhold.length === 0) {
        return undefined;
    }

    if (currentTilretteleggingId === undefined) {
        return valgteArbeidsforhold[0];
    }

    const nesteTilretteleggingIndex = valgteArbeidsforhold.indexOf(currentTilretteleggingId) + 1;
    if (nesteTilretteleggingIndex === valgteArbeidsforhold.length) {
        return undefined;
    }
    return valgteArbeidsforhold[nesteTilretteleggingIndex];
};

export const getArbeidsgiverNavnForTilrettelegging = (
    intl: IntlShape,
    tilretteleggingId: string,
    alleArbeidsforhold: Arbeidsforhold[],
): string => {
    if (tilretteleggingId === EGEN_NÆRING_ID) {
        return intl.formatMessage({ id: 'egenNæring' }).toLowerCase();
    } else if (tilretteleggingId === FRILANS_ID) {
        return '';
    }
    const arbeidsforhold = alleArbeidsforhold.find((a) => a.arbeidsgiverId === tilretteleggingId);
    if (!arbeidsforhold) {
        throw new Error('kunne ikke finne arbeidsforhold');
    }
    return arbeidsforhold.arbeidsgiverNavn;
};

export const getArbeidsgiverStillingerForTilrettelegging = (
    termindato: string,
    tilretteleggingId: string,
    alleArbeidsforhold: Arbeidsforhold[],
    egenNæring?: NæringDto,
    frilans?: Frilans,
): Stilling[] => {
    if (tilretteleggingId === EGEN_NÆRING_ID && egenNæring) {
        return [{ fom: egenNæring.fom, tom: egenNæring.tom, stillingsprosent: 100 }];
    } else if (tilretteleggingId === FRILANS_ID && frilans) {
        return [{ fom: frilans.oppstart, stillingsprosent: 100 }];
    }
    const unikeArbeidsforhold = getUnikeArbeidsforhold(alleArbeidsforhold, termindato);
    const arbeidsforhold = unikeArbeidsforhold.find((a) => a.arbeidsgiverId === tilretteleggingId);
    if (!arbeidsforhold) {
        throw new Error('kunne ikke finne arbeidsforhold');
    }
    return arbeidsforhold.stillinger;
};

export const getTypeArbeidForTilrettelegging = (tilretteleggingId: string, alleArbeidsforhold: Arbeidsforhold[]) => {
    if (tilretteleggingId === EGEN_NÆRING_ID) {
        return Arbeidsforholdstype.SELVSTENDIG;
    } else if (tilretteleggingId === FRILANS_ID) {
        return Arbeidsforholdstype.FRILANSER;
    }
    const arbeidsforhold = alleArbeidsforhold.find((a) => a.arbeidsgiverId === tilretteleggingId);
    if (!arbeidsforhold) {
        throw new Error('kunne ikke finne arbeidsforhold');
    }
    return arbeidsforhold.arbeidsgiverIdType === 'orgnr' ? Arbeidsforholdstype.VIRKSOMHET : Arbeidsforholdstype.PRIVAT;
};

export const getPeriodeForTilrettelegging = (
    termindato: string,
    tilretteleggingId: string,
    alleArbeidsforhold: Arbeidsforhold[],
    egenNæring?: NæringDto,
    frilans?: Frilans,
): { fom: string; tom?: string } => {
    if (tilretteleggingId === EGEN_NÆRING_ID && egenNæring) {
        return { fom: egenNæring.fom, tom: egenNæring.tom };
    } else if (tilretteleggingId === FRILANS_ID && frilans) {
        return { fom: frilans?.oppstart };
    }
    const unikeArbeidsforhold = getUnikeArbeidsforhold(alleArbeidsforhold, termindato);
    const arbeidsforhold = unikeArbeidsforhold.find((a) => a.arbeidsgiverId === tilretteleggingId);
    if (!arbeidsforhold) {
        throw new Error('kunne ikke finne arbeidsforhold');
    }
    return { fom: arbeidsforhold.fom, tom: arbeidsforhold.tom };
};

export const getRuteVelgArbeidEllerSkjema = (
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntektSvp,
): SøknadRoute | string => {
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);
    const harKunEtArbeid = søkerHarKunEtAktivtArbeid(
        termindato,
        aktiveArbeidsforhold,
        arbeidsforholdOgInntekt.harJobbetSomFrilans,
        arbeidsforholdOgInntekt.harJobbetSomSelvstendigNæringsdrivende,
    );
    return harKunEtArbeid
        ? addTilretteleggingIdToRoute(
              SøknadRoute.SKJEMA,
              getTilretteleggingId(aktiveArbeidsforhold, termindato, arbeidsforholdOgInntekt),
          )
        : SøknadRoute.VELG_ARBEID;
};
