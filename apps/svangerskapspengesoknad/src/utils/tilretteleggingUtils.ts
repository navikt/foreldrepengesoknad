import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import dayjs, { Dayjs } from 'dayjs';
import { IntlShape } from 'react-intl';
import {
    DelvisTilrettelegging,
    IngenTilrettelegging,
    PeriodeMedVariasjon,
    PeriodeMedVariasjonFormValues,
    Stilling,
    TilOgMedDatoType,
} from 'types/Tilrettelegging';

import { ISO_DATE_FORMAT, TIDENES_MORGEN } from '@navikt/fp-constants';
import { EGEN_NÆRING_ID } from '@navikt/fp-steg-egen-naering';
import {
    ArbeidsforholdOgInntekt,
    ArbeidsforholdOgInntektSvp,
    EksternArbeidsforholdDto_fpoversikt,
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
) => ({
    type: 'hel' as const,
    fom: dayjs(tom).add(1, 'd').format(ISO_DATE_FORMAT),
    tom: sisteDagForSvangerskapspenger,
    stillingsprosent: opprinneligStillingsprosent,
});

const finnTilretteleggingstype = (stillingsprosent: number, opprinneligStillingsprosent: number) => {
    if (stillingsprosent === 0) {
        return 'ingen';
    } else if (opprinneligStillingsprosent === 0 && stillingsprosent === 100) {
        return 'hel';
    } else if (stillingsprosent === opprinneligStillingsprosent) {
        return 'hel';
    }
    return 'delvis';
};

const sorterTilretteleggingsperioder = (p1: PeriodeMedVariasjonFormValues, p2: PeriodeMedVariasjonFormValues) => {
    if (dayjs(p1.fom).isBefore(p2.fom, 'day')) {
        return -1;
    }
    if (dayjs(p1.fom).isSame(p2.fom, 'day')) {
        return dayjs(p1.tom).isBefore(p2.tom, 'day') ? -1 : 1;
    }
    return 1;
};

/**
 * Type som tillater å sende med mer data enn backend krever. Dette gjør vi for å gjøre oppsummeringsvisningen enklere.
 * Backend bryr seg blandt annet ikke om "tom" og stillingsprosent er bare relevant for "delvis"-type.
 */
export type UtvidetTilrettelegging = {
    fom: string;
    stillingsprosent: number;
    tom: string;
    type: 'hel' | 'delvis' | 'ingen';
};
export const mapEnTilretteleggingPeriode = (
    tilrettelegging: DelvisTilrettelegging | IngenTilrettelegging,
    sisteDagForSvangerskapspenger: string,
    stillinger: Stilling[],
): UtvidetTilrettelegging[] => {
    const opprinneligStillingsprosent = getTotalStillingsprosentPåSkjæringstidspunktet(
        stillinger,
        tilrettelegging.enPeriodeMedTilretteleggingFom,
    );

    const perioder = [];

    const stillingsprosent =
        tilrettelegging.type === 'delvis'
            ? (getFloatFromString(tilrettelegging.enPeriodeMedTilretteleggingStillingsprosent) ?? 0)
            : 0;

    const fom = notEmpty(tilrettelegging.enPeriodeMedTilretteleggingFom);

    const tom =
        tilrettelegging.enPeriodeMedTilretteleggingTomType === TilOgMedDatoType.VALGFRI_DATO
            ? dayjs(tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato)
                  .subtract(1, 'day')
                  .format(ISO_DATE_FORMAT)
            : sisteDagForSvangerskapspenger;

    const type =
        tilrettelegging.type === 'delvis' && stillingsprosent && stillingsprosent > 0
            ? ('delvis' as const)
            : ('ingen' as const);

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
): UtvidetTilrettelegging[] => {
    const opprinneligStillingsprosent = getOpprinneligStillingsprosent(tilretteleggingerPerioder, stillinger);

    const allePerioder = tilretteleggingerPerioder.map((periode) => {
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
        } as const;
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
    allePerioder: PeriodeMedVariasjonFormValues[],
    stillinger: Stilling[],
) => {
    const sorterePerioder = [...allePerioder].sort(sorterTilretteleggingsperioder);
    const førstePeriodeFom = sorterePerioder.length > 0 ? sorterePerioder[0]!.fom : undefined;
    return førstePeriodeFom ? getTotalStillingsprosentPåSkjæringstidspunktet(stillinger, førstePeriodeFom) : 100;
};

export const getTilretteleggingId = (
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
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
    alleArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
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
    alleArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
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

export const getTypeArbeidForTilrettelegging = (
    tilretteleggingId: string,
    alleArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
) => {
    if (tilretteleggingId === EGEN_NÆRING_ID) {
        return 'selvstendig';
    } else if (tilretteleggingId === FRILANS_ID) {
        return 'frilanser';
    }
    const arbeidsforhold = alleArbeidsforhold.find((a) => a.arbeidsgiverId === tilretteleggingId);
    if (!arbeidsforhold) {
        throw new Error('kunne ikke finne arbeidsforhold');
    }
    return arbeidsforhold.arbeidsgiverIdType === 'orgnr' ? 'virksomhet' : 'privat';
};

export const getPeriodeForTilrettelegging = (
    termindato: string,
    tilretteleggingId: string,
    alleArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
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
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
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
              getTilretteleggingId(aktiveArbeidsforhold, termindato, arbeidsforholdOgInntekt)!,
          )
        : SøknadRoute.VELG_ARBEID;
};
