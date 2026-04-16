import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { VedleggDataType } from 'types/VedleggDataType';
import { perioderSomKreverVedlegg } from 'utils/manglendeVedleggUtils';
import { getErSøkerFarEllerMedmor, getNavnPåForeldre } from 'utils/personUtils';

import { Alert, BodyLong, Heading, VStack } from '@navikt/ds-react';

import { Skjemanummer } from '@navikt/fp-constants';
import { RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Attachment, FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { SkjemaRotLayout, Step } from '@navikt/fp-ui';
import { Uttaksperioden, getFamiliehendelsedato } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ManglendeVedleggFormData } from './ManglendeVedleggFormData';
import { AleneomsorgDokumentasjon } from './dokumentasjon/AleneomsorgDokumentasjon';
import { BarnInnlagtDokumentasjon } from './dokumentasjon/BarnInnlagtDokumentasjon';
import { EtterlønnEllerSluttvederlagDokumentasjon } from './dokumentasjon/EtterlønnEllerSluttvederlagDokumentasjon';
import { FarForSykDokumentasjon } from './dokumentasjon/FarForSykDokumentasjon';
import { FarInnlagtDokumentasjon } from './dokumentasjon/FarInnlagtDokumentasjon';
import { MilitærEllerSiviltjenesteDokumentasjon } from './dokumentasjon/MilitærEllerSiviltjenesteDokumentasjon';
import { MorForSykDokumentasjon } from './dokumentasjon/MorForSykDokumentasjon';
import { MorInnlagtDokumentasjon } from './dokumentasjon/MorInnlagtDokumentasjon';
import { MorIntroduksjonsprogrammetDokumentasjon } from './dokumentasjon/MorIntroduksjonsprogrammetDokumentasjon';
import { MorJobberDokumentasjon } from './dokumentasjon/MorJobberDokumentasjon';
import { MorJobberOgStudererDokumentasjon } from './dokumentasjon/MorJobberOgStudererDokumentasjon';
import { MorKvalifiseringsprogrammetDokumentasjon } from './dokumentasjon/MorKvalifiseringsprogrammetDokumentasjon';
import { MorStudererDokumentasjon } from './dokumentasjon/MorStudererDokumentasjon';
import { OmsorgsovertakelseDokumentasjon } from './dokumentasjon/OmsorgsovertakelseDokumentasjon';
import { TerminbekreftelseDokumentasjon } from './dokumentasjon/TerminbekreftelseDokumentasjon';
import {
    getAleneOmOmsorgVedlegg,
    getBarnInnlagtVedlegg,
    getEtterlønnEllerSluttvederlagVedlegg,
    getFarForSykVedlegg,
    getFarInnlagtVedlegg,
    getMilitærEllerSiviltjenesteVedlegg,
    getMorForSykVedlegg,
    getMorInnlagtVedlegg,
    getMorIntroprogramVedlegg,
    getMorJobberOgStudererVedlegg,
    getMorJobberVedlegg,
    getMorKvalprogramVedlegg,
    getMorStudererVedlegg,
    getOmsorgsovertakelseVedlegg,
    getTerminbekreftelseVedlegg,
    isOverføringFarForSyk,
    isPeriodeMedFarInnleggelse,
    isPeriodeMedMorForSyk,
    isPeriodeMedMorInnleggelse,
    isPeriodeMedMorIntroprogram,
    isPeriodeMedMorJobber,
    isPeriodeMedMorJobberOgStuderer,
    isPeriodeMedMorKvalprogram,
    isPeriodeMedMorStuderer,
    isUtsettelseBarnInnlagt,
} from './util';

type Props = {
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    erEndringssøknad: boolean;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    foreldrepengerSaker?: FpSak_fpoversikt[];
};

