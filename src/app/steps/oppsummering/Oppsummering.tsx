import { bemUtils, Block, intlUtils, Step } from '@navikt/fp-common';
import VeilederNormal from 'app/assets/VeilederNormal';
import SøknadRoutes from 'app/routes/routes';
import { Hovedknapp } from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React from 'react';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSetCurrentRoute from 'app/utils/hooks/useSetCurrentRoute';
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

import './oppsummering.less';
import {
    getInitialOppsummeringValues,
    OppsummeringFormComponents,
    OppsummeringFormField,
} from './oppsummeringFormConfig';
import { validateHarGodkjentOppsummering } from './validation/oppsummeringValidation';

const Oppsummering = () => {
    const intl = useIntl();
    const bem = bemUtils('oppsummering');
    const { barn, annenForelder, søker, informasjonOmUtenlandsopphold } = useSøknad();
    const søkerinfo = useSøkerinfo()

    useSetCurrentRoute(SøknadRoutes.OPPSUMMERING);

    const onValidSubmitHandler = () => { return [] };

    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.SØKNAD_SENDT);
    const onAvbrytSøknad = useAvbrytSøknad();

    return (
        <OppsummeringFormComponents.FormikWrapper
            initialValues={getInitialOppsummeringValues()}
            onSubmit={onValidSubmit}
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
                                    validate={validateHarGodkjentOppsummering(intl)}
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
