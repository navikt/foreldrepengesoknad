import { Block, hasValue, intlUtils, Step } from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import React from 'react';
import { useIntl } from 'react-intl';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import AdopsjonAnnetBarn from './components/AdopsjonAnnetBarn';
import AdopsjonEktefellesBarn from './components/AdopsjonEktefellesBarn';
import BarnFødtEllerAdoptert from './components/BarnFødtEllerAdoptert';
import Fødsel from './components/Fødsel';
import Termin from './components/Termin';
import { OmBarnetFormComponents, OmBarnetFormData } from './omBarnetFormConfig';
import omBarnetQuestionsConfig, { OmBarnetQuestionPayload } from './omBarnetQuestionsConfig';
import { cleanupOmBarnetFormData, getOmBarnetInitialValues, mapOmBarnetFormDataToState } from './omBarnetUtils';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { andreAugust2022ReglerGjelder, ISOStringToDate } from 'app/utils/dateUtils';
import { convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { isFødtBarn, isUfødtBarn } from 'app/context/types/Barn';
import ValgteRegistrerteBarn from './components/ValgteRegistrerteBarn';
import { RegistrertBarn } from 'app/types/Person';
import useSaveLoadedRoute from 'app/utils/hooks/useSaveLoadedRoute';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getErDatoInnenEnDagFraAnnenDato } from 'app/pages/velkommen/velkommenUtils';
import { Button } from '@navikt/ds-react';

const OmBarnet: React.FunctionComponent = () => {
    const intl = useIntl();
    const { søkersituasjon, barn } = useSøknad();
    const { arbeidsforhold, registrerteBarn } = useSøkerinfo();
    const { state } = useForeldrepengesøknadContext();
    const { søknadGjelderEtNyttBarn } = state;
    const onValidSubmitHandler = (values: Partial<OmBarnetFormData>) => {
        const valgtBarn = !søknadGjelderEtNyttBarn ? barn : undefined;
        const oppdatertBarn = mapOmBarnetFormDataToState(
            values,
            arbeidsforhold,
            valgtBarn,
            søkersituasjon.situasjon,
            barnSøktOmFørMenIkkeRegistrert
        );
        return [actionCreator.setOmBarnet(oppdatertBarn)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.ANNEN_FORELDER,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    useSaveLoadedRoute(SøknadRoutes.OM_BARNET);

    const findBarnetIRegistrerteBarn = (regBarn: RegistrertBarn) => {
        if (!isUfødtBarn(barn) && barn.fnr !== undefined && barn.fnr.length > 0) {
            return barn.fnr.includes(regBarn.fnr);
        }
        return false;
    };

    const familiehendelsesdato = barn ? ISOStringToDate(getFamiliehendelsedato(barn)) : undefined;

    const dødfødteUtenFnrMedSammeFødselsdato =
        barn && isFødtBarn(barn)
            ? registrerteBarn.filter(
                  (barn: RegistrertBarn) =>
                      barn.fnr === undefined && getErDatoInnenEnDagFraAnnenDato(barn.fødselsdato, familiehendelsesdato)
              )
            : [];

    const valgteRegistrerteBarn =
        !søknadGjelderEtNyttBarn && !isUfødtBarn(barn)
            ? registrerteBarn.filter((b) => findBarnetIRegistrerteBarn(b)).concat(dødfødteUtenFnrMedSammeFødselsdato)
            : undefined;
    const barnSøktOmFørMenIkkeRegistrert =
        !søknadGjelderEtNyttBarn && (valgteRegistrerteBarn === undefined || valgteRegistrerteBarn.length === 0);

    return (
        <OmBarnetFormComponents.FormikWrapper
            initialValues={getOmBarnetInitialValues(barn, arbeidsforhold)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = omBarnetQuestionsConfig.getVisbility({
                    ...formValues,
                    arbeidsforhold,
                    situasjon: søkersituasjon.situasjon,
                    rolle: søkersituasjon.rolle,
                    valgteRegistrerteBarn,
                    søknadGjelderEtNyttBarn: barnSøktOmFørMenIkkeRegistrert || søknadGjelderEtNyttBarn,
                } as OmBarnetQuestionPayload);

                const farMedmorSøkerPåTerminFørWLB =
                    isFarEllerMedmor(søkersituasjon.rolle) &&
                    convertYesOrNoOrUndefinedToBoolean(formValues.erBarnetFødt) === false &&
                    hasValue(formValues.termindato) &&
                    !andreAugust2022ReglerGjelder(ISOStringToDate(formValues.termindato)!);

                const visGåVidereKnapp = visibility.areAllQuestionsAnswered() && !farMedmorSøkerPåTerminFørWLB;
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        backLinkHref={getPreviousStepHref('omBarnet')}
                        activeStepId="omBarnet"
                        pageTitle={intlUtils(intl, 'søknad.omBarnet')}
                        stepTitle={intlUtils(intl, 'søknad.omBarnet')}
                        onCancel={onAvbrytSøknad}
                        onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl)}
                        kompakt={true}
                    >
                        <OmBarnetFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupOmBarnetFormData(values, visibility)}
                        >
                            {valgteRegistrerteBarn !== undefined && valgteRegistrerteBarn.length > 0 && (
                                <ValgteRegistrerteBarn valgteBarn={valgteRegistrerteBarn} visibility={visibility} />
                            )}
                            <BarnFødtEllerAdoptert visibility={visibility} />
                            <AdopsjonAnnetBarn
                                søkersituasjon={søkersituasjon}
                                formValues={formValues as OmBarnetFormData}
                                visibility={visibility}
                                søknadGjelderEtNyttBarn={søknadGjelderEtNyttBarn}
                            />
                            <AdopsjonEktefellesBarn
                                søkersituasjon={søkersituasjon}
                                formValues={formValues as OmBarnetFormData}
                                visibility={visibility}
                                søknadGjelderEtNyttBarn={søknadGjelderEtNyttBarn}
                            />
                            <Termin
                                søkersituasjon={søkersituasjon}
                                formValues={formValues as OmBarnetFormData}
                                visibility={visibility}
                                søknadGjelderEtNyttBarn={barnSøktOmFørMenIkkeRegistrert || søknadGjelderEtNyttBarn}
                            />
                            <Fødsel
                                søkersituasjon={søkersituasjon}
                                formValues={formValues as OmBarnetFormData}
                                visibility={visibility}
                                søknadGjelderEtNyttBarn={søknadGjelderEtNyttBarn}
                            />
                            <Block visible={visGåVidereKnapp} textAlignCenter={true}>
                                <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                    {intlUtils(intl, 'søknad.gåVidere')}
                                </Button>
                            </Block>
                        </OmBarnetFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default OmBarnet;
