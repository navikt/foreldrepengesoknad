import { perioderSomKreverVedlegg } from '@navikt/uttaksplan';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Alert, BodyLong, Heading } from '@navikt/ds-react';

import {
    Block,
    ISOStringToDate,
    Step,
    getErSøkerFarEllerMedmor,
    getNavnPåForeldre,
    intlUtils,
    isUtsettelseBarnInnlagt,
} from '@navikt/fp-common';
import { Skjemanummer } from '@navikt/fp-constants';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Attachment, Søker } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';
import { GyldigeSkjemanummerUttak } from 'app/types/GyldigeSkjemanummer';
import { VedleggDataType } from 'app/types/VedleggDataType';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';

import BarnInnlagtDokumentasjon from './dokumentasjon/BarnInnlagtDokumentasjon';
import FarForSykDokumentasjon from './dokumentasjon/FarForSykDokumentasjon';
import FarInnlagtDokumentasjon from './dokumentasjon/FarInnlagtDokumentasjon';
import MorForSykDokumentasjon from './dokumentasjon/MorForSykDokumentasjon';
import MorInnlagtDokumentasjon from './dokumentasjon/MorInnlagtDokumentasjon';
import MorIntroduksjonsprogrammetDokumentasjon from './dokumentasjon/MorIntroduksjonsprogrammetDokumentasjon';
import MorJobberDokumentasjon from './dokumentasjon/MorJobberDokumentasjon';
import MorJobberOgStudererDokumentasjon from './dokumentasjon/MorJobberOgStudererDokumentasjon';
import MorKvalifiseringsprogrammetDokumentasjon from './dokumentasjon/MorKvalifiseringsprogrammetDokumentasjon';
import MorStudererDokumentasjon from './dokumentasjon/MorStudererDokumentasjon';
import { ManglendeVedleggFormData } from './manglendeVedleggFormUtils';
import {
    getBarnInnlagtVedlegg,
    getFarForSykVedlegg,
    getFarInnlagtVedlegg,
    getMorForSykVedlegg,
    getMorInnlagtVedlegg,
    getMorIntroprogramVedlegg,
    getMorJobberOgStudererVedlegg,
    getMorJobberVedlegg,
    getMorKvalprogramVedlegg,
    getMorStudererVedlegg,
    getRelevantePerioder,
    isPeriodeMedFarForSyk,
    isPeriodeMedFarInnleggelse,
    isPeriodeMedMorForSyk,
    isPeriodeMedMorInnleggelse,
    isPeriodeMedMorIntroprogram,
    isPeriodeMedMorJobber,
    isPeriodeMedMorJobberOgStuderer,
    isPeriodeMedMorKvalprogram,
    isPeriodeMedMorStuderer,
    isSendSenereVedlegg,
} from './util';

