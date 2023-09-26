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
export type StepId = StepIdWithBackHref;
interface StepConfig {
    id: StepId;
    index: number;
    label: string;
}

//TODO (TOR) Rekkefølgen her blir ikkje alltid rett grunna implementasjon i Step. Bør fjerna denne fila og heller laga ein ny tellar-mekanisme
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

export default stepConfig;
