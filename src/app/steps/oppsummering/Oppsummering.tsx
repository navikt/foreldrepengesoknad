import { bemUtils, Block, intlUtils, Step } from '@navikt/fp-common';
import Api from 'app/api/api';
import VeilederNormal from 'app/assets/VeilederNormal';
import actionCreator from 'app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import SøknadRoutes from 'app/routes/routes';
import { onAvbrytSøknad } from 'app/utils/globalUtil';
import { getFieldErrorRenderer } from 'app/utils/validationUtil';
import { Hovedknapp } from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import AnnenForelderOppsummering from './components/annen-forelder-oppsummering/AnnenForelderOppsummering';
import BarnOppsummering from './components/barn-oppsummering/BarnOppsummering';
import OppsummeringsPanel from './components/OppsummeringsPanel';
import Personalia from './components/Personalia';
import UtenlandsoppholdOppsummering from './components/utenlandsopphold-oppsummering/UtenlandsoppholdOppsummering';

import './oppsummering.less';
import {
    getInitialOppsummeringValues,
    OppsummeringFormComponents,
    OppsummeringFormField,
} from './oppsummeringFormConfig';
import { validateHarGodkjentOppsummering } from './validation/oppsummeringValidation';

const Oppsummering = () => {
    const intl = useIntl();
    const { state, dispatch } = useForeldrepengesøknadContext();
    const history = useHistory();
    const hasSubmitted = useRef(false);
    const bem = bemUtils('oppsummering');
    const { barn, annenForelder, søker, informasjonOmUtenlandsopphold } = state.søknad;

    useEffect(() => {
        if (hasSubmitted.current === true) {
            Api.storeAppState(state);
            history.push(SøknadRoutes.SØKNAD_SENDT);
        } else {
            Api.storeAppState(state);
        }
    }, [state]);

    useEffect(() => {
        dispatch(actionCreator.updateCurrentRoute(SøknadRoutes.OPPSUMMERING));
    }, []);

    return (
        <OppsummeringFormComponents.FormikWrapper
            initialValues={getInitialOppsummeringValues()}
            onSubmit={() => null}
            renderForm={() => {
                return (
                    <OppsummeringFormComponents.Form
                        includeButtons={false}
                        fieldErrorHandler={getFieldErrorRenderer(intl)}
                    >
                        <Step
                            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                            backLinkHref={getPreviousStepHref('oppsummering')}
                            activeStepId="oppsummering"
                            pageTitle={intlUtils(intl, 'søknad.oppsummering')}
                            stepTitle={intlUtils(intl, 'søknad.oppsummering')}
                            onCancel={() => onAvbrytSøknad(dispatch, history)}
                            onContinueLater={() => null}
                            steps={stepConfig}
                            kompakt={true}
                        >
                            <Block padBottom="l">
                                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                                    <FormattedMessage id="oppsummering.veileder" />
                                </Veilederpanel>
                            </Block>
                            <Block padBottom="l">
                                <div className={bem.block}>
                                    <Block padBottom="l">
                                        <Personalia søkerinfo={state.søkerinfo} />
                                    </Block>
                                    <OppsummeringsPanel title="Om barnet">
                                        <BarnOppsummering barn={barn} />
                                    </OppsummeringsPanel>
                                    <OppsummeringsPanel title="Den andre forelderen">
                                        <AnnenForelderOppsummering annenForelder={annenForelder} søker={søker} />
                                    </OppsummeringsPanel>
                                    <OppsummeringsPanel title="Utenlandsopphold">
                                        <UtenlandsoppholdOppsummering
                                            informasjonOmUtenlandsopphold={informasjonOmUtenlandsopphold}
                                            barn={barn}
                                        />
                                    </OppsummeringsPanel>
                                    <OppsummeringsPanel title="Arbeidsforhold og andre inntektskilder">
                                        <BarnOppsummering barn={barn} />
                                    </OppsummeringsPanel>
                                </div>
                            </Block>
                            <Block padBottom="l">
                                <OppsummeringFormComponents.ConfirmationCheckbox
                                    name={OppsummeringFormField.harGodkjentOppsummering}
                                    label={intlUtils(intl, 'oppsummering.harGodkjentOppsummering')}
                                    validate={validateHarGodkjentOppsummering}
                                />
                            </Block>
                            <Block padBottom="l">
                                <div style={{ textAlign: 'center' }}>
                                    <Hovedknapp>Send inn søknad</Hovedknapp>
                                </div>
                            </Block>
                        </Step>
                    </OppsummeringFormComponents.Form>
                );
            }}
        />
    );
};

export default Oppsummering;
