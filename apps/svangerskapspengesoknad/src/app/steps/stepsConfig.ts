import { assertUnreachable } from '@navikt/fp-common';
import { Arbeidsforhold } from '@navikt/fp-types';
import { ContextDataType, useContextGetData } from 'app/context/SvpDataContext';
import SøknadRoutes from 'app/routes/routes';
import { egenNæringId } from 'app/types/EgenNæring';
import { frilansId } from 'app/types/Frilans';
import { Inntektsinformasjon } from 'app/types/Inntektsinformasjon';
import Tilrettelegging, { TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import { Utenlandsopphold } from 'app/types/Utenlandsopphold';
import { getAktiveArbeidsforhold, søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';
import { IntlShape } from 'react-intl';
import { getPeriodeSideTittel } from './perioder/perioderStepUtils';
import {
    DelivisTilretteleggingPeriodeType,
    TilretteleggingFormData,
} from './tilrettelegging/tilretteleggingStepFormConfig';
import { getTilretteleggingSideTittel } from './tilrettelegging/tilretteleggingStepUtils';

type BarnetStepId = 'barnet';
type InntektsinformasjonStepId = 'arbeid';
type FrilansStepId = 'frilans';
type NæringStepId = 'næring';
type ArbeidIUtlandetStepId = 'arbeidIUtlandet';
type TilretteleggingStepId = 'tilrettelegging';
type PeriodeStepId = 'periode';
type VelgArbeidStepId = 'velgArbeid';
type SkjemaStepId = 'skjema';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type BoIUtlandetIFortidStepId = 'boIUtlandetIFortid';
type BoIUtlandetIFremtidStepId = 'boIUtlandetIFremtid';
type OppsummeringStepId = 'oppsummering';

type StepIdWithSetBackHref = UtenlandsoppholdStepId | BoIUtlandetIFortidStepId | FrilansStepId;

type StepIdWithComputedBackHref =
    | BoIUtlandetIFremtidStepId
    | InntektsinformasjonStepId
    | NæringStepId
    | ArbeidIUtlandetStepId
    | VelgArbeidStepId
    | SkjemaStepId
    | TilretteleggingStepId
    | PeriodeStepId
    | OppsummeringStepId;

export type StepId = BarnetStepId | StepIdWithSetBackHref | StepIdWithComputedBackHref;

interface StepConfig {
    id: StepId | string;
    index: number;
    label: string;
}

export const useStepConfig = (intl: IntlShape, arbeidsforhold: Arbeidsforhold[]): StepConfig[] => {
    const inntektsinformasjon = useContextGetData(ContextDataType.INNTEKTSINFORMASJON);
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const barn = useContextGetData(ContextDataType.OM_BARNET);
    const utenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD);

    const steps = [
        {
            id: 'barnet',
            index: 0,
            label: intl.formatMessage({ id: 'steps.label.barnet' }),
        },
        {
            id: 'utenlandsopphold',
            index: 1,
            label: intl.formatMessage({ id: 'steps.label.utenlandsopphold' }),
        },
    ] as StepConfig[];

    if (utenlandsopphold?.iNorgeSiste12Mnd === false) {
        steps.push({
            id: 'boIUtlandetIFortid',
            index: steps.length,
            label: intl.formatMessage({ id: 'steps.label.boIUtlandetIFortid' }),
        });
    }
    if (utenlandsopphold?.iNorgeNeste12Mnd === false) {
        steps.push({
            id: 'boIUtlandetIFremtid',
            index: steps.length,
            label: intl.formatMessage({ id: 'steps.label.boIUtlandetIFremtid' }),
        });
    }

    steps.push({
        id: 'arbeid',
        index: steps.length,
        label: intl.formatMessage({ id: 'steps.label.arbeid' }),
    });

    if (inntektsinformasjon?.harJobbetSomFrilans) {
        steps.push({
            id: 'frilans',
            index: steps.length,
            label: intl.formatMessage({ id: 'steps.label.frilans' }),
        });
    }

    if (inntektsinformasjon?.harJobbetSomSelvstendigNæringsdrivende) {
        steps.push({
            id: 'næring',
            index: steps.length,
            label: intl.formatMessage({ id: 'steps.label.næring' }),
        });
    }

    if (inntektsinformasjon?.harHattArbeidIUtlandet) {
        steps.push({
            id: 'arbeidIUtlandet',
            index: steps.length,
            label: intl.formatMessage({ id: 'steps.label.arbeidIUtlandet' }),
        });
    }

    const harKunEtArbeid =
        barn && barn.termindato
            ? søkerHarKunEtAktivtArbeid(
                  barn.termindato,
                  arbeidsforhold,
                  inntektsinformasjon?.harJobbetSomFrilans || false,
                  inntektsinformasjon?.harJobbetSomSelvstendigNæringsdrivende || false,
              )
            : true;

    if (!harKunEtArbeid) {
        steps.push({
            id: 'velgArbeid',
            index: steps.length,
            label: intl.formatMessage({ id: 'steps.label.velgArbeid' }),
        });
    }

    if (tilrettelegginger && tilrettelegginger.length > 0) {
        const erFlereTilrettelegginger = tilrettelegginger.length > 1;
        tilrettelegginger.forEach((tilrettelegging: Tilrettelegging) => {
            const navn = tilrettelegging.arbeidsforhold.navn;
            steps.push({
                id: `skjema-${tilrettelegging.id}`,
                index: steps.length,
                label: erFlereTilrettelegginger
                    ? intl.formatMessage({ id: 'steps.label.skjema.flere' }, { navn })
                    : intl.formatMessage({ id: 'steps.label.skjema.en' }),
            });
            steps.push({
                id: `tilrettelegging-${tilrettelegging.id}`,
                index: steps.length,
                label: getTilretteleggingSideTittel(erFlereTilrettelegginger, intl, navn),
            });
            if (
                tilrettelegging.type === TilretteleggingstypeOptions.DELVIS &&
                tilrettelegging.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
            ) {
                steps.push({
                    id: `periode-${tilrettelegging.id}`,
                    index: steps.length,
                    label: getPeriodeSideTittel(erFlereTilrettelegginger, navn, intl),
                });
            }
        });
    } else {
        steps.push({
            id: 'skjema',
            index: steps.length,
            label: intl.formatMessage({ id: 'steps.label.skjema.en' }),
        });
        steps.push({
            id: 'tilrettelegging',
            index: steps.length,
            label: intl.formatMessage({ id: 'steps.label.tilrettelegging.en' }),
        });
    }

    steps.push({
        id: 'oppsummering',
        index: steps.length,
        label: intl.formatMessage({ id: 'steps.label.oppsummering' }),
    });

    return steps;
};

const getForrigeTilrettelegging = (
    tilretteleggingBehov: Tilrettelegging[],
    currentTilretteleggingId: string | undefined,
): Tilrettelegging | undefined => {
    if (currentTilretteleggingId === undefined && tilretteleggingBehov.length > 0) {
        return tilretteleggingBehov[tilretteleggingBehov.length - 1];
    }
    const forrigeTilretteleggingIndex = tilretteleggingBehov.findIndex((t) => t.id === currentTilretteleggingId) - 1;
    if (forrigeTilretteleggingIndex < 0) {
        return undefined;
    }
    return tilretteleggingBehov[forrigeTilretteleggingIndex];
};

const getNæringRouteIfNæring = (harJobbetSomSelvstendigNæringsdrivende: boolean): SøknadRoutes | undefined => {
    if (harJobbetSomSelvstendigNæringsdrivende) {
        return SøknadRoutes.NÆRING;
    }
    return undefined;
};

const getFrilansRouteIfFrilans = (harJobbetSomFrilans: boolean): SøknadRoutes | undefined => {
    if (harJobbetSomFrilans) {
        return SøknadRoutes.FRILANS;
    }
    return undefined;
};

const getArbeidUtlandRouteIfArbeidUtland = (harHattAnnenInntekt: boolean): SøknadRoutes | undefined => {
    if (harHattAnnenInntekt) {
        return SøknadRoutes.ARBEID_I_UTLANDET;
    }
    return undefined;
};

export const getBackLinkAndIdForOppsummeringSteg = (
    tilrettelegging: Tilrettelegging[],
): { previousRoute: SøknadRoutes; previousTilretteleggingId?: string } => {
    const sisteTilrettelegging = tilrettelegging[tilrettelegging?.length - 1];
    if (
        sisteTilrettelegging.type === TilretteleggingstypeOptions.DELVIS &&
        sisteTilrettelegging.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    ) {
        return { previousRoute: SøknadRoutes.PERIODER, previousTilretteleggingId: sisteTilrettelegging.id };
    }
    return { previousRoute: SøknadRoutes.TILRETTELEGGING, previousTilretteleggingId: sisteTilrettelegging.id };
};

export const getBackLinkForSkjemaSteg = (
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
    inntektsinformasjon: Inntektsinformasjon,
    tilrettelegginger: Tilrettelegging[] | undefined,
    currentTilretteleggingId: string | undefined,
): { previousRoute: SøknadRoutes; previousTilretteleggingId?: string } => {
    if (!tilrettelegginger) {
        return { previousRoute: SøknadRoutes.ARBEID };
    }
    const forrigeTilrettelegging = getForrigeTilrettelegging(tilrettelegginger, currentTilretteleggingId);
    if (forrigeTilrettelegging) {
        if (
            forrigeTilrettelegging.type === TilretteleggingstypeOptions.DELVIS &&
            forrigeTilrettelegging.delvisTilretteleggingPeriodeType ===
                DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
        ) {
            return { previousRoute: SøknadRoutes.PERIODER, previousTilretteleggingId: forrigeTilrettelegging.id };
        }
        return { previousRoute: SøknadRoutes.TILRETTELEGGING, previousTilretteleggingId: forrigeTilrettelegging.id };
    }
    const harKunEtArbeid = søkerHarKunEtAktivtArbeid(
        termindato,
        arbeidsforhold,
        inntektsinformasjon.harJobbetSomFrilans,
        inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
    );
    if (harKunEtArbeid) {
        return { previousRoute: getBackLinkForVelgArbeidSteg(inntektsinformasjon) };
    }
    return { previousRoute: SøknadRoutes.VELG_ARBEID };
};

export const getBackLinkForNæringSteg = (inntektsinformasjon: Inntektsinformasjon | undefined): SøknadRoutes => {
    if (!inntektsinformasjon) {
        return SøknadRoutes.ARBEID;
    }
    return getFrilansRouteIfFrilans(inntektsinformasjon.harJobbetSomFrilans) ?? SøknadRoutes.ARBEID;
};

export const getBackLinkForArbeidIUtlandetSteg = (
    inntektsinformasjon: Inntektsinformasjon | undefined,
): SøknadRoutes => {
    if (!inntektsinformasjon) {
        return SøknadRoutes.ARBEID;
    }
    return (
        getNæringRouteIfNæring(inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende) ??
        getFrilansRouteIfFrilans(inntektsinformasjon.harJobbetSomFrilans) ??
        SøknadRoutes.ARBEID
    );
};

export const getBackLinkForVelgArbeidSteg = (inntektsinformasjon: Inntektsinformasjon | undefined): SøknadRoutes => {
    if (!inntektsinformasjon) {
        return SøknadRoutes.ARBEID;
    }
    return (
        getArbeidUtlandRouteIfArbeidUtland(inntektsinformasjon.harHattArbeidIUtlandet) ??
        getNæringRouteIfNæring(inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende) ??
        getFrilansRouteIfFrilans(inntektsinformasjon.harJobbetSomFrilans) ??
        SøknadRoutes.ARBEID
    );
};

export const getBackLinkForArbeidSteg = (utenlandsopphold: Utenlandsopphold): SøknadRoutes => {
    if (!utenlandsopphold.iNorgeNeste12Mnd) {
        return SøknadRoutes.SKAL_BO_I_UTLANDET;
    }
    if (!utenlandsopphold.iNorgeSiste12Mnd) {
        return SøknadRoutes.HAR_BODD_I_UTLANDET;
    }
    return SøknadRoutes.UTENLANDSOPPHOLD;
};

export const getPreviousStep = (id: StepIdWithSetBackHref): SøknadRoutes => {
    switch (id) {
        case 'utenlandsopphold':
            return SøknadRoutes.BARNET;
        case 'boIUtlandetIFortid':
            return SøknadRoutes.UTENLANDSOPPHOLD;
        case 'frilans':
            return SøknadRoutes.ARBEID;
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i søknaden: ${id}`);
    }
};

export const getPreviousSetStepHref = (id: StepIdWithSetBackHref): SøknadRoutes => {
    let href;
    switch (id) {
        case 'utenlandsopphold':
            href = SøknadRoutes.BARNET;
            break;
        case 'boIUtlandetIFortid':
            href = SøknadRoutes.UTENLANDSOPPHOLD;
            break;
        case 'frilans':
            href = SøknadRoutes.ARBEID;
            break;
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i søknaden: ${id}`);
    }

    return href;
};

