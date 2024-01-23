import { PaperplaneIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useAbortSignal } from '@navikt/fp-api';
import {
    Block,
    ISOStringToDate,
    Step,
    StepButtonWrapper,
    Søkerinfo,
    bemUtils,
    getErSøkerFarEllerMedmor,
    getFarMedmorErAleneOmOmsorg,
    getNavnPåForeldre,
    intlUtils,
    isAnnenForelderOppgitt,
} from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OppsummeringsPanel from './components/OppsummeringsPanel';
import Personalia from './components/Personalia';
import ArbeidsforholdOgAndreInntekterOppsummering from './components/andre-inntekter-oppsummering/ArbeidsforholdOgAndreInntekterOppsummering';
import AnnenForelderOppsummering from './components/annen-forelder-oppsummering/AnnenForelderOppsummering';
import BarnOppsummering from './components/barn-oppsummering/BarnOppsummering';
import UtenlandsoppholdOppsummering from './components/utenlandsopphold-oppsummering/UtenlandsoppholdOppsummering';
import UttaksplanOppsummering from './components/uttaksplan-oppsummering/UttaksplanOppsummering';
import {
    OppsummeringFormComponents,
    OppsummeringFormData,
    OppsummeringFormField,
    getInitialOppsummeringValues,
} from './oppsummeringFormConfig';
import { validateHarGodkjentOppsummering } from './validation/oppsummeringValidation';

import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
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

    const stepConfig = useStepConfig(erEndringssøknad);
    const navigator = useFpNavigator(mellomlagreSøknadOgNaviger, erEndringssøknad);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const abortSignal = useAbortSignal();

    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const søker = notEmpty(useContextGetData(ContextDataType.SØKER));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const periodeMedForeldrepenger = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));
    const uttaksplanMetadata = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_METADATA));
    const utenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD);
    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);
    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const navnPåForeldre = getNavnPåForeldre(søkerInfo.person, annenForelder, søkerErFarEllerMedmor, intl);

    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(
        søkerErFarEllerMedmor,
        søker.erAleneOmOmsorg,
        annenForelder,
    );
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
                            onCancel={avbrytSøknad}
                            onContinueLater={navigator.fortsettSøknadSenere}
                            steps={stepConfig}
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
                                                barn={barn}
                                                farMedmorErAleneOmOmsorg={farMedmorErAleneOmOmsorg}
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
                                            dekningsgrad={periodeMedForeldrepenger.dekningsgrad}
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
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={navigator.goToPreviousDefaultStep}
                                    >
                                        <FormattedMessage id="Oppsummering.Forrige" />
                                    </Button>
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
