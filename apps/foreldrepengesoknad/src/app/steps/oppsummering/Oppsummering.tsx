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
    getFarMedmorErAleneOmOmsorg,
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
import { beskrivTilleggsopplysning } from 'app/utils/tilleggsopplysningerUtils';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { FpDataType, useFpStateData } from 'app/context/FpDataContext';

import './oppsummering.less';
import BackButton from '../BackButton';

export interface Props {
    søkerInfo: Søkerinfo;
    erEndringssøknad: boolean;
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    mellomlagreSøknadOgNaviger: () => void;
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

    const barn = notEmpty(useFpStateData(FpDataType.OM_BARNET));
    const annenForelder = notEmpty(useFpStateData(FpDataType.ANNEN_FORELDER));
    const søker = notEmpty(useFpStateData(FpDataType.SØKER));
    const søkersituasjon = notEmpty(useFpStateData(FpDataType.SØKERSITUASJON));
    const uttaksplan = notEmpty(useFpStateData(FpDataType.UTTAKSPLAN));
    const uttaksplanMetadata = notEmpty(useFpStateData(FpDataType.UTTAKSPLAN_METADATA));
    const utenlandsopphold = notEmpty(useFpStateData(FpDataType.UTENLANDSOPPHOLD));
    const senereUtenlandsopphold = useFpStateData(FpDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = useFpStateData(FpDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const eksisterendeSak = useFpStateData(FpDataType.EKSISTERENDE_SAK);

    const tilleggsopplysninger = uttaksplanMetadata.tilleggsopplysninger;

    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const navnPåForeldre = getNavnPåForeldre(søkerInfo.person, annenForelder, søkerErFarEllerMedmor, intl);
    const begrunnelseForSenEndring = tilleggsopplysninger?.begrunnelseForSenEndring
        ? beskrivTilleggsopplysning(tilleggsopplysninger.begrunnelseForSenEndring)
        : undefined;
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
                                                barn={barn}
                                                farMedmorErAleneOmOmsorg={farMedmorErAleneOmOmsorg}
                                            />
                                        </OppsummeringsPanel>
                                    )}
                                    {!erEndringssøknad && (
                                        <OppsummeringsPanel title="Utenlandsopphold">
                                            <UtenlandsoppholdOppsummering
                                                utenlandsopphold={utenlandsopphold}
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
                                            begrunnelseForSenEndring={begrunnelseForSenEndring}
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
                                    <BackButton
                                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                                        route={
                                            erEndringssøknad
                                                ? getPreviousStepHrefEndringssøknad('oppsummering')
                                                : getPreviousStepHref('oppsummering')
                                        }
                                    />
                                    <Button
                                        icon={<PaperplaneIcon />}
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
