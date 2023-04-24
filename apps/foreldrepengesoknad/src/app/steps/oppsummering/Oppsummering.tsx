import { bemUtils, Block, intlUtils, Step } from '@navikt/fp-common';
import { useEffect, useMemo, useState } from 'react';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { FormattedMessage, useIntl } from 'react-intl';
import stepConfig, { getPreviousStepHref, getPreviousStepHrefEndringssøknad } from '../stepsConfig';
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
import {
    FEIL_VED_INNSENDING,
    FOR_MANGE_VEDLEGG_ERROR,
    getErrorCallId,
    getSøknadsdataForInnsending,
    UKJENT_UUID,
} from 'app/api/apiUtils';
import { useNavigate } from 'react-router-dom';

import SøknadRoutes from 'app/routes/routes';
import UttaksplanOppsummering from './components/uttaksplan-oppsummering/UttaksplanOppsummering';
import { getErSøkerFarEllerMedmor, getFarMedmorErAleneOmOmsorg, getNavnPåForeldre } from 'app/utils/personUtils';
import { beskrivTilleggsopplysning } from 'app/utils/tilleggsopplysningerUtils';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import { ISOStringToDate } from 'app/utils/dateUtils';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { redirectToLogin } from 'app/utils/redirectToLogin';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { sendErrorMessageToSentry } from '../../api/apiUtils';
import useSaveLoadedRoute from 'app/utils/hooks/useSaveLoadedRoute';

import './oppsummering.less';
import { Button, GuidePanel } from '@navikt/ds-react';

