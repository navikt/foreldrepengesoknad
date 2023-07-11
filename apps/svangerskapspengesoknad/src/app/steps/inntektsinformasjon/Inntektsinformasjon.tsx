import { Block, intlUtils, Step, StepButtonWrapper } from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import AndreInntekter from './components/andre-inntekter/AndreInntekter';
import ArbeidsforholdInformasjon from './components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import EgenNæring from './components/egen-næring/EgenNæring';
import Frilans from './components/frilans/Frilans';
import { InntektsinformasjonFormComponents, InntektsinformasjonFormData } from './inntektsinformasjonFormConfig';
import {
    getInitialInntektsinformasjonFormValues,
    mapInntektsinformasjonFormDataToState,
} from './inntektsinformasjonFormUtils';
import inntektsinforMasjonQuestionsConfig from './inntektsInformasjonQuestionsConfig';
import { BodyShort, Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { getAktiveArbeidsforhold } from 'app/utils/arbeidsgforholdUtils';
import InfoTilFiskere from './components/info-til-fiskere/InfoTilFiskere';

const Arbeidsinformasjon = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const { søker, barn } = useSøknad();
    const { termindato } = barn;
    const [frilansoppdrag, setFrilansoppdrag] = useState(
        søker.frilansInformasjon ? søker.frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd : []
    );
    const [egenNæringInformasjon, setEgenNæringsInformasjon] = useState(
        søker.selvstendigNæringsdrivendeInformasjon ? søker.selvstendigNæringsdrivendeInformasjon : []
    );
    const [andreInntekterInformasjon, setAndreInntekterInformasjon] = useState(
        søker.andreInntekterSiste10Mnd ? søker.andreInntekterSiste10Mnd : []
    );

    const onValidSubmitHandler = (values: Partial<InntektsinformasjonFormData>) => {
        const updatedSøker = mapInntektsinformasjonFormDataToState(
            values,
            andreInntekterInformasjon,
            frilansoppdrag,
            egenNæringInformasjon
        );

        return [actionCreator.setSøker(updatedSøker)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTENLANDSOPPHOLD);

    return (
        <InntektsinformasjonFormComponents.FormikWrapper
            initialValues={getInitialInntektsinformasjonFormValues(søker)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = inntektsinforMasjonQuestionsConfig.getVisbility(
                    formValues as InntektsinformasjonFormData
                );

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="arbeid"
                        pageTitle={intlUtils(intl, 'steps.label.arbeid')}
                        // onCancel={onAvbrytSøknad}
                        // onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl)}
                    >
                        <InntektsinformasjonFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <Block padBottom="l">
                                <BodyShort>
                                    Hvis du får utbetalinger fra NAV, trenger du ikke å opplyse om det i søknaden
                                </BodyShort>
                            </Block>

                            <ArbeidsforholdInformasjon
                                arbeidsforhold={getAktiveArbeidsforhold(arbeidsforhold, termindato)}
                            />

                            <Block padBottom="l">
                                <Frilans
                                    frilansoppdrag={frilansoppdrag}
                                    setFrilansoppdrag={setFrilansoppdrag}
                                    visibility={visibility}
                                    formValues={formValues as InntektsinformasjonFormData}
                                />
                            </Block>

                            <Block padBottom="l">
                                <EgenNæring
                                    egenNæringInformasjon={egenNæringInformasjon}
                                    setEgenNæringsInformasjon={setEgenNæringsInformasjon}
                                    visibility={visibility}
                                    formValues={formValues as InntektsinformasjonFormData}
                                />
                            </Block>

                            <Block padBottom="l">
                                <AndreInntekter
                                    andreInntekterInformasjon={andreInntekterInformasjon}
                                    setAndreInntekterInformasjon={setAndreInntekterInformasjon}
                                    visibility={visibility}
                                    formValues={formValues as InntektsinformasjonFormData}
                                />
                            </Block>

                            <Block padBottom="l">
                                <InfoTilFiskere />
                            </Block>

                            <Block margin="xl">
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={Link} to={getPreviousStepHref('arbeid')}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </InntektsinformasjonFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Arbeidsinformasjon;
