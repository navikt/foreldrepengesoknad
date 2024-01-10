import { assertUnreachable, intlUtils } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import { Søker } from 'app/types/Søker';
import Tilrettelegging, { TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import { IntlShape } from 'react-intl';
import { InntektsinformasjonFormData } from './inntektsinformasjon/inntektsinformasjonFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { getAktiveArbeidsforhold, søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';
import InformasjonOmUtenlandsopphold, { Opphold } from 'app/types/InformasjonOmUtenlandsopphold';
import {
    DelivisTilretteleggingPeriodeType,
    TilretteleggingFormData,
} from './tilrettelegging/tilretteleggingStepFormConfig';
import { hasValue } from 'app/utils/validationUtils';
import { frilansId } from 'app/types/Frilans';
import { egenNæringId } from 'app/types/EgenNæring';
import { getPeriodeSideTittel } from './perioder/perioderStepUtils';
import { getTilretteleggingSideTittel } from './tilrettelegging/tilretteleggingStepUtils';
import { Utenlandsopphold } from '@navikt/fp-types';
import { ContextDataType, useContextGetData } from 'app/context/SvpDataContext';

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

export const useStepConfig = (intl: IntlShape, arbeidsforhold: Arbeidsforhold[]) => {
    const søker = useContextGetData(ContextDataType.SØKER);
    const tilrettelegging = useContextGetData(ContextDataType.TILRETTELEGGING);
    const barn = useContextGetData(ContextDataType.OM_BARNET);
    const utenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD);

    const steps = [
        {
            id: 'barnet',
            index: 0,
            label: intlUtils(intl, 'steps.label.barnet'),
        },
        {
            id: 'utenlandsopphold',
            index: 1,
            label: intlUtils(intl, 'steps.label.utenlandsopphold'),
        },
    ] as StepConfig[];

    if (utenlandsopphold?.iNorgeSiste12Mnd === false) {
        steps.push({
            id: 'boIUtlandetIFortid',
            index: steps.length,
            label: intlUtils(intl, 'steps.label.boIUtlandetIFortid'),
        });
    }
    if (utenlandsopphold?.iNorgeNeste12Mnd === false) {
        steps.push({
            id: 'boIUtlandetIFremtid',
            index: steps.length,
            label: intlUtils(intl, 'steps.label.boIUtlandetIFremtid'),
        });
    }

    steps.push({
        id: 'arbeid',
        index: steps.length,
        label: intlUtils(intl, 'steps.label.arbeid'),
    });

    if (søker?.harJobbetSomFrilans) {
        steps.push({
            id: 'frilans',
            index: steps.length,
            label: intlUtils(intl, 'steps.label.frilans'),
        });
    }

    if (søker?.harJobbetSomSelvstendigNæringsdrivende) {
        steps.push({
            id: 'næring',
            index: steps.length,
            label: intlUtils(intl, 'steps.label.næring'),
        });
    }

    if (søker?.harHattAnnenInntekt) {
        steps.push({
            id: 'arbeidIUtlandet',
            index: steps.length,
            label: intlUtils(intl, 'steps.label.arbeidIUtlandet'),
        });
    }

    const harKunEtArbeid =
        barn && barn.termindato
            ? søkerHarKunEtAktivtArbeid(
                  barn.termindato,
                  arbeidsforhold,
                  søker?.harJobbetSomFrilans || false,
                  søker?.harJobbetSomSelvstendigNæringsdrivende || false,
              )
            : true;

    if (!harKunEtArbeid) {
        steps.push({
            id: 'velgArbeid',
            index: steps.length,
            label: intlUtils(intl, 'steps.label.velgArbeid'),
        });
    }

    if (tilrettelegging && tilrettelegging.length > 0) {
        const erFlereTilrettelegginger = tilrettelegging.length > 1;
        tilrettelegging.forEach((tilrettelegging: Tilrettelegging) => {
            const navn = tilrettelegging.arbeidsforhold.navn;
            steps.push({
                id: `skjema-${tilrettelegging.id}`,
                index: steps.length,
                label: erFlereTilrettelegginger
                    ? intlUtils(intl, 'steps.label.skjema.flere', { navn })
                    : intlUtils(intl, 'steps.label.skjema.en'),
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
            label: intlUtils(intl, 'steps.label.skjema.en'),
        });
        steps.push({
            id: 'tilrettelegging',
            index: steps.length,
            label: intlUtils(intl, 'steps.label.tilrettelegging.en'),
        });
    }

    steps.push({
        id: 'oppsummering',
        index: steps.length,
        label: intlUtils(intl, 'steps.label.oppsummering'),
    });

    return steps;
};

const getForrigeTilrettelegging = (
    tilretteleggingBehov: Tilrettelegging[],
    currentTilretteleggingId: string | undefined,
) => {
    if (currentTilretteleggingId === undefined && tilretteleggingBehov.length > 0) {
        return tilretteleggingBehov[tilretteleggingBehov.length - 1];
    }
    const forrigeTilretteleggingIndex = tilretteleggingBehov.findIndex((t) => t.id === currentTilretteleggingId) - 1;
    if (forrigeTilretteleggingIndex < 0) {
        return undefined;
    }
    return tilretteleggingBehov[forrigeTilretteleggingIndex];
};

export const getNæringRouteIfNæring = (søker: Søker): SøknadRoutes | undefined => {
    if (søker.harJobbetSomSelvstendigNæringsdrivende) {
        return SøknadRoutes.NÆRING;
    }
    return undefined;
};

export const getFrilansRouteIfFrilans = (søker: Søker): SøknadRoutes | undefined => {
    if (søker.harJobbetSomFrilans) {
        return SøknadRoutes.FRILANS;
    }
    return undefined;
};

export const getArbeidUtlandRouteIfArbeidUtland = (søker: Søker): SøknadRoutes | undefined => {
    if (søker.harHattAnnenInntekt) {
        return SøknadRoutes.ARBEID_I_UTLANDET;
    }
    return undefined;
};

export const getBackLinkForTilretteleggingSteg = (currentTilretteleggingId: string | undefined) => {
    return `${SøknadRoutes.SKJEMA}/${currentTilretteleggingId}`;
};

export const getBackLinkForOppsummeringSteg = (tilrettelegging: Tilrettelegging[]) => {
    const sisteTilrettelegging = tilrettelegging[tilrettelegging?.length - 1];
    if (
        sisteTilrettelegging.type === TilretteleggingstypeOptions.DELVIS &&
        sisteTilrettelegging.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    ) {
        return `${SøknadRoutes.PERIODER}/${sisteTilrettelegging.id}`;
    }
    return `${SøknadRoutes.TILRETTELEGGING}/${sisteTilrettelegging.id}`;
};

export const getBackLinkForSkjemaSteg = (
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
    søker: Søker,
    tilrettelegginger: Tilrettelegging[] | undefined,
    currentTilretteleggingId: string | undefined,
) => {
    if (!tilrettelegginger) {
        return SøknadRoutes.ARBEID;
    }
    const forrigeTilrettelegging = getForrigeTilrettelegging(tilrettelegginger, currentTilretteleggingId);
    if (forrigeTilrettelegging) {
        if (
            forrigeTilrettelegging.type === TilretteleggingstypeOptions.DELVIS &&
            forrigeTilrettelegging.delvisTilretteleggingPeriodeType ===
                DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
        ) {
            return `${SøknadRoutes.PERIODER}/${forrigeTilrettelegging.id}`;
        }
        return `${SøknadRoutes.TILRETTELEGGING}/${forrigeTilrettelegging.id}`;
    }
    const harKunEtArbeid = søkerHarKunEtAktivtArbeid(
        termindato,
        arbeidsforhold,
        søker.harJobbetSomFrilans,
        søker.harJobbetSomSelvstendigNæringsdrivende,
    );
    if (harKunEtArbeid) {
        return getBackLinkForVelgArbeidSteg(søker);
    }
    return SøknadRoutes.VELG_ARBEID;
};

export const getBackLinkPerioderSteg = (currentTilretteleggingId: string | undefined) => {
    return `${SøknadRoutes.TILRETTELEGGING}/${currentTilretteleggingId}`;
};

export const getBackLinkForNæringSteg = (søker: Søker | undefined) => {
    if (!søker) {
        return SøknadRoutes.ARBEID;
    }
    return getFrilansRouteIfFrilans(søker) ?? SøknadRoutes.ARBEID;
};

export const getBackLinkForArbeidIUtlandetSteg = (søker: Søker | undefined) => {
    if (!søker) {
        return SøknadRoutes.ARBEID;
    }
    return getNæringRouteIfNæring(søker) ?? getFrilansRouteIfFrilans(søker) ?? SøknadRoutes.ARBEID;
};

export const getBackLinkForVelgArbeidSteg = (søker: Søker | undefined) => {
    if (!søker) {
        return SøknadRoutes.ARBEID;
    }
    return (
        getArbeidUtlandRouteIfArbeidUtland(søker) ??
        getNæringRouteIfNæring(søker) ??
        getFrilansRouteIfFrilans(søker) ??
        SøknadRoutes.ARBEID
    );
};

export const getBackLinkForBostedIFremtid = (informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold) => {
    if (!informasjonOmUtenlandsopphold.iNorgeSiste12Mnd) {
        return SøknadRoutes.HAR_BODD_I_UTLANDET;
    }
    return SøknadRoutes.UTENLANDSOPPHOLD;
};

export const getBackLinkForArbeidSteg = (informasjonOmUtenlandsopphold: Opphold) => {
    if (!informasjonOmUtenlandsopphold.iNorgeNeste12Mnd) {
        return SøknadRoutes.SKAL_BO_I_UTLANDET;
    }
    if (!informasjonOmUtenlandsopphold.iNorgeSiste12Mnd) {
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

export const getPreviousSetStepHref = (id: StepIdWithSetBackHref): string => {
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
) => {
    if (currentTilretteleggingId === undefined && tilretteleggingBehov.length > 0) {
        return tilretteleggingBehov[0].id;
    }
    const nesteTilretteleggingIndex = tilretteleggingBehov.findIndex((t) => t.id === currentTilretteleggingId) + 1;
    if (nesteTilretteleggingIndex === tilretteleggingBehov.length) {
        return undefined;
    }
    return tilretteleggingBehov[nesteTilretteleggingIndex].id;
};

export const getNextRouteForTilretteleggingSteg = (
    values: Partial<TilretteleggingFormData>,
    tilrettelegging: Tilrettelegging[],
    currentTilretteleggingId: string,
): string => {
    const nesteTilretteleggingId = getNesteTilretteleggingId(tilrettelegging, currentTilretteleggingId);

    let nextRoute = SøknadRoutes.OPPSUMMERING.toString();
    if (
        values.tilretteleggingType === TilretteleggingstypeOptions.DELVIS &&
        values.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    ) {
        nextRoute = `${SøknadRoutes.PERIODER}/${currentTilretteleggingId}`;
    } else if (nesteTilretteleggingId) {
        nextRoute = `${SøknadRoutes.SKJEMA}/${nesteTilretteleggingId}`;
    }
    return nextRoute;
};

export const getNextRouteForInntektsinformasjon = (
    automatiskValgtTilrettelegging: Tilrettelegging | undefined,
    values: Partial<InntektsinformasjonFormData>,
): string => {
    if (hasValue(values.hattInntektSomFrilans) && values.hattInntektSomFrilans === YesOrNo.YES) {
        return SøknadRoutes.FRILANS;
    }
    if (hasValue(values.hattInntektSomNæringsdrivende) && values.hattInntektSomNæringsdrivende === YesOrNo.YES) {
        return SøknadRoutes.NÆRING;
    }
    if (hasValue(values.hattArbeidIUtlandet) && values.hattArbeidIUtlandet === YesOrNo.YES) {
        return SøknadRoutes.ARBEID_I_UTLANDET;
    }
    if (automatiskValgtTilrettelegging) {
        return `${SøknadRoutes.SKJEMA}/${automatiskValgtTilrettelegging.id}`;
    }
    return SøknadRoutes.VELG_ARBEID;
};

export const getNextRouteForUtenlandsopphold = (values: Utenlandsopphold) => {
    if (values.harBoddUtenforNorgeSiste12Mnd) {
        return SøknadRoutes.HAR_BODD_I_UTLANDET;
    } else if (values.skalBoUtenforNorgeNeste12Mnd) {
        return SøknadRoutes.SKAL_BO_I_UTLANDET;
    }
    return SøknadRoutes.ARBEID;
};

export const getNextRouteForBostedIFortid = (informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold) => {
    if (!informasjonOmUtenlandsopphold.iNorgeNeste12Mnd) {
        return SøknadRoutes.SKAL_BO_I_UTLANDET;
    }
    return SøknadRoutes.ARBEID;
};

export const getNextRouteValgAvArbeidEllerSkjema = (
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
    søker: Søker,
) => {
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);
    const harKunEtArbeid = søkerHarKunEtAktivtArbeid(
        termindato,
        aktiveArbeidsforhold,
        søker.harJobbetSomFrilans,
        søker.harJobbetSomSelvstendigNæringsdrivende,
    );
    if (harKunEtArbeid) {
        if (aktiveArbeidsforhold.length === 0) {
            const frilansEllerNæringId = søker.harJobbetSomFrilans ? frilansId : egenNæringId;
            return `${SøknadRoutes.SKJEMA}/${frilansEllerNæringId}`;
        } else {
            return `${SøknadRoutes.SKJEMA}/${arbeidsforhold[0].id}`;
        }
    }
    return SøknadRoutes.VELG_ARBEID;
};

export const getNextRouteForFrilans = (søker: Søker, termindato: string, arbeidsforhold: Arbeidsforhold[]) => {
    return (
        getNæringRouteIfNæring(søker) ??
        getArbeidUtlandRouteIfArbeidUtland(søker) ??
        getNextRouteValgAvArbeidEllerSkjema(termindato, arbeidsforhold, søker)
    );
};

export const getNextRouteForNæring = (søker: Søker, termindato: string, arbeidsforhold: Arbeidsforhold[]) => {
    return (
        getArbeidUtlandRouteIfArbeidUtland(søker) ??
        getNextRouteValgAvArbeidEllerSkjema(termindato, arbeidsforhold, søker)
    );
};
