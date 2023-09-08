import { hasValue, intlUtils } from '@navikt/fp-common';
import { assertUnreachable } from '@navikt/fp-common/src/common/utils/globalUtils';
import { getForrigeTilretteleggingId } from 'app/routes/SvangerskapspengesøknadRoutes';
import SøknadRoutes from 'app/routes/routes';
import { Søker } from 'app/types/Søker';
import Tilrettelegging from 'app/types/Tilrettelegging';
import { IntlShape } from 'react-intl';
import { InntektsinformasjonFormData } from './inntektsinformasjon/inntektsinformasjonFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

type BarnetStepId = 'barnet';
type InntektsinformasjonStepId = 'arbeid';
type FrilansStepId = 'frilans';
type NæringStepId = 'næring';
type ArbeidIUtlandetStepId = 'arbeidIUtlandet';
type PeriodeStepId = 'periode';
type VelgArbeidStepId = 'velgArbeid';
type SkjemaStepId = 'skjema';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type OppsummeringStepId = 'oppsummering';

type StepIdWithBackHref =
    | UtenlandsoppholdStepId
    | InntektsinformasjonStepId
    | FrilansStepId
    | NæringStepId
    | ArbeidIUtlandetStepId
    | SkjemaStepId
    | VelgArbeidStepId
    | PeriodeStepId
    | OppsummeringStepId;

export type StepId = BarnetStepId | StepIdWithBackHref;

interface StepConfig {
    id: StepId;
    index: number;
    label: string;
}

//TODO: må beregne antall steg for periode her og hvilken index oppsummering skal ha.
const stepConfigFørstegangssøknad = (intl: IntlShape, navn: string | undefined): StepConfig[] => [
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
    {
        id: 'arbeid',
        index: 2,
        label: intlUtils(intl, 'steps.label.arbeid'),
    },
    {
        id: 'frilans',
        index: 3,
        label: intlUtils(intl, 'steps.label.frilans'),
    },
    {
        id: 'næring',
        index: 4,
        label: intlUtils(intl, 'steps.label.næring'),
    },
    {
        id: 'arbeidIUtlandet',
        index: 5,
        label: intlUtils(intl, 'steps.label.arbeidIUtlandet'),
    },
    {
        id: 'velgArbeid',
        index: 6,
        label: intlUtils(intl, 'steps.label.velgArbeid'),
    },
    {
        id: 'skjema',
        index: 7,
        label: intlUtils(intl, 'steps.label.skjema'),
    },
    {
        id: 'periode',
        index: 8,
        label: navn
            ? intlUtils(intl, 'steps.label.periode.flere', { navn })
            : intlUtils(intl, 'steps.label.periode.en'),
    },
    {
        id: 'oppsummering',
        index: 9,
        label: intlUtils(intl, 'steps.label.oppsummering'),
    },
];

const stepConfig = (intl: IntlShape, navn?: string): StepConfig[] => {
    return stepConfigFørstegangssøknad(intl, navn);
};

export const getNæringRouteIfNæring = (søker: Søker): SøknadRoutes | undefined => {
    if (søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd) {
        return SøknadRoutes.NÆRING;
    }
    return undefined;
};

export const getFrilansRouteIfFrilans = (søker: Søker): SøknadRoutes | undefined => {
    if (søker.harJobbetSomFrilansSiste10Mnd) {
        return SøknadRoutes.FRILANS;
    }
    return undefined;
};

export const getArbeidUtlandRouteIfArbeidUtland = (søker: Søker): SøknadRoutes | undefined => {
    if (søker.harHattAnnenInntektSiste10Mnd) {
        return SøknadRoutes.ARBEID_I_UTLANDET;
    }
    return undefined;
};

const getBackLinkTilretteleggingEllerSkjemaSteg = (
    tilrettelegginger: Tilrettelegging[] | undefined,
    currentTilretteleggingId: string | undefined
) => {
    if (!tilrettelegginger) {
        return SøknadRoutes.ARBEID;
    }
    const forrigeTilrettelegging = getForrigeTilretteleggingId(tilrettelegginger, currentTilretteleggingId);
    if (forrigeTilrettelegging) {
        return `${SøknadRoutes.PERIODE}/${forrigeTilrettelegging}`;
    }
    return SøknadRoutes.SKJEMA;
};

const getBackLinkForNæringSteg = (søker: Søker | undefined) => {
    if (!søker) {
        return SøknadRoutes.ARBEID;
    }
    return getFrilansRouteIfFrilans(søker) || SøknadRoutes.ARBEID;
};

const getBackLinkForArbeidIUtlandetSteg = (søker: Søker | undefined) => {
    if (!søker) {
        return SøknadRoutes.ARBEID;
    }
    return getNæringRouteIfNæring(søker) || getFrilansRouteIfFrilans(søker) || SøknadRoutes.ARBEID;
};

const getBackLinkForVelgArbeidSteg = (søker: Søker | undefined) => {
    if (!søker) {
        return SøknadRoutes.ARBEID;
    }
    return (
        getArbeidUtlandRouteIfArbeidUtland(søker) ||
        getNæringRouteIfNæring(søker) ||
        getFrilansRouteIfFrilans(søker) ||
        SøknadRoutes.ARBEID
    );
};

export const getPreviousStepHref = (
    id: StepIdWithBackHref,
    søker?: Søker,
    tilrettelegginger?: Tilrettelegging[],
    currentTilretteleggingId?: string
): string => {
    let href;
    switch (id) {
        case 'utenlandsopphold':
            href = SøknadRoutes.BARNET;
            break;
        case 'arbeid':
            href = SøknadRoutes.UTENLANDSOPPHOLD;
            break;
        case 'frilans':
            href = SøknadRoutes.ARBEID;
            break;
        case 'næring':
            href = getBackLinkForNæringSteg(søker);
            break;
        case 'arbeidIUtlandet':
            href = getBackLinkForArbeidIUtlandetSteg(søker);
            break;
        case 'velgArbeid':
            href = getBackLinkForVelgArbeidSteg(søker);
            break;
        case 'skjema':
            href = SøknadRoutes.VELG_ARBEID;
            break;
        case 'periode':
            href = getBackLinkTilretteleggingEllerSkjemaSteg(tilrettelegginger, currentTilretteleggingId);
            break;
        case 'oppsummering':
            href = getBackLinkTilretteleggingEllerSkjemaSteg(tilrettelegginger, currentTilretteleggingId);
            break;
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i søknaden: ${id}`);
    }

    return href;
};

export default stepConfig;

export const getNextRouteForInntektsinformasjon = (values: Partial<InntektsinformasjonFormData>) => {
    if (hasValue(values.hattInntektSomFrilans) && values.hattInntektSomFrilans === YesOrNo.YES) {
        return SøknadRoutes.FRILANS;
    }
    if (hasValue(values.hattInntektSomNæringsdrivende) && values.hattInntektSomNæringsdrivende === YesOrNo.YES) {
        return SøknadRoutes.NÆRING;
    }
    if (hasValue(values.hattArbeidIUtlandet) && values.hattArbeidIUtlandet === YesOrNo.YES) {
        return SøknadRoutes.ARBEID_I_UTLANDET;
    }
    return SøknadRoutes.VELG_ARBEID;
};

export const getNextRouteForFrilans = (søker: Søker) => {
    return getNæringRouteIfNæring(søker) || getArbeidUtlandRouteIfArbeidUtland(søker) || SøknadRoutes.VELG_ARBEID;
};

export const getNextRouteForNæring = (søker: Søker) => {
    return getArbeidUtlandRouteIfArbeidUtland(søker) || SøknadRoutes.VELG_ARBEID;
};
