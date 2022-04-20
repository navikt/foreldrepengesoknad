import { intlUtils } from '@navikt/fp-common';
import { assertUnreachable } from 'app/utils/globalUtil';
import { IntlShape } from 'react-intl';

type SøkersituasjonStepId = 'søkersituasjon';
type OmBarnetStepId = 'omBarnet';
type AnnenForelderId = 'annenForelder';
type UttaksplanInfo = 'uttaksplanInfo';
type Uttaksplan = 'uttaksplan';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type Inntektsinformasjon = 'inntektsinformasjon';
type PåkrevdDokumentasjonStepId = 'dokumentasjon';
type OppsummeringStepId = 'oppsummering';

type StepIdWithBackHref =
    | OmBarnetStepId
    | AnnenForelderId
    | UttaksplanInfo
    | Uttaksplan
    | UtenlandsoppholdStepId
    | Inntektsinformasjon
    | PåkrevdDokumentasjonStepId
    | OppsummeringStepId;

type StepIdWithBackHrefEndringssøknad = PåkrevdDokumentasjonStepId | OppsummeringStepId;

export type StepId = SøkersituasjonStepId | StepIdWithBackHref;

interface StepConfig {
    id: StepId;
    index: number;
    label: string;
}

const stepConfig = (intl: IntlShape): StepConfig[] => [
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
        id: 'inntektsinformasjon',
        index: 6,
        label: intlUtils(intl, 'steps.label.inntektsinformasjon'),
    },
    {
        id: 'dokumentasjon',
        index: 7,
        label: intlUtils(intl, 'steps.label.dokumentasjon'),
    },
    {
        id: 'oppsummering',
        index: 8,
        label: intlUtils(intl, 'steps.label.oppsummering'),
    },
];

export const getPreviousStepHrefEndringssøknad = (id: StepIdWithBackHrefEndringssøknad): string => {
    let href;

    switch (id) {
        case 'dokumentasjon':
            href = '/soknad/dokumentasjon';
            break;
        case 'oppsummering':
            href = '/soknad/uttaksplan';
            break;
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i endringssøknaden: ${id}`);
    }

    return href;
};

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
        case 'dokumentasjon':
            href = '/soknad/dokumentasjon';
            break;
        case 'oppsummering':
            href = '/soknad/inntektsinformasjon';
            break;
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i søknaden: ${id}`);
    }

    return href;
};

export default stepConfig;