export const ManglendeVedlegg = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    søkerInfo,
    erEndringssøknad,
    foreldrepengerSaker,
}: Props) => {
    const intl = useIntl();
    const navigator = useFpNavigator(søkerInfo.arbeidsforhold, mellomlagreSøknadOgNaviger, erEndringssøknad);

    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG) || ({} as VedleggDataType);
    const arbeidsforholdOgInntekt = useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const andreInntektskilder = useContextGetData(ContextDataType.ANDRE_INNTEKTSKILDER);
    const eksisterendeSaksnummer = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);
    const saveVedlegg = useContextSaveData(ContextDataType.VEDLEGG);
    const familiehendelsedato = getFamiliehendelsedato(barn);

    const eksisterendeSak = foreldrepengerSaker?.find((sak) => sak.saksnummer === eksisterendeSaksnummer);

    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold, erEndringssøknad, eksisterendeSak);

    const erFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const uttaksplanUtenAnnenPartsPerioder = uttaksplan?.filter(
        (periode) =>
            Uttaksperioden.erIkkeEøsPeriode(periode) && periode.forelder === (erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR'),
    );
    const perioderSomManglerVedlegg = perioderSomKreverVedlegg(
        uttaksplanUtenAnnenPartsPerioder || [],
        erFarEllerMedmor,
        annenForelder,
        familiehendelsedato,
    );
    const morInnlagtVedlegg = getMorInnlagtVedlegg(vedlegg);
    const morForSykVedlegg = getMorForSykVedlegg(vedlegg);
    const farInnlagtVedlegg = getFarInnlagtVedlegg(vedlegg);
    const farForSykvedlegg = getFarForSykVedlegg(vedlegg);
    const barnInnlagtVedlegg = getBarnInnlagtVedlegg(vedlegg);
    const morStudererVedlegg = getMorStudererVedlegg(vedlegg);
    const morJobberVedlegg = getMorJobberVedlegg(vedlegg);
    const morJobberOgStudererVedlegg = getMorJobberOgStudererVedlegg(vedlegg);
    const morIntroprogramVedlegg = getMorIntroprogramVedlegg(vedlegg);
    const morKvalprogramVedlegg = getMorKvalprogramVedlegg(vedlegg);
    const aleneomsorgVedlegg = getAleneOmOmsorgVedlegg(vedlegg);
    const terminbekreftelseVedlegg = getTerminbekreftelseVedlegg(vedlegg);
    const adopsjonVedlegg = getOmsorgsovertakelseVedlegg(vedlegg);
    const militærEllerSiviltjenesteVedlegg = getMilitærEllerSiviltjenesteVedlegg(vedlegg);
    const etterlønnEllerSluttvederlagVedlegg = getEtterlønnEllerSluttvederlagVedlegg(vedlegg);

    const morInnlagtPerioder = perioderSomManglerVedlegg.filter((periode) =>
        isPeriodeMedMorInnleggelse(periode, familiehendelsedato),
    );
    const barnInnlagtPerioder = perioderSomManglerVedlegg.filter(isUtsettelseBarnInnlagt);
    const farForSykPerioder = perioderSomManglerVedlegg.filter(isOverføringFarForSyk);
    const farInnlagtPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedFarInnleggelse);
    const morForSykPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedMorForSyk);
    const morIntroPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedMorIntroprogram);
    const morJobberPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedMorJobber);

    const morJobberOgStudererPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedMorJobberOgStuderer);
    const morKvalPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedMorKvalprogram);
    const morStudererPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedMorStuderer);

    const navnPåForeldre = getNavnPåForeldre(søkerInfo, annenForelder, erFarEllerMedmor, intl);

    const lagre = (formValues: ManglendeVedleggFormData) => {
        const alleVedlegg = {
            ...vedlegg,
            [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: morKvalPerioder.length
                ? formValues[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]
                : [],
            [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:
                morIntroPerioder.length > 0 ? formValues[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET] : [],
            [Skjemanummer.DOK_INNLEGGELSE_MOR]:
                morInnlagtPerioder.length > 0 ? formValues[Skjemanummer.DOK_INNLEGGELSE_MOR] : [],
            [Skjemanummer.DOK_INNLEGGELSE_BARN]:
                barnInnlagtPerioder.length > 0 ? formValues[Skjemanummer.DOK_INNLEGGELSE_BARN] : [],
            [Skjemanummer.DOK_INNLEGGELSE_FAR]:
                farInnlagtPerioder.length > 0 ? formValues[Skjemanummer.DOK_INNLEGGELSE_FAR] : [],
            [Skjemanummer.DOK_SYKDOM_MOR]: morForSykPerioder.length > 0 ? formValues[Skjemanummer.DOK_SYKDOM_MOR] : [],
            [Skjemanummer.DOK_SYKDOM_FAR]: farForSykPerioder.length > 0 ? formValues[Skjemanummer.DOK_SYKDOM_FAR] : [],
            [Skjemanummer.DOK_UTDANNING_MOR]:
                morStudererPerioder.length > 0 ? formValues[Skjemanummer.DOK_UTDANNING_MOR] : [],
            [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]:
                morJobberOgStudererPerioder.length > 0 ? formValues[Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR] : [],
            [Skjemanummer.DOK_ARBEID_MOR]: morJobberPerioder.length > 0 ? formValues[Skjemanummer.DOK_ARBEID_MOR] : [],
            [Skjemanummer.DOK_AV_ALENEOMSORG]: formValues[Skjemanummer.DOK_AV_ALENEOMSORG] || [],
            [Skjemanummer.TERMINBEKREFTELSE]: formValues[Skjemanummer.TERMINBEKREFTELSE] || [],
            [Skjemanummer.OMSORGSOVERTAKELSE]: formValues[Skjemanummer.OMSORGSOVERTAKELSE] || [],
            [Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]: formValues[Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE] || [],
            [Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]: formValues[Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG] || [],
        };

        saveVedlegg(alleVedlegg);

        return navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<ManglendeVedleggFormData>({
        defaultValues: {
            [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: morKvalprogramVedlegg,
            [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: morIntroprogramVedlegg,
            [Skjemanummer.DOK_INNLEGGELSE_MOR]: morInnlagtVedlegg,
            [Skjemanummer.DOK_INNLEGGELSE_BARN]: barnInnlagtVedlegg,
            [Skjemanummer.DOK_INNLEGGELSE_FAR]: farInnlagtVedlegg,
            [Skjemanummer.DOK_SYKDOM_FAR]: farForSykvedlegg,
            [Skjemanummer.DOK_SYKDOM_MOR]: morForSykVedlegg,
            [Skjemanummer.DOK_UTDANNING_MOR]: morStudererVedlegg,
            [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: morJobberOgStudererVedlegg,
            [Skjemanummer.DOK_ARBEID_MOR]: morJobberVedlegg,
            [Skjemanummer.DOK_AV_ALENEOMSORG]: aleneomsorgVedlegg,
            [Skjemanummer.TERMINBEKREFTELSE]: terminbekreftelseVedlegg,
            [Skjemanummer.OMSORGSOVERTAKELSE]: adopsjonVedlegg,
            [Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]: militærEllerSiviltjenesteVedlegg,
            [Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]: etterlønnEllerSluttvederlagVedlegg,
        },
    });

    const updateAttachments = (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => {
        formMethods.setValue(skjemanummer, attachments, { shouldDirty: true, shouldTouch: true });
        formMethods.clearErrors(skjemanummer);
    };

    const kreverIngenDokumentasjon =
        [
            morInnlagtPerioder,
            barnInnlagtPerioder,
            farForSykPerioder,
            farInnlagtPerioder,
            morForSykPerioder,
            morIntroPerioder,
            morJobberOgStudererPerioder,
            morKvalPerioder,
            morStudererPerioder,
        ].flat().length === 0;

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'søknad.pageheading' })}>
            <Step steps={stepConfig} noFieldsRequired>
                <RhfForm formMethods={formMethods} onSubmit={lagre}>
                    <VStack gap="space-40">
                        <MorInnlagtDokumentasjon
                            attachments={morInnlagtVedlegg}
                            navnPåForeldre={navnPåForeldre}
                            perioder={morInnlagtPerioder}
                            updateAttachments={updateAttachments}
                            erFarEllerMedmor={erFarEllerMedmor}
                            familiehendelsedato={familiehendelsedato}
                        />
                        <MorForSykDokumentasjon
                            attachments={morForSykVedlegg}
                            navnPåForeldre={navnPåForeldre}
                            perioder={morForSykPerioder}
                            updateAttachments={updateAttachments}
                            erFarEllerMedmor={erFarEllerMedmor}
                        />
                        <FarInnlagtDokumentasjon
                            attachments={farInnlagtVedlegg}
                            navnPåForeldre={navnPåForeldre}
                            perioder={farInnlagtPerioder}
                            updateAttachments={updateAttachments}
                            erFarEllerMedmor={erFarEllerMedmor}
                        />
                        <FarForSykDokumentasjon
                            attachments={farForSykvedlegg}
                            navnPåForeldre={navnPåForeldre}
                            perioder={farForSykPerioder}
                            updateAttachments={updateAttachments}
                            erFarEllerMedmor={erFarEllerMedmor}
                        />
                        <BarnInnlagtDokumentasjon
                            attachments={barnInnlagtVedlegg}
                            navnPåForeldre={navnPåForeldre}
                            perioder={barnInnlagtPerioder}
                            updateAttachments={updateAttachments}
                        />
                        <MorStudererDokumentasjon
                            attachments={morStudererVedlegg}
                            navnPåForeldre={navnPåForeldre}
                            perioder={morStudererPerioder}
                            updateAttachments={updateAttachments}
                        />
                        <MorJobberDokumentasjon
                            attachments={morJobberVedlegg}
                            navnPåForeldre={navnPåForeldre}
                            perioder={morJobberPerioder}
                            erFarEllerMedmor={erFarEllerMedmor}
                            updateAttachments={updateAttachments}
                        />
                        <MorJobberOgStudererDokumentasjon
                            attachments={morJobberOgStudererVedlegg}
                            navnPåForeldre={navnPåForeldre}
                            perioder={morJobberOgStudererPerioder}
                            updateAttachments={updateAttachments}
                        />
                        <MorIntroduksjonsprogrammetDokumentasjon
                            attachments={morIntroprogramVedlegg}
                            navnPåForeldre={navnPåForeldre}
                            perioder={morIntroPerioder}
                            updateAttachments={updateAttachments}
                        />
                        <MorKvalifiseringsprogrammetDokumentasjon
                            attachments={morKvalprogramVedlegg}
                            navnPåForeldre={navnPåForeldre}
                            perioder={morKvalPerioder}
                            updateAttachments={updateAttachments}
                        />
                        <AleneomsorgDokumentasjon
                            attachments={aleneomsorgVedlegg}
                            updateAttachments={updateAttachments}
                            annenForelder={annenForelder}
                        />
                        <TerminbekreftelseDokumentasjon
                            attachments={terminbekreftelseVedlegg}
                            updateAttachments={updateAttachments}
                            barn={barn}
                            annenForelder={annenForelder}
                            søkersituasjon={søkersituasjon}
                            arbeidsforhold={søkerInfo.arbeidsforhold}
                            erFarEllerMedmor={erFarEllerMedmor}
                        />
                        <OmsorgsovertakelseDokumentasjon
                            attachments={adopsjonVedlegg}
                            updateAttachments={updateAttachments}
                            søkersituasjon={søkersituasjon}
                        />
                        <EtterlønnEllerSluttvederlagDokumentasjon
                            attachments={etterlønnEllerSluttvederlagVedlegg}
                            updateAttachments={updateAttachments}
                            arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                            andreInntektskilder={andreInntektskilder}
                        />
                        <MilitærEllerSiviltjenesteDokumentasjon
                            attachments={militærEllerSiviltjenesteVedlegg}
                            updateAttachments={updateAttachments}
                            arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                            andreInntektskilder={andreInntektskilder}
                        />

                        {!kreverIngenDokumentasjon && (
                            <Alert size="small" variant="info">
                                <Heading level="2" size="small">
                                    <FormattedMessage id="manglendeVedlegg.duKanSende.tittel" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="manglendeVedlegg.duKanSende.innhold" />
                                </BodyLong>
                            </Alert>
                        )}
                        <StepButtonsHookForm
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            onAvsluttOgSlett={avbrytSøknad}
                            onFortsettSenere={navigator.fortsettSøknadSenere}
                        />
                    </VStack>
                </RhfForm>
            </Step>
        </SkjemaRotLayout>
    );
};
