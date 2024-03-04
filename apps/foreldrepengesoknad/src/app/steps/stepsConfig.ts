import { IntlShape } from 'react-intl';

import { intlUtils } from '@navikt/fp-common';
import { assertUnreachable } from '@navikt/fp-common/src/common/utils/globalUtil';

import SøknadRoutes from 'app/routes/routes';

type SøkersituasjonStepId = 'søkersituasjon';
type OmBarnetStepId = 'omBarnet';
type AnnenForelderId = 'annenForelder';
type Fordeling = 'fordeling';
type Uttaksplan = 'uttaksplan';
type Dokumentasjon = 'dokumentasjon';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type UtenlandsoppholdSenereStepId = 'utenlandsoppholdSenere';
type UtenlandsoppholdTidligereStepId = 'utenlandsoppholdTidligere';
type Inntektsinformasjon = 'inntektsinformasjon';
type OppsummeringStepId = 'oppsummering';

type StepIdWithBackHref =
    | OmBarnetStepId
    | AnnenForelderId
    | Fordeling
    | Uttaksplan
    | Dokumentasjon
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
        case 'fordeling':
            return intlUtils(intl, 'steps.label.fordeling');
        case 'søkersituasjon':
            return intlUtils(intl, 'steps.label.søkersituasjon');
        case 'omBarnet':
            return intlUtils(intl, 'steps.label.omBarnet');
        case 'annenForelder':
            return intlUtils(intl, 'steps.label.annenForelder');
        case 'utenlandsopphold':
            return intlUtils(intl, 'steps.label.utenlandsopphold');
        case 'utenlandsoppholdSenere':
            return intlUtils(intl, 'steps.label.utenlandsopphold.senere');
        case 'utenlandsoppholdTidligere':
            return intlUtils(intl, 'steps.label.utenlandsopphold.tidligere');
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
        'fordeling',
        'uttaksplan',
        'utenlandsopphold',
        'utenlandsoppholdTidligere',
        'utenlandsoppholdSenere',
        'inntektsinformasjon',
        'oppsummering',
    ];
    const stepsDokumentasjonPåkrevd: StepId[] = [
        'søkersituasjon',
        'omBarnet',
        'annenForelder',
        'fordeling',
        'uttaksplan',
        'dokumentasjon',
        'utenlandsopphold',
        'utenlandsoppholdTidligere',
        'utenlandsoppholdSenere',
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

//TODO GR: Ser ut som denne ikke brukes? Kan den slettes?
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

//TODO GR: Ser ut som denne ikke brukes? Kan den slettes?
export const getPreviousStepHref = (id: StepIdWithBackHref, manglerDokumentasjon = false): SøknadRoutes => {
    let href;

    switch (id) {
        case 'omBarnet':
            href = SøknadRoutes.SØKERSITUASJON;
            break;
        case 'annenForelder':
            href = SøknadRoutes.OM_BARNET;
            break;
        case 'fordeling':
            href = SøknadRoutes.ANNEN_FORELDER;
            break;
        case 'uttaksplan':
            href = SøknadRoutes.FORDELING;
            break;
        case 'dokumentasjon':
            href = SøknadRoutes.UTTAKSPLAN;
            break;
        case 'utenlandsopphold':
            if (manglerDokumentasjon) {
                href = SøknadRoutes.DOKUMENTASJON;
            } else {
                href = SøknadRoutes.UTTAKSPLAN;
            }
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

export const getUttaksplanNextStep = (erEndringssøknad: boolean, perioderKreverDokumentasjon: boolean) => {
    if (perioderKreverDokumentasjon) {
        return SøknadRoutes.DOKUMENTASJON;
    }

    return erEndringssøknad ? SøknadRoutes.OPPSUMMERING : SøknadRoutes.UTENLANDSOPPHOLD;
};

export default stepConfig;
