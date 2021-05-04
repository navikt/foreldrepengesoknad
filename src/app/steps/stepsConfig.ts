import { assertUnreachable } from 'app/utils/globalUtil';

type SøkersituasjonStepId = 'søkersituasjon';
type OmBarnetStepId = 'omBarnet';
type AnnenForelderId = 'annenForelder';
type UttaksplanInfo = 'uttaksplanInfo';
type Uttaksplan = 'uttaksplan';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type Inntektsinformasjon = 'inntektsinformasjon';
type OppsummeringStepId = 'oppsummering';
type StepIdWithBackHref =
    | OmBarnetStepId
    | AnnenForelderId
    | UttaksplanInfo
    | Uttaksplan
    | UtenlandsoppholdStepId
    | Inntektsinformasjon
    | OppsummeringStepId;

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
    {
        id: 'annenForelder',
        index: 2,
        label: 'Fyll ut informasjon om barnet',
    },
    {
        id: 'uttaksplanInfo',
        index: 3,
        label: 'Fyll ut informasjon om barnet',
    },
    {
        id: 'uttaksplan',
        index: 4,
        label: 'Fyll ut informasjon om barnet',
    },
    {
        id: 'utenlandsopphold',
        index: 5,
        label: 'Fyll ut informasjon om barnet',
    },
    {
        id: 'inntektsinformasjon',
        index: 6,
        label: 'Fyll ut informasjon om barnet',
    },
    {
        id: 'oppsummering',
        index: 6,
        label: 'Fyll ut informasjon om barnet',
    },
];

export const getPreviousStepHref = (id: StepIdWithBackHref): string => {
    let href;
    switch (id) {
        case 'omBarnet':
            href = '/soknad/sokersituasjon';
            break;
        case 'annenForelder':
            href = '/soknad/om-barnet';
            break;
        case 'uttaksplanInfo':
            href = '/soknad/annen-forelder';
            break;
        case 'uttaksplan':
            href = '/soknad/uttaksplan-info';
            break;
        case 'utenlandsopphold':
            href = '/soknad/uttaksplan';
            break;
        case 'inntektsinformasjon':
            href = '/soknad/utenlandsopphold';
            break;
        case 'oppsummering':
            href = '/soknad/inntektsinformasjon';
            break;
        default:
            return assertUnreachable(id);
    }
    return href;
};
export default stepConfig;
