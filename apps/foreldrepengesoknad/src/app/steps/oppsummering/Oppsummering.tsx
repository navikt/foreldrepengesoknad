import { FormattedMessage, useIntl } from 'react-intl';
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@navikt/ds-react';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import { notEmpty } from '@navikt/fp-validation';
import { useAbortSignal } from '@navikt/fp-api';
import {
    bemUtils,
    Block,
    getErSøkerFarEllerMedmor,
    getNavnPåForeldre,
    intlUtils,
    isAnnenForelderOppgitt,
    ISOStringToDate,
    Step,
    StepButtonWrapper,
    Søkerinfo,
} from '@navikt/fp-common';
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
import SøknadRoutes from 'app/routes/routes';
import UttaksplanOppsummering from './components/uttaksplan-oppsummering/UttaksplanOppsummering';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import DokumentasjonOppsummering from './components/dokumentasjon-oppsummering/DokumentasjonOppsummering';
import BackButton from '../BackButton';

import './oppsummering.less';

export interface Props {
    søkerInfo: Søkerinfo;
    erEndringssøknad: boolean;
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
}

const Oppsummering: FunctionComponent<Props> = ({
    søkerInfo,
    erEndringssøknad,
    sendSøknad,
    avbrytSøknad,
    mellomlagreSøknadOgNaviger,
}) => {
    const bem = bemUtils('oppsummering');
    const intl = useIntl();
    const navigate = useNavigate();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const abortSignal = useAbortSignal();

    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const søker = notEmpty(useContextGetData(ContextDataType.SØKER));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));
    const uttaksplanMetadata = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_METADATA));
    const utenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD);
    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG);

    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const navnPåForeldre = getNavnPåForeldre(søkerInfo.person, annenForelder, søkerErFarEllerMedmor, intl);
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn));
    const termindato = getTermindato(barn);
    const erEndringssøknadOgAnnenForelderHarRett =
        erEndringssøknad && isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge;
    const erklæringOmAnnenForelderInformert = erEndringssøknadOgAnnenForelderHarRett
        ? intlUtils(intl, 'oppsummering.harGodkjentOppsummering.endringssøknadMedAnnenForelder', {
              navnAnnenForelder: annenForelder.fornavn,
          })
        : '';
    const egenerklæringTekst = intlUtils(intl, 'oppsummering.harGodkjentOppsummering').concat(
        erklæringOmAnnenForelderInformert,
    );

    const sendInn = async (values: Partial<OppsummeringFormData>) => {
        if (values.harGodkjentOppsummering) {
            setIsSubmitting(true);
            await sendSøknad(abortSignal);
            navigate(SøknadRoutes.SØKNAD_SENDT);
        }
    };

    return (
        <OppsummeringFormComponents.FormikWrapper
            initialValues={getInitialOppsummeringValues()}
            onSubmit={sendInn}
            renderForm={() => {
                return (
                    <OppsummeringFormComponents.Form includeButtons={false}>
                        <Step
                            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                            activeStepId="oppsummering"
                            pageTitle={intlUtils(intl, 'søknad.oppsummering')}
                            onCancel={avbrytSøknad}
                            onContinueLater={onFortsettSøknadSenere}
                            steps={stepConfig(intl, erEndringssøknad)}
                        >
                            <Block padBottom="l">
                                <div className={bem.block}>
                                    <OppsummeringsPanel title="Deg">
                                        <Personalia søkerinfo={søkerInfo} />
                                    </OppsummeringsPanel>
                                    {!erEndringssøknad && (
                                        <OppsummeringsPanel title="Barnet">
                                            <BarnOppsummering
                                                barn={barn}
                                                familiehendelsesdato={familiehendelsesdato!}
                                            />
                                        </OppsummeringsPanel>
                                    )}
                                    {!erEndringssøknad && (
                                        <OppsummeringsPanel title="Den andre forelderen">
                                            <AnnenForelderOppsummering
                                                annenForelder={annenForelder}
                                                søker={søker}
                                                søkerrolle={søkersituasjon.rolle}
                                            />
                                        </OppsummeringsPanel>
                                    )}
                                    {!erEndringssøknad && (
                                        <OppsummeringsPanel title="Utenlandsopphold">
                                            <UtenlandsoppholdOppsummering
                                                utenlandsopphold={notEmpty(utenlandsopphold)}
                                                tidligereUtenlandsopphold={tidligereUtenlandsopphold?.tidligereOpphold}
                                                senereUtenlandsopphold={senereUtenlandsopphold?.senereOpphold}
                                                barn={barn}
                                            />
                                        </OppsummeringsPanel>
                                    )}
                                    {!erEndringssøknad && (
                                        <OppsummeringsPanel title="Arbeidsforhold og andre inntektskilder">
                                            <ArbeidsforholdOgAndreInntekterOppsummering
                                                arbeidsforhold={søkerInfo.arbeidsforhold}
                                                barn={barn}
                                                søkersituasjon={søkersituasjon}
                                                søker={søker}
                                            />
                                        </OppsummeringsPanel>
                                    )}
                                    <OppsummeringsPanel title={intlUtils(intl, 'oppsummering.uttak')}>
                                        <UttaksplanOppsummering
                                            perioder={uttaksplan}
                                            navnPåForeldre={navnPåForeldre}
                                            annenForelder={annenForelder}
                                            erFarEllerMedmor={søkerErFarEllerMedmor}
                                            registrerteArbeidsforhold={søkerInfo.arbeidsforhold}
                                            dekningsgrad={uttaksplanMetadata.dekningsgrad!}
                                            antallUkerUttaksplan={uttaksplanMetadata.antallUkerIUttaksplan!}
                                            eksisterendeUttaksplan={
                                                eksisterendeSak ? eksisterendeSak.uttaksplan : undefined
                                            }
                                            familiehendelsesdato={familiehendelsesdato!}
                                            termindato={termindato}
                                            situasjon={søkersituasjon.situasjon}
                                            erAleneOmOmsorg={søker.erAleneOmOmsorg}
                                            antallBarn={barn.antallBarn}
                                            ønskerJustertUttakVedFødsel={uttaksplanMetadata.ønskerJustertUttakVedFødsel}
                                        />
                                    </OppsummeringsPanel>
                                    {vedlegg && (
                                        <OppsummeringsPanel title="Dokumentasjon">
                                            <DokumentasjonOppsummering vedlegg={vedlegg} />
                                        </OppsummeringsPanel>
                                    )}
                                </div>
                            </Block>
                            <Block padBottom="l">
                                <OppsummeringFormComponents.ConfirmationCheckbox
                                    name={OppsummeringFormField.harGodkjentOppsummering}
                                    label={egenerklæringTekst}
                                    validate={validateHarGodkjentOppsummering(intl)}
                                />
                            </Block>
                            <Block margin="l" padBottom="l">
                                <StepButtonWrapper lastStep={true}>
                                    <BackButton
                                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                                        route={
                                            erEndringssøknad
                                                ? getPreviousStepHrefEndringssøknad('oppsummering')
                                                : getPreviousStepHref('oppsummering')
                                        }
                                    />
                                    <Button
                                        icon={<PaperplaneIcon aria-hidden />}
                                        iconPosition="right"
                                        type="submit"
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                    >
                                        <FormattedMessage id="oppsummering.sendInnSøknad" />
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </Step>
                    </OppsummeringFormComponents.Form>
                );
            }}
        />
    );
};

export default Oppsummering;
