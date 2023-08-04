import { intlUtils } from '@navikt/fp-common';
import { assertUnreachable } from '@navikt/fp-common/src/common/utils/globalUtils';
import { IntlShape } from 'react-intl';

type BarnetStepId = 'barnet';
type InntektsinformasjonStepId = 'arbeid';
type PeriodeStepId = 'periode';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type OppsummeringStepId = 'oppsummering';

type StepIdWithBackHref = InntektsinformasjonStepId | PeriodeStepId | UtenlandsoppholdStepId | OppsummeringStepId;

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
        id: 'arbeid',
        index: 1,
        label: intlUtils(intl, 'steps.label.arbeid'),
    },
    {
        id: 'utenlandsopphold',
        index: 2,
        label: intlUtils(intl, 'steps.label.utenlandsopphold'),
    },
    {
        id: 'periode',
        index: 3,
        label: intlUtils(intl, 'steps.label.periode'),
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
        case 'arbeid':
            href = '/barnet';
            break;
        case 'utenlandsopphold':
            href = '/arbeid';
            break;
        case 'periode':
            href = '/utenlandsopphold';
            break;
        case 'oppsummering':
            href = '/periode';
            break;
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i søknaden: ${id}`);
    }

    return href;
};

export default stepConfig;
