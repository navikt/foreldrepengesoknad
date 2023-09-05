import { intlUtils } from '@navikt/fp-common';
import { assertUnreachable } from '@navikt/fp-common/src/common/utils/globalUtils';
import { getForrigeTilretteleggingId } from 'app/routes/SvangerskapspengesøknadRoutes';
import SøknadRoutes from 'app/routes/routes';
import Tilrettelegging from 'app/types/Tilrettelegging';
import { IntlShape } from 'react-intl';

type BarnetStepId = 'barnet';
type InntektsinformasjonStepId = 'arbeid';
type PeriodeStepId = 'periode';
type SkjemaStepId = 'skjema';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type OppsummeringStepId = 'oppsummering';

type StepIdWithBackHref =
    | InntektsinformasjonStepId
    | SkjemaStepId
    | PeriodeStepId
    | UtenlandsoppholdStepId
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
        id: 'skjema',
        index: 3,
        label: intlUtils(intl, 'steps.label.skjema'),
    },
    {
        id: 'periode',
        index: 4,
        label: navn
            ? intlUtils(intl, 'steps.label.periode.flere', { navn })
            : intlUtils(intl, 'steps.label.periode.en'),
    },
    {
        id: 'oppsummering',
        index: 5,
        label: intlUtils(intl, 'steps.label.oppsummering'),
    },
];

const stepConfig = (intl: IntlShape, navn?: string): StepConfig[] => {
    return stepConfigFørstegangssøknad(intl, navn);
};

const getBackLinkTilretteleggingSteg = (
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

export const getPreviousStepHref = (
    id: StepIdWithBackHref,
    tilrettelegginger?: Tilrettelegging[],
    currentTilretteleggingId?: string
): string => {
    let href;

    switch (id) {
        case 'utenlandsopphold':
            href = '/barnet';
            break;
        case 'arbeid':
            href = '/utenlandsopphold';
            break;
        case 'skjema':
            href = '/arbeid';
            break;
        case 'periode':
            href = getBackLinkTilretteleggingSteg(tilrettelegginger, currentTilretteleggingId);
            break;
        case 'oppsummering':
            href = getBackLinkTilretteleggingSteg(tilrettelegginger, currentTilretteleggingId);
            break;
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i søknaden: ${id}`);
    }

    return href;
};

export default stepConfig;
