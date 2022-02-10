import { bemUtils, Block, intlUtils, Step } from '@navikt/fp-common';
import VeilederNormal from 'app/assets/VeilederNormal';
import { Hovedknapp } from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { useEffect, useState } from 'react';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { FormattedMessage, useIntl } from 'react-intl';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import AnnenForelderOppsummering from './components/annen-forelder-oppsummering/AnnenForelderOppsummering';
import BarnOppsummering from './components/barn-oppsummering/BarnOppsummering';
import OppsummeringsPanel from './components/OppsummeringsPanel';
import Personalia from './components/Personalia';
import UtenlandsoppholdOppsummering from './components/utenlandsopphold-oppsummering/UtenlandsoppholdOppsummering';
import {
    getInitialOppsummeringValues,
    OppsummeringFormComponents,
    OppsummeringFormData,
    OppsummeringFormField,
} from './oppsummeringFormConfig';
import { validateHarGodkjentOppsummering } from './validation/oppsummeringValidation';
import ArbeidsforholdOgAndreInntekterOppsummering from './components/andre-inntekter-oppsummering/ArbeidsforholdOgAndreInntekterOppsummering';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import Api from 'app/api/api';
import actionCreator from 'app/context/action/actionCreator';
import { cleanUpSøknadsdataForInnsending } from 'app/api/apiUtils';
import { useHistory } from 'react-router-dom';

import './oppsummering.less';
import SøknadRoutes from 'app/routes/routes';

const Oppsummering = () => {
    const intl = useIntl();
    const { dispatch, state } = useForeldrepengesøknadContext();
    const history = useHistory();
    const { kvittering } = state;
    const bem = bemUtils('oppsummering');
    const { barn, annenForelder, søker, informasjonOmUtenlandsopphold, søkersituasjon } = useSøknad();
    const søkerinfo = useSøkerinfo();
    const søknad = useSøknad();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onAvbrytSøknad = useAvbrytSøknad();

    useEffect(() => {
        if (isSubmitting) {
            const cleanedSøknad = cleanUpSøknadsdataForInnsending(søknad);

            Api.sendSøknad(cleanedSøknad, søkerinfo.person.fnr).then((response) => {
                dispatch(actionCreator.setKvittering(response.data));
            });
        }
    }, [søknad, dispatch, søkerinfo.person.fnr, isSubmitting]);

    useEffect(() => {
        if (kvittering !== undefined) {
            setIsSubmitting(false);
            history.push(SøknadRoutes.SØKNAD_SENDT);
        }
    }, [kvittering, history]);

    const handleSubmit = (values: Partial<OppsummeringFormData>) => {
        dispatch(actionCreator.setGodkjentOppsummering(values.harGodkjentOppsummering!));
        setIsSubmitting(true);
    };

    return (
        <OppsummeringFormComponents.FormikWrapper
            initialValues={getInitialOppsummeringValues()}
            onSubmit={handleSubmit}
            renderForm={() => {
                return (
                    <OppsummeringFormComponents.Form includeButtons={false}>
                        <Step
                            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                            backLinkHref={getPreviousStepHref('oppsummering')}
                            activeStepId="oppsummering"
                            pageTitle={intlUtils(intl, 'søknad.oppsummering')}
                            stepTitle={intlUtils(intl, 'søknad.oppsummering')}
                            onCancel={onAvbrytSøknad}
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
                                        <Personalia søkerinfo={søkerinfo} />
                                    </Block>
                                    <OppsummeringsPanel title="Om barnet">
                                        <BarnOppsummering barn={barn} />
                                    </OppsummeringsPanel>
                                    <OppsummeringsPanel title="Den andre forelderen">
                                        <AnnenForelderOppsummering
                                            annenForelder={annenForelder}
                                            søker={søker}
                                            søkerrolle={søkersituasjon.rolle}
                                        />
                                    </OppsummeringsPanel>
                                    <OppsummeringsPanel title="Utenlandsopphold">
                                        <UtenlandsoppholdOppsummering
                                            informasjonOmUtenlandsopphold={informasjonOmUtenlandsopphold}
                                            barn={barn}
                                        />
                                    </OppsummeringsPanel>
                                    <OppsummeringsPanel title="Arbeidsforhold og andre inntektskilder">
                                        <ArbeidsforholdOgAndreInntekterOppsummering />
                                    </OppsummeringsPanel>
                                </div>
                            </Block>
                            <Block padBottom="l">
                                <OppsummeringFormComponents.ConfirmationCheckbox
                                    name={OppsummeringFormField.harGodkjentOppsummering}
                                    label={intlUtils(intl, 'oppsummering.harGodkjentOppsummering')}
                                    validate={validateHarGodkjentOppsummering(intl)}
                                />
                            </Block>
                            <Block padBottom="l">
                                <div style={{ textAlign: 'center' }}>
                                    <Hovedknapp disabled={isSubmitting} spinner={isSubmitting}>
                                        Send inn søknad
                                    </Hovedknapp>
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