export const getNesteTilretteleggingId = (
    tilretteleggingBehov: Tilrettelegging[],
    currentTilretteleggingId: string | undefined,
): string | undefined => {
    if (currentTilretteleggingId === undefined && tilretteleggingBehov.length > 0) {
        return tilretteleggingBehov[0].id;
    }
    const nesteTilretteleggingIndex = tilretteleggingBehov.findIndex((t) => t.id === currentTilretteleggingId) + 1;
    if (nesteTilretteleggingIndex === tilretteleggingBehov.length) {
        return undefined;
    }
    return tilretteleggingBehov[nesteTilretteleggingIndex].id;
};

export const getNextRouteAndTilretteleggingIdForTilretteleggingSteg = (
    values: Partial<TilretteleggingFormData>,
    tilrettelegging: Tilrettelegging[],
    currentTilretteleggingId: string,
): { nextRoute: SøknadRoutes; nextTilretteleggingId?: string } => {
    if (
        values.tilretteleggingType === TilretteleggingstypeOptions.DELVIS &&
        values.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    ) {
        return { nextRoute: SøknadRoutes.PERIODER, nextTilretteleggingId: currentTilretteleggingId };
    }

    const nesteTilretteleggingId = getNesteTilretteleggingId(tilrettelegging, currentTilretteleggingId);
    if (nesteTilretteleggingId) {
        return { nextRoute: SøknadRoutes.SKJEMA, nextTilretteleggingId: nesteTilretteleggingId };
    }
    return { nextRoute: SøknadRoutes.OPPSUMMERING };
};

