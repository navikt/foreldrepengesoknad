import {
    Block,
    ISOStringToDate,
    Step,
    getErSøkerFarEllerMedmor,
    getNavnPåForeldre,
    intlUtils,
} from '@navikt/fp-common';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import SøknadRoutes from 'app/routes/routes';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { perioderSomKreverVedlegg } from '@navikt/uttaksplan';
import { useNavigate } from 'react-router-dom';
import { Attachment } from '@navikt/fp-types';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import {
    getBarnInnlagtVedlegg,
    getFarForSykVedlegg,
    getFarInnlagtVedlegg,
    getMorForSykVedlegg,
    getMorInnlagtVedlegg,
    getMorJobberVedlegg,
    getMorStudererVedlegg,
    isSendSenereVedlegg,
} from './util';
import { Skjemanummer } from '@navikt/fp-constants';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { notEmpty } from '@navikt/fp-validation';
import Person from '@navikt/fp-common/src/common/types/Person';
import { VedleggDataType } from 'app/types/VedleggDataType';
import { GyldigeSkjemanummerUttak } from 'app/types/GyldigeSkjemanummer';
import { GuidePanel } from '@navikt/ds-react';
import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import MorInnlagtDokumentasjon from './dokumentasjon/MorInnlagtDokumentasjon';
import MorForSykDokumentasjon from './dokumentasjon/MorForSykDokumentasjon';
import { ManglendeVedleggFormData } from './manglendeVedleggFormUtils';
import FarInnlagtDokumentasjon from './dokumentasjon/FarInnlagtDokumentasjon';
import FarForSykDokumentasjon from './dokumentasjon/FarForSykDokumentasjon';
import BarnInnlagtDokumentasjon from './dokumentasjon/BarnInnlagtDokumentasjon';
import MorStudererDokumentasjon from './dokumentasjon/MorStudererDokumentasjon';
import MorJobberDokumentasjon from './dokumentasjon/MorJobberDokumentasjon';

type Props = {
    person: Person;
    erEndringssøknad: boolean;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const ManglendeVedlegg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    person,
    erEndringssøknad,
}) => {
    const intl = useIntl();
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG) || ({} as VedleggDataType);
    const saveVedlegg = useContextSaveData(ContextDataType.VEDLEGG);
    const saveNextRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const navigate = useNavigate();
    const erFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const perioderSomManglerVedlegg = perioderSomKreverVedlegg(uttaksplan, erFarEllerMedmor, annenForelder);
    const morInnlagtVedlegg = getMorInnlagtVedlegg(vedlegg);
    const morForSykVedlegg = getMorForSykVedlegg(vedlegg);
    const farInnlagtVedlegg = getFarInnlagtVedlegg(vedlegg);
    const farForSykvedlegg = getFarForSykVedlegg(vedlegg);
    const barnInnlagtVedlegg = getBarnInnlagtVedlegg(vedlegg);
    const morStudererVedlegg = getMorStudererVedlegg(vedlegg);
    const morJobberVedlegg = getMorJobberVedlegg(vedlegg);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const navigator = useFpNavigator(mellomlagreSøknadOgNaviger, erEndringssøknad);
    const stepConfig = useStepConfig(erEndringssøknad);

    const navnPåForeldre = getNavnPåForeldre(person, annenForelder, erFarEllerMedmor, intl);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const termindato = getTermindato(barn);

    const lagre = (formValues: ManglendeVedleggFormData) => {
        const alleVedlegg = {
            ...vedlegg,
            [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:
                formValues[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM],
            [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:
                formValues[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET],
            [Skjemanummer.DOK_INNLEGGELSE_MOR]: formValues[Skjemanummer.DOK_INNLEGGELSE_MOR],
            [Skjemanummer.DOK_INNLEGGELSE_BARN]: formValues[Skjemanummer.DOK_INNLEGGELSE_BARN],
            [Skjemanummer.DOK_INNLEGGELSE_FAR]: formValues[Skjemanummer.DOK_INNLEGGELSE_FAR],
            [Skjemanummer.DOK_SYKDOM_MOR]: formValues[Skjemanummer.DOK_SYKDOM_MOR],
            [Skjemanummer.DOK_SYKDOM_FAR]: formValues[Skjemanummer.DOK_SYKDOM_FAR],
            [Skjemanummer.DOK_UTDANNING_MOR]: formValues[Skjemanummer.DOK_UTDANNING_MOR],
            [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: formValues[Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR],
            [Skjemanummer.DOK_ARBEID_MOR]: formValues[Skjemanummer.DOK_ARBEID_MOR],
        };

        saveVedlegg(alleVedlegg);
        saveNextRoute(SøknadRoutes.UTENLANDSOPPHOLD);

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
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <MorForSykDokumentasjon
                    attachments={morForSykVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <FarInnlagtDokumentasjon
                    attachments={farInnlagtVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <FarForSykDokumentasjon
                    attachments={farForSykvedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <BarnInnlagtDokumentasjon
                    attachments={barnInnlagtVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <MorStudererDokumentasjon
                    attachments={morStudererVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <MorJobberDokumentasjon
                    attachments={morJobberVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <Block padBottom="xl">
                    <GuidePanel>
                        Du kan gå videre uten å laste opp dokumentasjonen nå og heller sende inn i etterkant. Husk at
                        all dokumentasjon må sendes inn i løpet av 3 uker.
                    </GuidePanel>
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
