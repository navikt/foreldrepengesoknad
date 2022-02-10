import { Block, intlUtils, Step } from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import AndreInntekter from './components/andre-inntekter/AndreInntekter';
import ArbeidsforholdInformasjon from './components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import EgenNæring from './components/egen-næring/EgenNæring';
import Frilans from './components/frilans/Frilans';
import InfoTilFiskere from './components/info-til-fiskere/InfoTilFiskere';
import { InntektsinformasjonFormComponents, InntektsinformasjonFormData } from './inntektsinformasjonFormConfig';
import {
    getInitialInntektsinformasjonFormValues,
    mapInntektsinformasjonFormDataToState,
} from './inntektsinformasjonFormUtils';
import inntektsinforMasjonQuestionsConfig from './inntektsInformasjonQuestionsConfig';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';

const Inntektsinformasjon = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const { søker } = useSøknad();

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
            søker,
            andreInntekterInformasjon,
            frilansoppdrag,
            egenNæringInformasjon
        );

        return [actionCreator.setSøker(updatedSøker)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.OPPSUMMERING,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );
    const onAvbrytSøknad = useAvbrytSøknad();

    return (
        <InntektsinformasjonFormComponents.FormikWrapper
            initialValues={getInitialInntektsinformasjonFormValues(søker)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = inntektsinforMasjonQuestionsConfig.getVisbility(formValues);

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.inntektsinformasjon')}
                        backLinkHref={getPreviousStepHref('inntektsinformasjon')}
                        activeStepId="inntektsinformasjon"
                        pageTitle={intlUtils(intl, 'søknad.inntektsinformasjon')}
                        stepTitle={intlUtils(intl, 'søknad.inntektsinformasjon')}
                        onCancel={onAvbrytSøknad}
                        onContinueLater={() => null}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <InntektsinformasjonFormComponents.Form includeButtons={false}>
                            <Block padBottom="l">
                                <Element>Utbetalinger fra NAV</Element>
                                <Normaltekst>
                                    Hvis du får utbetalinger fra NAV, trenger du ikke å opplyse om det i søknaden
                                </Normaltekst>
                            </Block>

                            <ArbeidsforholdInformasjon arbeidsforhold={arbeidsforhold} />

                            <InfoTilFiskere />

                            <Block padBottom="l">
                                <Frilans
                                    frilansoppdrag={frilansoppdrag}
                                    setFrilansoppdrag={setFrilansoppdrag}
                                    visibility={visibility}
                                    formValues={formValues}
                                />
                            </Block>

                            <Block padBottom="l">
                                <EgenNæring
                                    egenNæringInformasjon={egenNæringInformasjon}
                                    setEgenNæringsInformasjon={setEgenNæringsInformasjon}
                                    visibility={visibility}
                                    formValues={formValues}
                                />
                            </Block>

                            <Block padBottom="l">
                                <AndreInntekter
                                    andreInntekterInformasjon={andreInntekterInformasjon}
                                    setAndreInntekterInformasjon={setAndreInntekterInformasjon}
                                    visibility={visibility}
                                    formValues={formValues}
                                />
                            </Block>

                            <Block textAlignCenter={true} visible={visibility.areAllQuestionsAnswered()}>
                                <Hovedknapp disabled={isSubmitting} spinner={isSubmitting}>
                                    {intlUtils(intl, 'søknad.gåVidere')}
                                </Hovedknapp>
                            </Block>
                        </InntektsinformasjonFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Inntektsinformasjon;
