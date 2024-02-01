import { Form } from 'formik';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Block, ISOStringToDate, Step, isFarEllerMedmor, isFødtBarn, isUfødtBarn } from '@navikt/fp-common';
import { ErrorSummaryHookForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { SøkerBarn, Søkerinfo } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { getErDatoInnenEnDagFraAnnenDato } from 'app/pages/velkommen/velkommenUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';

import AdopsjonAnnetBarn from './components/AdopsjonAnnetBarn';
import AdopsjonEktefellesBarn from './components/AdopsjonEktefellesBarn';
import BarnFødtEllerAdoptert from './components/BarnFødtEllerAdoptert';
import Fødsel from './components/Fødsel';
import { OmBarnetFormValues } from './components/OmBarnetFormValues';
import Termin from './components/Termin';
import ValgteRegistrerteBarn from './components/ValgteRegistrerteBarn';
import { getOmBarnetInitialValues, mapOmBarnetFormDataToState } from './omBarnetUtils';

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

    const { arbeidsforhold, søker } = søkerInfo;

    const [erForTidligTilÅSøkePåTermin, setErForTidligTilÅSøkePåTermin] = useState(false);
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const findBarnetIRegistrerteBarn = (regBarn: SøkerBarn) => {
        if (omBarnet && !isUfødtBarn(omBarnet) && omBarnet.fnr !== undefined && omBarnet.fnr.length > 0) {
            return omBarnet.fnr.includes(regBarn.fnr);
        }
        return false;
    };

    const familiehendelsesdato = omBarnet ? ISOStringToDate(getFamiliehendelsedato(omBarnet)) : undefined;

    const dødfødteUtenFnrMedSammeFødselsdato =
        omBarnet && isFødtBarn(omBarnet)
            ? søker.barn.filter(
                  (barn) =>
                      barn.fnr === undefined && getErDatoInnenEnDagFraAnnenDato(barn.fødselsdato, familiehendelsesdato),
              )
            : [];

    const valgteRegistrerteBarn =
        !søknadGjelderNyttBarn && omBarnet && !isUfødtBarn(omBarnet)
            ? søker.barn.filter((b) => findBarnetIRegistrerteBarn(b)).concat(dødfødteUtenFnrMedSammeFødselsdato)
            : undefined;
    const barnSøktOmFørMenIkkeRegistrert =
        !søknadGjelderNyttBarn && (valgteRegistrerteBarn === undefined || valgteRegistrerteBarn.length === 0);

    const onSubmit = (values: OmBarnetFormValues) => {
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

    const formMethods = useForm<OmBarnetFormValues>({
        shouldUnregister: true,
        defaultValues: getOmBarnetInitialValues(arbeidsforhold, omBarnet),
    });

    // const visibility = omBarnetQuestionsConfig.getVisbility({
    //     ...formValues,
    //     arbeidsforhold,
    //     situasjon: søkersituasjon.situasjon,
    //     rolle: søkersituasjon.rolle,
    //     valgteRegistrerteBarn,
    //     søknadGjelderEtNyttBarn: barnSøktOmFørMenIkkeRegistrert || søknadGjelderNyttBarn,
    // } as OmBarnetQuestionPayload);

    // const farMedmorSøkerPåTerminFørWLB =
    //     erFarEllerMedmor &&
    //     convertYesOrNoOrUndefinedToBoolean(formValues.erBarnetFødt) === false &&
    //     hasValue(formValues.termindato) &&
    //     !andreAugust2022ReglerGjelder(ISOStringToDate(formValues.termindato)!);

    // const visGåVidereKnapp = visibility.areAllQuestionsAnswered() && !farMedmorSøkerPåTerminFørWLB;

    //cleanup={(values) => cleanupOmBarnetFormData(values, visibility)}

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <ErrorSummaryHookForm />
                {valgteRegistrerteBarn !== undefined && valgteRegistrerteBarn.length > 0 && (
                    <ValgteRegistrerteBarn valgteBarn={valgteRegistrerteBarn} />
                )}
                <BarnFødtEllerAdoptert
                    situasjon={søkersituasjon.situasjon}
                    erFarEllerMedmor={erFarEllerMedmor}
                    søknadGjelderEtNyttBarn={barnSøktOmFørMenIkkeRegistrert || søknadGjelderNyttBarn}
                />
                <AdopsjonAnnetBarn søkersituasjon={søkersituasjon} søknadGjelderEtNyttBarn={søknadGjelderNyttBarn} />
                <AdopsjonEktefellesBarn
                    søkersituasjon={søkersituasjon}
                    søknadGjelderEtNyttBarn={søknadGjelderNyttBarn}
                />
                <Termin
                    søkersituasjon={søkersituasjon}
                    valgteBarn={valgteRegistrerteBarn}
                    søknadGjelderEtNyttBarn={barnSøktOmFørMenIkkeRegistrert || søknadGjelderNyttBarn}
                    setErForTidligTilÅSøkePåTermin={setErForTidligTilÅSøkePåTermin}
                />
                <Fødsel
                    søkersituasjon={søkersituasjon}
                    valgteBarn={valgteRegistrerteBarn}
                    søknadGjelderEtNyttBarn={søknadGjelderNyttBarn}
                    barnSøktOmFørMenIkkeRegistrert={barnSøktOmFørMenIkkeRegistrert}
                />
                <Block margin="l">
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </Block>
            </Form>
        </Step>
    );
};

export default OmBarnet;
