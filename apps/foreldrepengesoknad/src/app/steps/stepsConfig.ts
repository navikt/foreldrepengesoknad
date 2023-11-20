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

const createStepConfig = (id: StepId, index: number, label: string): StepConfig => {
    return {
        id,
        index,
        label,
    };
};

const getStepLabel = (intl: IntlShape, id: StepId): string => {
    switch (id) {
        case 'uttaksplan':
            return intlUtils(intl, 'steps.label.uttaksplan');
        case 'dokumentasjon':
            return intlUtils(intl, 'steps.label.dokumentasjon');
        case 'oppsummering':
            return intlUtils(intl, 'steps.label.oppsummering');
        case 'uttaksplanInfo':
            return intlUtils(intl, 'steps.label.uttaksplanInfo');
        case 'søkersituasjon':
            return intlUtils(intl, 'steps.label.søkersituasjon');
        case 'omBarnet':
            return intlUtils(intl, 'steps.label.omBarnet');
        case 'annenForelder':
            return intlUtils(intl, 'steps.label.annenForelder');
        case 'utenlandsopphold':
            return intlUtils(intl, 'steps.label.utenlandsopphold');
        case 'inntektsinformasjon':
            return intlUtils(intl, 'steps.label.inntektsinformasjon');
        default:
            assertUnreachable(id, 'Forsøkt å lage en overskrift for et steg som ikke finnes');
    }

    return id;
};

const stepConfigEndringssøknad = (intl: IntlShape, manglerDokumentasjon: boolean): StepConfig[] => {
    const steps: StepId[] = ['uttaksplan', 'oppsummering'];
    const stepsDokumentasjonPåkrevd: StepId[] = ['uttaksplan', 'dokumentasjon', 'oppsummering'];

    return manglerDokumentasjon
        ? stepsDokumentasjonPåkrevd.map((id, index) => {
              return createStepConfig(id, index, getStepLabel(intl, id));
          })
        : steps.map((id, index) => {
              return createStepConfig(id, index, getStepLabel(intl, id));
          });
};

const stepConfigFørstegangssøknad = (intl: IntlShape, manglerDokumentasjon: boolean): StepConfig[] => {
    const steps: StepId[] = [
        'søkersituasjon',
        'omBarnet',
        'annenForelder',
        'uttaksplanInfo',
        'uttaksplan',
        'utenlandsopphold',
        'inntektsinformasjon',
        'oppsummering',
    ];
    const stepsDokumentasjonPåkrevd: StepId[] = [
        'søkersituasjon',
        'omBarnet',
        'annenForelder',
        'uttaksplanInfo',
        'uttaksplan',
        'dokumentasjon',
        'utenlandsopphold',
        'inntektsinformasjon',
        'oppsummering',
    ];

    return manglerDokumentasjon
        ? stepsDokumentasjonPåkrevd.map((id, index) => {
              return createStepConfig(id, index, getStepLabel(intl, id));
          })
        : steps.map((id, index) => {
              return createStepConfig(id, index, getStepLabel(intl, id));
          });
};

const stepConfig = (intl: IntlShape, erEndringssøknad: boolean, manglerDokumentasjon = false): StepConfig[] => {
    if (erEndringssøknad) {
        return stepConfigEndringssøknad(intl, manglerDokumentasjon);
    }
    return stepConfigFørstegangssøknad(intl, manglerDokumentasjon);
};

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
            href = '/soknad/uttaksplan';
            break;
        case 'oppsummering':
            href = '/soknad/inntektsinformasjon';
            break;
        default:
            return assertUnreachable(id, `Forsøkt å nå en side som ikke er tilgjengelig i søknaden: ${id}`);
    }

    return href;
};

export const getUttaksplanNextStep = (erEndringssøknad: boolean, perioderKreverDokumentasjon: boolean) => {
    if (perioderKreverDokumentasjon) {
        return SøknadRoutes.MANGLENDE_VEDLEGG;
    }

    return erEndringssøknad ? SøknadRoutes.OPPSUMMERING : SøknadRoutes.UTENLANDSOPPHOLD;
};

export default stepConfig;
