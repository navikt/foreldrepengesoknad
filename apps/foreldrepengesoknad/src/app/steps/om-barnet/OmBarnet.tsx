import {
    andreAugust2022ReglerGjelder,
    Block,
    convertYesOrNoOrUndefinedToBoolean,
    hasValue,
    intlUtils,
    isFarEllerMedmor,
    isFødtBarn,
    ISOStringToDate,
    isUfødtBarn,
    Step,
} from '@navikt/fp-common';
import { RegistrertBarn, Søkerinfo } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';
import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { getErDatoInnenEnDagFraAnnenDato } from 'app/pages/velkommen/velkommenUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import AdopsjonAnnetBarn from './components/AdopsjonAnnetBarn';
import AdopsjonEktefellesBarn from './components/AdopsjonEktefellesBarn';
import BarnFødtEllerAdoptert from './components/BarnFødtEllerAdoptert';
import Fødsel from './components/Fødsel';
import Termin from './components/Termin';
import ValgteRegistrerteBarn from './components/ValgteRegistrerteBarn';
import { OmBarnetFormComponents, OmBarnetFormData } from './omBarnetFormConfig';
import omBarnetQuestionsConfig, { OmBarnetQuestionPayload } from './omBarnetQuestionsConfig';
import { cleanupOmBarnetFormData, getOmBarnetInitialValues, mapOmBarnetFormDataToState } from './omBarnetUtils';

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

    const [isSubmitting, setIsSubmitting] = useState(false);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);

    const oppdaterOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);

    const { arbeidsforhold, person } = søkerInfo;

    const [erForTidligTilÅSøkePåTermin, setErForTidligTilÅSøkePåTermin] = useState(false);
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const findBarnetIRegistrerteBarn = (regBarn: RegistrertBarn) => {
        if (omBarnet && !isUfødtBarn(omBarnet) && omBarnet.fnr !== undefined && omBarnet.fnr.length > 0) {
            return omBarnet.fnr.includes(regBarn.fnr);
        }
        return false;
    };

    const familiehendelsesdato = omBarnet ? ISOStringToDate(getFamiliehendelsedato(omBarnet)) : undefined;

    const dødfødteUtenFnrMedSammeFødselsdato =
        omBarnet && isFødtBarn(omBarnet)
            ? person.barn.filter(
                  (barn) =>
                      barn.fnr === undefined && getErDatoInnenEnDagFraAnnenDato(barn.fødselsdato, familiehendelsesdato),
              )
            : [];

    const valgteRegistrerteBarn =
        !søknadGjelderNyttBarn && omBarnet && !isUfødtBarn(omBarnet)
            ? person.barn.filter((b) => findBarnetIRegistrerteBarn(b)).concat(dødfødteUtenFnrMedSammeFødselsdato)
            : undefined;
    const barnSøktOmFørMenIkkeRegistrert =
        !søknadGjelderNyttBarn && (valgteRegistrerteBarn === undefined || valgteRegistrerteBarn.length === 0);

    const onSubmit = (values: Partial<OmBarnetFormData>) => {
        setIsSubmitting(true);

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

    return (
        <OmBarnetFormComponents.FormikWrapper
            initialValues={getOmBarnetInitialValues(arbeidsforhold, omBarnet)}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = omBarnetQuestionsConfig.getVisbility({
                    ...formValues,
                    arbeidsforhold,
                    situasjon: søkersituasjon.situasjon,
                    rolle: søkersituasjon.rolle,
                    valgteRegistrerteBarn,
                    søknadGjelderEtNyttBarn: barnSøktOmFørMenIkkeRegistrert || søknadGjelderNyttBarn,
                } as OmBarnetQuestionPayload);

                const farMedmorSøkerPåTerminFørWLB =
                    erFarEllerMedmor &&
                    convertYesOrNoOrUndefinedToBoolean(formValues.erBarnetFødt) === false &&
                    hasValue(formValues.termindato) &&
                    !andreAugust2022ReglerGjelder(ISOStringToDate(formValues.termindato)!);

                const visGåVidereKnapp = visibility.areAllQuestionsAnswered() && !farMedmorSøkerPåTerminFørWLB;
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        onCancel={avbrytSøknad}
                        onContinueLater={navigator.fortsettSøknadSenere}
                        steps={stepConfig}
                    >
                        <OmBarnetFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupOmBarnetFormData(values, visibility)}
                        >
                            {valgteRegistrerteBarn !== undefined && valgteRegistrerteBarn.length > 0 && (
                                <ValgteRegistrerteBarn valgteBarn={valgteRegistrerteBarn} visibility={visibility} />
                            )}
                            <BarnFødtEllerAdoptert visibility={visibility} erFarEllerMedmor={erFarEllerMedmor} />
                            <AdopsjonAnnetBarn
                                søkersituasjon={søkersituasjon}
                                formValues={formValues as OmBarnetFormData}
                                visibility={visibility}
                                søknadGjelderEtNyttBarn={søknadGjelderNyttBarn}
                            />
                            <AdopsjonEktefellesBarn
                                søkersituasjon={søkersituasjon}
                                formValues={formValues as OmBarnetFormData}
                                visibility={visibility}
                                søknadGjelderEtNyttBarn={søknadGjelderNyttBarn}
                            />
                            <Termin
                                søkersituasjon={søkersituasjon}
                                formValues={formValues as OmBarnetFormData}
                                visibility={visibility}
                                søknadGjelderEtNyttBarn={barnSøktOmFørMenIkkeRegistrert || søknadGjelderNyttBarn}
                                setErForTidligTilÅSøkePåTermin={setErForTidligTilÅSøkePåTermin}
                            />
                            <Fødsel
                                søkersituasjon={søkersituasjon}
                                formValues={formValues as OmBarnetFormData}
                                visibility={visibility}
                                søknadGjelderEtNyttBarn={søknadGjelderNyttBarn}
                                barnSøktOmFørMenIkkeRegistrert={barnSøktOmFørMenIkkeRegistrert}
                            />
                            <Block margin="l">
                                <StepButtons
                                    isNexButtonVisible={visGåVidereKnapp}
                                    goToPreviousStep={navigator.goToPreviousDefaultStep}
                                    isDisabled={isSubmitting || erForTidligTilÅSøkePåTermin}
                                    isLoading={isSubmitting}
                                />
                            </Block>
                        </OmBarnetFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default OmBarnet;
