import { intlUtils } from '@navikt/fp-common';
import { assertUnreachable } from '@navikt/fp-common/src/common/utils/globalUtils';
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

const stepConfigFørstegangssøknad = (intl: IntlShape, _type: string | undefined): StepConfig[] => [
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
    // {
    //     id: 'periode',
    //     index: 4,
    //     label: intlUtils(intl, 'steps.label.periode', { type }),
    // },
    {
        id: 'oppsummering',
        index: 4,
        label: intlUtils(intl, 'steps.label.oppsummering'),
    },
];

const stepConfig = (intl: IntlShape, type?: string): StepConfig[] => {
    return stepConfigFørstegangssøknad(intl, type);
};

export const getPreviousStepHref = (id: StepIdWithBackHref): string => {
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
            href = '/skjema';
            break;
        case 'oppsummering':
            href = '/skjema';
            break;
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i søknaden: ${id}`);
    }

    return href;
};

export default stepConfig;
