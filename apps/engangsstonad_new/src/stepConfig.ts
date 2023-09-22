type SøkersituasjonStepId = 'søkersituasjon';
type OmBarnetStepId = 'omBarnet';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type NesteUtenlandsoppholdStepId = 'nesteUtenlandsopphold';
type SisteUtenlandsoppholdStepId = 'sisteUtenlandsopphold';
type OppsummeringStepId = 'oppsummering';
type StepIdWithBackHref =
    | SøkersituasjonStepId
    | OmBarnetStepId
    | UtenlandsoppholdStepId
    | NesteUtenlandsoppholdStepId
    | SisteUtenlandsoppholdStepId
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
        id: 'nesteUtenlandsopphold',
        index: 3,
        label: 'Skal bo i utlandet',
    },
    {
        id: 'sisteUtenlandsopphold',
        index: 4,
        label: 'Har bodd i utlandet',
    },
    {
        id: 'oppsummering',
        index: 5,
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
        case 'sisteUtenlandsopphold':
            href = '/soknad/siste-utenlandsopphold';
            break;
        case 'nesteUtenlandsopphold':
            href = '/soknad/neste-utenlandsopphold';
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