export const getNextRouteValgAvArbeidEllerSkjema = (
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
    inntektsinformasjon: Inntektsinformasjon,
): { nextRoute: SøknadRoutes; nextTilretteleggingId?: string } => {
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);
    const harKunEtArbeid = søkerHarKunEtAktivtArbeid(
        termindato,
        aktiveArbeidsforhold,
        inntektsinformasjon.harJobbetSomFrilans,
        inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
    );
    if (harKunEtArbeid) {
        if (aktiveArbeidsforhold.length === 0) {
            const frilansEllerNæringId = inntektsinformasjon.harJobbetSomFrilans ? frilansId : egenNæringId;
            return { nextRoute: SøknadRoutes.SKJEMA, nextTilretteleggingId: frilansEllerNæringId };
        } else {
            return { nextRoute: SøknadRoutes.SKJEMA, nextTilretteleggingId: aktiveArbeidsforhold[0].arbeidsgiverId };
        }
    }
    return { nextRoute: SøknadRoutes.VELG_ARBEID };
};

export const getNextRouteForFrilans = (
    inntektsinformasjon: Inntektsinformasjon,
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
): { nextRoute: SøknadRoutes; nextTilretteleggingId?: string } => {
    const nextRoute =
        getNæringRouteIfNæring(inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende) ??
        getArbeidUtlandRouteIfArbeidUtland(inntektsinformasjon.harHattArbeidIUtlandet);
    return nextRoute
        ? { nextRoute }
        : getNextRouteValgAvArbeidEllerSkjema(termindato, arbeidsforhold, inntektsinformasjon);
};

export const getNextRouteForNæring = (
    inntektsinformasjon: Inntektsinformasjon,
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
): { nextRoute: SøknadRoutes; nextTilretteleggingId?: string } => {
    const nextRoute = getArbeidUtlandRouteIfArbeidUtland(inntektsinformasjon.harHattArbeidIUtlandet);
    return nextRoute
        ? { nextRoute }
        : getNextRouteValgAvArbeidEllerSkjema(termindato, arbeidsforhold, inntektsinformasjon);
};
