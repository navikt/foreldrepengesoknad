import { Block, intlUtils, Step } from '@navikt/fp-common';
import Api from 'app/api/api';
import actionCreator from 'app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import SøknadRoutes from 'app/routes/routes';
import { onAvbrytSøknad } from 'app/utils/globalUtil';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
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

const Inntektsinformasjon = () => {
    const intl = useIntl();
    const { dispatch, state } = useForeldrepengesøknadContext();
    const history = useHistory();
    const { arbeidsforhold } = state.søkerinfo;
    const hasSubmitted = useRef(false);
    const { søker } = state.søknad;

    const [frilansoppdrag, setFrilansoppdrag] = useState(
        søker.frilansInformasjon ? søker.frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd : []
    );
    const [egenNæringInformasjon, setEgenNæringsInformasjon] = useState(
        søker.selvstendigNæringsdrivendeInformasjon ? søker.selvstendigNæringsdrivendeInformasjon : []
    );
    const [andreInntekterInformasjon, setAndreInntekterInformasjon] = useState(
        søker.andreInntekterSiste10Mnd ? søker.andreInntekterSiste10Mnd : []
    );

    useEffect(() => {
        if (hasSubmitted.current === true) {
            Api.storeAppState(state);
            history.push(SøknadRoutes.OPPSUMMERING);
        } else {
            Api.storeAppState(state);
        }
    }, [state]);

    useEffect(() => {
        dispatch(actionCreator.updateCurrentRoute(SøknadRoutes.INNTEKTSINFORMASJON));
    }, []);

    const onValidSubmit = (values: Partial<InntektsinformasjonFormData>) => {
        const updatedSøker = mapInntektsinformasjonFormDataToState(
            values,
            søker,
            andreInntekterInformasjon,
            frilansoppdrag,
            egenNæringInformasjon
        );

        dispatch(actionCreator.setSøker(updatedSøker));
        hasSubmitted.current = true;
    };

    return (
        <InntektsinformasjonFormComponents.FormikWrapper
            initialValues={getInitialInntektsinformasjonFormValues(søker)}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = inntektsinforMasjonQuestionsConfig.getVisbility(formValues);

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.inntektsinformasjon')}
                        backLinkHref={getPreviousStepHref('inntektsinformasjon')}
                        activeStepId="inntektsinformasjon"
                        pageTitle={intlUtils(intl, 'søknad.inntektsinformasjon')}
                        stepTitle={intlUtils(intl, 'søknad.inntektsinformasjon')}
                        onCancel={() => onAvbrytSøknad(dispatch, history)}
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
                                <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                            </Block>
                        </InntektsinformasjonFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Inntektsinformasjon;
