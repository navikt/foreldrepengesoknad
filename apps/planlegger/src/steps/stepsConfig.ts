import { intlUtils } from '@navikt/fp-common';
import { assertUnreachable } from '@navikt/fp-common/src/common/utils/globalUtil';
import { IntlShape } from 'react-intl';

type OmPlanStepId = 'omPlanleggeren';
type HvemPlanleggerStepId = 'hvemPlanlegger';

type StepIdWithBackHref = HvemPlanleggerStepId;

export type StepId = OmPlanStepId | StepIdWithBackHref;

interface StepConfig {
    id: StepId;
    index: number;
    label: string;
}

const stepConfig = (intl: IntlShape): StepConfig[] => [
    {
        id: 'omPlanleggeren',
        index: 0,
        label: intlUtils(intl, 'om.tittel'),
    },
    {
        id: 'hvemPlanlegger',
        index: 1,
        label: intlUtils(intl, 'hvem.tittel'),
    },
];

export const getPreviousStepHref = (id: StepIdWithBackHref): string => {
    let href;

    switch (id) {
        case 'hvemPlanlegger':
            href = '/hvem-planlegger';
            break;
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i søknaden: ${id}`);
    }

    return href;
};

export default stepConfig;
