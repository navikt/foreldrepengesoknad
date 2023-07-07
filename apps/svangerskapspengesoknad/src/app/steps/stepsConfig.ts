import { intlUtils } from '@navikt/fp-common';
import { assertUnreachable } from '@navikt/fp-common/src/common/utils/globalUtils';
import { IntlShape } from 'react-intl';

type BarnetStepId = 'barnet';
type InntektsinformasjonStepId = 'inntektsinformasjon';
type TilretteleggingStepId = 'tilrettelegging';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type OppsummeringStepId = 'oppsummering';

type StepIdWithBackHref =
    | InntektsinformasjonStepId
    | TilretteleggingStepId
    | UtenlandsoppholdStepId
    | OppsummeringStepId;

export type StepId = BarnetStepId | StepIdWithBackHref;

interface StepConfig {
    id: StepId;
    index: number;
    label: string;
}

const stepConfigFørstegangssøknad = (intl: IntlShape): StepConfig[] => [
    {
        id: 'barnet',
        index: 0,
        label: intlUtils(intl, 'steps.label.barnet'),
    },
    {
        id: 'inntektsinformasjon',
        index: 1,
        label: intlUtils(intl, 'steps.label.inntektsinformasjon'),
    },
    {
        id: 'tilrettelegging',
        index: 2,
        label: intlUtils(intl, 'steps.label.tilrettelegging'),
    },
    {
        id: 'utenlandsopphold',
        index: 3,
        label: intlUtils(intl, 'steps.label.utenlandsopphold'),
    },
    {
        id: 'oppsummering',
        index: 4,
        label: intlUtils(intl, 'steps.label.oppsummering'),
    },
];

const stepConfig = (intl: IntlShape): StepConfig[] => {
    return stepConfigFørstegangssøknad(intl);
};

export const getPreviousStepHref = (id: StepIdWithBackHref): string => {
    let href;

    switch (id) {
        case 'inntektsinformasjon':
            href = '/soknad/barnet';
            break;
        case 'tilrettelegging':
            href = '/soknad/arbeidsforhold';
            break;
        case 'utenlandsopphold':
            href = '/soknad/tilrettelegging';
            break;
        case 'oppsummering':
            href = '/soknad/utenlandsopphold';
            break;
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i søknaden: ${id}`);
    }

    return href;
};

export default stepConfig;
