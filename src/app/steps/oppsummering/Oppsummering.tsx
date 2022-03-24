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
import { getSøknadsdataForInnsending } from 'app/api/apiUtils';
import { useNavigate } from 'react-router-dom';

import './oppsummering.less';
import SøknadRoutes from 'app/routes/routes';
import UttaksplanOppsummering from './components/uttaksplan-oppsummering/UttaksplanOppsummering';
import { getErSøkerFarEllerMedmor, getNavnPåForeldre } from 'app/utils/personUtils';
import { beskrivTilleggsopplysning } from 'app/utils/tilleggsopplysningerUtils';

const Oppsummering = () => {
    const intl = useIntl();
    const { dispatch, state } = useForeldrepengesøknadContext();
    const navigate = useNavigate();
    const { kvittering, eksisterendeSak } = state;
    const bem = bemUtils('oppsummering');

    const [submitError, setSubmitError] = useState(undefined);
    const {
        barn,
        annenForelder,
        søker,
        informasjonOmUtenlandsopphold,
        søkersituasjon,
        dekningsgrad,
        uttaksplan,
        tilleggsopplysninger,
    } = useSøknad();

    const søkerinfo = useSøkerinfo();
    const { person, arbeidsforhold } = søkerinfo;
    const søknad = useSøknad();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onAvbrytSøknad = useAvbrytSøknad();
    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const navnPåForeldre = getNavnPåForeldre(person, annenForelder, søkerErFarEllerMedmor);
    const antallUkerUttaksplan = state.antallUkerIUttaksplan;
    const begrunnelseForSenEndring = tilleggsopplysninger.begrunnelseForSenEndring
        ? beskrivTilleggsopplysning(tilleggsopplysninger.begrunnelseForSenEndring)
        : undefined;

    useEffect(() => {
        if (isSubmitting) {
            const cleanedSøknad = getSøknadsdataForInnsending(
                søknad,
                state.perioderSomSkalSendesInn,
                state.endringstidspunkt
            );

            Api.sendSøknad(cleanedSøknad, søkerinfo.person.fnr)
                .then((response) => {
                    dispatch(actionCreator.setKvittering(response.data));
                })
                .catch((error) => setSubmitError(error));
        }
    }, [søknad, dispatch, søkerinfo.person.fnr, isSubmitting]);

    useEffect(() => {
        if (kvittering !== undefined) {
            setIsSubmitting(false);
            navigate(SøknadRoutes.SØKNAD_SENDT);
        }
    }, [kvittering, navigate]);

    useEffect(() => {
        if (submitError !== undefined) {
            throw new Error(submitError);
        }
    }, [submitError]);

    const handleSubmit = (values: Partial<OppsummeringFormData>) => {
        dispatch(actionCreator.setGodkjentOppsummering(values.harGodkjentOppsummering!));
        setIsSubmitting(true);
    };

    const submitKnappTekst = isSubmitting
        ? intlUtils(intl, 'oppsummering.senderInnSøknad')
        : intlUtils(intl, 'oppsummering.sendInnSøknad');

    return (
        <OppsummeringFormComponents.FormikWrapper
            initialValues={getInitialOppsummeringValues()}
            onSubmit={handleSubmit}
            renderForm={() => {
                return (
                    <OppsummeringFormComponents.Form includeButtons={false}>
                        <Step
                            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                            backLinkHref={getPreviousStepHref('oppsummering', søknad.erEndringssøknad)}
                            activeStepId="oppsummering"
                            pageTitle={intlUtils(intl, 'søknad.oppsummering')}
                            stepTitle={intlUtils(intl, 'søknad.oppsummering')}
                            onCancel={onAvbrytSøknad}
                            onContinueLater={() => null}
                            steps={stepConfig(intl)}
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
                                    <OppsummeringsPanel title={intlUtils(intl, 'oppsummering.uttak')}>
                                        <UttaksplanOppsummering
                                            perioder={uttaksplan}
                                            navnPåForeldre={navnPåForeldre}
                                            annenForelder={annenForelder}
                                            erFarEllerMedmor={søkerErFarEllerMedmor}
                                            registrerteArbeidsforhold={arbeidsforhold}
                                            dekningsgrad={dekningsgrad}
                                            antallUkerUttaksplan={antallUkerUttaksplan}
                                            begrunnelseForSenEndring={begrunnelseForSenEndring}
                                            //begrunnelseForSenEndringVedlegg={søknad.vedleggForSenEndring}
                                            eksisterendeUttaksplan={
                                                eksisterendeSak ? eksisterendeSak.uttaksplan : undefined
                                            }
                                        />
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
                                        {submitKnappTekst}
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
