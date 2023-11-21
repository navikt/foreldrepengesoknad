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
    RegistrertBarn,
    Step,
    StepButtonWrapper,
    Søkerinfo,
} from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';

import { FormattedMessage, useIntl } from 'react-intl';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import AdopsjonAnnetBarn from './components/AdopsjonAnnetBarn';
import AdopsjonEktefellesBarn from './components/AdopsjonEktefellesBarn';
import BarnFødtEllerAdoptert from './components/BarnFødtEllerAdoptert';
import Fødsel from './components/Fødsel';
import Termin from './components/Termin';
import { OmBarnetFormComponents, OmBarnetFormData } from './omBarnetFormConfig';
import omBarnetQuestionsConfig, { OmBarnetQuestionPayload } from './omBarnetQuestionsConfig';
import { cleanupOmBarnetFormData, getOmBarnetInitialValues, mapOmBarnetFormDataToState } from './omBarnetUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import ValgteRegistrerteBarn from './components/ValgteRegistrerteBarn';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getErDatoInnenEnDagFraAnnenDato } from 'app/pages/velkommen/velkommenUtils';
import { Button } from '@navikt/ds-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FpDataType, useFpStateData, useFpStateSaveFn } from 'app/context/FpDataContext';
import { notEmpty } from '@navikt/fp-validation';

type Props = {
    søkerInfo: Søkerinfo;
    søknadGjelderNyttBarn: boolean;
    mellomlagreSøknad: () => void;
    avbrytSøknad: () => void;
};

const OmBarnet: React.FunctionComponent<Props> = ({
    søkerInfo,
    søknadGjelderNyttBarn,
    mellomlagreSøknad,
    avbrytSøknad,
}) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const søkersituasjon = notEmpty(useFpStateData(FpDataType.SØKERSITUASJON));
    const omBarnet = useFpStateData(FpDataType.OM_BARNET);

    const lagreOmBarnet = useFpStateSaveFn(FpDataType.OM_BARNET);
    const lagreAppRoute = useFpStateSaveFn(FpDataType.APP_ROUTE);

    const { arbeidsforhold, registrerteBarn } = søkerInfo;

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
            ? registrerteBarn.filter(
                  (barn: RegistrertBarn) =>
                      barn.fnr === undefined && getErDatoInnenEnDagFraAnnenDato(barn.fødselsdato, familiehendelsesdato),
              )
            : [];

    const valgteRegistrerteBarn =
        !søknadGjelderNyttBarn && omBarnet && !isUfødtBarn(omBarnet)
            ? registrerteBarn.filter((b) => findBarnetIRegistrerteBarn(b)).concat(dødfødteUtenFnrMedSammeFødselsdato)
            : undefined;
    const barnSøktOmFørMenIkkeRegistrert =
        !søknadGjelderNyttBarn && (valgteRegistrerteBarn === undefined || valgteRegistrerteBarn.length === 0);

    const onSubmit = async (values: Partial<OmBarnetFormData>) => {
        setIsSubmitting(true);

        const valgtBarn = !søknadGjelderNyttBarn && !barnSøktOmFørMenIkkeRegistrert ? omBarnet : undefined;
        const oppdatertBarn = mapOmBarnetFormDataToState(
            values,
            arbeidsforhold,
            valgtBarn,
            søkersituasjon.situasjon,
            barnSøktOmFørMenIkkeRegistrert,
        );

        lagreOmBarnet(oppdatertBarn);
        lagreAppRoute(SøknadRoutes.ANNEN_FORELDER);

        await mellomlagreSøknad();

        navigate(SøknadRoutes.ANNEN_FORELDER);
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
                        activeStepId="omBarnet"
                        pageTitle={intlUtils(intl, 'søknad.omBarnet')}
                        onCancel={avbrytSøknad}
                        onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl, false)}
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
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={Link} to={getPreviousStepHref('omBarnet')}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    {visGåVidereKnapp && (
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting || erForTidligTilÅSøkePåTermin}
                                            loading={isSubmitting}
                                        >
                                            {intlUtils(intl, 'søknad.gåVidere')}
                                        </Button>
                                    )}
                                </StepButtonWrapper>
                            </Block>
                        </OmBarnetFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default OmBarnet;
