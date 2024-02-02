import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import {
    RegistrertBarn,
    Situasjon,
    Step,
    Søkerinfo,
    Søkerrolle,
    andreAugust2022ReglerGjelder,
    isFarEllerMedmor,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-common';
import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { notEmpty } from '@navikt/fp-validation';

import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { getErDatoInnenEnDagFraAnnenDato } from 'app/pages/velkommen/velkommenUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getEldsteRegistrerteBarn } from 'app/utils/dateUtils';

import AdopsjonPanel from './components/AdopsjonPanel';
import FødselPanel from './components/FødselPanel';
import { BarnetFormValues } from './components/OmBarnetFormValues';
import ValgteRegistrerteBarn from './components/ValgteRegistrerteBarn';
import { getOmBarnetInitialValues, mapOmBarnetFormDataToState } from './omBarnetUtils';

const erDatoInnenforDeSiste12Ukene = (dato: string) => {
    const twelveWeeksAfterBirthday = dayjs(dato).add(12, 'weeks');
    return dayjs(twelveWeeksAfterBirthday).isAfter(new Date(), 'day');
};

const findBarnetIRegistrerteBarn = (regBarn: RegistrertBarn, barnet: Barn) => {
    if (barnet && !isUfødtBarn(barnet) && barnet.fnr !== undefined && barnet.fnr.length > 0) {
        return barnet.fnr.includes(regBarn.fnr);
    }
    return false;
};

const skalViseTermindato = (
    rolle: Søkerrolle,
    fødselsdato: string | undefined,
    valgteRegistrerteBarn: RegistrertBarn[] | undefined,
    situasjon: Situasjon,
): boolean => {
    if (situasjon === 'adopsjon') {
        return false;
    }

    let eldsteBarnFødselsdato = undefined;

    if (valgteRegistrerteBarn !== undefined && valgteRegistrerteBarn.length > 0) {
        const eldsteBarn = getEldsteRegistrerteBarn(valgteRegistrerteBarn);

        eldsteBarnFødselsdato = eldsteBarn.fødselsdato;
    }

    if (!fødselsdato && !eldsteBarnFødselsdato) {
        return false;
    }

    const relevantFødselsdato = eldsteBarnFødselsdato || fødselsdato;

    if (isFarEllerMedmor(rolle)) {
        if (andreAugust2022ReglerGjelder(relevantFødselsdato!)) {
            return true;
        }
        return erDatoInnenforDeSiste12Ukene(relevantFødselsdato!);
    }
    return true;
};

type Props = {
    søkerInfo: Søkerinfo;
    søknadGjelderNyttBarn: boolean;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const OmBarnet: React.FunctionComponent<Props> = ({
    søkerInfo,
    søknadGjelderNyttBarn,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const stepConfig = useStepConfig();
    const navigator = useFpNavigator(mellomlagreSøknadOgNaviger);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);

    const oppdaterOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);

    const { arbeidsforhold, registrerteBarn } = søkerInfo;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(omBarnet);

    const dødfødteUtenFnrMedSammeFødselsdato =
        omBarnet && isFødtBarn(omBarnet)
            ? registrerteBarn.filter(
                  (barn) =>
                      barn.fnr === undefined && getErDatoInnenEnDagFraAnnenDato(barn.fødselsdato, familiehendelsesdato),
              )
            : [];

    const valgteRegistrerteBarn =
        !søknadGjelderNyttBarn && omBarnet && !isUfødtBarn(omBarnet)
            ? registrerteBarn
                  .filter((b) => findBarnetIRegistrerteBarn(b, omBarnet))
                  .concat(dødfødteUtenFnrMedSammeFødselsdato)
            : undefined;

    const barnSøktOmFørMenIkkeRegistrert =
        !søknadGjelderNyttBarn && (valgteRegistrerteBarn === undefined || valgteRegistrerteBarn.length === 0);

    const onSubmit = (values: BarnetFormValues) => {
        const valgtBarn = !søknadGjelderNyttBarn && !barnSøktOmFørMenIkkeRegistrert ? omBarnet : undefined;

        const oppdatertBarn = mapOmBarnetFormDataToState(
            values,
            arbeidsforhold,
            valgtBarn,
            søkersituasjon.situasjon,
            barnSøktOmFørMenIkkeRegistrert,
        );

        oppdaterOmBarnet(oppdatertBarn);

        return navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<BarnetFormValues>({
        shouldUnregister: true,
        defaultValues: getOmBarnetInitialValues(arbeidsforhold, omBarnet),
    });

    const fødselsdatoer = formMethods.watch('fødselsdatoer');
    const skalInkludereTermindato = skalViseTermindato(
        søkersituasjon.rolle,
        fødselsdatoer ? fødselsdatoer[0].dato : undefined,
        valgteRegistrerteBarn,
        søkersituasjon.situasjon,
    );

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {valgteRegistrerteBarn && valgteRegistrerteBarn.length > 0 && (
                        <ValgteRegistrerteBarn
                            valgteRegistrerteBarn={valgteRegistrerteBarn}
                            skalInkludereTermindato={skalInkludereTermindato}
                        />
                    )}
                    {søkersituasjon.situasjon === 'fødsel' && (
                        <FødselPanel
                            erFarEllerMedmor={erFarEllerMedmor}
                            søknadGjelderEtNyttBarn={barnSøktOmFørMenIkkeRegistrert || søknadGjelderNyttBarn}
                            søkersituasjon={søkersituasjon}
                            arbeidsforhold={arbeidsforhold}
                        />
                    )}
                    {søkersituasjon.situasjon === 'adopsjon' && (
                        <AdopsjonPanel
                            søknadGjelderEtNyttBarn={barnSøktOmFørMenIkkeRegistrert || søknadGjelderNyttBarn}
                        />
                    )}
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </Form>
        </Step>
    );
};

export default OmBarnet;