type Props = {
    søker: Søker;
    erEndringssøknad: boolean;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const ManglendeVedlegg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    søker,
    erEndringssøknad,
}) => {
    const intl = useIntl();
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG) || ({} as VedleggDataType);
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);
    const saveVedlegg = useContextSaveData(ContextDataType.VEDLEGG);
    const saveNextRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const navigate = useNavigate();
    const relevantePerioder = getRelevantePerioder(
        uttaksplan,
        uttaksplanMetadata?.perioderSomSkalSendesInn,
        erEndringssøknad,
    );

    const erFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const perioderSomManglerVedlegg = perioderSomKreverVedlegg(relevantePerioder, erFarEllerMedmor, annenForelder);
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
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const navigator = useFpNavigator(mellomlagreSøknadOgNaviger, erEndringssøknad);
    const stepConfig = useStepConfig(erEndringssøknad);

    const morInnlagtPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedMorInnleggelse);
    const barnInnlagtPerioder = perioderSomManglerVedlegg.filter(isUtsettelseBarnInnlagt);
    const farForSykPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedFarForSyk);
    const farInnlagtPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedFarInnleggelse);
    const morForSykPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedMorForSyk);
    const morIntroPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedMorIntroprogram);
    const morJobberPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedMorJobber);
    const morJobberOgStudererPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedMorJobberOgStuderer);
    const morKvalPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedMorKvalprogram);
    const morStudererPerioder = perioderSomManglerVedlegg.filter(isPeriodeMedMorStuderer);

    const navnPåForeldre = getNavnPåForeldre(søker, annenForelder, erFarEllerMedmor, intl);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const termindato = getTermindato(barn);

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
        };

        saveVedlegg(alleVedlegg);
        saveNextRoute(erEndringssøknad ? SøknadRoutes.OPPSUMMERING : SøknadRoutes.UTENLANDSOPPHOLD);

        return mellomlagreSøknadOgNaviger();
    };

    const formMethods = useForm<ManglendeVedleggFormData>({
        defaultValues: {
            [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:
                vedlegg[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM] || [],
            [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:
                vedlegg[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET] || [],
            [Skjemanummer.DOK_INNLEGGELSE_MOR]: vedlegg[Skjemanummer.DOK_INNLEGGELSE_MOR] || [],
            [Skjemanummer.DOK_INNLEGGELSE_BARN]: vedlegg[Skjemanummer.DOK_INNLEGGELSE_BARN] || [],
            [Skjemanummer.DOK_INNLEGGELSE_FAR]: vedlegg[Skjemanummer.DOK_INNLEGGELSE_FAR] || [],
            [Skjemanummer.DOK_SYKDOM_FAR]: vedlegg[Skjemanummer.DOK_SYKDOM_FAR] || [],
            [Skjemanummer.DOK_SYKDOM_MOR]: vedlegg[Skjemanummer.DOK_SYKDOM_MOR] || [],
            [Skjemanummer.DOK_UTDANNING_MOR]: vedlegg[Skjemanummer.DOK_UTDANNING_MOR] || [],
            [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: vedlegg[Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR] || [],
            [Skjemanummer.DOK_ARBEID_MOR]: vedlegg[Skjemanummer.DOK_ARBEID_MOR] || [],
        },
    });

    const updateAttachments = (skjemanummer: GyldigeSkjemanummerUttak) => (attachments: Attachment[]) => {
        formMethods.setValue(skjemanummer, attachments, { shouldDirty: true, shouldTouch: true });
        formMethods.clearErrors(skjemanummer);
    };

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <MorInnlagtDokumentasjon
                    attachments={morInnlagtVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={morInnlagtPerioder}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <MorForSykDokumentasjon
                    attachments={morForSykVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={morForSykPerioder}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <FarInnlagtDokumentasjon
                    attachments={farInnlagtVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={farInnlagtPerioder}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <FarForSykDokumentasjon
                    attachments={farForSykvedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={farForSykPerioder}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <BarnInnlagtDokumentasjon
                    attachments={barnInnlagtVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={barnInnlagtPerioder}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <MorStudererDokumentasjon
                    attachments={morStudererVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={morStudererPerioder}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <MorJobberDokumentasjon
                    attachments={morJobberVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={morJobberPerioder}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <MorJobberOgStudererDokumentasjon
                    attachments={morJobberOgStudererVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={morJobberOgStudererPerioder}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <MorIntroduksjonsprogrammetDokumentasjon
                    attachments={morIntroprogramVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={morIntroPerioder}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <MorKvalifiseringsprogrammetDokumentasjon
                    attachments={morKvalprogramVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={morKvalPerioder}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <Block padBottom="xl">
                    <Alert size="small" variant="info">
                        <Heading level="2" size="small">
                            <FormattedMessage id="manglendeVedlegg.duKanSende.tittel" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="manglendeVedlegg.duKanSende.innhold" />
                        </BodyLong>
                    </Alert>
                </Block>
                <StepButtonsHookForm<ManglendeVedleggFormData>
                    goToPreviousStep={() => {
                        oppdaterAppRoute(SøknadRoutes.UTTAKSPLAN);
                        navigate(SøknadRoutes.UTTAKSPLAN);
                    }}
                />
            </Form>
        </Step>
    );
};

export default ManglendeVedlegg;
