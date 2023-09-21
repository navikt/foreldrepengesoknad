type SøkersituasjonStepId = 'søkersituasjon';
type OmBarnetStepId = 'omBarnet';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type UtenlandsoppholdFremtidigStepId = 'utenlandsoppholdFremtidig';
type OppsummeringStepId = 'oppsummering';
type StepIdWithBackHref =
    | SøkersituasjonStepId
    | OmBarnetStepId
    | UtenlandsoppholdStepId
    | UtenlandsoppholdFremtidigStepId
    | OppsummeringStepId;
export type StepId = SøkersituasjonStepId | StepIdWithBackHref;
interface StepConfig {
    id: StepId;
    index: number;
    label: string;
}

//TODO (TOR) Kvifor er label her hardkoda?
const stepConfig: StepConfig[] = [
    {
        id: 'søkersituasjon',
        index: 0,
        label: 'Din situasjon',
    },
    {
        id: 'omBarnet',
        index: 1,
        label: 'Barnet',
    },
    {
        id: 'utenlandsopphold',
        index: 2,
        label: 'Utenlandsopphold',
    },
    {
        id: 'utenlandsoppholdFremtidig',
        index: 3,
        label: 'Skal bo i utlandet',
    },
    {
        id: 'oppsummering',
        index: 4,
        label: 'Oppsummering',
    },
];
export const getPreviousStepHref = (id: StepIdWithBackHref): string => {
    let href;
    switch (id) {
        case 'søkersituasjon':
            href = '/';
            break;
        case 'omBarnet':
            href = '/soknad/søkersituasjon';
            break;
        case 'utenlandsopphold':
            href = '/soknad/om-barnet';
            break;
        case 'utenlandsoppholdFremtidig':
            href = '/soknad/utenlandsopphold';
            break;
        case 'oppsummering':
            href = '/soknad/utenlandsopphold';
            break;
        default:
            throw new Error('Unreachable code');
    }
    return href;
};

export default stepConfig;
