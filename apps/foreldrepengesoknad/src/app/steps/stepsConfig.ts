import { intlUtils } from '@navikt/fp-common';
import { assertUnreachable } from '@navikt/fp-common/src/common/utils/globalUtil';
import SøknadRoutes from 'app/routes/routes';
import { IntlShape } from 'react-intl';

type SøkersituasjonStepId = 'søkersituasjon';
type OmBarnetStepId = 'omBarnet';
type AnnenForelderId = 'annenForelder';
type UttaksplanInfo = 'uttaksplanInfo';
type Uttaksplan = 'uttaksplan';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type UtenlandsoppholdSenereStepId = 'utenlandsoppholdSenere';
type UtenlandsoppholdTidligereStepId = 'utenlandsoppholdTidligere';
type Inntektsinformasjon = 'inntektsinformasjon';
type OppsummeringStepId = 'oppsummering';

type StepIdWithBackHref =
    | OmBarnetStepId
    | AnnenForelderId
    | UttaksplanInfo
    | Uttaksplan
    | UtenlandsoppholdStepId
    | UtenlandsoppholdSenereStepId
    | UtenlandsoppholdTidligereStepId
    | Inntektsinformasjon
    | OppsummeringStepId;

type StepIdWithBackHrefEndringssøknad = OppsummeringStepId;

export type StepId = SøkersituasjonStepId | StepIdWithBackHref;

interface StepConfig {
    id: StepId;
    index: number;
    label: string;
}
const stepConfigEndringssøknad = (intl: IntlShape): StepConfig[] => [
    {
        id: 'uttaksplan',
        index: 0,
        label: intlUtils(intl, 'steps.label.uttaksplan'),
    },
    {
        id: 'oppsummering',
        index: 1,
        label: intlUtils(intl, 'steps.label.oppsummering'),
    },
];

const stepConfigFørstegangssøknad = (intl: IntlShape): StepConfig[] => [
    {
        id: 'søkersituasjon',
        index: 0,
        label: intlUtils(intl, 'steps.label.søkersituasjon'),
    },
    {
        id: 'omBarnet',
        index: 1,
        label: intlUtils(intl, 'steps.label.omBarnet'),
    },
    {
        id: 'annenForelder',
        index: 2,
        label: intlUtils(intl, 'steps.label.annenForelder'),
    },
    {
        id: 'uttaksplanInfo',
        index: 3,
        label: intlUtils(intl, 'steps.label.uttaksplanInfo'),
    },
    {
        id: 'uttaksplan',
        index: 4,
        label: intlUtils(intl, 'steps.label.uttaksplan'),
    },
    {
        id: 'utenlandsopphold',
        index: 5,
        label: intlUtils(intl, 'steps.label.utenlandsopphold'),
    },
    {
        id: 'utenlandsoppholdTidligere',
        index: 6,
        label: intlUtils(intl, 'steps.label.utenlandsopphold.tidligere'),
    },
    {
        id: 'utenlandsoppholdSenere',
        index: 7,
        label: intlUtils(intl, 'steps.label.utenlandsopphold.senere'),
    },
    {
        id: 'inntektsinformasjon',
        index: 8,
        label: intlUtils(intl, 'steps.label.inntektsinformasjon'),
    },
    {
        id: 'oppsummering',
        index: 9,
        label: intlUtils(intl, 'steps.label.oppsummering'),
    },
];

const stepConfig = (intl: IntlShape, erEndringssøknad: boolean): StepConfig[] => {
    if (erEndringssøknad) {
        return stepConfigEndringssøknad(intl);
    }
    return stepConfigFørstegangssøknad(intl);
};

export const getPreviousStepHrefEndringssøknad = (id: StepIdWithBackHrefEndringssøknad): SøknadRoutes => {
    let href;

    switch (id) {
        case 'oppsummering':
            href = SøknadRoutes.UTTAKSPLAN;
            break;
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i endringssøknaden: ${id}`);
    }

    return href;
};

export const getPreviousStepHref = (id: StepIdWithBackHref): SøknadRoutes => {
    let href;

    switch (id) {
        case 'omBarnet':
            href = SøknadRoutes.SØKERSITUASJON;
            break;
        case 'annenForelder':
            href = SøknadRoutes.OM_BARNET;
            break;
        case 'uttaksplanInfo':
            href = SøknadRoutes.ANNEN_FORELDER;
            break;
        case 'uttaksplan':
            href = SøknadRoutes.UTTAKSPLAN_INFO;
            break;
        case 'utenlandsopphold':
            href = SøknadRoutes.UTTAKSPLAN;
            break;
        case 'utenlandsoppholdTidligere':
            href = SøknadRoutes.UTENLANDSOPPHOLD;
            break;
        case 'utenlandsoppholdSenere':
            href = SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD;
            break;
        case 'inntektsinformasjon':
            href = SøknadRoutes.SENERE_UTENLANDSOPPHOLD;
            break;
        case 'oppsummering':
            href = SøknadRoutes.INNTEKTSINFORMASJON;
            break;
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i søknaden: ${id}`);
    }

    return href;
};

export default stepConfig;
