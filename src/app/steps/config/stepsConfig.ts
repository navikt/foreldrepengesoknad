import { assertUnreachable } from 'app/utils/globalUtil';

type SøkersituasjonStepId = 'søkersituasjon';
type OmBarnetStepId = 'omBarnet';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type OppsummeringStepId = 'oppsummering';
type StepIdWithBackHref = OmBarnetStepId | UtenlandsoppholdStepId | OppsummeringStepId;

export type StepId = SøkersituasjonStepId | StepIdWithBackHref;

interface StepConfig {
    id: StepId;
    index: number;
    label: string;
}

const stepConfig: StepConfig[] = [
    {
        id: 'søkersituasjon',
        index: 0,
        label: 'Fyll ut informasjon om barnet',
    },
    {
        id: 'omBarnet',
        index: 1,
        label: 'Fyll ut informasjon om barnet',
    },
];

export const getPreviousStepHref = (id: StepIdWithBackHref): string => {
    let href;
    switch (id) {
        case 'omBarnet':
            href = '/soknad/sokersituasjon';
            break;
        case 'utenlandsopphold':
            href = '/soknad/om-barnet';
            break;
        case 'oppsummering':
            href = '/soknad/utenlandsopphold';
            break;
        default:
            return assertUnreachable(id);
    }
    return href;
};
export default stepConfig;