const Oppsummering = () => {
    const intl = useIntl();
    const { dispatch, state } = useForeldrepengesøknadContext();
    const navigate = useNavigate();
    const { kvittering, eksisterendeSak } = state;
    const bem = bemUtils('oppsummering');

    const [submitError, setSubmitError] = useState<any>(undefined);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSendingSøknad, setIsSendingSøknad] = useState(false);
    const {
        barn,
        annenForelder,
        søker,
        informasjonOmUtenlandsopphold,
        søkersituasjon,
        dekningsgrad,
        uttaksplan,
        tilleggsopplysninger,
        erEndringssøknad,
    } = useSøknad();

    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const søkerinfo = useSøkerinfo();
    const { person, arbeidsforhold } = søkerinfo;
    const { erAleneOmOmsorg } = søker;
    const søknad = useSøknad();
    const onAvbrytSøknad = useAvbrytSøknad();
    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const navnPåForeldre = getNavnPåForeldre(person, annenForelder, søkerErFarEllerMedmor, intl);
    const antallUkerUttaksplan = state.antallUkerIUttaksplan;
    const begrunnelseForSenEndring = tilleggsopplysninger.begrunnelseForSenEndring
        ? beskrivTilleggsopplysning(tilleggsopplysninger.begrunnelseForSenEndring)
        : undefined;
    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(søkerErFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(søknad.barn));
    const termindato = getTermindato(søknad.barn);
    const erEndringssøknadOgAnnenForelderHarRett =
        erEndringssøknad && isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge;
    const erklæringOmAnnenForelderInformert = erEndringssøknadOgAnnenForelderHarRett
        ? intlUtils(intl, 'oppsummering.harGodkjentOppsummering.endringssøknadMedAnnenForelder', {
              navnAnnenForelder: annenForelder.fornavn,
          })
        : '';
    const egenerklæringTekst = intlUtils(intl, 'oppsummering.harGodkjentOppsummering').concat(
        erklæringOmAnnenForelderInformert
    );
    const cleanedSøknad = useMemo(
        () =>
            getSøknadsdataForInnsending(
                søknad,
                state.perioderSomSkalSendesInn,
                familiehendelsesdato!,
                state.endringstidspunkt
            ),
        [søknad, state.perioderSomSkalSendesInn, familiehendelsesdato, state.endringstidspunkt]
    );
    useSaveLoadedRoute(SøknadRoutes.OPPSUMMERING);

    useEffect(() => {
        if (formSubmitted && !isSendingSøknad) {
            setIsSendingSøknad(true);
            if (cleanedSøknad.uttaksplan.length === 0 && cleanedSøknad.erEndringssøknad) {
                throw new Error('Søknaden din inneholder ingen nye perioder.');
            }
            Api.sendSøknad(cleanedSøknad, søkerinfo.person.fnr)
                .then((response) => {
                    dispatch(actionCreator.setKvittering(response.data));
                })
                .catch((error) => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        redirectToLogin();
                    } else {
                        setSubmitError(error);
                    }
                });
        }
    }, [dispatch, søkerinfo.person.fnr, formSubmitted, cleanedSøknad, isSendingSøknad]);

    useEffect(() => {
        if (kvittering !== undefined) {
            setFormSubmitted(false);
            navigate(SøknadRoutes.SØKNAD_SENDT);
        }
    }, [kvittering, navigate]);

    useEffect(() => {
        if (submitError !== undefined) {
            sendErrorMessageToSentry(submitError);
            if (
                submitError.response &&
                submitError.response.status === 400 &&
                submitError.response.data &&
                submitError.response.data.messages &&
                submitError.response.data.messages.includes(
                    'Vedleggslisten kan ikke inneholde flere enn 40 opplastede vedlegg'
                )
            ) {
                throw new Error(FOR_MANGE_VEDLEGG_ERROR);
            }
            sendErrorMessageToSentry(submitError);
            const submitErrorCallId = getErrorCallId(submitError);
            const callIdForBruker =
                submitErrorCallId !== UKJENT_UUID ? submitErrorCallId.slice(0, 8) : submitErrorCallId;
            throw new Error(FEIL_VED_INNSENDING + callIdForBruker);
        }
    }, [submitError]);

    const handleSubmit = (values: Partial<OppsummeringFormData>) => {
        dispatch(actionCreator.setGodkjentOppsummering(values.harGodkjentOppsummering!));
        setFormSubmitted(true);
    };

    const submitKnappTekst = formSubmitted
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
                            backLinkHref={
                                søknad.erEndringssøknad
                                    ? getPreviousStepHrefEndringssøknad('oppsummering')
                                    : getPreviousStepHref('oppsummering')
                            }
                            activeStepId="oppsummering"
                            pageTitle={intlUtils(intl, 'søknad.oppsummering')}
                            onCancel={onAvbrytSøknad}
                            onContinueLater={onFortsettSøknadSenere}
                            steps={stepConfig(intl)}
                        >
                            <Block padBottom="l">
                                <GuidePanel>
                                    <FormattedMessage id="oppsummering.veileder" />
                                </GuidePanel>
                            </Block>
                            <Block padBottom="l">
                                <div className={bem.block}>
                                    <OppsummeringsPanel title="Deg">
                                        <Personalia søkerinfo={søkerinfo} />
                                    </OppsummeringsPanel>
                                    {!erEndringssøknad && (
                                        <OppsummeringsPanel title="Barnet">
                                            <BarnOppsummering barn={barn} />
                                        </OppsummeringsPanel>
                                    )}
                                    {!erEndringssøknad && (
                                        <OppsummeringsPanel title="Den andre forelderen">
                                            <AnnenForelderOppsummering
                                                annenForelder={annenForelder}
                                                søker={søker}
                                                søkerrolle={søkersituasjon.rolle}
                                                barn={barn}
                                                farMedmorErAleneOmOmsorg={farMedmorErAleneOmOmsorg}
                                            />
                                        </OppsummeringsPanel>
                                    )}
                                    {!erEndringssøknad && (
                                        <OppsummeringsPanel title="Utenlandsopphold">
                                            <UtenlandsoppholdOppsummering
                                                informasjonOmUtenlandsopphold={informasjonOmUtenlandsopphold}
                                                barn={barn}
                                            />
                                        </OppsummeringsPanel>
                                    )}
                                    {!erEndringssøknad && (
                                        <OppsummeringsPanel title="Arbeidsforhold og andre inntektskilder">
                                            <ArbeidsforholdOgAndreInntekterOppsummering />
                                        </OppsummeringsPanel>
                                    )}
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
                                            familiehendelsesdato={familiehendelsesdato!}
                                            termindato={termindato}
                                            situasjon={søkersituasjon.situasjon}
                                            erAleneOmOmsorg={erAleneOmOmsorg}
                                            antallBarn={søknad.barn.antallBarn}
                                            ønskerJustertUttakVedFødsel={søknad.ønskerJustertUttakVedFødsel}
                                        />
                                    </OppsummeringsPanel>
                                </div>
                            </Block>
                            <Block padBottom="l">
                                <OppsummeringFormComponents.ConfirmationCheckbox
                                    name={OppsummeringFormField.harGodkjentOppsummering}
                                    label={egenerklæringTekst}
                                    validate={validateHarGodkjentOppsummering(intl)}
                                />
                            </Block>
                            <Block padBottom="l">
                                <div style={{ textAlign: 'center' }}>
                                    <Button type="submit" disabled={formSubmitted} loading={formSubmitted}>
                                        {submitKnappTekst}
                                    </Button>
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
