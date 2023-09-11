import { hasValue, intlUtils } from '@navikt/fp-common';
import { assertUnreachable } from '@navikt/fp-common/src/common/utils/globalUtils';
import { getForrigeTilretteleggingId } from 'app/routes/SvangerskapspengesøknadRoutes';
import SøknadRoutes from 'app/routes/routes';
import { Søker } from 'app/types/Søker';
import Tilrettelegging from 'app/types/Tilrettelegging';
import { IntlShape } from 'react-intl';
import { InntektsinformasjonFormData } from './inntektsinformasjon/inntektsinformasjonFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { søkerHarKunEtArbeid } from 'app/utils/arbeidsforholdUtils';
import { convertYesOrNoOrUndefinedToBoolean } from '@navikt/fp-common/src/common/utils/formUtils';

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

type StepIdWithSetBackHref = UtenlandsoppholdStepId | InntektsinformasjonStepId | FrilansStepId;

type StepIdWithComputedBackHref =
    | NæringStepId
    | ArbeidIUtlandetStepId
    | VelgArbeidStepId
    | SkjemaStepId
    | PeriodeStepId
    | OppsummeringStepId;

export type StepId = BarnetStepId | StepIdWithSetBackHref | StepIdWithComputedBackHref;

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
export const getBackLinkForSkjemaSteg = (søker: Søker, termindato: Date, arbeidsforhold: Arbeidsforhold[]) => {
    const harKunEtArbeid = søkerHarKunEtArbeid(
        termindato,
        arbeidsforhold,
        søker.harJobbetSomFrilans,
        søker.harJobbetSomSelvstendigNæringsdrivende
    );
    if (harKunEtArbeid) {
        return getBackLinkForVelgArbeidSteg(søker);
    }
    return SøknadRoutes.VELG_ARBEID;
};

export const getBackLinkTilretteleggingEllerSkjemaSteg = (
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

export const getBackLinkForNæringSteg = (søker: Søker | undefined) => {
    if (!søker) {
        return SøknadRoutes.ARBEID;
    }
    return getFrilansRouteIfFrilans(søker) || SøknadRoutes.ARBEID;
};

export const getBackLinkForArbeidIUtlandetSteg = (søker: Søker | undefined) => {
    if (!søker) {
        return SøknadRoutes.ARBEID;
    }
    return getNæringRouteIfNæring(søker) || getFrilansRouteIfFrilans(søker) || SøknadRoutes.ARBEID;
};

export const getBackLinkForVelgArbeidSteg = (søker: Søker | undefined) => {
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

export const getPreviousSetStepHref = (id: StepIdWithSetBackHref): string => {
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
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i søknaden: ${id}`);
    }

    return href;
};

export default stepConfig;

export const getNextRouteForInntektsinformasjon = (
    termindato: Date,
    values: Partial<InntektsinformasjonFormData>,
    arbeidsforhold: Arbeidsforhold[]
) => {
    if (hasValue(values.hattInntektSomFrilans) && values.hattInntektSomFrilans === YesOrNo.YES) {
        return SøknadRoutes.FRILANS;
    }
    if (hasValue(values.hattInntektSomNæringsdrivende) && values.hattInntektSomNæringsdrivende === YesOrNo.YES) {
        return SøknadRoutes.NÆRING;
    }
    if (hasValue(values.hattArbeidIUtlandet) && values.hattArbeidIUtlandet === YesOrNo.YES) {
        return SøknadRoutes.ARBEID_I_UTLANDET;
    }
    const søkerHarEtAktivtArbeid = søkerHarKunEtArbeid(
        termindato,
        arbeidsforhold,
        !!convertYesOrNoOrUndefinedToBoolean(values.hattInntektSomFrilans),
        !!convertYesOrNoOrUndefinedToBoolean(values.hattInntektSomNæringsdrivende)
    );
    if (søkerHarEtAktivtArbeid) {
        return SøknadRoutes.SKJEMA;
    }
    return SøknadRoutes.VELG_ARBEID;
};

export const getVelgArbeidEllerSkjemaRoute = (termindato: Date, arbeidsforhold: Arbeidsforhold[], søker: Søker) => {
    const harKunEtArbeid = søkerHarKunEtArbeid(
        termindato,
        arbeidsforhold,
        søker.harJobbetSomFrilans,
        søker.harJobbetSomSelvstendigNæringsdrivende
    );
    if (harKunEtArbeid) {
        return SøknadRoutes.SKJEMA;
    }
    return SøknadRoutes.VELG_ARBEID;
};

export const getNextRouteForFrilans = (søker: Søker, termindato: Date, arbeidsforhold: Arbeidsforhold[]) => {
    return (
        getNæringRouteIfNæring(søker) ||
        getArbeidUtlandRouteIfArbeidUtland(søker) ||
        getVelgArbeidEllerSkjemaRoute(termindato, arbeidsforhold, søker)
    );
};

export const getNextRouteForNæring = (søker: Søker, termindato: Date, arbeidsforhold: Arbeidsforhold[]) => {
    return (
        getArbeidUtlandRouteIfArbeidUtland(søker) || getVelgArbeidEllerSkjemaRoute(termindato, arbeidsforhold, søker)
    );
};
