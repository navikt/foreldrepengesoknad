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
import stepConfig from '../stepsConfig';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { perioderSomKreverVedlegg } from '@navikt/uttaksplan';
import { ManglendeVedleggFormData } from './manglendeVedleggFormConfig';
import { useNavigate } from 'react-router-dom';
import { Attachment } from '@navikt/fp-types';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import FellesperiodeDok from './dokumentasjon/FellesperiodeDok';
import {
    getFedrekvoteMorForSykVedlegg,
    getFellesperiodeVedlegg,
    getOverføringsVedlegg,
    isSendSenereVedlegg,
} from './util';
import { Skjemanummer } from '@navikt/fp-constants';
import OverføringsDok from './dokumentasjon/OverføringDok';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { notEmpty } from '@navikt/fp-validation';
import Person from '@navikt/fp-common/src/common/types/Person';
import FedrekvoteMorForSykDok from './dokumentasjon/FedrekvoteMorForSykDok';
import UtsettelseDok from './dokumentasjon/UtsettelseDok';
import { VedleggDataType } from 'app/types/VedleggDataType';
import { GyldigeSkjemanummerUttak } from 'app/types/GyldigeSkjemanummer';
import { GuidePanel } from '@navikt/ds-react';

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
    const manglerDokumentasjon = useContextGetData(ContextDataType.MANGLER_DOKUMENTASJON);
    const saveVedlegg = useContextSaveData(ContextDataType.VEDLEGG);
    const saveNextRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const navigate = useNavigate();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const erFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const perioderSomManglerVedlegg = perioderSomKreverVedlegg(uttaksplan, erFarEllerMedmor, annenForelder);
    const fellesperiodeVedlegg = getFellesperiodeVedlegg(vedlegg);
    const overføringsVedlegg = getOverføringsVedlegg(vedlegg);
    const fedrekvoteMorForSykVedlegg = getFedrekvoteMorForSykVedlegg(vedlegg);

    const navnPåForeldre = getNavnPåForeldre(person, annenForelder, erFarEllerMedmor, intl);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const termindato = getTermindato(barn);

    const lagre = (formValues: ManglendeVedleggFormData) => {
        const alleVedlegg = {
            ...vedlegg,
            [Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM]: formValues[Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM],
            [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:
                formValues[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM],
            [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:
                formValues[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET],
            [Skjemanummer.DOK_OVERFØRING_FOR_SYK]: formValues[Skjemanummer.DOK_OVERFØRING_FOR_SYK],
            [Skjemanummer.DOK_INNLEGGELSE]: formValues[Skjemanummer.DOK_INNLEGGELSE],
        };

        saveVedlegg(alleVedlegg);
        saveNextRoute(SøknadRoutes.UTENLANDSOPPHOLD);

        return mellomlagreSøknadOgNaviger();
    };

    const formMethods = useForm<ManglendeVedleggFormData>({
        defaultValues: {
            [Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM]:
                vedlegg[Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM] || [],
            [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:
                vedlegg[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM] || [],
            [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:
                vedlegg[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET] || [],
            [Skjemanummer.DOK_OVERFØRING_FOR_SYK]: vedlegg[Skjemanummer.DOK_OVERFØRING_FOR_SYK] || [],
            [Skjemanummer.DOK_INNLEGGELSE]: vedlegg[Skjemanummer.DOK_INNLEGGELSE] || [],
        },
    });

    const updateAttachments = (skjemanummer: GyldigeSkjemanummerUttak) => (attachments: Attachment[]) => {
        formMethods.setValue(skjemanummer, attachments, { shouldDirty: true, shouldTouch: true });
        formMethods.clearErrors(skjemanummer);
    };

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            activeStepId="dokumentasjon"
            pageTitle={intlUtils(intl, 'søknad.manglendeVedlegg')}
            onCancel={avbrytSøknad}
            onContinueLater={onFortsettSøknadSenere}
            steps={stepConfig(intl, erEndringssøknad, manglerDokumentasjon)}
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <FellesperiodeDok
                    attachments={fellesperiodeVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <OverføringsDok
                    attachments={overføringsVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <FedrekvoteMorForSykDok
                    attachments={fedrekvoteMorForSykVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <UtsettelseDok
                    attachments={fedrekvoteMorForSykVedlegg.filter((attachment) => !isSendSenereVedlegg(attachment))}
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
                    goToPreviousStep={() => navigate(SøknadRoutes.UTTAKSPLAN)}
                />
            </Form>
        </Step>
    );
};

export default ManglendeVedlegg;
